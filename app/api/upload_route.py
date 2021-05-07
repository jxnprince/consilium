from flask import Blueprint, request
from app.models import db
from flask_login import current_user, login_required
from app.s3_helpers import upload_file_to_s3, allowed_file, get_unique_filename

file_routes = Blueprint("files", __name__)


@file_routes.route("/", strict_slashes=False, methods=["POST"])
# @login_required
def upload_file():
    # print(request.data, '================================================================')  # noqa
    if "file" not in request.files:
        return {"errors": "file required"}, 400
    file = request.files["file"]

    if not allowed_file(file.filename):
        return {"errors": "file type not permitted"}, 400

    file.filename = get_unique_filename(file.filename)

    upload = upload_file_to_s3(file)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]
    return {"url": url}
