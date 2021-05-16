from app.models import db, Version


def seed_versions():
    data = [
            Version(url='http://consilium.s3.amazonaws.com/20fa0246107345308eff7951fcf479a5.wav', length=3, trackId=1),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/20fa0246107345308eff7951fcf479a5.wav', length=3, trackId=1),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/0f2fdad92898484e8dc88370dc335f69.wav', length=3, trackId=2),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/b802fb363fcc41598f03ecae1837e53f.wav', length=3, trackId=3),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/b802fb363fcc41598f03ecae1837e53f.wav', length=3, trackId=3),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/b802fb363fcc41598f03ecae1837e53f.wav', length=3, trackId=3),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/6284da3d7e2d4010b48cdaf2434c7a3a.wav', length=3, trackId=4),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/af72f90daf104a748059021c446887fe.wav', length=3, trackId=5),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/5296bdba2a6b4d97a0b8deefdce746dd.wav', length=3, trackId=6),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/5296bdba2a6b4d97a0b8deefdce746dd.wav', length=3, trackId=6),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/5296bdba2a6b4d97a0b8deefdce746dd.wav', length=3, trackId=6),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/4d6eb67af88d4a8c8fc3f10061794348.wav', length=3, trackId=7),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/e84798374e184f96a400218b03a763a2.wav', length=3, trackId=8),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/d764cd929aa44e2dbd6a8cf707c145ec.wav', length=3, trackId=9),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/d764cd929aa44e2dbd6a8cf707c145ec.wav', length=3, trackId=9),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/d764cd929aa44e2dbd6a8cf707c145ec.wav', length=3, trackId=9),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/9016d567a4504855800bd661bfcde303.mp3', length=3, trackId=10),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/2a28e5ee56cb497c95334df4add5deee.wav', length=3, trackId=11),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/2a28e5ee56cb497c95334df4add5deee.wav', length=3, trackId=11),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/2a28e5ee56cb497c95334df4add5deee.wav', length=3, trackId=11),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/2a28e5ee56cb497c95334df4add5deee.wav', length=3, trackId=11),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/239b184f0d514678bf315e17012cbbc1.wav', length=3, trackId=12),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/4b2aa022a4c5458e83392347a435a7b1.wav', length=3, trackId=13),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/2dd44c649d0f494e9a3291de339fc692.wav', length=3, trackId=14),  # noqa
            Version(url='http://consilium.s3.amazonaws.com/fde1c932ba504abfaa003f1b14dd9c6a.wav', length=3, trackId=15),  # noqa
            ]

    for versions in data:
        db.session.add(versions)

    db.session.commit()


def undo_versions():
    db.session.execute('TRUNCATE versions RESTART IDENTITY CASCADE;')
    db.session.commit()
