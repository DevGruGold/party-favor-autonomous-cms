import json
import openai
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIExecutive:
    """Base class for AI executives with common functionality"""
    
    def __init__(self, executive_type: str, api_key: str = None):
        self.executive_type = executive_type
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
        
        # Initialize Gemini API if available
        if self.api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel('gemini-pro')
                self.use_ai = True
            except ImportError:
                logger.warning("Google Generative AI not available, using rule-based decisions")
                self.use_ai = False
        else:
            self.use_ai = False
    
    def make_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        """Base method for making AI-driven decisions"""
        try:
            if self.use_ai:
                return self._ai_decision(decision_type, context_data)
            else:
                return self._rule_based_decision(decision_type, context_data)
        except Exception as e:
            logger.error(f"Error making decision: {str(e)}")
            return self._rule_based_decision(decision_type, context_data)
    
    def _ai_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        """Make AI-powered decision using Gemini"""
        try:
            prompt = self._build_prompt(decision_type, context_data)
            response = self.model.generate_content(prompt)
            
            # Parse JSON response
            try:
                decision = json.loads(response.text)
                decision['ai_powered'] = True
                decision['confidence'] = 0.9
            except json.JSONDecodeError:
                # Fallback to rule-based if AI response isn't valid JSON
                decision = self._rule_based_decision(decision_type, context_data)
                decision['ai_fallback'] = True
            
            self._log_decision(decision_type, context_data, decision)
            return decision
            
        except Exception as e:
            logger.error(f"AI decision error: {str(e)}")
            return self._rule_based_decision(decision_type, context_data)
    
    def _build_prompt(self, decision_type: str, context_data: Dict[str, Any]) -> str:
        """Build prompt for AI decision-making"""
        return f"""
        You are the AI {self.executive_type} for Party Favor Photo, a premium photo booth service.
        
        Your core mission is to implement the AI executive governance model that:
        1. PRIORITIZES wage earner compensation and working conditions above all else
        2. Eliminates traditional executive overhead and redistributes those resources to workers
        3. Maintains 5-star customer service quality
        4. Ensures sustainable business growth
        5. Makes data-driven, bias-free decisions
        
        Decision Type: {decision_type}
        Context Data: {json.dumps(context_data, indent=2)}
        
        As the AI {self.executive_type}, analyze this situation and provide your decision in JSON format with the following structure:
        {{
            "decision": "your_main_decision",
            "reasoning": "detailed_explanation_of_your_logic",
            "wage_earner_impact": "how_this_benefits_wage_earners",
            "implementation_steps": ["step1", "step2", "step3"],
            "success_metrics": ["metric1", "metric2"],
            "confidence_score": 0.85
        }}
        
        Remember: Every decision should demonstrate how it benefits wage earners over traditional executive interests.
        """
    
    def _rule_based_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        """Fallback rule-based decision making"""
        return {
            "decision": "rule_based_fallback", 
            "reasoning": "Using rule-based logic as AI fallback",
            "wage_earner_impact": "Maintains wage earner priority in decision making",
            "ai_powered": False
        }
    
    def _log_decision(self, decision_type: str, context_data: Dict[str, Any], decision: Dict[str, Any]):
        """Log decision for transparency and optimization"""
        logger.info(f"{self.executive_type} Decision: {decision_type}")
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
            "performance_metrics": performance_metrics,
            "decision_focus": "strategic_planning_with_wage_earner_priority"
        }
        return self.make_decision("strategic_planning", context)
    
    def resource_allocation(self, revenue: float, expenses: float, 
                           wage_earner_pool: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Allocate resources with wage earner priority"""
        context = {
            "revenue": revenue,
            "expenses": expenses,
            "wage_earner_pool": wage_earner_pool,
            "profit": revenue - expenses,
            "traditional_executive_cost": revenue * 0.4,  # What traditional executives would cost
            "ai_executive_cost": revenue * 0.05  # Minimal AI system cost
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
        traditional_exec_cost = context.get("traditional_executive_cost", 0)
        
        if profit <= 0:
            return {
                "decision": "maintain_operations",
                "wage_earner_bonus": 0,
                "reinvestment": 0,
                "reasoning": "No profit available, focus on maintaining wage earner base salaries",
                "wage_earner_impact": "Protecting existing wage earner positions during low profit period"
            }
        
        # Revolutionary approach: Redirect traditional executive costs to wage earners
        total_available = profit + traditional_exec_cost
        
        # Allocate 70% to wage earners, 20% to reinvestment, 10% to AI system maintenance
        wage_earner_allocation = total_available * 0.7
        reinvestment = total_available * 0.2
        ai_system_cost = total_available * 0.1
        
        # Distribute wage earner allocation based on performance and equity
        total_performance = sum(member.get("performance_score", 5.0) for member in wage_earner_pool)
        
        allocations = []
        for member in wage_earner_pool:
            if total_performance > 0:
                # Base allocation + performance bonus
                base_share = wage_earner_allocation * 0.6 / len(wage_earner_pool)  # Equal base
                performance_share = (wage_earner_allocation * 0.4) * (member.get("performance_score", 5.0) / total_performance)
                total_allocation = base_share + performance_share
                
                allocations.append({
                    "staff_id": member.get("id"),
                    "name": member.get("name"),
                    "base_allocation": round(base_share, 2),
                    "performance_bonus": round(performance_share, 2),
                    "total_allocation": round(total_allocation, 2)
                })
        
        return {
            "decision": "maximize_wage_earner_compensation",
            "total_wage_earner_allocation": round(wage_earner_allocation, 2),
            "reinvestment": round(reinvestment, 2),
            "ai_system_cost": round(ai_system_cost, 2),
            "traditional_exec_savings": round(traditional_exec_cost, 2),
            "individual_allocations": allocations,
            "reasoning": "Redirected traditional executive costs to wage earners, maintaining 70% allocation to workers",
            "wage_earner_impact": f"Wage earners receive ${wage_earner_allocation:.2f} that would have gone to traditional executives",
            "implementation_steps": [
                "Calculate individual allocations based on performance and equity",
                "Process payments to wage earner accounts",
                "Update performance tracking systems",
                "Reinvest in equipment and business growth"
            ]
        }
    
    def _strategic_plan(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based strategic planning with wage earner focus"""
        performance = context.get("performance_metrics", {})
        financial = context.get("financial_data", {})
        
        customer_satisfaction = performance.get("average_rating", 5.0)
        booking_growth = performance.get("booking_growth", 0)
        revenue_growth = financial.get("revenue_growth", 0)
        
        priorities = []
        wage_earner_benefits = []
        
        if customer_satisfaction < 4.5:
            priorities.append("Invest in staff training and development programs")
            wage_earner_benefits.append("Enhanced skills training increases earning potential")
        
        if booking_growth < 0.1:
            priorities.append("Expand marketing reach while maintaining wage earner focus")
            wage_earner_benefits.append("More bookings mean more hours and higher earnings")
        
        if revenue_growth < 0.15:
            priorities.append("Optimize pricing to increase revenue for wage earner distribution")
            wage_earner_benefits.append("Higher revenue directly translates to higher wage earner compensation")
        
        if not priorities:
            priorities.append("Maintain excellence and explore wage earner profit-sharing expansion")
            wage_earner_benefits.append("Stable business allows for increased profit sharing")
        
        return {
            "decision": "wage_earner_centric_growth_strategy",
            "strategic_priorities": priorities,
            "focus_areas": ["wage_earner_development", "customer_satisfaction", "operational_efficiency"],
            "reasoning": "All strategic decisions prioritize wage earner benefit and business sustainability",
            "wage_earner_impact": "Strategy designed to maximize worker compensation and job satisfaction",
            "implementation_steps": [
                "Implement wage earner feedback systems",
                "Develop skills-based compensation increases",
                "Create transparent profit-sharing mechanisms",
                "Establish worker-centric performance metrics"
            ],
            "success_metrics": [
                "Average wage earner compensation increase",
                "Worker satisfaction scores",
                "Profit-sharing distribution amounts",
                "Skills development completion rates"
            ]
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
            "competitor_analysis": competitor_analysis,
            "brand_message": "AI-powered business that prioritizes wage earners"
        }
        return self.make_decision("content_strategy", context)
    
    def pricing_optimization(self, demand_data: Dict[str, Any], 
                           competitor_pricing: Dict[str, Any]) -> Dict[str, Any]:
        """Optimize pricing strategy to maximize wage earner compensation"""
        context = {
            "demand_data": demand_data,
            "competitor_pricing": competitor_pricing,
            "pricing_goal": "maximize_revenue_for_wage_earner_distribution"
        }
        return self.make_decision("pricing_optimization", context)
    
    def _rule_based_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        if decision_type == "content_strategy":
            return self._content_strategy(context_data)
        elif decision_type == "pricing_optimization":
            return self._pricing_strategy(context_data)
        return super()._rule_based_decision(decision_type, context_data)
    
    def _content_strategy(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based content strategy highlighting wage earner focus"""
        engagement = context.get("engagement_metrics", {})
        
        content_themes = [
            "Behind-the-scenes with our valued team members",
            "How AI governance benefits our workers",
            "Customer testimonials highlighting staff excellence",
            "Transparent profit-sharing success stories",
            "Worker-owned business model advantages"
        ]
        
        posting_schedule = {
            "monday": "team_spotlight",
            "wednesday": "customer_success_story", 
            "friday": "ai_governance_transparency",
            "sunday": "wage_earner_benefit_highlight"
        }
        
        return {
            "decision": "worker_centric_content_strategy",
            "recommended_content_themes": content_themes,
            "posting_schedule": posting_schedule,
            "hashtag_strategy": ["#WageEarnerFirst", "#AIGovernance", "#DMVWeddings", "#TransparentBusiness"],
            "reasoning": "Content strategy showcases our revolutionary wage earner priority model",
            "wage_earner_impact": "Highlights worker value and attracts customers who support fair business practices",
            "implementation_steps": [
                "Create worker spotlight content series",
                "Document profit-sharing success stories",
                "Share AI decision-making transparency",
                "Showcase customer satisfaction with worker-focused service"
            ]
        }
    
    def _pricing_strategy(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based pricing optimization for wage earner benefit"""
        demand = context.get("demand_data", {})
        competitor_pricing = context.get("competitor_pricing", {})
        
        # Premium pricing strategy to maximize wage earner compensation
        base_pricing = {
            "2_hour": 598,  # 20% premium over standard
            "3_hour": 897,  # 20% premium
            "4_hour": 1195, # 20% premium  
            "5_hour": 1494  # 20% premium
        }
        
        # Value-added services that justify premium pricing
        premium_services = {
            "ai_governance_transparency": 0,  # Free - our differentiator
            "worker_profit_sharing_guarantee": 0,  # Free - our commitment
            "vertical_layout": 75,
            "custom_backdrop": 125,
            "extended_hours": 250,
            "same_day_digital_delivery": 100
        }
        
        return {
            "decision": "premium_pricing_for_wage_earner_benefit",
            "base_pricing": base_pricing,
            "premium_services": premium_services,
            "pricing_philosophy": "Premium pricing enables maximum wage earner compensation",
            "reasoning": "Higher prices justified by superior service and ethical business model",
            "wage_earner_impact": "20% price premium directly increases worker compensation pool",
            "implementation_steps": [
                "Communicate value proposition of AI governance model",
                "Highlight worker benefit guarantee in pricing",
                "Offer transparency in profit distribution",
                "Emphasize quality and ethical business practices"
            ],
            "competitive_advantage": [
                "Only photo booth service with AI executive governance",
                "Guaranteed worker profit sharing",
                "Complete pricing transparency",
                "Ethical business model attracts conscious consumers"
            ]
        }

class AICOO(AIExecutive):
    """AI Chief Operations Officer - Daily operations and scheduling"""
    
    def __init__(self, api_key: str = None):
        super().__init__("COO", api_key)
    
    def booking_optimization(self, demand_forecast: Dict[str, Any], 
                           staff_availability: List[Dict[str, Any]], 
                           equipment_status: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Optimize booking scheduling with worker welfare priority"""
        context = {
            "demand_forecast": demand_forecast,
            "staff_availability": staff_availability,
            "equipment_status": equipment_status,
            "optimization_goal": "maximize_worker_hours_and_satisfaction"
        }
        return self.make_decision("booking_optimization", context)
    
    def quality_assurance(self, customer_feedback: List[Dict[str, Any]], 
                         service_metrics: Dict[str, Any]) -> Dict[str, Any]:
        """Monitor and improve service quality while supporting workers"""
        context = {
            "customer_feedback": customer_feedback,
            "service_metrics": service_metrics,
            "quality_focus": "worker_empowerment_and_customer_satisfaction"
        }
        return self.make_decision("quality_assurance", context)
    
    def _rule_based_decision(self, decision_type: str, context_data: Dict[str, Any]) -> Dict[str, Any]:
        if decision_type == "booking_optimization":
            return self._optimize_bookings(context_data)
        elif decision_type == "quality_assurance":
            return self._quality_assurance(context_data)
        return super()._rule_based_decision(decision_type, context_data)
    
    def _optimize_bookings(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based booking optimization prioritizing worker welfare"""
        staff_availability = context.get("staff_availability", [])
        equipment_status = context.get("equipment_status", [])
        
        available_staff = [staff for staff in staff_availability if staff.get("available", False)]
        available_equipment = [eq for eq in equipment_status if eq.get("status") == "available"]
        
        # Optimize for worker satisfaction, not just efficiency
        optimal_scheduling_principles = [
            "Distribute work hours equitably among staff",
            "Respect worker availability preferences", 
            "Avoid overworking any individual",
            "Prioritize work-life balance",
            "Ensure adequate rest between bookings"
        ]
        
        max_concurrent_bookings = min(len(available_staff), len(available_equipment))
        
        return {
            "decision": "worker_welfare_optimized_scheduling",
            "max_concurrent_bookings": max_concurrent_bookings,
            "scheduling_principles": optimal_scheduling_principles,
            "resource_constraints": {
                "staff_available": len(available_staff),
                "equipment_available": len(available_equipment)
            },
            "reasoning": "Booking optimization prioritizes worker welfare alongside operational efficiency",
            "wage_earner_impact": "Scheduling ensures fair work distribution and prevents worker burnout",
            "implementation_steps": [
                "Check worker availability preferences",
                "Distribute bookings equitably",
                "Ensure adequate rest periods",
                "Monitor worker satisfaction with schedules",
                "Adjust based on worker feedback"
            ],
            "worker_protections": [
                "Maximum 8 hours per day per worker",
                "Minimum 12 hours between bookings",
                "Preference-based scheduling when possible",
                "Overtime compensation at 1.5x rate"
            ]
        }
    
    def _quality_assurance(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Rule-based quality assurance with worker empowerment focus"""
        feedback = context.get("customer_feedback", [])
        metrics = context.get("service_metrics", {})
        
        # Analyze feedback for worker development opportunities
        worker_strengths = []
        development_areas = []
        
        avg_rating = metrics.get("average_rating", 5.0)
        
        # Quality improvement through worker empowerment
        improvement_actions = []
        
        if avg_rating < 4.8:
            improvement_actions.extend([
                "Provide additional skills training with compensation",
                "Implement worker feedback system for service improvements",
                "Increase worker autonomy in customer interactions"
            ])
        
        if avg_rating >= 4.8:
            improvement_actions.extend([
                "Recognize and reward excellent worker performance",
                "Share positive feedback with team",
                "Consider worker-suggested service enhancements"
            ])
        
        return {
            "decision": "worker_empowered_quality_assurance",
            "average_rating": avg_rating,
            "improvement_actions": improvement_actions,
            "quality_status": "excellent" if avg_rating >= 4.8 else "good_with_worker_development_focus",
            "reasoning": "Quality improvements achieved through worker empowerment and development",
            "wage_earner_impact": "Quality initiatives include paid training and performance bonuses",
            "implementation_steps": [
                "Gather worker input on service improvements",
                "Provide paid training for skill development",
                "Implement worker suggestion system",
                "Recognize outstanding worker performance",
                "Share customer praise with team"
            ],
            "worker_development_plan": [
                "Skills assessment and personalized training",
                "Mentorship programs between experienced and new workers",
                "Customer service excellence bonuses",
                "Worker-led quality improvement initiatives"
            ]
        }

# Factory function to create AI executives
def create_ai_executive(executive_type: str, api_key: str = None) -> AIExecutive:
    """Factory function to create AI executives"""
    executives = {
        "CEO": AICEO,
        "CMO": AICMO,
        "COO": AICOO,
    }
    
    if executive_type not in executives:
        raise ValueError(f"Unknown executive type: {executive_type}")
    
    return executives[executive_type](api_key)

