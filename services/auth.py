import os
import jwt
from datetime import datetime, timedelta, timezone
from functools import wraps
from flask import request, jsonify


def _get_secret() -> str:
	secret = os.environ.get('JWT_SECRET_KEY') or os.environ.get('SECRET_KEY')
	if not secret:
		raise RuntimeError('JWT secret not configured')
	return secret


def generate_token(payload: dict, expires_in_minutes: int = 60) -> str:
	exp = datetime.now(tz=timezone.utc) + timedelta(minutes=expires_in_minutes)
	to_encode = {**payload, 'exp': exp}
	return jwt.encode(to_encode, _get_secret(), algorithm='HS256')


def decode_token(token: str) -> dict:
	return jwt.decode(token, _get_secret(), algorithms=['HS256'])


def token_required(fn):
	@wraps(fn)
	def wrapper(*args, **kwargs):
		auth_header = request.headers.get('Authorization', '')
		if not auth_header.startswith('Bearer '):
			return jsonify({'error': 'Missing or invalid Authorization header'}), 401
		token = auth_header.split(' ', 1)[1]
		try:
			claims = decode_token(token)
			request.user_claims = claims
			return fn(*args, **kwargs)
		except jwt.ExpiredSignatureError:
			return jsonify({'error': 'Token expired'}), 401
		except jwt.InvalidTokenError:
			return jsonify({'error': 'Invalid token'}), 401
	return wrapper
