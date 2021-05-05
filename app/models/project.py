from .db import db


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    engineerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    artistId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    engineer = db.relationship("User", foreign_keys='Project.engineerId',backref="projects_engineer", uselist=False)
    artist = db.relationship("User",foreign_keys='Project.artistId' ,backref="projects_artist")
    tracks = db.relationship("Track", back_populates="project")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "engineerId": self.engineerId,
            "engineer": self.engineer,
            "artistId": self.artistId,
            "artist": self.artist
        }