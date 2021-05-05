from .db import db


class Project(db.Model, UserMixin):

    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    engineerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    artistId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    
    engineer = db.relationship("User", back_populates="projects")
    artist = db.relationship("User", back_populates="projects")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "engineerId": self.engineerId,
            "artistId": self.artistId
        }
