from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Customer(db.Model):
    """Customer model for storing client information"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    company = db.Column(db.String(100), nullable=True)
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
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Booking(db.Model):
    """Booking model for event bookings"""
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    event_type = db.Column(db.String(50), nullable=False)  # wedding, corporate, birthday, etc.
    event_date = db.Column(db.DateTime, nullable=False)
    event_time = db.Column(db.Time, nullable=True)
    duration_hours = db.Column(db.Integer, nullable=False, default=3)
    venue_name = db.Column(db.String(200), nullable=True)
    venue_address = db.Column(db.Text, nullable=True)
    guest_count = db.Column(db.Integer, nullable=True)
    package_type = db.Column(db.String(50), nullable=False)  # 2hr, 3hr, 4hr, 5hr
    base_price = db.Column(db.Decimal(10, 2), nullable=False)
    final_price = db.Column(db.Decimal(10, 2), nullable=True)
    status = db.Column(db.String(20), default='inquiry')  # inquiry, quoted, booked, completed, cancelled
    special_requests = db.Column(db.Text, nullable=True)
    backdrop_color = db.Column(db.String(50), nullable=True)
    layout_type = db.Column(db.String(20), default='horizontal')  # horizontal, vertical
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # AI decision tracking
    ai_pricing_decision = db.Column(db.Text, nullable=True)  # JSON of AI pricing logic
    ai_scheduling_decision = db.Column(db.Text, nullable=True)  # JSON of AI scheduling logic

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'event_type': self.event_type,
            'event_date': self.event_date.isoformat() if self.event_date else None,
            'event_time': self.event_time.isoformat() if self.event_time else None,
            'duration_hours': self.duration_hours,
            'venue_name': self.venue_name,
            'venue_address': self.venue_address,
            'guest_count': self.guest_count,
            'package_type': self.package_type,
            'base_price': float(self.base_price) if self.base_price else None,
            'final_price': float(self.final_price) if self.final_price else None,
            'status': self.status,
            'special_requests': self.special_requests,
            'backdrop_color': self.backdrop_color,
            'layout_type': self.layout_type,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Communication(db.Model):
    """Communication log for tracking all customer interactions"""
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    booking_id = db.Column(db.Integer, db.ForeignKey('booking.id'), nullable=True)
    communication_type = db.Column(db.String(20), nullable=False)  # email, phone, sms, chat
    direction = db.Column(db.String(10), nullable=False)  # inbound, outbound
    subject = db.Column(db.String(200), nullable=True)
    content = db.Column(db.Text, nullable=True)
    ai_generated = db.Column(db.Boolean, default=False)
    ai_executive = db.Column(db.String(20), nullable=True)  # CEO, CMO, COO, CFO, CTO
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'booking_id': self.booking_id,
            'communication_type': self.communication_type,
            'direction': self.direction,
            'subject': self.subject,
            'content': self.content,
            'ai_generated': self.ai_generated,
            'ai_executive': self.ai_executive,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class AIExecutiveDecision(db.Model):
    """Track AI executive decisions for transparency and optimization"""
    id = db.Column(db.Integer, primary_key=True)
    executive_type = db.Column(db.String(20), nullable=False)  # CEO, CMO, COO, CFO, CTO
    decision_type = db.Column(db.String(50), nullable=False)
    context_data = db.Column(db.Text, nullable=True)  # JSON of input data
    decision_output = db.Column(db.Text, nullable=True)  # JSON of decision result
    confidence_score = db.Column(db.Float, nullable=True)
    execution_status = db.Column(db.String(20), default='pending')  # pending, executed, failed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    executed_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'executive_type': self.executive_type,
            'decision_type': self.decision_type,
            'context_data': json.loads(self.context_data) if self.context_data else None,
            'decision_output': json.loads(self.decision_output) if self.decision_output else None,
            'confidence_score': self.confidence_score,
            'execution_status': self.execution_status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'executed_at': self.executed_at.isoformat() if self.executed_at else None
        }

class BusinessMetrics(db.Model):
    """Store business performance metrics for AI decision-making"""
    id = db.Column(db.Integer, primary_key=True)
    metric_type = db.Column(db.String(50), nullable=False)  # revenue, bookings, satisfaction, etc.
    metric_value = db.Column(db.Float, nullable=False)
    period_start = db.Column(db.DateTime, nullable=False)
    period_end = db.Column(db.DateTime, nullable=False)
    metadata = db.Column(db.Text, nullable=True)  # JSON for additional context
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'metric_type': self.metric_type,
            'metric_value': self.metric_value,
            'period_start': self.period_start.isoformat() if self.period_start else None,
            'period_end': self.period_end.isoformat() if self.period_end else None,
            'metadata': json.loads(self.metadata) if self.metadata else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class StaffMember(db.Model):
    """Staff member model for wage earner management"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    role = db.Column(db.String(50), nullable=False)  # photographer, attendant, coordinator
    hourly_rate = db.Column(db.Decimal(10, 2), nullable=False)
    skills = db.Column(db.Text, nullable=True)  # JSON array of skills
    availability = db.Column(db.Text, nullable=True)  # JSON of availability schedule
    performance_score = db.Column(db.Float, default=5.0)
    total_earnings = db.Column(db.Decimal(10, 2), default=0.00)
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'hourly_rate': float(self.hourly_rate) if self.hourly_rate else None,
            'skills': json.loads(self.skills) if self.skills else [],
            'availability': json.loads(self.availability) if self.availability else {},
            'performance_score': self.performance_score,
            'total_earnings': float(self.total_earnings) if self.total_earnings else 0.0,
            'active': self.active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Equipment(db.Model):
    """Equipment tracking for operational management"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    equipment_type = db.Column(db.String(50), nullable=False)  # camera, lighting, backdrop, etc.
    status = db.Column(db.String(20), default='available')  # available, in_use, maintenance, retired
    last_maintenance = db.Column(db.DateTime, nullable=True)
    next_maintenance = db.Column(db.DateTime, nullable=True)
    purchase_date = db.Column(db.DateTime, nullable=True)
    purchase_price = db.Column(db.Decimal(10, 2), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'equipment_type': self.equipment_type,
            'status': self.status,
            'last_maintenance': self.last_maintenance.isoformat() if self.last_maintenance else None,
            'next_maintenance': self.next_maintenance.isoformat() if self.next_maintenance else None,
            'purchase_date': self.purchase_date.isoformat() if self.purchase_date else None,
            'purchase_price': float(self.purchase_price) if self.purchase_price else None,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

