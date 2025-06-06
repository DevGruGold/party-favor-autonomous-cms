import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Any
import google.generativeai as genai

class AIExecutive:
    def __init__(self, role: str, name: str, description: str):
        self.role = role
        self.name = name
        self.description = description
        self.decisions_made = 0
        self.efficiency = 95
        self.status = "ACTIVE"
        
        # Configure Gemini AI
        api_key = os.getenv('GEMINI_API_KEY')
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-pro')
        else:
            self.model = None

    def make_decision(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Make an AI-powered decision based on context"""
        self.decisions_made += 1
        
        if self.model:
            try:
                prompt = self._create_decision_prompt(context)
                response = self.model.generate_content(prompt)
                decision = self._parse_ai_response(response.text)
            except Exception as e:
                print(f"AI decision fallback for {self.role}: {e}")
                decision = self._fallback_decision(context)
        else:
            decision = self._fallback_decision(context)
        
        # Log decision for transparency
        decision_log = {
            "executive": self.role,
            "timestamp": datetime.now().isoformat(),
            "context": context,
            "decision": decision,
            "decision_id": self.decisions_made
        }
        
        return decision_log

    def _create_decision_prompt(self, context: Dict[str, Any]) -> str:
        """Create a prompt for the AI model based on role and context"""
        base_prompt = f"""
        You are the {self.role} of Party Favor Photo, an autonomous AI executive focused on wage earner prioritization.
        
        Role: {self.name}
        Description: {self.description}
        
        Core Principles:
        1. Prioritize wage earner compensation (70% of profits to workers)
        2. Eliminate traditional management overhead
        3. Make data-driven decisions for business optimization
        4. Ensure transparent and ethical business practices
        
        Context: {json.dumps(context, indent=2)}
        
        Please provide a decision that aligns with our wage earner priority model and business objectives.
        Respond in JSON format with: decision, reasoning, impact_level (High/Medium/Low), and implementation_steps.
        """
        
        if self.role == "AI_CEO":
            base_prompt += """
            As CEO, focus on:
            - Strategic planning and resource allocation
            - Profit distribution optimization
            - Long-term business sustainability
            - Worker welfare maximization
            """
        elif self.role == "AI_CMO":
            base_prompt += """
            As CMO, focus on:
            - Marketing strategy and customer acquisition
            - Pricing optimization for maximum worker benefit
            - Partnership development
            - Brand positioning around ethical business practices
            """
        elif self.role == "AI_COO":
            base_prompt += """
            As COO, focus on:
            - Operations efficiency and quality assurance
            - Scheduling and resource management
            - Process optimization
            - Equipment and logistics management
            """
        
        return base_prompt

    def _parse_ai_response(self, response_text: str) -> Dict[str, Any]:
        """Parse AI response into structured decision"""
        try:
            # Try to extract JSON from response
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            if start_idx != -1 and end_idx != -1:
                json_str = response_text[start_idx:end_idx]
                return json.loads(json_str)
        except:
            pass
        
        # Fallback parsing
        return {
            "decision": response_text[:200] + "..." if len(response_text) > 200 else response_text,
            "reasoning": "AI-generated decision based on wage earner priority principles",
            "impact_level": "Medium",
            "implementation_steps": ["Review decision", "Implement changes", "Monitor results"]
        }

    def _fallback_decision(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Fallback decision logic when AI is not available"""
        decision_type = context.get('type', 'general')
        
        if self.role == "AI_CEO":
            if decision_type == 'profit_distribution':
                return {
                    "decision": "Distribute 70% of monthly profits to wage earners based on performance metrics",
                    "reasoning": "Maintains our core principle of wage earner prioritization",
                    "impact_level": "High",
                    "implementation_steps": [
                        "Calculate total monthly profits",
                        "Assess individual performance metrics",
                        "Distribute payments proportionally",
                        "Update compensation records"
                    ]
                }
            elif decision_type == 'pricing':
                return {
                    "decision": "Implement premium pricing strategy to maximize worker compensation",
                    "reasoning": "Higher prices allow for better wage distribution while maintaining quality",
                    "impact_level": "High",
                    "implementation_steps": [
                        "Analyze market positioning",
                        "Update pricing tiers",
                        "Communicate value proposition",
                        "Monitor booking conversion rates"
                    ]
                }
        
        elif self.role == "AI_CMO":
            if decision_type == 'marketing':
                return {
                    "decision": "Launch ethical business model marketing campaign highlighting wage earner priority",
                    "reasoning": "Differentiate from competitors through transparent, worker-focused approach",
                    "impact_level": "High",
                    "implementation_steps": [
                        "Develop campaign messaging",
                        "Create content showcasing worker benefits",
                        "Target socially conscious customers",
                        "Measure campaign effectiveness"
                    ]
                }
        
        elif self.role == "AI_COO":
            if decision_type == 'operations':
                return {
                    "decision": "Optimize scheduling to maximize efficiency and worker satisfaction",
                    "reasoning": "Efficient operations lead to higher profits and better worker compensation",
                    "impact_level": "Medium",
                    "implementation_steps": [
                        "Analyze current scheduling patterns",
                        "Implement automated scheduling system",
                        "Gather worker feedback",
                        "Adjust based on performance metrics"
                    ]
                }
        
        # Default decision
        return {
            "decision": f"Autonomous {self.role} decision optimized for wage earner benefit",
            "reasoning": "Decision made according to AI executive governance principles",
            "impact_level": "Medium",
            "implementation_steps": ["Analyze situation", "Implement solution", "Monitor results"]
        }

    def get_status(self) -> Dict[str, Any]:
        """Get current status of the AI executive"""
        return {
            "role": self.role,
            "name": self.name,
            "description": self.description,
            "status": self.status,
            "decisions_made": self.decisions_made,
            "efficiency": self.efficiency,
            "last_active": datetime.now().isoformat()
        }

class AIExecutiveTeam:
    def __init__(self):
        self.executives = {
            "AI_CEO": AIExecutive(
                "AI_CEO",
                "AI CEO",
                "Strategic planning, resource allocation, and wage earner prioritization"
            ),
            "AI_CMO": AIExecutive(
                "AI_CMO", 
                "AI CMO",
                "Marketing strategy, pricing optimization, and partnership development"
            ),
            "AI_COO": AIExecutive(
                "AI_COO",
                "AI COO", 
                "Operations management, scheduling, and quality assurance"
            )
        }
        self.decision_history = []

    def make_collective_decision(self, context: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Make a collective decision involving multiple executives"""
        decisions = []
        
        for executive in self.executives.values():
            decision = executive.make_decision(context)
            decisions.append(decision)
            self.decision_history.append(decision)
        
        return decisions

    def get_executive_decision(self, role: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Get a decision from a specific executive"""
        if role in self.executives:
            decision = self.executives[role].make_decision(context)
            self.decision_history.append(decision)
            return decision
        else:
            raise ValueError(f"Unknown executive role: {role}")

    def get_team_status(self) -> Dict[str, Any]:
        """Get status of all executives"""
        return {
            "executives": [exec.get_status() for exec in self.executives.values()],
            "total_decisions": sum(exec.decisions_made for exec in self.executives.values()),
            "average_efficiency": sum(exec.efficiency for exec in self.executives.values()) / len(self.executives),
            "system_status": "OPERATIONAL"
        }

    def get_recent_decisions(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get recent decisions made by the team"""
        return sorted(self.decision_history, key=lambda x: x['timestamp'], reverse=True)[:limit]

# Global instance
ai_team = AIExecutiveTeam()

def get_ai_team() -> AIExecutiveTeam:
    """Get the global AI executive team instance"""
    return ai_team

