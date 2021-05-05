from .db import db


class Comment(db.Model):
    __tablename__='comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    versionId = db.Column(db.Integer, db.ForeignKey("versions.id"), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="comments")
    version = db.relationship("Version", back_populates="comments")

    def to_dict(self):
        return{
            "id": self.id,
            "body": self.body,
            "versionId": self.versionId,
            "userId": self.userId,
            "user": self.user,
            "version": self.version
        }