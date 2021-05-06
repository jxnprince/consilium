from flask import Blueprint
from app.models import User, db, Project, Track, Version
from flask_login import current_user
# from app.forms import newArtistForm

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Errors to list on forms
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@user_routes.route('/<int:user_id>')
def engineerDash(user_id):
    '''
    Returns artists associated with an engineer
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
        return 'User is unauthorized'


# @user_routes.route('/:id', methods=['POST'])
# '''
# Creates new artist.  More logic needed before this will work
# '''


# def createArtist():
#     pass


# @user_routes.route('/<int:id/projects>')
# '''
# Returns all projects associated with a project.
# '''


# def artistDash(id):
#     pass


# @user_routes.route('/<int:userId/projects/<int:projectId>')
# '''
# Returns all projects associated with a project.
# '''


# def artistDash(userId, projectId):
#     pass


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


# @user_routes.route('/<int:userId/projects/<int:projectId>/versions/<int:versionId>')  # noqa
# '''
# Fetches all versions of a track from aws and returns them in a list of dictionaries.  # noqa
# '''


# def getAllTrackVersions(userId, projectId):
#     pass


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
