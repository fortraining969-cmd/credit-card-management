# models/user.py
from extension import mongo, bcrypt
from bson.objectid import ObjectId
from datetime import datetime, timezone


class User:
    """
    User Model for interacting with the users collection in MongoDB.
    """

    def __init__(self, username, password, role, **kwargs):
        self.username = username.lower()
        self.password = password  # This will be the hashed password
        self.role = role
        self.created_at = datetime.now(tz=timezone.utc)

        for key, value in kwargs.items():
            setattr(self, key, value)

    def save(self):
        """Saves the user object to the database."""
        user_data = self.__dict__
        return mongo.db.users.insert_one(user_data)

    def check_password(self, password_to_check):
        """Checks if the provided password matches the hashed password."""
        return bcrypt.check_password_hash(self.password, password_to_check)

    @staticmethod
    def hash_password(password):
        """Hashes a password."""
        return bcrypt.generate_password_hash(password).decode('utf-8')

    @classmethod
    def find_by_username(cls, username):
        """Finds a user by their username."""
        user_data = mongo.db.users.find_one({"username": username.lower()})
        if user_data:
            user_data.pop('_id')
            return cls(**user_data)
        return None

    @classmethod
    def find_by_id(cls, user_id):
        """Finds a user by their MongoDB ObjectId."""
        user_data = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        return user_data if user_data else None
