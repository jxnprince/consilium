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
            Track(name='Stranger (On The Docks)', projectId=2),
            Track(name='Bloodsport', projectId=2),
            Track(name='Rules of Verse', projectId=2),
            Track(name='Sketches, i-ii', projectId=3),
            Track(name='Sketches, iii-v', projectId=3),
            Track(name='Sketches, vi-vii', projectId=3),
            Track(name='Sketches, viii', projectId=3),
            Track(name='Sketches, ix', projectId=3),
            Track(name='Sketches, X', projectId=3),
            Track(name='Sketches, Xi-Xii', projectId=3),
            Track(name='Fly From the Nest', projectId=4),
            Track(name='Wanderlust', projectId=4),
            Track(name='Signed and Sealed', projectId=4),
            Track(name='Loss for Words', projectId=4),
            Track(name='If I cared Less', projectId=4),
            Track(name='In The Dark', projectId=4),
            Track(name='Necrosis', projectId=4),
            Track(name='Accidental Assonance', projectId=4),
            Track(name='By Chance', projectId=4),
            Track(name='Tone is Set', projectId=4),
            Track(name='The Night Resumes', projectId=5),
            Track(name='A la Glory', projectId=6)
            ]

    for track in data:
        db.session.add(track)
    db.session.commit()


def undo_tracks():
    db.session.execute('TRUNCATE tracks RESTART IDENTITY CASCADE;')
    db.session.commit()
