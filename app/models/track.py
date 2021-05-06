from .db import db


class Track(db.Model):
    __tablename__ = "tracks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)  # noqa

    project = db.relationship("Project", back_populates="tracks")
    versions = db.relationship("Version", back_populates="track")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "projectId": self.projectId
        }
