from flask import Blueprint

api = Blueprint('api', __name__)
from . import user_controller, task_controller  # nopep8
