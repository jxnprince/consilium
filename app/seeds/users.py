from app.models import db, User


def seed_users():

    data = [
            User(firstName='Jackson', lastName='Prince', email='jxnP@bms.com', password='password', superUser=True, avatar='https://scontent.fapa1-2.fna.fbcdn.net/v/t1.18169-9/28377994_10155915432046955_4265277584126466244_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=KV01Sh9ZHjIAX9uFqPs&_nc_ht=scontent.fapa1-2.fna&oh=50946dcd66e88af40d49f7a402156755&oe=60CB5BE1'),  # noqa
            User(firstName='Evan', lastName='Reeves', email='evanR@bms.com', password='password', superUser=True, avatar='https://scontent.fapa1-2.fna.fbcdn.net/v/t1.6435-9/157302293_3902257583167943_7112839200227319282_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SOQ8iPI8_Z4AX-ECKiZ&_nc_ht=scontent.fapa1-2.fna&oh=420768bf11818baca1846a4520cc790e&oe=60CC740B'),  # noqa
            User(firstName='Kingdom', lastName='Jasmine', email='bobbyB@kj.com', password='password', superUser=False, avatar='data:image/jpeg;base64,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'),  # noqa
            User(firstName='Prize The', lastName='Wild', email='eli@ptw.com', password='password', superUser=False, avatar='https://i1.sndcdn.com/artworks-000337284471-t8b2q9-t500x500.jpg'),  # noqa
            ]

    for user in data:
        db.session.add(user)
    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
