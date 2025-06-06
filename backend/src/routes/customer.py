from flask import Blueprint, request, jsonify
from src.models.business import db, Customer, Booking, Communication, AIExecutiveDecision
from src.ai_executives_enhanced import get_ai_team
from datetime import datetime
import json

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/inquiries', methods=['POST'])
def create_inquiry():
    """Create a new customer inquiry and get AI-powered response"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['fullName', 'email', 'eventType', 'eventDate', 'duration']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create customer record
        customer = Customer(
            name=data['fullName'],
            email=data['email'],
            phone=data.get('phone', ''),
            created_at=datetime.now()
        )
        db.session.add(customer)
        db.session.flush()  # Get customer ID
        
        # Calculate pricing
        duration = int(data['duration'])
        base_prices = {2: 498, 3: 747, 4: 996, 5: 1245}
        base_price = base_prices.get(duration, 747)
        
        # Create booking record
        booking = Booking(
            customer_id=customer.id,
            event_type=data['eventType'],
            event_date=datetime.strptime(data['eventDate'], '%Y-%m-%d').date(),
            duration_hours=duration,
            venue=data.get('venue', ''),
            guest_count=int(data.get('guestCount', 0)) if data.get('guestCount') else None,
            backdrop_color=data.get('backdrop', ''),
            photo_layout=data.get('layout', 'horizontal'),
            special_requests=data.get('notes', ''),
            base_price=base_price,
            status='inquiry',
            created_at=datetime.now()
        )
        db.session.add(booking)
        db.session.flush()  # Get booking ID
        
        # Get AI executive decisions for pricing and response
        ai_team = get_ai_team()
        
        # CMO decision for pricing optimization
        pricing_context = {
            'type': 'pricing',
            'event_type': data['eventType'],
            'duration': duration,
            'guest_count': data.get('guestCount', 0),
            'venue': data.get('venue', ''),
            'base_price': base_price
        }
        
        cmo_decision = ai_team.get_executive_decision('AI_CMO', pricing_context)
        
        # CEO decision for customer response strategy
        response_context = {
            'type': 'customer_response',
            'customer_profile': {
                'event_type': data['eventType'],
                'budget_indicator': base_price,
                'special_requests': data.get('notes', '')
            }
        }
        
        ceo_decision = ai_team.get_executive_decision('AI_CEO', response_context)
        
        # Calculate final price (AI may adjust)
        final_price = base_price
        if 'price_adjustment' in cmo_decision.get('decision', '').lower():
            # AI suggested price adjustment - implement logic here
            pass
        
        booking.final_price = final_price
        
        # Create communication record
        ai_response = f"""Thank you for your inquiry, {data['fullName']}!

Our AI executives have reviewed your {data['eventType']} event request and are excited to help make it memorable.

Event Details:
- Date: {data['eventDate']}
- Duration: {duration} hours
- Estimated Price: ${final_price}

Our revolutionary AI governance model ensures you receive premium service while supporting fair wage distribution to our talented team members.

We'll follow up within 24 hours with a detailed proposal tailored to your specific needs.

Best regards,
Party Favor Photo AI Executive Team"""
        
        communication = Communication(
            customer_id=customer.id,
            booking_id=booking.id,
            message_type='ai_response',
            content=ai_response,
            sent_at=datetime.now()
        )
        db.session.add(communication)
        
        # Log AI decisions
        for decision in [cmo_decision, ceo_decision]:
            ai_decision = AIExecutiveDecision(
                executive_role=decision['executive'],
                decision_type=decision['context']['type'],
                context=json.dumps(decision['context']),
                decision=json.dumps(decision['decision']),
                impact_level=decision['decision'].get('impact_level', 'Medium'),
                created_at=datetime.strptime(decision['timestamp'], '%Y-%m-%dT%H:%M:%S.%f')
            )
            db.session.add(ai_decision)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Inquiry submitted successfully',
            'booking_id': booking.id,
            'estimated_price': final_price,
            'ai_response': ai_response,
            'ai_decisions': [cmo_decision, ceo_decision]
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@customer_bp.route('/customers', methods=['GET'])
def get_customers():
    """Get all customers with their bookings"""
    try:
        customers = Customer.query.all()
        result = []
        
        for customer in customers:
            customer_data = {
                'id': customer.id,
                'name': customer.name,
                'email': customer.email,
                'phone': customer.phone,
                'created_at': customer.created_at.isoformat(),
                'bookings': []
            }
            
            for booking in customer.bookings:
                booking_data = {
                    'id': booking.id,
                    'event_type': booking.event_type,
                    'event_date': booking.event_date.isoformat(),
                    'duration_hours': booking.duration_hours,
                    'venue': booking.venue,
                    'guest_count': booking.guest_count,
                    'base_price': booking.base_price,
                    'final_price': booking.final_price,
                    'status': booking.status,
                    'created_at': booking.created_at.isoformat()
                }
                customer_data['bookings'].append(booking_data)
            
            result.append(customer_data)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customer_bp.route('/bookings/<int:booking_id>/quote', methods=['POST'])
def generate_quote(booking_id):
    """Generate an AI-powered quote for a booking"""
    try:
        booking = Booking.query.get_or_404(booking_id)
        customer = Customer.query.get_or_404(booking.customer_id)
        
        # Get AI executive decision for detailed quote
        ai_team = get_ai_team()
        
        quote_context = {
            'type': 'detailed_quote',
            'booking_details': {
                'event_type': booking.event_type,
                'duration': booking.duration_hours,
                'guest_count': booking.guest_count,
                'venue': booking.venue,
                'special_requests': booking.special_requests,
                'base_price': booking.base_price
            },
            'customer_profile': {
                'name': customer.name,
                'previous_bookings': len(customer.bookings)
            }
        }
        
        # Get decisions from multiple executives
        cmo_decision = ai_team.get_executive_decision('AI_CMO', quote_context)
        coo_decision = ai_team.get_executive_decision('AI_COO', quote_context)
        
        # Generate comprehensive quote
        quote = {
            'booking_id': booking_id,
            'customer_name': customer.name,
            'event_details': {
                'type': booking.event_type,
                'date': booking.event_date.isoformat(),
                'duration': booking.duration_hours,
                'venue': booking.venue,
                'guest_count': booking.guest_count
            },
            'pricing': {
                'base_price': booking.base_price,
                'final_price': booking.final_price or booking.base_price,
                'includes': [
                    'Professional photo booth setup',
                    'High-quality camera and lighting',
                    'Instant photo printing',
                    'Digital gallery access',
                    'Professional attendant',
                    'Custom backdrop',
                    'Props and accessories'
                ]
            },
            'ai_recommendations': {
                'marketing_insights': cmo_decision['decision'],
                'operational_plan': coo_decision['decision']
            },
            'generated_at': datetime.now().isoformat()
        }
        
        # Log AI decisions
        for decision in [cmo_decision, coo_decision]:
            ai_decision = AIExecutiveDecision(
                executive_role=decision['executive'],
                decision_type=decision['context']['type'],
                context=json.dumps(decision['context']),
                decision=json.dumps(decision['decision']),
                impact_level=decision['decision'].get('impact_level', 'Medium'),
                created_at=datetime.strptime(decision['timestamp'], '%Y-%m-%dT%H:%M:%S.%f')
            )
            db.session.add(ai_decision)
        
        db.session.commit()
        
        return jsonify(quote), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customer_bp.route('/bookings/<int:booking_id>/confirm', methods=['POST'])
def confirm_booking(booking_id):
    """Confirm a booking and trigger AI executive decisions"""
    try:
        booking = Booking.query.get_or_404(booking_id)
        
        # Update booking status
        booking.status = 'confirmed'
        booking.confirmed_at = datetime.now()
        
        # Get AI executive decisions for confirmed booking
        ai_team = get_ai_team()
        
        confirmation_context = {
            'type': 'booking_confirmation',
            'booking_details': {
                'id': booking_id,
                'event_type': booking.event_type,
                'event_date': booking.event_date.isoformat(),
                'final_price': booking.final_price or booking.base_price
            }
        }
        
        # Get decisions from all executives
        decisions = ai_team.make_collective_decision(confirmation_context)
        
        # Log all AI decisions
        for decision in decisions:
            ai_decision = AIExecutiveDecision(
                executive_role=decision['executive'],
                decision_type=decision['context']['type'],
                context=json.dumps(decision['context']),
                decision=json.dumps(decision['decision']),
                impact_level=decision['decision'].get('impact_level', 'Medium'),
                created_at=datetime.strptime(decision['timestamp'], '%Y-%m-%dT%H:%M:%S.%f')
            )
            db.session.add(ai_decision)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Booking confirmed successfully',
            'booking_id': booking_id,
            'ai_decisions': decisions
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@customer_bp.route('/dashboard', methods=['GET'])
def get_dashboard_data():
    """Get dashboard data with AI insights"""
    try:
        # Calculate metrics
        total_customers = Customer.query.count()
        total_bookings = Booking.query.count()
        confirmed_bookings = Booking.query.filter_by(status='confirmed').count()
        total_revenue = db.session.query(db.func.sum(Booking.final_price)).filter(
            Booking.status == 'confirmed'
        ).scalar() or 0
        
        # Get recent bookings
        recent_bookings = Booking.query.order_by(Booking.created_at.desc()).limit(5).all()
        recent_bookings_data = []
        
        for booking in recent_bookings:
            customer = Customer.query.get(booking.customer_id)
            recent_bookings_data.append({
                'id': booking.id,
                'client': f"{customer.name} - {booking.event_type}",
                'date': booking.event_date.isoformat(),
                'status': booking.status,
                'value': booking.final_price or booking.base_price
            })
        
        # Get AI team status
        ai_team = get_ai_team()
        ai_status = ai_team.get_team_status()
        
        dashboard_data = {
            'metrics': {
                'total_customers': total_customers,
                'total_bookings': total_bookings,
                'confirmed_bookings': confirmed_bookings,
                'total_revenue': float(total_revenue),
                'average_booking_value': float(total_revenue / confirmed_bookings) if confirmed_bookings > 0 else 0
            },
            'recent_bookings': recent_bookings_data,
            'ai_executives': ai_status['executives'],
            'ai_metrics': {
                'total_decisions': ai_status['total_decisions'],
                'average_efficiency': ai_status['average_efficiency'],
                'system_status': ai_status['system_status']
            }
        }
        
        return jsonify(dashboard_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

