class Projects(db.Model, UserMixin):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    engineerId = db.Column(db.Integer, db.foreignKey("users.id"), nullable=False)
    artistId = db.Column(db.Integer, db.foreignKey("users.id"), nullable=False)

    engineer = db.relationship("User", foreign_keys='Project.engineerId',back_ref="projects_engineer", uselist=False)
    artist = db.relationship("User",foreign_keys='Project.artistId' ,back_ref="projects_artist")