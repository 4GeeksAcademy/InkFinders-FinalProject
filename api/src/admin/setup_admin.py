import os
from src.db import db
from flask_admin import Admin
from src.models.models import Users
from src.admin.model_wrapper import StandardModelView


def setup_admin(app):
    app.secret_key = os.environ.get("FLASK_APP_KEY", "sample key")
    app.config["FLASK_ADMIN_SWATCH"] = "cerulean"

    admin = Admin(app, name="4Geeks Admin", template_mode="bootstrap3")

    with app.app_context():
        admin.add_view(StandardModelView(Users, db.session))
