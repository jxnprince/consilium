from app.models import db, Project


def seed_projects():

    data = [
            Project(name='Anyone Seen The Light?', engineerId=1, artistId=3),
            Project(name='Brain Gravy', engineerId=1, artistId=3),
            Project(name='AT.PLAY', engineerId=1, artistId=4),
            ]

    for project in data:
        db.session.add(project)
    db.session.commit()


def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
