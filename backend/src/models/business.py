from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Customer(db.Model):
    """Customer information and contact details"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    company = db.Column(db.String(100), nullable=True)
    preferred_contact = db.Column(db.String(20), default='email')  # email, phone, sms
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    bookings = db.relationship('Booking', backref='customer', lazy=True)
    communications = db.relationship('Communication', backref='customer', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'company': self.company,
            'preferred_contact': self.preferred_contact,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Booking(db.Model):
    """Event booking details and status tracking"""
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    event_type = db.Column(db.String(50), nullable=False)  # wedding, corporate, birthday, etc.
    event_date = db.Column(db.Date, nullable=False)
    event_time = db.Column(db.Time, nullable=True)
    duration_hours = db.Column(db.Integer, nullable=False)
    venue = db.Column(db.String(200), nullable=True)
    guest_count = db.Column(db.Integer, nullable=True)
    backdrop_color = db.Column(db.String(50), nullable=True)
    photo_layout = db.Column(db.String(20), default='horizontal')
    special_requests = db.Column(db.Text, nullable=True)
    base_price = db.Column(db.Float, nullable=False)
    final_price = db.Column(db.Float, nullable=True)
    status = db.Column(db.String(20), default='inquiry')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    confirmed_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'event_type': self.event_type,
            'event_date': self.event_date.isoformat() if self.event_date else None,
            'event_time': self.event_time.isoformat() if self.event_time else None,
            'duration_hours': self.duration_hours,
            'venue': self.venue,
            'guest_count': self.guest_count,
            'backdrop_color': self.backdrop_color,
            'photo_layout': self.photo_layout,
            'special_requests': self.special_requests,
            'base_price': float(self.base_price) if self.base_price else None,
            'final_price': float(self.final_price) if self.final_price else None,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'confirmed_at': self.confirmed_at.isoformat() if self.confirmed_at else None
        }

class Communication(db.Model):
    """Communication log for tracking all customer interactions"""
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    booking_id = db.Column(db.Integer, db.ForeignKey('booking.id'), nullable=True)
    message_type = db.Column(db.String(20), nullable=False)
    content = db.Column(db.Text, nullable=True)
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'booking_id': self.booking_id,
            'message_type': self.message_type,
            'content': self.content,
            'sent_at': self.sent_at.isoformat() if self.sent_at else None
        }

class AIExecutiveDecision(db.Model):
    """Track AI executive decisions for transparency"""
    id = db.Column(db.Integer, primary_key=True)
    executive_role = db.Column(db.String(20), nullable=False)
    decision_type = db.Column(db.String(50), nullable=False)
    context = db.Column(db.Text, nullable=True)
    decision = db.Column(db.Text, nullable=True)
    impact_level = db.Column(db.String(20), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'executive_role': self.executive_role,
            'decision_type': self.decision_type,
            'context': json.loads(self.context) if self.context else None,
            'decision': json.loads(self.decision) if self.decision else None,
            'impact_level': self.impact_level,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class BusinessMetrics(db.Model):
    """Store business performance metrics"""
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    total_revenue = db.Column(db.Float, nullable=False)
    profit_distributed = db.Column(db.Float, nullable=False)
    staff_count = db.Column(db.Integer, nullable=False)
    average_performance = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat() if self.date else None,
            'total_revenue': float(self.total_revenue),
            'profit_distributed': float(self.profit_distributed),
            'staff_count': self.staff_count,
            'average_performance': float(self.average_performance),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class StaffMember(db.Model):
    """Staff member information and compensation tracking"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default='active')
    base_salary = db.Column(db.Float, nullable=False)
    profit_share = db.Column(db.Float, default=0.0)
    performance_score = db.Column(db.Float, default=85.0)
    events_completed = db.Column(db.Integer, default=0)
    hire_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'status': self.status,
            'base_salary': float(self.base_salary),
            'profit_share': float(self.profit_share),
            'performance_score': float(self.performance_score),
            'events_completed': self.events_completed,
            'hire_date': self.hire_date.isoformat() if self.hire_date else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Equipment(db.Model):
    """Equipment inventory and maintenance tracking"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default='active')
    purchase_date = db.Column(db.Date, nullable=True)
    last_maintenance = db.Column(db.Date, nullable=True)
    next_maintenance = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'status': self.status,
            'purchase_date': self.purchase_date.isoformat() if self.purchase_date else None,
            'last_maintenance': self.last_maintenance.isoformat() if self.last_maintenance else None,
            'next_maintenance': self.next_maintenance.isoformat() if self.next_maintenance else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

