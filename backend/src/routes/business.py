from flask import Blueprint, request, jsonify
from src.models.business import db, BusinessMetrics, StaffMember, Equipment
from src.ai_executives_enhanced import create_ai_executive
from datetime import datetime, timedelta
import json

business_bp = Blueprint('business', __name__)

@business_bp.route('/dashboard', methods=['GET'])
def get_dashboard():
    """Get business dashboard with AI insights"""
    try:
        # Get recent metrics
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=30)
        
        metrics = BusinessMetrics.query.filter(
            BusinessMetrics.period_start >= start_date
        ).all()
        
        # Organize metrics by type
        dashboard_data = {
            "revenue": [],
            "bookings": [],
            "satisfaction": [],
            "staff_performance": []
        }
        
        for metric in metrics:
            if metric.metric_type in dashboard_data:
                dashboard_data[metric.metric_type].append(metric.to_dict())
        
        # AI CEO strategic analysis
        ai_ceo = create_ai_executive("CEO")
        
        # Calculate summary metrics
        total_revenue = sum(m.metric_value for m in metrics if m.metric_type == "revenue")
        total_bookings = sum(m.metric_value for m in metrics if m.metric_type == "bookings")
        avg_satisfaction = sum(m.metric_value for m in metrics if m.metric_type == "satisfaction") / max(len([m for m in metrics if m.metric_type == "satisfaction"]), 1)
        
        strategic_context = {
            "total_revenue": total_revenue,
            "total_bookings": total_bookings,
            "average_satisfaction": avg_satisfaction,
            "period_days": 30
        }
        
        strategic_analysis = ai_ceo.strategic_planning({}, {"revenue": total_revenue}, {"average_rating": avg_satisfaction})
        
        return jsonify({
            "metrics": dashboard_data,
            "summary": {
                "total_revenue": total_revenue,
                "total_bookings": total_bookings,
                "average_satisfaction": avg_satisfaction
            },
            "ai_insights": strategic_analysis
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@business_bp.route('/staff', methods=['GET'])
def get_staff():
    """Get all staff members"""
    try:
        staff = StaffMember.query.filter_by(active=True).all()
        return jsonify([member.to_dict() for member in staff])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@business_bp.route('/staff', methods=['POST'])
def create_staff():
    """Create a new staff member"""
    try:
        data = request.get_json()
        
        staff = StaffMember(
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone'),
            role=data.get('role'),
            hourly_rate=data.get('hourly_rate'),
            skills=json.dumps(data.get('skills', [])),
            availability=json.dumps(data.get('availability', {}))
        )
        
        db.session.add(staff)
        db.session.commit()
        
        return jsonify(staff.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@business_bp.route('/staff/<int:staff_id>/performance', methods=['POST'])
def update_staff_performance(staff_id):
    """Update staff performance score"""
    try:
        staff = StaffMember.query.get_or_404(staff_id)
        data = request.get_json()
        
        # AI COO evaluates performance update
        ai_coo = create_ai_executive("COO")
        
        performance_context = {
            "staff_member": staff.to_dict(),
            "new_score": data.get('performance_score'),
            "feedback": data.get('feedback', ''),
            "evaluation_period": data.get('period', 'monthly')
        }
        
        performance_decision = ai_coo.make_decision("performance_evaluation", performance_context)
        
        # Update performance score
        staff.performance_score = data.get('performance_score')
        staff.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            "staff": staff.to_dict(),
            "ai_evaluation": performance_decision
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@business_bp.route('/profit-distribution', methods=['POST'])
def distribute_profits():
    """AI CEO distributes profits to wage earners"""
    try:
        data = request.get_json()
        
        # Get all active staff
        staff_members = StaffMember.query.filter_by(active=True).all()
        
        # AI CEO makes resource allocation decision
        ai_ceo = create_ai_executive("CEO")
        
        allocation_decision = ai_ceo.resource_allocation(
            revenue=data.get('revenue'),
            expenses=data.get('expenses'),
            wage_earner_pool=[staff.to_dict() for staff in staff_members]
        )
        
        # Update staff earnings
        allocations = allocation_decision.get('individual_allocations', [])
        for allocation in allocations:
            staff_id = allocation.get('staff_id')
            amount = allocation.get('allocation')
            
            staff = StaffMember.query.get(staff_id)
            if staff:
                staff.total_earnings += amount
                staff.updated_at = datetime.utcnow()
        
        # Record the distribution as a business metric
        distribution_metric = BusinessMetrics(
            metric_type="profit_distribution",
            metric_value=allocation_decision.get('total_wage_earner_allocation', 0),
            period_start=datetime.utcnow().replace(day=1),
            period_end=datetime.utcnow(),
            metadata=json.dumps(allocation_decision)
        )
        db.session.add(distribution_metric)
        
        db.session.commit()
        
        return jsonify({
            "distribution": allocation_decision,
            "staff_updated": len(allocations),
            "total_distributed": allocation_decision.get('total_wage_earner_allocation', 0)
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@business_bp.route('/equipment', methods=['GET'])
def get_equipment():
    """Get all equipment"""
    try:
        equipment = Equipment.query.all()
        return jsonify([item.to_dict() for item in equipment])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@business_bp.route('/equipment', methods=['POST'])
def create_equipment():
    """Add new equipment"""
    try:
        data = request.get_json()
        
        equipment = Equipment(
            name=data.get('name'),
            equipment_type=data.get('equipment_type'),
            status=data.get('status', 'available'),
            purchase_date=datetime.fromisoformat(data.get('purchase_date')) if data.get('purchase_date') else None,
            purchase_price=data.get('purchase_price'),
            notes=data.get('notes')
        )
        
        db.session.add(equipment)
        db.session.commit()
        
        return jsonify(equipment.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@business_bp.route('/equipment/<int:equipment_id>/maintenance', methods=['POST'])
def schedule_maintenance(equipment_id):
    """Schedule equipment maintenance"""
    try:
        equipment = Equipment.query.get_or_404(equipment_id)
        data = request.get_json()
        
        # AI COO handles maintenance scheduling
        ai_coo = create_ai_executive("COO")
        
        maintenance_context = {
            "equipment": equipment.to_dict(),
            "maintenance_type": data.get('maintenance_type'),
            "urgency": data.get('urgency', 'routine'),
            "current_bookings": []  # Would fetch upcoming bookings
        }
        
        maintenance_decision = ai_coo.make_decision("maintenance_scheduling", maintenance_context)
        
        # Update equipment
        equipment.status = "maintenance"
        equipment.last_maintenance = datetime.utcnow()
        equipment.next_maintenance = datetime.utcnow() + timedelta(days=data.get('maintenance_interval', 90))
        equipment.notes = data.get('notes', '')
        
        db.session.commit()
        
        return jsonify({
            "equipment": equipment.to_dict(),
            "maintenance_plan": maintenance_decision
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@business_bp.route('/metrics', methods=['POST'])
def record_metric():
    """Record a business metric"""
    try:
        data = request.get_json()
        
        metric = BusinessMetrics(
            metric_type=data.get('metric_type'),
            metric_value=data.get('metric_value'),
            period_start=datetime.fromisoformat(data.get('period_start')),
            period_end=datetime.fromisoformat(data.get('period_end')),
            metadata=json.dumps(data.get('metadata', {}))
        )
        
        db.session.add(metric)
        db.session.commit()
        
        return jsonify(metric.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@business_bp.route('/ai-executives/status', methods=['GET'])
def get_ai_executives_status():
    """Get status of all AI executives"""
    try:
        executives = ["CEO", "CMO", "COO"]
        status = {}
        
        for exec_type in executives:
            try:
                ai_exec = create_ai_executive(exec_type)
                status[exec_type] = {
                    "status": "active",
                    "type": exec_type,
                    "last_decision": "recent"  # Would track actual last decision time
                }
            except Exception as e:
                status[exec_type] = {
                    "status": "error",
                    "error": str(e)
                }
        
        return jsonify({
            "ai_executives": status,
            "system_status": "operational",
            "autonomous_mode": True
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@business_bp.route('/optimization/pricing', methods=['POST'])
def optimize_pricing():
    """AI CMO optimizes pricing strategy"""
    try:
        data = request.get_json()
        
        ai_cmo = create_ai_executive("CMO")
        
        pricing_decision = ai_cmo.pricing_optimization(
            demand_data=data.get('demand_data', {}),
            competitor_pricing=data.get('competitor_pricing', {})
        )
        
        return jsonify({
            "pricing_strategy": pricing_decision,
            "effective_date": datetime.utcnow().isoformat(),
            "ai_executive": "CMO"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@business_bp.route('/optimization/operations', methods=['POST'])
def optimize_operations():
    """AI COO optimizes operations"""
    try:
        data = request.get_json()
        
        ai_coo = create_ai_executive("COO")
        
        operations_decision = ai_coo.booking_optimization(
            demand_forecast=data.get('demand_forecast', {}),
            staff_availability=data.get('staff_availability', []),
            equipment_status=data.get('equipment_status', [])
        )
        
        return jsonify({
            "operations_strategy": operations_decision,
            "effective_date": datetime.utcnow().isoformat(),
            "ai_executive": "COO"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

