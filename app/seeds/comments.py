from app.models import db, Comment


def seed_comments():

    data = [
            Comment(body='This is a comment!', versionId=1, userId=1),
            ]

    for comment in data:
        db.session.add(comment)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
