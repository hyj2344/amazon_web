from flask.cli import AppGroup

from .departments import seed_departments, undo_departments
from .medias import seed_medias, undo_medias
from .products import seed_products, undo_products
from .sellers import seed_sellers, undo_sellers
from .users import seed_users, undo_users


from app.models.db import db, environment

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_departments()
        undo_medias()
        undo_products()
        undo_sellers()
        undo_users()

    seed_users()
    seed_departments()
    seed_sellers()
    seed_products()
    seed_medias()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_departments()
    undo_medias()
    undo_products()
    undo_sellers()
    undo_users()
