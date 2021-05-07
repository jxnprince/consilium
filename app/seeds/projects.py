from app.models import db, Project


def seed_projects():

    data = [
            Project(name='Anyone Seen The Light?', engineerId=1, artistId=3),
            Project(name='Brain Gravy', engineerId=1, artistId=3),
            Project(name='Sketches', engineerId=1, artistId=4),
            Project(name='Time for Departure', engineerId=1, artistId=4),
            Project(name='The Night Resumes', engineerId=2, artistId=5),
            Project(name='A La Glory', engineerId=2, artistId=5),
            ]

    for project in data:
        db.session.add(project)
    db.session.commit()


def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
