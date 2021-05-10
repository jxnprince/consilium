from flask import Blueprint, session, request
from app.models import db, User, Project, Track, Version, Comment
from flask_login import current_user, login_required
from app.forms.new_project_form import ProjectForm
from app.forms.new_track_form import TrackForm
from app.forms.new_versionForm import VersionForm
from app.s3_helpers import upload_file_to_s3, allowed_file, get_unique_filename

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Collects errors in a list on forms [X]
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@user_routes.route('/<int:user_id>')
# @login_required
def engineerDash(user_id):
    '''
    Returns artists associated with an engineer [X]
    '''
    user = User.query.get(user_id)
    if user.superUser:
        projects = Project.query.filter(Project.engineerId == user.id).all()
        allArtists = [project.artist for project in projects]  # noqa
        artists = set()
        for artist in allArtists:
            artists.add(artist)
        artistReturn = [artist.to_dict() for artist in artists]
        projectCount = []
        for artist in artistReturn:
            projectCount.append(Project.query.filter(Project.artistId == artist['id']).all())  # noqa
        finalProjectReturn = []
        for artistProjectList in projectCount:
            for project in artistProjectList:
                finalProjectReturn.append(project.to_dict())
        return {
            "Artists": artistReturn,
            "Projects": finalProjectReturn
        }
    else:
        return {"Errors": f'{user.firstName} {user.lastName} is unauthorized.'}


@user_routes.route('/<int:id>/projects')
@login_required
def artistDash(id):
    '''
    Returns all projects associated with an artist. [X]
    '''
    artist = User.query.get(id)
    projects = Project.query.filter(Project.artistId == id).all()
    tracks = []
    for project in projects:
        list = Track.query.filter(Track.projectId == project.id).all()
        projectTracks = [track.to_dict() for track in list]
        tracks.append(projectTracks)
    print(tracks)

    return {
        "Projects": [project.to_dict() for project in projects],
        "Tracks": tracks,
        "Artist": artist.to_dict()
    }


@user_routes.route('/<int:artistId>/projects/<int:projectId>')
@login_required
def projectDash(artistId, projectId):
    '''
    Returns all tracks associated with a project. [X]
    '''
    project = Project.query.get(projectId)
    user = current_user
    if project and project.artistId == artistId:
        if project.artistId == user.id or project.engineerId == user.id:  # noqa
            tracks = Track.query.filter(Track.projectId == projectId).all()
            artist = User.query.get(project.artistId)
            allTracks = [track.to_dict() for track in tracks]
            allVersions = {}
            for track in allTracks:
                # print(track['id'])
                allVersions[track['id']] = len(Version.query.filter(Version.trackId == track['id']).all())  # noqa
            print(allVersions)
            if tracks:
                return {
                    "Artist": artist.to_dict(),
                    "Project": project.to_dict(),
                    "Tracks": allTracks,
                    "Versions": allVersions
                }
        else:
            return {"Errors": f'{user.firstName} {user.lastname} unauthorized'}
    else:
        return {"Errors": f'Could not find {project.name}'}


@user_routes.route('/<int:artistId>/projects/<int:projectId>/tracks/<int:trackId>')  # noqa
@login_required
def getAllTrackVersions(artistId, projectId, trackId):
    '''
    Fetches all versions of a track [X]
    '''
    user = current_user
    project = Project.query.get(projectId)
    track = Track.query.get(trackId)
    artist = User.query.get(artistId)
    if track.projectId == project.id:
        if project.artistId == artist.id:
            if project.artistId == user.id or project.engineerId == user.id:
                versions = Version.query.filter(Version.trackId == trackId).all()  # noqa
                return {
                "Track": track.to_dict(),
                "Versions": [version.to_dict() for version in versions]
                }  # noqa
            else:
                return {"Errors": 'User unauthorized'}
        else:
            return {"Errors": f'{project.name} does not belong to artist: {artist.firstName} {artist.lastName}'}  # noqa
    else:
        return {"Errors": f'{track.name} does not belong to {project.name}'}


@user_routes.route('/<int:artistID>/projects/create', methods=['POST'])  # noqa
@login_required
def createNewProject(artistID):
    '''
    Creates new project associated with an artist [X]
    '''
    user = current_user
    if not user.superUser:
        return {"Errors": "User Not Authorized to create a project"}
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = Project(
            name=form.data['name'],
            engineerId=user.id,
            artistId=artistID
        )
        db.session.add(data)
        db.session.commit()
        return data.to_dict()
    else:
        return {"Errors": "Form did not validate"}


@user_routes.route('/<int:artistId>/projects/<int:projectId>/tracks/<int:trackId>/versions/new', methods=['POST'])  # noqa
@login_required
def uploadTrackVersion(artistId, projectId, trackId):
    '''
    Posts a new mix version to AWS []
    Updates on database []
    Updates on AWS [X]
    '''
    user = current_user
    artist = User.query.get(artistId)
    project = Project.query.get(projectId)
    track = Track.query.get(trackId)
    if user.superUser:
        if track:
            if track.projectId == project.id:
                if project.artistId == artist.id:
                    if project.engineerId == user.id:
                        if "file" not in request.files:
                            return {"errors": "file required"}, 400
                        file = request.files["file"]

                        if not allowed_file(file.filename):
                            return {"errors": "file type not permitted"}, 400

                        file.filename = get_unique_filename(file.filename)
                        upload = upload_file_to_s3(file)
                        if "url" not in upload:
                            return upload, 400
                        url = upload["url"]
                        data = Version(
                            url=upload["url"],
                            length=3,
                            trackId=track.id
                        )
                        db.session.add(data)
                        db.session.commit()
                        return data.to_dict()
                    else:
                        return {"Errors": f"{user.firstName} {user.lastName} cannot delete '{project.name}' because they are not on the project"}  # noqa
                else:
                    return {"Errors": f"'{project.name}' does not belong to {artist.firstName} {artist.lastName}"}  # noqa
            else:
                return {"Errors": f"'{track.name}' does not belong to {project.name}"}  # noqa
        else:
            return {"Errors": f"Track does not exist!"}
    else:
        return {"Errors": f"{user.firstName} {user.lastName} is not authorized to perform this action."}  # noqa


@user_routes.route('/<int:artistId>/projects/<int:projectId>/delete', methods=['DELETE'])  # noqa
@login_required
def deleteProject(artistId, projectId):
    '''
    Deletes specified project with all associated versions, and comments [X]
    '''
    user = current_user
    artist = User.query.get(artistId)
    project = Project.query.get(projectId)
    if project:
        if project.artistId == artist.id:
            if project.engineerId == user.id:  # noqa
                db.session.delete(project)
                db.session.commit()
                return {"Success": f"{project.name} was deleted."}
            else:
                return {"Errors": f'{user.firstName} {user.lastName} unauthorized to delete {project.name}'}  # noqa
        else:
            return {"Errors": f"{project.name} doesn't not belong to {artist.firstName} {artist.lastName}"}  # noqa
    else:
        return {"Errors": 'Project does not exist!'}


@user_routes.route('/<int:artistId>/projects/<int:projectId>/tracks/<int:trackId>/versions/<int:versionId>/delete', methods=['DELETE'])  # noqa
@login_required
def deleteTrackVersion(artistId, projectId, trackId, versionId):
    '''
    Deletes a specific mix version [X]
    Updates on database []
    Updates on AWS []
    '''
    user = current_user
    artist = User.query.get(artistId)
    project = Project.query.get(projectId)
    track = Track.query.get(trackId)
    version = Version.query.get(versionId)
    if version:
        if user.superUser:
            if project.engineerId == user.id:
                if version.trackId == track.id:
                    if track.projectId == project.id:
                        if project.artistId == artist.id:
                            db.session.delete(version)
                            db.session.commit()
                            return {"Success!": f"Mix #{version.id} of '{track.name}' was deleted"}  # noqa
                        else:
                            return {"Errors": f"{artist.firstName} {artist.lastName} does not own {project.name}"}  # noqa
                    else:
                        return {"Errors": f"{track.name} does not belong to {project.name}"}  # noqa
                else:
                    return {"Errors": f"This is not a version of {track.name}"}
            else:
                return {"Errors": f"{user.firstName} {user.lastName} cannot delete '{project.name}' because they are not on the project"}  # noqa
        else:
            return {"Errors": f"{user.firstName} {user.lastName} is not authorized to perform this action"}  # noqa
    else:
        return {"Errors": "Version does not exist"}
