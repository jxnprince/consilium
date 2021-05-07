from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_login import current_user

user = current_user


def isEngineer(form, field):
    print("Checking authentication...")
    if not user.superUser:
        raise ValidationError(f"{user.firstName} {user.lastName} is not authorized to create project")  # noqa


class VersionForm(FlaskForm):
    url = StringField('url', validators=[DataRequired(), isEngineer])
    length = IntegerField('length')
    trackId = IntegerField('trackId')
