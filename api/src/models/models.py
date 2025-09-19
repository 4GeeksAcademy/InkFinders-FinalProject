from sqlalchemy import String, VARCHAR, ForeignKey, JSON, Index, Integer, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db import db
from enum import Enum


class Users(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    user_name: Mapped[str] = mapped_column(String(50), nullable=False)
    password: Mapped[str] = mapped_column(VARCHAR(60), nullable=False)
    email: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)

    # Relaciones:
    profile: Mapped["Profile"] = relationship(
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    books_links: Mapped[list["UserBookStatus"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.user_name}>"

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
        }


class Profile(db.Model):
    __tablename__ = "user_profile"

    id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    picture: Mapped[str] = mapped_column(String(200), nullable=False)
    display_name: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[str] = mapped_column(String(400), nullable=False)

    # relaciones:
    user: Mapped["Users"] = relationship(back_populates="profile")

    def serialize(self):
        return {
            "id": self.id,
            "picture": self.picture,
            "display_name": self.display_name,
            "description": self.description,
        }


class Book(db.Model):
    __tablename__ = "books"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)  # google_volume_id
    title: Mapped[str | None] = mapped_column(String(512))
    authors_json: Mapped[list[str] | None] = mapped_column(JSON)
    thumbnail: Mapped[str | None] = mapped_column(String(1024))  # Miniatura del libro
    info_link: Mapped[str | None] = mapped_column(String(1024))  # Enlace informativo

    # relaciones:
    user_links: Mapped[list["UserBookStatus"]] = relationship(
        back_populates="book", cascade="all, delete-orphan", passive_deletes=True
    )


class BookStatusEnum(str, Enum):
    favorite = "favorite"
    to_read = "to_read"
    read = "read"


class UserBookStatus(db.Model):
    __tablename__ = "user_book_status"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    book_id: Mapped[str] = mapped_column(
        ForeignKey("books.id", ondelete="CASCADE"), primary_key=True
    )

    status: Mapped[BookStatusEnum] = mapped_column(
        SAEnum(BookStatusEnum, name="book_status_enum"), primary_key=True
    )

    note: Mapped[str | None] = mapped_column(String(500))
    rating: Mapped[int | None] = mapped_column(Integer)

    # relaciones:
    user: Mapped[Users] = relationship(back_populates="books_links")
    book: Mapped[Book] = relationship(back_populates="user_links")

    __table_args__ = (Index("ix_user_status", "user_id", "status"),)
