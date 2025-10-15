from flask import Blueprint, request, jsonify
from models.user import User
from models.order import Order
from werkzeug.security import generate_password_hash
from bson import ObjectId

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=['GET'])
def get_users():
    """Get all users with pagination"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    search = request.args.get('search', '', type=str)
    
    # Build query
    query = {}
    if search:
        query = {
            '$or': [
                {'username': {'$regex': search, '$options': 'i'}},
                {'email': {'$regex': search, '$options': 'i'}},
                {'first_name': {'$regex': search, '$options': 'i'}},
                {'last_name': {'$regex': search, '$options': 'i'}}
            ]
        }
    
    # Calculate pagination
    skip = (page - 1) * per_page
    
    # Get users with pagination
    users = User.objects(__raw__=query).skip(skip).limit(per_page)
    total = User.objects(__raw__=query).count()
    
    return jsonify({
        'users': [user.to_dict() for user in users],
        'total': total,
        'pages': (total + per_page - 1) // per_page,
        'current_page': page,
        'per_page': per_page
    }), 200

@users_bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    """Get a specific user by ID"""
    try:
        user = User.objects.get(id=ObjectId(user_id))
        return jsonify(user.to_dict()), 200
    except User.DoesNotExist:
        return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/', methods=['POST'])
def create_user():
    """Create a new user"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['username', 'email', 'password', 'first_name', 'last_name']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'{field} is required'}), 400
    
    # Check if user already exists
    if User.objects(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    if User.objects(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    try:
        user = User.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name']
        )
        
        user.save()
        return jsonify(user.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<user_id>', methods=['PUT'])
def update_user(user_id):
    """Update a user"""
    try:
        user = User.objects.get(id=ObjectId(user_id))
        data = request.get_json()
        
        # Update fields if provided
        if 'username' in data:
            # Check if username is already taken by another user
            existing_user = User.objects(username=data['username']).first()
            if existing_user and str(existing_user.id) != user_id:
                return jsonify({'error': 'Username already exists'}), 400
            user.username = data['username']
        
        if 'email' in data:
            # Check if email is already taken by another user
            existing_user = User.objects(email=data['email']).first()
            if existing_user and str(existing_user.id) != user_id:
                return jsonify({'error': 'Email already exists'}), 400
            user.email = data['email']
        
        if 'first_name' in data:
            user.first_name = data['first_name']
        
        if 'last_name' in data:
            user.last_name = data['last_name']
        
        if 'password' in data:
            user.set_password(data['password'])
        
        if 'is_active' in data:
            user.is_active = data['is_active']
        
        if 'is_admin' in data:
            user.is_admin = data['is_admin']
        
        user.save()
        return jsonify(user.to_dict()), 200
    except User.DoesNotExist:
        return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Delete a user"""
    try:
        user = User.objects.get(id=ObjectId(user_id))
        user.delete()
        return jsonify({'message': 'User deleted successfully'}), 200
    except User.DoesNotExist:
        return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<user_id>/orders', methods=['GET'])
def get_user_orders(user_id):
    """Get all orders for a specific user"""
    try:
        user = User.objects.get(id=ObjectId(user_id))
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Calculate pagination
        skip = (page - 1) * per_page
        
        # Get user's orders
        orders = Order.objects(user_id=user).skip(skip).limit(per_page)
        total = Order.objects(user_id=user).count()
        
        return jsonify({
            'orders': [order.to_dict() for order in orders],
            'total': total,
            'pages': (total + per_page - 1) // per_page,
            'current_page': page,
            'per_page': per_page
        }), 200
    except User.DoesNotExist:
        return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
