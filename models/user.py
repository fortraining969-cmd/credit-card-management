from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from mongoengine import Document, StringField, BooleanField, DateTimeField, ReferenceField, ListField

class User(Document):
    """User model for authentication and user management"""
    
    username = StringField(required=True, unique=True, max_length=80)
    email = StringField(required=True, unique=True, max_length=120)
    password_hash = StringField(required=True, max_length=255)
    first_name = StringField(required=True, max_length=50)
    last_name = StringField(required=True, max_length=50)
    is_active = BooleanField(default=True)
    is_admin = BooleanField(default=False)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    # Relationships
    orders = ListField(ReferenceField('Order'))
    
    meta = {
        'collection': 'users',
        'indexes': [
            'username',
            'email',
            'created_at'
        ]
    }
    
    @classmethod
    def create_user(cls, username, email, password, first_name, last_name):
        """Create a new user with password hashing"""
        user = cls()
        user.username = username
        user.email = email
        user.set_password(password)
        user.first_name = first_name
        user.last_name = last_name
        return user
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check if provided password matches hash"""
        return check_password_hash(self.password_hash, password)
    
    def save(self, *args, **kwargs):
        """Override save to update updated_at timestamp"""
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)
    
    def to_dict(self):
        """Convert user to dictionary for JSON serialization"""
        return {
            'id': str(self.id),
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'is_active': self.is_active,
            'is_admin': self.is_admin,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<User {self.username}>'
