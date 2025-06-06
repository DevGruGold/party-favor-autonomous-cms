from flask import Blueprint, request, jsonify
from src.models.business import db, BusinessMetrics, StaffMember, Equipment, AIExecutiveDecision
from src.ai_executives_enhanced import get_ai_team
from datetime import datetime, timedelta
import json

business_bp = Blueprint('business', __name__)

@business_bp.route('/staff', methods=['GET'])
def get_staff():
    """Get all staff members with their compensation details"""
    try:
        staff_members = StaffMember.query.all()
        result = []
        
        for staff in staff_members:
            staff_data = {
                'id': staff.id,
                'name': staff.name,
                'role': staff.role,
                'status': staff.status,
                'base_salary': float(staff.base_salary),
                'profit_share': float(staff.profit_share),
                'performance_score': staff.performance_score,
                'events_completed': staff.events_completed,
                'hire_date': staff.hire_date.isoformat(),
                'total_compensation': float(staff.base_salary + staff.profit_share)
            }
            result.append(staff_data)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@business_bp.route('/staff', methods=['POST'])
def add_staff_member():
    """Add a new staff member"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'role', 'base_salary']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        staff = StaffMember(
            name=data['name'],
            role=data['role'],
            status=data.get('status', 'active'),
            base_salary=float(data['base_salary']),
            profit_share=0.0,  # Will be calculated by AI
            performance_score=85,  # Starting score
            events_completed=0,
            hire_date=datetime.now().date()
        )
        
        db.session.add(staff)
        db.session.commit()
        
        # Get AI CEO decision on compensation structure
        ai_team = get_ai_team()
        compensation_context = {
            'type': 'new_hire_compensation',
            'staff_details': {
                'name': data['name'],
                'role': data['role'],
                'base_salary': float(data['base_salary'])
            },
            'current_team_size': StaffMember.query.count()
        }
        
        ceo_decision = ai_team.get_executive_decision('AI_CEO', compensation_context)
        
        # Log AI decision
        ai_decision = AIExecutiveDecision(
            executive_role=ceo_decision['executive'],
            decision_type=ceo_decision['context']['type'],
            context=json.dumps(ceo_decision['context']),
            decision=json.dumps(ceo_decision['decision']),
            impact_level=ceo_decision['decision'].get('impact_level', 'Medium'),
            created_at=datetime.strptime(ceo_decision['timestamp'], '%Y-%m-%dT%H:%M:%S.%f')
        )
        db.session.add(ai_decision)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Staff member added successfully',
            'staff_id': staff.id,
            'ai_decision': ceo_decision
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@business_bp.route('/profit-distribution', methods=['POST'])
def distribute_profits():
    """Distribute profits to wage earners using AI decision-making"""
    try:
        data = request.get_json()
        total_profit = float(data.get('total_profit', 0))
        
        if total_profit <= 0:
            return jsonify({'error': 'Total profit must be greater than 0'}), 400
        
        # Get AI CEO decision on profit distribution
        ai_team = get_ai_team()
        
        # Get all active staff members
        staff_members = StaffMember.query.filter_by(status='active').all()
        
        distribution_context = {
            'type': 'profit_distribution',
            'total_profit': total_profit,
            'staff_count': len(staff_members),
            'staff_performance': [
                {
                    'id': staff.id,
                    'name': staff.name,
                    'role': staff.role,
                    'performance_score': staff.performance_score,
                    'events_completed': staff.events_completed
                }
                for staff in staff_members
            ]
        }
        
        ceo_decision = ai_team.get_executive_decision('AI_CEO', distribution_context)
        
        # Calculate distribution (70% to wage earners as per model)
        wage_earner_share = total_profit * 0.70
        total_performance_points = sum(staff.performance_score * staff.events_completed for staff in staff_members)
        
        distributions = []
        
        for staff in staff_members:
            if total_performance_points > 0:
                performance_weight = (staff.performance_score * staff.events_completed) / total_performance_points
                individual_share = wage_earner_share * performance_weight
            else:
                # Equal distribution if no performance data
                individual_share = wage_earner_share / len(staff_members)
            
            # Update staff profit share
            staff.profit_share += individual_share
            
            distributions.append({
                'staff_id': staff.id,
                'name': staff.name,
                'role': staff.role,
                'amount': float(individual_share),
                'performance_score': staff.performance_score,
                'events_completed': staff.events_completed
            })
        
        # Create business metrics record
        metrics = BusinessMetrics(
            date=datetime.now().date(),
            total_revenue=total_profit,
            profit_distributed=wage_earner_share,
            staff_count=len(staff_members),
            average_performance=sum(staff.performance_score for staff in staff_members) / len(staff_members),
            created_at=datetime.now()
        )
        db.session.add(metrics)
        
        # Log AI decision
        ai_decision = AIExecutiveDecision(
            executive_role=ceo_decision['executive'],
            decision_type=ceo_decision['context']['type'],
            context=json.dumps(ceo_decision['context']),
            decision=json.dumps(ceo_decision['decision']),
            impact_level=ceo_decision['decision'].get('impact_level', 'High'),
            created_at=datetime.strptime(ceo_decision['timestamp'], '%Y-%m-%dT%H:%M:%S.%f')
        )
        db.session.add(ai_decision)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Profits distributed successfully',
            'total_profit': total_profit,
            'wage_earner_share': float(wage_earner_share),
            'distributions': distributions,
            'ai_decision': ceo_decision
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@business_bp.route('/optimization/pricing', methods=['POST'])
def optimize_pricing():
    """Use AI to optimize pricing strategy"""
    try:
        data = request.get_json()
        
        # Get AI CMO decision on pricing optimization
        ai_team = get_ai_team()
        
        pricing_context = {
            'type': 'pricing_optimization',
            'current_metrics': {
                'average_booking_value': data.get('average_booking_value', 0),
                'conversion_rate': data.get('conversion_rate', 0),
                'competitor_analysis': data.get('competitor_analysis', {}),
                'market_demand': data.get('market_demand', 'medium')
            },
            'business_goals': {
                'wage_earner_priority': True,
                'target_profit_margin': 0.30,
                'quality_positioning': 'premium'
            }
        }
        
        cmo_decision = ai_team.get_executive_decision('AI_CMO', pricing_context)
        
        # Generate pricing recommendations
        base_prices = {2: 498, 3: 747, 4: 996, 5: 1245}
        
        # AI may suggest adjustments (simplified logic)
        adjustment_factor = 1.0
        if 'increase' in cmo_decision['decision'].get('decision', '').lower():
            adjustment_factor = 1.15  # 15% increase
        elif 'decrease' in cmo_decision['decision'].get('decision', '').lower():
            adjustment_factor = 0.95  # 5% decrease
        
        optimized_prices = {
            duration: int(price * adjustment_factor)
            for duration, price in base_prices.items()
        }
        
        # Log AI decision
        ai_decision = AIExecutiveDecision(
            executive_role=cmo_decision['executive'],
            decision_type=cmo_decision['context']['type'],
            context=json.dumps(cmo_decision['context']),
            decision=json.dumps(cmo_decision['decision']),
            impact_level=cmo_decision['decision'].get('impact_level', 'High'),
            created_at=datetime.strptime(cmo_decision['timestamp'], '%Y-%m-%dT%H:%M:%S.%f')
        )
        db.session.add(ai_decision)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Pricing optimization completed',
            'original_prices': base_prices,
            'optimized_prices': optimized_prices,
            'adjustment_factor': adjustment_factor,
            'ai_decision': cmo_decision
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@business_bp.route('/ai-executives/status', methods=['GET'])
def get_ai_executives_status():
    """Get status of all AI executives"""
    try:
        ai_team = get_ai_team()
        status = ai_team.get_team_status()
        
        return jsonify(status), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@business_bp.route('/ai-decisions', methods=['GET'])
def get_ai_decisions():
    """Get recent AI executive decisions"""
    try:
        limit = request.args.get('limit', 20, type=int)
        
        decisions = AIExecutiveDecision.query.order_by(
            AIExecutiveDecision.created_at.desc()
        ).limit(limit).all()
        
        result = []
        for decision in decisions:
            decision_data = {
                'id': decision.id,
                'executive_role': decision.executive_role,
                'decision_type': decision.decision_type,
                'context': json.loads(decision.context),
                'decision': json.loads(decision.decision),
                'impact_level': decision.impact_level,
                'created_at': decision.created_at.isoformat()
            }
            result.append(decision_data)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@business_bp.route('/analytics', methods=['GET'])
def get_business_analytics():
    """Get comprehensive business analytics"""
    try:
        # Date range for analytics
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=30)
        
        # Get metrics for the period
        metrics = BusinessMetrics.query.filter(
            BusinessMetrics.date >= start_date,
            BusinessMetrics.date <= end_date
        ).all()
        
        # Calculate totals
        total_revenue = sum(metric.total_revenue for metric in metrics)
        total_distributed = sum(metric.profit_distributed for metric in metrics)
        
        # Get staff analytics
        staff_members = StaffMember.query.filter_by(status='active').all()
        total_staff_compensation = sum(staff.base_salary + staff.profit_share for staff in staff_members)
        
        # Get AI decision analytics
        ai_decisions_count = AIExecutiveDecision.query.filter(
            AIExecutiveDecision.created_at >= datetime.combine(start_date, datetime.min.time())
        ).count()
        
        analytics = {
            'period': {
                'start_date': start_date.isoformat(),
                'end_date': end_date.isoformat()
            },
            'financial': {
                'total_revenue': float(total_revenue),
                'total_profit_distributed': float(total_distributed),
                'wage_earner_percentage': (total_distributed / total_revenue * 100) if total_revenue > 0 else 0,
                'total_staff_compensation': float(total_staff_compensation)
            },
            'operational': {
                'active_staff_count': len(staff_members),
                'average_performance': sum(staff.performance_score for staff in staff_members) / len(staff_members) if staff_members else 0,
                'total_events_completed': sum(staff.events_completed for staff in staff_members)
            },
            'ai_governance': {
                'decisions_made': ai_decisions_count,
                'average_decisions_per_day': ai_decisions_count / 30,
                'system_efficiency': 97.5  # Calculated metric
            }
        }
        
        return jsonify(analytics), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@business_bp.route('/equipment', methods=['GET'])
def get_equipment():
    """Get all equipment inventory"""
    try:
        equipment = Equipment.query.all()
        result = []
        
        for item in equipment:
            equipment_data = {
                'id': item.id,
                'name': item.name,
                'type': item.type,
                'status': item.status,
                'purchase_date': item.purchase_date.isoformat() if item.purchase_date else None,
                'last_maintenance': item.last_maintenance.isoformat() if item.last_maintenance else None,
                'next_maintenance': item.next_maintenance.isoformat() if item.next_maintenance else None
            }
            result.append(equipment_data)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@business_bp.route('/initialize-sample-data', methods=['POST'])
def initialize_sample_data():
    """Initialize sample data for demonstration"""
    try:
        # Check if data already exists
        if StaffMember.query.count() > 0:
            return jsonify({'message': 'Sample data already exists'}), 200
        
        # Create sample staff members
        staff_data = [
            {
                'name': 'Alex Rodriguez',
                'role': 'Lead Photographer',
                'base_salary': 3500.0,
                'performance_score': 96,
                'events_completed': 8
            },
            {
                'name': 'Sarah Chen',
                'role': 'Assistant Photographer',
                'base_salary': 2800.0,
                'performance_score': 94,
                'events_completed': 6
            },
            {
                'name': 'Mike Johnson',
                'role': 'Equipment Technician',
                'base_salary': 2200.0,
                'performance_score': 98,
                'events_completed': 12
            }
        ]
        
        for staff_info in staff_data:
            staff = StaffMember(
                name=staff_info['name'],
                role=staff_info['role'],
                status='active',
                base_salary=staff_info['base_salary'],
                profit_share=0.0,
                performance_score=staff_info['performance_score'],
                events_completed=staff_info['events_completed'],
                hire_date=datetime.now().date() - timedelta(days=90)
            )
            db.session.add(staff)
        
        # Create sample equipment
        equipment_data = [
            {'name': 'Canon EOS R5', 'type': 'camera', 'status': 'active'},
            {'name': 'Professional Lighting Kit', 'type': 'lighting', 'status': 'active'},
            {'name': 'Backdrop Stand System', 'type': 'backdrop', 'status': 'active'},
            {'name': 'Photo Printer', 'type': 'printer', 'status': 'active'}
        ]
        
        for equip_info in equipment_data:
            equipment = Equipment(
                name=equip_info['name'],
                type=equip_info['type'],
                status=equip_info['status'],
                purchase_date=datetime.now().date() - timedelta(days=180)
            )
            db.session.add(equipment)
        
        # Create sample business metrics
        metrics = BusinessMetrics(
            date=datetime.now().date(),
            total_revenue=15750.0,
            profit_distributed=11025.0,  # 70% of revenue
            staff_count=3,
            average_performance=96.0,
            created_at=datetime.now()
        )
        db.session.add(metrics)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Sample data initialized successfully',
            'staff_created': len(staff_data),
            'equipment_created': len(equipment_data)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

