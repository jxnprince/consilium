from app.models import db, Track


def seed_tracks():

    data = [
            Track(name='The Night Resumes', projectId=1),
            Track(name='Noblesville, 1905', projectId=1),
            Track(name='Blackwater', projectId=1),
            Track(name='Untitled (The Dead Sea Scrolls)', projectId=1),
            Track(name='Constellations', projectId=1),
            Track(name='An Conair', projectId=1),
            Track(name='Anyone Seen The Light?', projectId=1),
            Track(name='Stranger(On The Docks)', projectId=1),
            Track(name='The Backward Look', projectId=1),
            Track(name='Goin up to Country', projectId=2),
            Track(name='Snow Day', projectId=3),
            Track(name='Language', projectId=3),
            Track(name='Color', projectId=3),
            Track(name='Skin & Bones', projectId=3),
            Track(name='KGNU', projectId=3),
            ]

    for track in data:
        db.session.add(track)
    db.session.commit()


def undo_tracks():
    db.session.execute('TRUNCATE tracks RESTART IDENTITY CASCADE;')
    db.session.commit()
