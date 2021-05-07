from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .tracks import seed_tracks, undo_tracks
from .versions import seed_versions, undo_versions
# from .comments import seed_comments, undo_comments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_projects()
    seed_tracks()
    seed_versions()
    # seed_comments()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_comments()
    undo_versions()
    undo_tracks()
    undo_projects()
    undo_users()
    # Add other undo functions here
