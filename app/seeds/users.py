from app.models import db, User


def seed_users():

    data = [
            User(firstName='Jackson', lastName='Prince', email='jxnP@bms.com', password='password', superUser=True),  # noqa
            User(firstName='Evan', lastName='Reeves', email='evanR@bms.com', password='password', superUser=True),  # noqa
            User(firstName='Bob', lastName='Barrick', email='bobbyB@kj.com', password='password', superUser=False),  # noqa
            User(firstName='Matthew', lastName='Spavick', email='mattyM@ae.com', password='password', superUser=False),  # noqa
            User(firstName='Dango', lastName='Rose', email='dannyR@er.com', password='password', superUser=False)  # noqa
            ]

    for user in data:
        db.session.add(user)
    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
