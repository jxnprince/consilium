from app.models import db, User


def seed_users():

    data = [
            User(firstName='Jackson', lastName='Prince', email='jxnP@bms.com', password='password', superUser=True, avatar='https://scontent.fapa1-2.fna.fbcdn.net/v/t1.18169-9/28377994_10155915432046955_4265277584126466244_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=KV01Sh9ZHjIAX9uFqPs&_nc_ht=scontent.fapa1-2.fna&oh=50946dcd66e88af40d49f7a402156755&oe=60CB5BE1'),  # noqa
            User(firstName='Evan', lastName='Reeves', email='evanR@bms.com', password='password', superUser=True, avatar='https://scontent.fapa1-2.fna.fbcdn.net/v/t1.6435-9/157302293_3902257583167943_7112839200227319282_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SOQ8iPI8_Z4AX-ECKiZ&_nc_ht=scontent.fapa1-2.fna&oh=420768bf11818baca1846a4520cc790e&oe=60CC740B'),  # noqa
            User(firstName='Kingdom', lastName='Jasmine', email='bobbyB@kj.com', password='password', superUser=False, avatar='https://scontent.fapa1-1.fna.fbcdn.net/v/t1.6435-9/125105823_2810314575912452_1965764849937861622_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=__dTl-0L4-oAX9_sVBp&_nc_ht=scontent.fapa1-1.fna&oh=b751e673768c4cc639bd2e2d8f4491a5&oe=60CA4AB4'),  # noqa
            User(firstName='Prize The', lastName='Wild', email='eli@ptw.com', password='password', superUser=False, avatar='https://i1.sndcdn.com/artworks-000337284471-t8b2q9-t500x500.jpg'),  # noqa
            ]

    for user in data:
        db.session.add(user)
    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
