from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
import mongoengine

# Load environment variables
load_dotenv()

# Initialize extensions
db = mongoengine

def create_app(config_name=None):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
    
    if config_name == 'production':
        app.config.from_object('config.ProductionConfig')
    elif config_name == 'testing':
        app.config.from_object('config.TestingConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')
    
    # Initialize extensions with app
    db.connect(host=app.config['MONGODB_SETTINGS']['host'])
    CORS(app)
    
    # Register blueprints
    from routes.users import users_bp
    from routes.products import products_bp
    from routes.orders import orders_bp
    
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        try:
            # Test MongoDB connection
            from mongoengine import get_connection
            connection = get_connection()
            connection.admin.command('ping')
            return {'status': 'healthy', 'message': 'Flask backend with MongoDB is running', 'database': 'connected'}, 200
        except Exception as e:
            return {'status': 'unhealthy', 'message': 'MongoDB connection failed', 'error': str(e)}, 500
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {'error': 'Internal server error'}, 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='127.0.0.1', port=5000, use_reloader=False)
