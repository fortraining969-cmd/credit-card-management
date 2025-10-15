# decorators.py
from functools import wraps
from flask import request, jsonify, current_app
import jwt
from models.user import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')

        if not token:
            return jsonify({'message': 'A token is required for authentication.'}), 403

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.find_by_id(data['user_id'])
            if not current_user:
                return jsonify({'message': 'Token is invalid or user does not exist.'}), 401
        except Exception:
            return jsonify({'message': 'Token is invalid.'}), 401

        return f(current_user, *args, **kwargs)
    return decorated
