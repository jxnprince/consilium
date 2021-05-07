from .db import db


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    engineerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)  # noqa
    artistId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # engineer = db.relationship("User", foreign_keys='Project.engineerId', back_populates="projects_engineer", uselist=False)  # noqa
    # artist = db.relationship("User", foreign_keys='Project.artistId', back_populates="projects_artist")  # noqa
    tracks = db.relationship("Track", back_populates="project", cascade="all, delete-orphan")  # noqa

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "engineerId": self.engineerId,
            "artistId": self.artistId,
        }
