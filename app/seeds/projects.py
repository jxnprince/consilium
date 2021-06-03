from app.models import db, Project


def seed_projects():

    data = [
            Project(name='Anyone Seen The Light?', engineerId=1, artistId=3, artwork='https://f4.bcbits.com/img/a2841769959_10.jpg'),  # noqa
            Project(name='Brain Gravy', engineerId=1, artistId=3, artwork='https://image.spreadshirtmedia.com/image-server/v1/compositions/T378A2PA3280PT17X0Y21D1034598672FS6770/views/1,width=500,height=500,appearanceId=2/brain-gravy-eco-friendly-cotton-tote.jpg'),  # noqa
            Project(name='AT.PLAY', engineerId=1, artistId=4, artwork='https://xlr8r.com/wp-content/uploads/2019/06/cover1600x1600.jpg'),  # noqa
            ]

    for project in data:
        db.session.add(project)
    db.session.commit()


def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
