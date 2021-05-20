from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashedPassword = db.Column(db.String(255), nullable=False)
    superUser = db.Column(db.Boolean, default=False, nullable=False)
    avatar = db.Column(db.String, default='null', nullable=True)  # noqa

    engineer = db.relationship("Project", backref="engineer", foreign_keys='Project.engineerId')  # noqa
    artist = db.relationship("Project", backref="artist", foreign_keys='Project.artistId')  # noqa
    comments = db.relationship("Comment", back_populates="user")

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "avatar": self.avatar,
            "superUser": self.superUser
        }

    def getArtists(self):
        '''
        Get all artists associated with the engineer
        '''
        if not self.superUser:
            return []
        projects = self.artist
        artists = []
        [artists.extend(p.artist) for p in projects]
        return projects

    def getEngineers(self):
        '''
        Get an engineer associated with a project
        '''
        projects = self.projects_artist
        engineer = [p.engineer for p in projects]
        return engineer
