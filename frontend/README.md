# Party Favor Photo - Autonomous CMS

A revolutionary photo booth service management system powered by AI executive governance, eliminating traditional management overhead and prioritizing wage earner compensation.

## 🚀 Revolutionary Business Model

This system implements the AI executive governance model described in [A Revolution for Wage Earners](https://medium.com/@josephandrewlee/a-revolution-for-wage-earners-212c1bdd6f0f), replacing traditional C-suite executives with AI decision-makers to redistribute resources directly to workers.

## 🤖 AI Executive Team

- **AI CEO**: Strategic planning, resource allocation, and wage earner prioritization
- **AI CMO**: Marketing strategy, pricing optimization, and partnership development  
- **AI COO**: Operations management, scheduling, and quality assurance

## 🏗️ Architecture

### Frontend (React + Vite)
- Modern React application with TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- Responsive design for mobile and desktop
- Real-time dashboard with AI insights
- Framer Motion animations
- React Router for navigation

### Backend (Flask + Python)
- RESTful API with Flask
- SQLite database for development
- AI decision-making with Gemini API integration
- Autonomous customer management
- Transparent profit distribution system

## 🔧 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.11+
- Git

### Frontend Setup
```bash
cd party-favor-autonomous-frontend-v2
pnpm install
pnpm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
export GEMINI_API_KEY=your_gemini_api_key_here
python src/main.py
```

## 🌐 Deployment

### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DevGruGold/party-favor-autonomous-cms&project-name=party-favor-autonomous-cms&repository-name=party-favor-autonomous-cms&root-directory=frontend)

1. Click the deploy button above
2. Connect your GitHub account
3. Deploy automatically

### Backend (Railway/Heroku)
1. Set environment variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `DATABASE_URL`: Production database URL
2. Deploy using platform-specific instructions

## 🔑 Environment Variables

### Backend
- `GEMINI_API_KEY`: Google Gemini API key for AI decision-making
- `DATABASE_URL`: Database connection string (optional, defaults to SQLite)
- `PORT`: Server port (defaults to 5000)

### Frontend
- `VITE_API_BASE_URL`: Backend API URL for production

## 📊 Key Features

### Autonomous Operations
- AI-powered customer inquiry processing
- Automated pricing optimization
- Intelligent scheduling and resource allocation
- Quality assurance monitoring

### Wage Earner Priority
- Transparent profit distribution (70% to workers)
- Performance-based compensation
- Worker welfare optimization
- Skills development investment

### Customer Experience
- Instant AI-powered quotes
- Real-time booking management
- Premium service quality
- Transparent business practices

### Modern UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation
- Professional styling with Tailwind CSS
- Accessible components with shadcn/ui

## 🔄 API Endpoints

### Customer Management
- `POST /api/inquiries` - Create new customer inquiry
- `GET /api/customers` - List all customers
- `POST /api/bookings/{id}/quote` - Generate AI quote
- `POST /api/bookings/{id}/confirm` - Confirm booking

### Business Operations
- `GET /api/dashboard` - Business dashboard with AI insights
- `POST /api/profit-distribution` - Distribute profits to wage earners
- `GET /api/staff` - Staff management
- `POST /api/optimization/pricing` - AI pricing optimization

### AI Transparency
- `GET /api/ai-decisions` - View all AI executive decisions
- `GET /api/ai-executives/status` - AI system status

## 💡 Innovation Highlights

1. **Zero Executive Overhead**: AI executives replace traditional management
2. **Wage Earner Priority**: 70% of profits go directly to workers
3. **Transparent Operations**: All AI decisions are logged and viewable
4. **Premium Positioning**: Higher prices justified by ethical business model
5. **Scalable Architecture**: Can be adapted to other service businesses
6. **Modern Technology Stack**: Built with latest React, Vite, and AI technologies

## 🔒 Security & Privacy

- Secure API key management
- Customer data protection
- Transparent AI decision logging
- GDPR-compliant data handling

## 📈 Business Impact

- **Cost Reduction**: Eliminates traditional executive salaries
- **Worker Empowerment**: Direct profit sharing with employees
- **Customer Trust**: Transparent, ethical business practices
- **Competitive Advantage**: Unique AI governance model

## 🤝 Contributing

This system serves as a proof-of-concept for AI executive governance. Contributions welcome for:
- Additional AI executive roles (CFO, CTO)
- Enhanced decision-making algorithms
- Integration with more business systems
- Mobile application development

## 📄 License

MIT License - See LICENSE file for details

## 🔗 Links

- [Original Article](https://medium.com/@josephandrewlee/a-revolution-for-wage-earners-212c1bdd6f0f)
- [Party Favor Photo Website](https://www.partyfavorphoto.com)
- [GitHub Repository](https://github.com/DevGruGold/party-favor-autonomous-cms)

---

*Revolutionizing business with AI executive governance • Eliminating traditional management overhead • Empowering wage earners*

