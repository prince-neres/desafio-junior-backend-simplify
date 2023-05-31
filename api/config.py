from os import getenv
from dotenv import load_dotenv

load_dotenv()


class Config:
    ENVIRONMENT = getenv('ENVIRONMENT')
    SECRET_KEY = getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = getenv('JWT_SECRET_KEY')
    CLIENT_URL = getenv(
        'CLIENT_URL') if ENVIRONMENT == 'prod' else 'http://localhost:5173'
