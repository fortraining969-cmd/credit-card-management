# app.py
from flask import Flask
from config import Config
from extension import mongo, bcrypt  # <-- CHANGE THIS LINE

def create_app():
    """Construct the core application."""
    app = Flask(__name__)
    app.config.from_object(Config)

    mongo.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        from routes.user_routes import users_bp
        app.register_blueprint(users_bp, url_prefix='/api')

    return app

# Create the app instance
app = create_app()

if __name__ == '__main__':
    app.run()