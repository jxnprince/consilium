from flask import Blueprint, session, request
from app.models import db, User, Project, Track, Version, Comment
from flask_login import current_user
from app.forms.new_project_form import ProjectForm
from app.forms.new_track_form import TrackForm
from app.forms.new_versionForm import VersionForm

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Collects errors in a list on forms
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@user_routes.route('/<int:user_id>')
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
        return {"Artists": [artist.to_dict() for artist in artists]}
    else:
        return {"Error": f'{user.firstName} {user.lastName} is unauthorized'}


@user_routes.route('/<int:id>/projects')
def artistDash(id):
    '''
    Returns all projects associated with a project. [X]
    '''
    projects = Project.query.filter(Project.artistId == id).all()
    return {"Projects": [project.to_dict() for project in projects]}


@user_routes.route('/<int:artistId>/projects/<int:projectId>')
def projectDash(artistId, projectId):
    '''
    Returns all tracks associated with a project.
    Will only return route if current user is authorized [X]
    '''
    project = Project.query.get(projectId)
    user = current_user
    if project and project.artistId == artistId:
        if project.artistId == user.id or project.engineerId == user.id:  # noqa
            tracks = Track.query.filter(Track.projectId == projectId).all()
            if tracks:
                return {"Tracks": [track.to_dict() for track in tracks]}
        else:
            return {"Error": f'{user.firstName} {user.lastname} unauthorized'}
    else:
        return {"Error": f'Could not find {project.name}'}


@user_routes.route('/<int:artistID>/projects/create', methods=['POST'])  # noqa
def createNewProject(artistID):
    '''
    Creates new project associated with an artist [X]
    Updates on AWS []
    Updates on database []
    '''
    user = current_user
    if not user.superUser:
        return {"Error": "User Not Authorized to create a project"}
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
        return {"Error": "Form did not validate"}


@user_routes.route('/<int:artistId>/projects/<int:projectId>/delete', methods=['DELETE'])  # noqa
def deleteProject(artistId, projectId):
    '''
    Deletes specified project with all associated versions, and comments [X]
    Updates on database []
    Updates on AWS []
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
                return {"Error": f'{user.firstName} {user.lastName} unauthorized to delete {project.name}'}  # noqa
        else:
            return {"Error": f"{project.name} doesn't not belong to {artist.firstName} {artist.lastName}"}  # noqa
    else:
        return {"Error": 'Project does not exist!'}


@user_routes.route('/<int:artistId>/projects/<int:projectId>/tracks/<int:trackId>')  # noqa
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
                return {"Versions": [version.to_dict() for version in versions]}  # noqa
            else:
                return {"Error": 'User unauthorized'}
        else:
            return {"Errors": f'{project.name} does not belong to artist: {artist.firstName} {artist.lastName}'}  # noqa
    else:
        return {"Errors": f'{track.name} does not belong to {project.name}'}


@user_routes.route('/<int:artistId>/projects/<int:projectId>/tracks/<int:trackId>/versions/new', methods=['POST'])  # noqa
def uploadTrackVersion(artistId, projectId, trackId):
    '''
    Posts a new mix version to AWS
    Updates on AWS []
    Updates on database []
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
                        form = VersionForm()
                        form['csrf_token'].data = request.cookies['csrf_token']
                        if form.validate_on_submit():
                            data = Version(
                                url=form.data['url'],
                                length=form.data['length'],
                                trackId=track.id
                            )
                            db.session.add(data)
                            db.session.commit()
                            return data.to_dict()
                        else:
                            return {"Error": "Form did not validate"}
                    else:
                        return {"Error": f"{user.firstName} {user.lastName} cannot delete '{project.name}' because they are not on the project"}  # noqa
                else:
                    return {"Error": f"'{project.name}' does not belong to {artist.firstName} {artist.lastName}"}  # noqa
            else:
                return {"Error": f"'{track.name}' does not belong to {project.name}"}  # noqa
        else:
            return {"Errors": f"Track does not exist!"}
    else:
        return {"Errors": f"{user.firstName} {user.lastName} is not authorized to perform this action."}  # noqa


@user_routes.route('/<int:artistId>/projects/<int:projectId>/tracks/<int:trackId>/versions/<int:versionId>/delete', methods=['DELETE'])  # noqa
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
                            return {"Error": f"{artist.firstName} {artist.lastName} does not own {project.name}"}  # noqa
                    else:
                        return {"Error": f"{track.name} does not belong to {project.name}"}  # noqa
                else:
                    return {"Error": f"This is not a version of {track.name}"}
            else:
                return {"Error": f"{user.firstName} {user.lastName} cannot delete '{project.name}' because they are not on the project"}  # noqa
        else:
            return {"Error": f"{user.firstName} {user.lastName} is not authorized to perform this action"}  # noqa
    else:
        return {"Error": "Version does not exist"}
