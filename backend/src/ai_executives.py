import json
import openai
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIExecutive:
    """Base class for AI executives with common functionality"""
    
    def __init__(self, executive_type: str, api_key: str = None):
        self.executive_type = executive_type
        self.api_key = api_key
        if api_key:
            openai.api_key = api_key
    
    def make_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        """Base method for making AI-driven decisions"""
        try:
            prompt = self._build_prompt(decision_type, context_data)
            
            # For now, we'll use rule-based logic since we don't have OpenAI access
            # In production, this would use OpenAI API
            decision = self._rule_based_decision(decision_type, context_data)
            
            # Log the decision
            self._log_decision(decision_type, context_data, decision)
            
            return decision
        except Exception as e:
            logger.error(f"Error making decision: {str(e)}")
            return {"error": str(e), "fallback": True}
    
    def _build_prompt(self, decision_type: str, context_data: Dict[str, Any]) -> str:
        """Build prompt for AI decision-making"""
        return f"""
        You are the AI {self.executive_type} for Party Favor Photo, a premium photo booth service.
        
        Decision Type: {decision_type}
        Context Data: {json.dumps(context_data, indent=2)}
        
        Your role is to make data-driven decisions that:
        1. Prioritize wage earner compensation and working conditions
        2. Maintain 5-star customer service quality
        3. Optimize business efficiency and profitability
        4. Ensure sustainable growth
        
        Provide your decision in JSON format with reasoning.
        """
    
    def _rule_based_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        """Fallback rule-based decision making"""
        # This will be implemented by each specific executive class
        return {"decision": "default", "reasoning": "Rule-based fallback"}
    
    def _log_decision(self, decision_type: str, context_data: Dict[str, Any], decision: Dict[str, Any]):
        """Log decision for transparency and optimization"""
        logger.info(f"{self.executive_type} Decision: {decision_type}")
        logger.info(f"Context: {json.dumps(context_data, indent=2)}")
        logger.info(f"Decision: {json.dumps(decision, indent=2)}")

class AICEO(AIExecutive):
    """AI Chief Executive Officer - Strategic decisions and resource allocation"""
    
    def __init__(self, api_key: str = None):
        super().__init__("CEO", api_key)
    
    def strategic_planning(self, market_data: Dict[str, Any], financial_data: Dict[str, Any], 
                          performance_metrics: Dict[str, Any]) -> Dict[str, Any]:
        """Make strategic planning decisions"""
        context = {
            "market_data": market_data,
            "financial_data": financial_data,
            "performance_metrics": performance_metrics
        }
        return self.make_decision("strategic_planning", context)
    
    def resource_allocation(self, revenue: float, expenses: float, 
                           wage_earner_pool: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Allocate resources with wage earner priority"""
        context = {
            "revenue": revenue,
            "expenses": expenses,
            "wage_earner_pool": wage_earner_pool,
            "profit": revenue - expenses
        }
        return self.make_decision("resource_allocation", context)
    
    def _rule_based_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        if decision_type == "resource_allocation":
            return self._allocate_resources(context_data)
        elif decision_type == "strategic_planning":
            return self._strategic_plan(context_data)
        return super()._rule_based_decision(decision_type, context_data)
    
    def _allocate_resources(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based resource allocation prioritizing wage earners"""
        profit = context.get("profit", 0)
        wage_earner_pool = context.get("wage_earner_pool", [])
        
        if profit <= 0:
            return {
                "wage_earner_bonus": 0,
                "reinvestment": 0,
                "reasoning": "No profit available for distribution"
            }
        
        # Allocate 60% of profit to wage earners, 40% to reinvestment
        wage_earner_allocation = profit * 0.6
        reinvestment = profit * 0.4
        
        # Distribute wage earner allocation based on performance
        total_performance = sum(member.get("performance_score", 5.0) for member in wage_earner_pool)
        
        allocations = []
        for member in wage_earner_pool:
            if total_performance > 0:
                member_share = (member.get("performance_score", 5.0) / total_performance) * wage_earner_allocation
                allocations.append({
                    "staff_id": member.get("id"),
                    "name": member.get("name"),
                    "allocation": round(member_share, 2)
                })
        
        return {
            "total_wage_earner_allocation": round(wage_earner_allocation, 2),
            "reinvestment": round(reinvestment, 2),
            "individual_allocations": allocations,
            "reasoning": "60% profit to wage earners based on performance, 40% reinvestment"
        }
    
    def _strategic_plan(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based strategic planning"""
        performance = context.get("performance_metrics", {})
        financial = context.get("financial_data", {})
        
        # Analyze key metrics
        customer_satisfaction = performance.get("average_rating", 5.0)
        booking_growth = performance.get("booking_growth", 0)
        revenue_growth = financial.get("revenue_growth", 0)
        
        priorities = []
        
        if customer_satisfaction < 4.5:
            priorities.append("Improve service quality and customer satisfaction")
        
        if booking_growth < 0.1:  # Less than 10% growth
            priorities.append("Increase marketing and customer acquisition efforts")
        
        if revenue_growth < 0.15:  # Less than 15% growth
            priorities.append("Optimize pricing strategy and service offerings")
        
        if not priorities:
            priorities.append("Maintain excellence and explore expansion opportunities")
        
        return {
            "strategic_priorities": priorities,
            "focus_areas": ["wage_earner_development", "customer_satisfaction", "operational_efficiency"],
            "reasoning": "Data-driven priorities based on current performance metrics"
        }

class AICMO(AIExecutive):
    """AI Chief Marketing Officer - Marketing strategy and partnerships"""
    
    def __init__(self, api_key: str = None):
        super().__init__("CMO", api_key)
    
    def content_strategy(self, engagement_metrics: Dict[str, Any], 
                        competitor_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Develop content marketing strategy"""
        context = {
            "engagement_metrics": engagement_metrics,
            "competitor_analysis": competitor_analysis
        }
        return self.make_decision("content_strategy", context)
    
    def partnership_development(self, partner_performance: Dict[str, Any], 
                               market_opportunities: Dict[str, Any]) -> Dict[str, Any]:
        """Develop partnership strategy"""
        context = {
            "partner_performance": partner_performance,
            "market_opportunities": market_opportunities
        }
        return self.make_decision("partnership_development", context)
    
    def pricing_optimization(self, demand_data: Dict[str, Any], 
                           competitor_pricing: Dict[str, Any]) -> Dict[str, Any]:
        """Optimize pricing strategy"""
        context = {
            "demand_data": demand_data,
            "competitor_pricing": competitor_pricing
        }
        return self.make_decision("pricing_optimization", context)
    
    def _rule_based_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        if decision_type == "content_strategy":
            return self._content_strategy(context_data)
        elif decision_type == "partnership_development":
            return self._partnership_strategy(context_data)
        elif decision_type == "pricing_optimization":
            return self._pricing_strategy(context_data)
        return super()._rule_based_decision(decision_type, context_data)
    
    def _content_strategy(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based content strategy"""
        engagement = context.get("engagement_metrics", {})
        
        # Analyze best performing content types
        best_content_types = []
        if engagement.get("wedding_posts_engagement", 0) > engagement.get("average_engagement", 0):
            best_content_types.append("wedding_showcases")
        if engagement.get("behind_scenes_engagement", 0) > engagement.get("average_engagement", 0):
            best_content_types.append("behind_the_scenes")
        if engagement.get("testimonial_engagement", 0) > engagement.get("average_engagement", 0):
            best_content_types.append("customer_testimonials")
        
        # Default content mix if no data
        if not best_content_types:
            best_content_types = ["wedding_showcases", "behind_the_scenes", "customer_testimonials"]
        
        posting_schedule = {
            "monday": "behind_the_scenes",
            "wednesday": "wedding_showcase",
            "friday": "customer_testimonial",
            "sunday": "engagement_post"
        }
        
        return {
            "recommended_content_types": best_content_types,
            "posting_schedule": posting_schedule,
            "hashtag_strategy": ["#DMVWeddings", "#PhotoBoothFun", "#PartyFavorPhoto"],
            "reasoning": "Focus on highest-engagement content types with consistent posting schedule"
        }
    
    def _partnership_strategy(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based partnership development"""
        partner_performance = context.get("partner_performance", {})
        
        # Identify top-performing partners
        top_partners = []
        for partner, metrics in partner_performance.items():
            if metrics.get("referral_rate", 0) > 0.1:  # More than 10% referral rate
                top_partners.append(partner)
        
        # Partnership priorities
        priorities = [
            "Strengthen relationships with top-performing partners",
            "Identify new wedding planners in high-demand areas",
            "Develop venue partnerships for preferred vendor status",
            "Create referral incentive programs"
        ]
        
        return {
            "top_partners": top_partners,
            "partnership_priorities": priorities,
            "outreach_targets": ["wedding_planners", "event_venues", "corporate_event_planners"],
            "reasoning": "Focus on partners with proven referral success and expand in high-opportunity areas"
        }
    
    def _pricing_strategy(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based pricing optimization"""
        demand = context.get("demand_data", {})
        competitor_pricing = context.get("competitor_pricing", {})
        
        # Base pricing structure
        base_pricing = {
            "2_hour": 498,
            "3_hour": 747,
            "4_hour": 996,
            "5_hour": 1245
        }
        
        # Adjust based on demand
        high_demand_periods = demand.get("high_demand_periods", [])
        seasonal_adjustments = {}
        
        for period in high_demand_periods:
            seasonal_adjustments[period] = {
                "adjustment": 1.15,  # 15% increase during high demand
                "reasoning": "High demand period pricing optimization"
            }
        
        return {
            "base_pricing": base_pricing,
            "seasonal_adjustments": seasonal_adjustments,
            "premium_services": {
                "vertical_layout": 50,
                "custom_backdrop": 100,
                "extended_hours": 200
            },
            "reasoning": "Competitive pricing with premium options and demand-based adjustments"
        }

class AICOO(AIExecutive):
    """AI Chief Operations Officer - Daily operations and scheduling"""
    
    def __init__(self, api_key: str = None):
        super().__init__("COO", api_key)
    
    def booking_optimization(self, demand_forecast: Dict[str, Any], 
                           staff_availability: List[Dict[str, Any]], 
                           equipment_status: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Optimize booking scheduling"""
        context = {
            "demand_forecast": demand_forecast,
            "staff_availability": staff_availability,
            "equipment_status": equipment_status
        }
        return self.make_decision("booking_optimization", context)
    
    def quality_assurance(self, customer_feedback: List[Dict[str, Any]], 
                         service_metrics: Dict[str, Any]) -> Dict[str, Any]:
        """Monitor and improve service quality"""
        context = {
            "customer_feedback": customer_feedback,
            "service_metrics": service_metrics
        }
        return self.make_decision("quality_assurance", context)
    
    def staff_scheduling(self, bookings: List[Dict[str, Any]], 
                        staff_members: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Optimize staff scheduling"""
        context = {
            "bookings": bookings,
            "staff_members": staff_members
        }
        return self.make_decision("staff_scheduling", context)
    
    def _rule_based_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        if decision_type == "booking_optimization":
            return self._optimize_bookings(context_data)
        elif decision_type == "quality_assurance":
            return self._quality_assurance(context_data)
        elif decision_type == "staff_scheduling":
            return self._schedule_staff(context_data)
        return super()._rule_based_decision(decision_type, context_data)
    
    def _optimize_bookings(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based booking optimization"""
        staff_availability = context.get("staff_availability", [])
        equipment_status = context.get("equipment_status", [])
        
        # Check resource availability
        available_staff = [staff for staff in staff_availability if staff.get("available", False)]
        available_equipment = [eq for eq in equipment_status if eq.get("status") == "available"]
        
        max_concurrent_bookings = min(len(available_staff), len(available_equipment))
        
        # Optimal booking windows
        optimal_windows = [
            {"day": "Saturday", "time": "18:00", "demand_multiplier": 1.2},
            {"day": "Friday", "time": "19:00", "demand_multiplier": 1.1},
            {"day": "Sunday", "time": "17:00", "demand_multiplier": 1.0}
        ]
        
        return {
            "max_concurrent_bookings": max_concurrent_bookings,
            "optimal_booking_windows": optimal_windows,
            "resource_constraints": {
                "staff_available": len(available_staff),
                "equipment_available": len(available_equipment)
            },
            "reasoning": "Booking capacity based on staff and equipment availability"
        }
    
    def _quality_assurance(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based quality assurance"""
        feedback = context.get("customer_feedback", [])
        metrics = context.get("service_metrics", {})
        
        # Analyze feedback for issues
        common_issues = {}
        improvement_areas = []
        
        for review in feedback:
            rating = review.get("rating", 5)
            if rating < 5:
                issues = review.get("issues", [])
                for issue in issues:
                    common_issues[issue] = common_issues.get(issue, 0) + 1
        
        # Identify top issues
        if common_issues:
            top_issues = sorted(common_issues.items(), key=lambda x: x[1], reverse=True)[:3]
            improvement_areas = [issue[0] for issue in top_issues]
        
        # Quality metrics
        avg_rating = metrics.get("average_rating", 5.0)
        response_time = metrics.get("average_response_time", 0)
        
        actions = []
        if avg_rating < 4.8:
            actions.append("Implement additional staff training")
        if response_time > 24:  # More than 24 hours
            actions.append("Improve response time protocols")
        if improvement_areas:
            actions.append(f"Address common issues: {', '.join(improvement_areas)}")
        
        return {
            "average_rating": avg_rating,
            "improvement_areas": improvement_areas,
            "recommended_actions": actions,
            "quality_status": "excellent" if avg_rating >= 4.8 else "needs_improvement",
            "reasoning": "Quality assessment based on customer feedback and service metrics"
        }
    
    def _schedule_staff(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based staff scheduling"""
        bookings = context.get("bookings", [])
        staff_members = context.get("staff_members", [])
        
        # Simple scheduling algorithm
        schedule = {}
        
        for booking in bookings:
            booking_date = booking.get("event_date")
            required_skills = ["photography", "customer_service"]
            
            # Find best available staff member
            best_staff = None
            for staff in staff_members:
                if staff.get("available", False):
                    staff_skills = staff.get("skills", [])
                    if any(skill in staff_skills for skill in required_skills):
                        best_staff = staff
                        break
            
            if best_staff:
                schedule[booking.get("id")] = {
                    "staff_id": best_staff.get("id"),
                    "staff_name": best_staff.get("name"),
                    "booking_date": booking_date,
                    "estimated_hours": booking.get("duration_hours", 3) + 2  # Include setup/breakdown
                }
        
        return {
            "schedule": schedule,
            "utilization_rate": len(schedule) / len(bookings) if bookings else 0,
            "reasoning": "Staff assigned based on skills and availability"
        }

# Factory function to create AI executives
def create_ai_executive(executive_type: str, api_key: str = None) -> AIExecutive:
    """Factory function to create AI executives"""
    executives = {
        "CEO": AICEO,
        "CMO": AICMO,
        "COO": AICOO,
        # CFO and CTO can be added later
    }
    
    if executive_type not in executives:
        raise ValueError(f"Unknown executive type: {executive_type}")
    
    return executives[executive_type](api_key)

