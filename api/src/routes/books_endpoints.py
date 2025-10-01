from flask import request, jsonify, abort
from sqlalchemy import select
from src.repository.book_repository import (
    volume_to_book_fields,
    upsert_book,
    unset_user_book_status,
)
import sys
from src.models.models import db, Users, Book, UserBookStatus, BookStatusEnum
from src.services.google_books_client import get_volume
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)  # Extensión de Flask para JWT: control de acceso por token.


def get_current_user() -> Users:
    uid = request.headers.get("X-User-Id", "1")
    if not uid.isdigit():
        abort(400, description="X-User-Id debe ser numérico")
    user = db.session.get(Users, int(uid))
    if not user:
        abort(400, description=f"Usuario con id={uid} no existe")
    return user


def get_favorite_books(user_id: int):
    stmt = (
        select(Book)
        .join(UserBookStatus, UserBookStatus.book_id == Book.id)
        .where(
            UserBookStatus.user_id == user_id,
            UserBookStatus.status == BookStatusEnum.favorite,
        )
    )
    return db.session.scalars(stmt).all()


def get_to_read_books(user_id: int):
    stmt = (
        select(Book)
        .join(UserBookStatus, UserBookStatus.book_id == Book.id)
        .where(
            UserBookStatus.user_id == user_id,
            UserBookStatus.status == BookStatusEnum.to_read,
        )
    )
    return db.session.scalars(stmt).all()


def get_read_books(user_id: int):
    stmt = (
        select(Book)
        .join(UserBookStatus, UserBookStatus.book_id == Book.id)
        .where(
            UserBookStatus.user_id == user_id,
            UserBookStatus.status == BookStatusEnum.read,
        )
    )
    return db.session.scalars(stmt).all()


def ensure_book(book_id: str) -> Book:
    book = db.session.get(Book, book_id)
    if book:
        return book
    v = get_volume(book_id)
    if not v or not v.get("id"):
        abort(404, description="No se ha podido importar el libro desde Google")
    fields = volume_to_book_fields(v)
    return upsert_book(fields)


def serialize_link(
    link: UserBookStatus, book: Book
) -> dict:  # serializa la relación user-book-status + datos básicos del libro para pasarlos al front.
    return {
        "user_id": link.user_id,
        "book_id": link.book_id,
        "status": link.status.value,
        "title": book.title,
        "authors": book.authors_json or [],
        "thumbnail": book.thumbnail,
        "info_link": book.info_link,
    }


def register_book_endpoints(app):
    @app.route("/books/<string:volume_id>", methods=["POST"])
    @jwt_required()
    def import_book(volume_id: str):
        v = get_volume(volume_id)
        if not v or not v.get("id"):
            return jsonify(
                {"error": "No se ha encontrado el libro en Google Books"}
            ), 404

        fields = volume_to_book_fields(v)
        book = upsert_book(fields)

        return jsonify(
            {
                "id": book.id,
                "title": book.title,
                "authors": book.authors_json or [],
                "thumbnail": book.thumbnail,
                "info_link": book.info_link,
            }
        ), 201

    # FAVORITOS

    @app.route("/favorites/get_books", methods=["GET"])
    @jwt_required()
    def get_all_my_favorites():
        user = get_current_user()
        fav_books = get_favorite_books(user.id)

        return jsonify([b.serialize() for b in fav_books]), 200

    @app.route("/favorites/add_book/<string:book_id>", methods=["POST"])
    @jwt_required()
    def add_fav_book(
        book_id: str,
    ):  # añadir un libro a favoritos del usuario actual. Si ya está agregado, devuelve 200.
        user = get_current_user()
        book = ensure_book(book_id)
        exists = db.session.scalars(
            select(UserBookStatus).filter_by(
                user_id=user.id, book_id=book.id, status=BookStatusEnum.favorite
            )
        ).first()
        if exists:
            return jsonify({"message": "Ya estaba en favoritos"}), 200

        link = UserBookStatus(
            user_id=user.id, book_id=book.id, status=BookStatusEnum.favorite
        )
        db.session.add(link)
        db.session.commit()

        return jsonify(serialize_link(link, book)), 201

    @app.route("/favorites/delete_book/<string:book_id>", methods=["DELETE"])
    @jwt_required()
    def remove_fav_book(
        book_id: str,
    ):
        user = get_current_user()
        deleted = unset_user_book_status(user.id, book_id, BookStatusEnum.favorite)

        if deleted:
            return jsonify({"message": "Eliminado de favoritos"}), 200
        else:
            return jsonify({"message": "No estaba en favoritos (sin cambios)"}), 200

    # TO READ

    @app.route("/to_read/get_books", methods=["GET"])
    @jwt_required()
    def get_all_my_to_read():
        user = get_current_user()
        to_read_books = get_to_read_books(user.id)

        return jsonify([b.serialize() for b in to_read_books]), 200

    @app.route("/to_read/add_book/<string:book_id>", methods=["POST"])
    @jwt_required()
    def add_to_read_book(book_id: str):
        user = get_current_user()
        if not isinstance(user, Users):
            return user

        book = ensure_book(book_id)

        exists = db.session.scalars(
            select(UserBookStatus).filter_by(
                user_id=user.id, book_id=book.id, status=BookStatusEnum.to_read
            )
        ).first()
        if exists:
            return jsonify(
                {"message": "Ya estaba en tu lista de libros pendientes"}
            ), 200

        link = UserBookStatus(
            user_id=user.id, book_id=book.id, status=BookStatusEnum.to_read
        )
        db.session.add(link)
        db.session.commit()
        return jsonify(serialize_link(link, book)), 201

    @app.route("/to_read/delete_book/<string:book_id>", methods=["DELETE"])
    @jwt_required()
    def remove_to_read_book(book_id: str):  # quita el libro de la lista de "para leer"
        user = get_current_user()
        if not isinstance(user, Users):
            return user

        deleted = unset_user_book_status(user.id, book_id, BookStatusEnum.to_read)

        if deleted:
            return jsonify({"message": "Eliminado de pendientes"}), 200
        else:
            return jsonify({"message": "No estaba en pendientes (sin cambios)"}), 200

    ## READ
    @app.route("/read/get_books", methods=["GET"])
    @jwt_required()
    def get_all_my_read():
        user = get_current_user()
        read_books = get_read_books(user.id)

        return jsonify([b.serialize() for b in read_books]), 200

    @app.route("/read/add_book/<string:book_id>", methods=["POST"])
    @jwt_required()
    def add_read_book(book_id: str):
        user = get_current_user()
        if not isinstance(user, Users):
            return user

        book = ensure_book(book_id)

        exists = db.session.scalars(
            select(UserBookStatus).filter_by(
                user_id=user.id, book_id=book.id, status=BookStatusEnum.read
            )
        ).first()
        if exists:
            return jsonify({"message": "Ya estaba en tu lista de libros leídos"}), 200

        link = UserBookStatus(
            user_id=user.id, book_id=book.id, status=BookStatusEnum.read
        )
        db.session.add(link)
        db.session.commit()
        return jsonify(serialize_link(link, book)), 201

    @app.route("/read/delete_book/<string:book_id>", methods=["DELETE"])
    @jwt_required()
    def remove_read_book(book_id: str):  # quita el libro de la lista de "leídos"
        user = get_current_user()
        if not isinstance(user, Users):
            return user

        deleted = unset_user_book_status(user.id, book_id, BookStatusEnum.read)

        if deleted:
            return jsonify({"message": "Eliminado de leídos"}), 200
        else:
            return jsonify({"message": "No estaba en leídos (sin cambios)"}), 200

    # LISTADO DE LIBROS DEL USUARIO FILTRADO POR STATUS
    @app.route("/books/mine", methods=["GET"])
    @jwt_required()
    def list_my_books():
        user = get_current_user()
        if not isinstance(user, Users):
            return user

        status_param = request.args.get("status")
        status_filter = None
        if status_param:
            try:
                status_filter = BookStatusEnum(status_param)
            except ValueError:
                return jsonify({"error": f"Invalid status '{status_param}'"}), 400

        q = (
            db.session.query(UserBookStatus, Book)
            .join(Book, Book.id == UserBookStatus.book_id)
            .filter(UserBookStatus.user_id == user.id)
        )

        if status_filter:
            q = q.filter(UserBookStatus.status == status_filter)

        items = []
        for link, book in q.all():
            items.append(serialize_link(link, book))

        return jsonify(items), 200
