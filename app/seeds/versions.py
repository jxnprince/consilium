from app.models import db, Version


def seed_versions():
    data = [
            Version(url='https://consilium.s3-us-west-2.amazonaws.com/06+Latenight+Moonlight.mp3', length=3, trackId=1),  # noqa
            ]

    for versions in data:
        db.session.add(versions)

    db.session.commit()


def undo_versions():
    db.session.execute('TRUNCATE versions RESTART IDENTITY CASCADE;')
    db.session.commit()
