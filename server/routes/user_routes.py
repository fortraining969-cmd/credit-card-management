# routes/user_routes.py
from flask import request, jsonify, Blueprint, make_response, current_app
from models.user import User
from decorators import token_required
import jwt
from datetime import datetime, timezone

# Create a Blueprint
users_bp = Blueprint('users', __name__)


# --- Business Logic (formerly in services.py) ---

def register_user_logic(data):
    role = data.get('role')
    username = data.get('username')
    password = data.get('password')

    if not all([role, username, password]):
        return {'message': 'Role, username, and password are required'}, 400

    if User.find_by_username(username):
        return {'message': 'Username already exists. Please choose another.'}, 409

    hashed_password = User.hash_password(password)
    user_details = {"username": username, "password": hashed_password, "role": role}

    if role == 'user':
        required = ['firstName', 'lastName', 'age', 'gender', 'email', 'nationality', 'address', 'phoneNumber', 'pan',
                    'aadhaar', 'salarySlips', 'employmentDetails', 'annualIncome', 'bankAccountDetails',
                    'existingLoanAmount']
        user_details.update({k: data.get(k) for k in required})
    elif role == 'manager':
        required = ['email', 'bank']
        user_details.update({k: data.get(k) for k in required})
    else:
        return {'message': "Invalid role specified."}, 400

    new_user = User(**user_details)
    new_user.save()
    return {'message': f'{role.capitalize()} was registered successfully!'}, 201


# --- API Routes ---

@users_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    response, status_code = register_user_logic(data)
    return jsonify(response), status_code


@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.find_by_username(data.get('username'))

    if not user or not user.check_password(data.get('password')):
        return jsonify({'message': 'Invalid Credentials'}), 401

    user_from_db = User.find_by_id(User.find_by_username(data.get('username')).__dict__['_id'])

    token = jwt.encode({
        'user_id': str(user_from_db['_id']),
        'username': user.username,
        'role': user.role,
        'exp': datetime.now(tz=timezone.utc) + current_app.config['JWT_ACCESS_TOKEN_EXPIRES']
    }, current_app.config['SECRET_KEY'], algorithm="HS256")

    response = make_response(jsonify({'message': 'Logged in successfully!', 'token': token}))
    response.set_cookie('token', value=token, httponly=True)
    return response


@users_bp.route('/welcome')
@token_required
def welcome(current_user):
    return jsonify({
        'message': f"Welcome {current_user['username']}!",
        'role': current_user['role'],
        'user_id': str(current_user['_id'])
    })
