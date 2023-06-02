from os import getenv
from dotenv import load_dotenv

load_dotenv()


class Config:
    ENVIRONMENT = getenv('ENVIRONMENT') or 'dev'
    SECRET_KEY = getenv('SECRET_KEY') or 'secret'
    SQLALCHEMY_DATABASE_URI = getenv(
        'SQLALCHEMY_DATABASE_URI') if ENVIRONMENT == 'prod' else 'postgresql://teste:teste@db:5432/todolist'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = getenv('JWT_SECRET_KEY') or 'jwt_secret'
    CLIENT_URL = getenv(
        'CLIENT_URL') if ENVIRONMENT == 'prod' else 'http://localhost:3000'
