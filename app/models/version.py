from .db import db


class Version(db.Model):
    __tablename__ = 'versions'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    length = db.Column(db.Integer)
    trackId = db.Column(db.Integer, db.ForeignKey("tracks.id"), nullable=False)

    track = db.relationship("Track", back_populates="versions")
    comments = db.relationship("Comment", back_populates="version")

    def to_dict(self):
        return{
            "id": self.id,
            "url": self.url,
            "length": self.length,
            "trackId": self.trackId,
            "track": self.track,
            "comments": self.comments
        }