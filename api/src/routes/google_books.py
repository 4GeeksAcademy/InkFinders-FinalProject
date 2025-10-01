from flask import (
    request,
    jsonify,
)
import sys
import requests
import os
from flask_jwt_extended import jwt_required

GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1"


def search_book(
    app,
):
    @app.route("/gbooks/search", methods=["GET"])
    @jwt_required()
    def proxy_gbooks():
        url = f"{GOOGLE_BOOKS_URL}/volumes/"
        params = dict(request.args)

        params["maxResults"] = "20"
        params["langRestrict"] = "es"
        params["printType"] = "books"

        api_key = os.getenv("GOOGLE_API_KEY")
        params["key"] = api_key

        try:
            proxy_request = requests.get(url, params=params, timeout=10)

            return (
                jsonify(proxy_request.json()),
                proxy_request.status_code,
            )

        except Exception as e:
            print(f"Found General Exception in search_book {e}")

        except requests.RequestException as e:
            return (
                jsonify({"error": f"Failed to fetch from Google Books{e}"}),
                502,
            )
