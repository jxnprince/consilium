from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_login import current_user

user = current_user


# def isEngineer(form, field):
#     print("Checking if user is authorized...")
#     if not user.superUser:
#         raise ValidationError("User is not authorized to create project")


class ProjectForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    artwork = StringField('artwork')
    engineerId = IntegerField('engineerId')  # noqa
    artistId = IntegerField('artistId')
