# Party Favor Photo - Autonomous CMS Backend

Flask backend for the AI executive governance system.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set environment variables:
```bash
export GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the application:
```bash
python src/main.py
```

## API Documentation

The backend provides RESTful APIs for:
- Customer management and inquiries
- AI-powered booking and pricing
- Staff management and profit distribution
- Business analytics and AI insights

## AI Executive System

The system includes three AI executives:
- **AI CEO**: Strategic decisions and resource allocation
- **AI CMO**: Marketing and pricing optimization  
- **AI COO**: Operations and quality management

All decisions are logged for transparency and can be viewed via the API.

