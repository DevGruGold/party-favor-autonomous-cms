from flask import Flask
from flask_cors import CORS
import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.models.business import db
from src.routes.user import user_bp
from src.routes.customer import customer_bp
from src.routes.business import business_bp

def create_app():
    app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
    
    # Enable CORS for frontend communication
    CORS(app, origins=["http://localhost:5173", "https://*.vercel.app"])
    
    app.config['SECRET_KEY'] = 'party_favor_autonomous_cms_secret_key_2024'

    # Register blueprints
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(customer_bp, url_prefix='/api')
    app.register_blueprint(business_bp, url_prefix='/api')

    # Enable database functionality for autonomous CMS
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///party_favor_autonomous.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    
    with app.app_context():
        db.create_all()

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    @app.route('/health')
    def health_check():
        return {"status": "healthy", "service": "Party Favor Photo Autonomous CMS"}

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

