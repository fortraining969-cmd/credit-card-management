import mongoengine
from app import db

# Import all models here to ensure they are registered with MongoEngine
from .user import User
from .product import Product
from .order import Order, OrderItem

# Export all models
__all__ = ['User', 'Product', 'Order', 'OrderItem', 'db']
