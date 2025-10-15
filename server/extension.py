# extensions.py
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

# Create the extension instances in a central location
mongo = PyMongo()
bcrypt = Bcrypt()