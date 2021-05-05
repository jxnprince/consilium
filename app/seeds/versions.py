from app.models import db, Version


def seed_versions():

    data = [
            Version(url='',length='',trackId=''),
            ]

    for versions in data:
        db.session.add(versions)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_versions():
    db.session.execute('TRUNCATE versions RESTART IDENTITY CASCADE;')
    db.session.commit()
