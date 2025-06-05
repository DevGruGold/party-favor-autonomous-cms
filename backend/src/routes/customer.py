from flask import Blueprint, request, jsonify
from src.models.business import db, Customer, Booking, Communication, AIExecutiveDecision
from src.ai_executives_enhanced import create_ai_executive
from datetime import datetime
import json

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/customers', methods=['GET'])
def get_customers():
    """Get all customers"""
    try:
        customers = Customer.query.all()
        return jsonify([customer.to_dict() for customer in customers])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/customers', methods=['POST'])
def create_customer():
    """Create a new customer"""
    try:
        data = request.get_json()
        
        # Check if customer already exists
        existing_customer = Customer.query.filter_by(email=data.get('email')).first()
        if existing_customer:
            return jsonify({"error": "Customer with this email already exists"}), 400
        
        customer = Customer(
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone'),
            company=data.get('company')
        )
        
        db.session.add(customer)
        db.session.commit()
        
        return jsonify(customer.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    """Get a specific customer"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        return jsonify(customer.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/customers/<int:customer_id>/bookings', methods=['GET'])
def get_customer_bookings(customer_id):
    """Get all bookings for a customer"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        bookings = Booking.query.filter_by(customer_id=customer_id).all()
        return jsonify([booking.to_dict() for booking in bookings])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/inquiries', methods=['POST'])
def create_inquiry():
    """Create a new customer inquiry - AI-powered lead qualification"""
    try:
        data = request.get_json()
        
        # Create or get customer
        customer = Customer.query.filter_by(email=data.get('email')).first()
        if not customer:
            customer = Customer(
                name=data.get('name'),
                email=data.get('email'),
                phone=data.get('phone'),
                company=data.get('company')
            )
            db.session.add(customer)
            db.session.flush()  # Get customer ID
        
        # Create booking inquiry
        booking = Booking(
            customer_id=customer.id,
            event_type=data.get('event_type'),
            event_date=datetime.fromisoformat(data.get('event_date')),
            duration_hours=data.get('duration_hours', 3),
            venue_name=data.get('venue_name'),
            venue_address=data.get('venue_address'),
            guest_count=data.get('guest_count'),
            package_type=data.get('package_type', '3hr'),
            special_requests=data.get('special_requests'),
            backdrop_color=data.get('backdrop_color'),
            layout_type=data.get('layout_type', 'horizontal'),
            status='inquiry'
        )
        
        # AI CMO pricing decision
        ai_cmo = create_ai_executive("CMO")
        pricing_context = {
            "event_type": booking.event_type,
            "duration_hours": booking.duration_hours,
            "guest_count": booking.guest_count,
            "event_date": booking.event_date.isoformat(),
            "venue_type": "premium" if "hotel" in (booking.venue_name or "").lower() else "standard"
        }
        
        pricing_decision = ai_cmo.pricing_optimization(pricing_context, {})
        base_price = pricing_decision.get("base_pricing", {}).get(f"{booking.duration_hours}_hour", 747)
        
        # Apply seasonal adjustments if any
        seasonal_adjustments = pricing_decision.get("seasonal_adjustments", {})
        final_price = base_price
        
        booking.base_price = base_price
        booking.final_price = final_price
        booking.ai_pricing_decision = json.dumps(pricing_decision)
        
        db.session.add(booking)
        
        # Log AI decision
        ai_decision = AIExecutiveDecision(
            executive_type="CMO",
            decision_type="pricing_optimization",
            context_data=json.dumps(pricing_context),
            decision_output=json.dumps(pricing_decision),
            confidence_score=0.85
        )
        db.session.add(ai_decision)
        
        # Create communication log
        communication = Communication(
            customer_id=customer.id,
            booking_id=booking.id,
            communication_type="web_form",
            direction="inbound",
            subject="New Inquiry",
            content=json.dumps(data),
            ai_generated=False
        )
        db.session.add(communication)
        
        db.session.commit()
        
        # Trigger automated follow-up (would be handled by background task in production)
        response_data = {
            "customer": customer.to_dict(),
            "booking": booking.to_dict(),
            "ai_pricing": pricing_decision,
            "message": "Thank you for your inquiry! We'll respond within 2 hours with a detailed quote."
        }
        
        return jsonify(response_data), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/bookings/<int:booking_id>/quote', methods=['POST'])
def generate_quote(booking_id):
    """Generate AI-powered quote for a booking"""
    try:
        booking = Booking.query.get_or_404(booking_id)
        
        # AI CMO generates personalized quote
        ai_cmo = create_ai_executive("CMO")
        
        quote_context = {
            "booking": booking.to_dict(),
            "customer": booking.customer.to_dict(),
            "market_position": "premium",
            "competitor_analysis": {"average_price": booking.base_price * 0.9}
        }
        
        quote_decision = ai_cmo.make_decision("quote_generation", quote_context)
        
        # Update booking status
        booking.status = "quoted"
        
        # Create communication log
        communication = Communication(
            customer_id=booking.customer_id,
            booking_id=booking.id,
            communication_type="email",
            direction="outbound",
            subject="Your Party Favor Photo Quote",
            content=json.dumps(quote_decision),
            ai_generated=True,
            ai_executive="CMO"
        )
        db.session.add(communication)
        
        db.session.commit()
        
        return jsonify({
            "booking": booking.to_dict(),
            "quote": quote_decision,
            "status": "quote_sent"
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/bookings/<int:booking_id>/confirm', methods=['POST'])
def confirm_booking(booking_id):
    """Confirm a booking"""
    try:
        booking = Booking.query.get_or_404(booking_id)
        
        # AI COO handles booking confirmation and scheduling
        ai_coo = create_ai_executive("COO")
        
        confirmation_context = {
            "booking": booking.to_dict(),
            "current_schedule": [],  # Would fetch from database
            "staff_availability": [],  # Would fetch from database
            "equipment_status": []  # Would fetch from database
        }
        
        confirmation_decision = ai_coo.make_decision("booking_confirmation", confirmation_context)
        
        # Update booking status
        booking.status = "booked"
        
        # Create confirmation communication
        communication = Communication(
            customer_id=booking.customer_id,
            booking_id=booking.id,
            communication_type="email",
            direction="outbound",
            subject="Booking Confirmed - Party Favor Photo",
            content=json.dumps(confirmation_decision),
            ai_generated=True,
            ai_executive="COO"
        )
        db.session.add(communication)
        
        db.session.commit()
        
        return jsonify({
            "booking": booking.to_dict(),
            "confirmation": confirmation_decision,
            "status": "confirmed"
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/communications', methods=['GET'])
def get_communications():
    """Get all communications"""
    try:
        communications = Communication.query.order_by(Communication.created_at.desc()).all()
        return jsonify([comm.to_dict() for comm in communications])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/ai-decisions', methods=['GET'])
def get_ai_decisions():
    """Get all AI executive decisions for transparency"""
    try:
        decisions = AIExecutiveDecision.query.order_by(AIExecutiveDecision.created_at.desc()).all()
        return jsonify([decision.to_dict() for decision in decisions])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

