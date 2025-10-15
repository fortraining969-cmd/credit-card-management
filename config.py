import os
from datetime import timedelta

class Config:
    """Base configuration class"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-string'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
    # MongoDB Configuration
    MONGODB_SETTINGS = {
        'host': os.environ.get('MONGODB_URI') or 'mongodb+srv://ktbis_user:user%40123@cluster0.9xe82yv.mongodb.net/ccms_db',
        'db': 'ccms_db',
        'connect': False
    }

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    MONGODB_SETTINGS = {
        'host': os.environ.get('MONGODB_URI') or 'mongodb://localhost:27017/ccms_db_dev',
        'db': 'ccms_db_dev',
        'connect': False
    }

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    MONGODB_SETTINGS = {
        'host': os.environ.get('MONGODB_URI') or 'mongodb://localhost:27017/ccms_db_test',
        'db': 'ccms_db_test',
        'connect': False
    }

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    MONGODB_SETTINGS = {
        'host': os.environ.get('MONGODB_URI') or 'mongodb+srv://ktbis_user:user%40123@cluster0.9xe82yv.mongodb.net/ccms_db',
        'db': 'ccms_db',
        'connect': False,
        'serverSelectionTimeoutMS': 5000,
        'connectTimeoutMS': 20000,
        'socketTimeoutMS': 20000,
        'maxPoolSize': 10,
        'retryWrites': True
    }

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
