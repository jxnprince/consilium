from flask import Blueprint
from app.models import db, User, Project, Track, Version
from flask_login import current_user
# from app.forms import newArtistForm

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
        return {"Error": 'User is unauthorized'}


# @user_routes.route('/:id', methods=['POST'])
# def createArtist():
    # '''
    # Creates new artist.  More logic needed before this will work
    # '''
    # pass


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
    if project.artistId == artistId:
        if project.artistId == user.id or project.engineerId == user.id:  # noqa
            tracks = Track.query.filter(Track.projectId == projectId).all()
            if tracks:
                return {"Tracks": [track.to_dict() for track in tracks]}
        else:
            return {"Error": 'User unauthorized'}
    else:
        return {"Error": 'Could not find project'}

# @user_routes.route('/<int:userId/projects/<int:projectId>/new', methods=['POST'])  # noqa
# '''
# Creates new project associated with an artist
# Updates on AWS []
# Updates on database []
# '''


# def createNewProject(userId, projectId):
#     pass


# @user_routes.route('/<int:userId/projects/<int:projectId>/delete', methods=['DELETE'])  # noqa
# '''
# Deletes specified project with all associated versions, and comments.
# Updates on database []
# Updates on AWS []
# '''


# def uploadTrackVersion(userId, projectId):
#     pass


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


# @user_routes.route('/<int:userId/projects/<int:projectId>/versions/<int:versionId>/new', methods=['POST'])  # noqa
# '''
# Posts a new mix version to AWS
# Updates on AWS []
# Updates on database []
# '''


# def uploadTrackVersion(userId, projectId):
#     pass


# @dash_routes.route('/<int:userId/projects/<int:projectId>/versions/<int:versionId>/delete', methods=['DELETE'])  # noqa
# '''
# Deletes a specific mix version
# Updates on database []
# Updates on AWS []
# '''


# def uploadTrackVersion(userId, projectId):
#     pass
