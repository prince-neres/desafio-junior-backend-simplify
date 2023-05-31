import json
import datetime
from flask import make_response, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash
from app import Config
from schemas import UserSchema
from models import User
from validations import *
from controllers import api


@api.route("/register", methods=["POST"])
@cross_origin(origins=Config.CLIENT_URL)
def register():
    data = json.loads(request.data)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    user = User.query.filter_by(email=email).first()

    error = user_register_validate(
        username, email, password, confirm_password, user)
    if error:
        return make_response(jsonify(error), 401)

    try:
        new_user = User(username=username, email=email,
                        password=generate_password_hash(password))
        new_user.add_user()

        user_schema = UserSchema()
        user_json = user_schema.dump(new_user)
        expires = datetime.timedelta(days=7)

        user_json.update({"token": create_access_token(
            user_json, expires_delta=expires)})
        response_data = user_json
        return make_response(jsonify(response_data), 201)
    except Exception as e:
        error_data = {
            'message': f'Erro ao tentar criar usuário: {str(e)}',
            'code': 'ERROR'
        }
        return make_response(jsonify(error_data), 500)


@api.route("/login", methods=["POST"])
@cross_origin(origins=Config.CLIENT_URL)
def login():
    try:
        data = json.loads(request.data)
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        error = user_login_validate(email, password, user)
        if error:
            return make_response(jsonify(error), 401)

        user_schema = UserSchema()
        user_json = user_schema.dump(user)
        expires = datetime.timedelta(days=7)

        user_json.update({"token": create_access_token(
            user_json, expires_delta=expires)})
        response_data = user_json
        return make_response(jsonify(response_data), 200)

    except Exception as e:
        error_data = {
            'message': f'Erro ao tentar efetuar login: {str(e)}',
            'code': 'ERROR'
        }
        return make_response(jsonify(error_data), 500)
