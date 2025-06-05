import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  Brain, 
  Users, 
  Calendar, 
  DollarSign, 
  Settings, 
  BarChart3, 
  Camera, 
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import './App.css';

// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : 'http://localhost:5000/api';

// Dashboard Component
function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    summary: { total_revenue: 0, total_bookings: 0, average_satisfaction: 5.0 },
    ai_insights: { strategic_priorities: [] }
  });
  const [staffCount, setStaffCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [dashboardResponse, staffResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/dashboard`),
        fetch(`${API_BASE_URL}/staff`)
      ]);

      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json();
        setDashboardData(dashboardData);
      }

      if (staffResponse.ok) {
        const staffData = await staffResponse.json();
        setStaffCount(staffData.length);
      }
    } catch (error) {
      console.log('Dashboard data will be available after initialization');
    } finally {
      setLoading(false);
    }
  };

  const createSampleData = async () => {
    try {
      setLoading(true);
      
      // Create sample staff
      await fetch(`${API_BASE_URL}/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Alex Rodriguez',
          email: 'alex@partyfavorphoto.com',
          phone: '555-0101',
          role: 'photographer',
          hourly_rate: 75.00,
          skills: ['photography', 'customer_service', 'equipment_setup'],
          availability: { 'monday': true, 'tuesday': true, 'wednesday': true, 'thursday': true, 'friday': true, 'saturday': true, 'sunday': true }
        })
      });

      await fetch(`${API_BASE_URL}/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Sarah Chen',
          email: 'sarah@partyfavorphoto.com',
          phone: '555-0102',
          role: 'attendant',
          hourly_rate: 45.00,
          skills: ['customer_service', 'event_coordination'],
          availability: { 'friday': true, 'saturday': true, 'sunday': true }
        })
      });

      // Create sample equipment
      await fetch(`${API_BASE_URL}/equipment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Canon EOS R5 Camera',
          equipment_type: 'camera',
          status: 'available',
          purchase_date: '2024-01-15',
          purchase_price: 3899.00,
          notes: 'Primary camera for photo booth'
        })
      });

      // Create sample inquiry
      await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Emily Johnson',
          email: 'emily.johnson@email.com',
          phone: '555-0201',
          event_type: 'wedding',
          event_date: '2024-08-15T18:00:00',
          duration_hours: 4,
          venue_name: 'The Mansion on O Street',
          guest_count: 150,
          package_type: '4hr',
          special_requests: 'Gold sequin backdrop, vertical layout for social media',
          backdrop_color: 'gold',
          layout_type: 'vertical'
        })
      });

      alert('Sample data created successfully! The AI executives are now managing the business.');
      loadDashboardData();
    } catch (error) {
      alert('Error creating sample data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const distributeProfit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profit-distribution`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          revenue: 10000,
          expenses: 6000
        })
      });

      const data = await response.json();
      alert(`AI CEO Profit Distribution:\n\nTotal Distributed to Wage Earners: $${data.total_distributed}\nStaff Members Benefited: ${data.staff_updated}\n\nThis demonstrates the AI executive model prioritizing wage earners over traditional executive compensation.`);
      loadDashboardData();
    } catch (error) {
      alert('Error distributing profits: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Executives Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-lg">AI CEO</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">ACTIVE</Badge>
            </div>
            <CardDescription>Chief Executive Officer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Strategic planning, resource allocation, and wage earner prioritization
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-lg">AI CMO</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">ACTIVE</Badge>
            </div>
            <CardDescription>Chief Marketing Officer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Marketing strategy, pricing optimization, and partnership development
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Settings className="h-6 w-6 text-green-600" />
                <CardTitle className="text-lg">AI COO</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">ACTIVE</Badge>
            </div>
            <CardDescription>Chief Operations Officer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Operations management, scheduling, and quality assurance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Business Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span>Business Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${dashboardData.summary.total_revenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {dashboardData.summary.total_bookings}
              </div>
              <div className="text-sm text-gray-600">Active Bookings</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {dashboardData.summary.average_satisfaction.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {staffCount}
              </div>
              <div className="text-sm text-gray-600">Active Staff</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button onClick={createSampleData} disabled={loading} className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Initialize Sample Data
            </Button>
            <Button onClick={distributeProfit} variant="outline" className="w-full">
              <DollarSign className="h-4 w-4 mr-2" />
              Distribute Profits
            </Button>
            <Button variant="outline" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              Optimize Pricing
            </Button>
            <Button variant="outline" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {dashboardData.ai_insights.strategic_priorities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-6 w-6" />
              <span>AI Executive Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h4 className="font-semibold">Strategic Priorities:</h4>
              <ul className="list-disc list-inside space-y-1">
                {dashboardData.ai_insights.strategic_priorities.map((priority, index) => (
                  <li key={index} className="text-sm text-gray-600">{priority}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Customer Inquiry Form Component
function CustomerInquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    event_date: '',
    duration_hours: 3,
    venue_name: '',
    guest_count: '',
    package_type: '3hr',
    special_requests: '',
    backdrop_color: '',
    layout_type: 'horizontal'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        alert('Thank you for your inquiry! Our AI system has processed your request and you\'ll receive a response within 2 hours.');
      } else {
        alert('Error submitting inquiry. Please try again.');
      }
    } catch (error) {
      alert('Error submitting inquiry: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <Sparkles className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Inquiry Submitted Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Our AI executives are processing your request and will respond within 2 hours with a personalized quote.
          </p>
          <Button onClick={() => setSubmitted(false)}>
            Submit Another Inquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="h-6 w-6" />
          <span>Event Inquiry Form</span>
        </CardTitle>
        <CardDescription>
          Tell us about your event and our AI executives will create a personalized quote for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event_type">Event Type *</Label>
              <Select value={formData.event_type} onValueChange={(value) => handleChange('event_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                  <SelectItem value="birthday">Birthday Party</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event_date">Event Date *</Label>
              <Input
                id="event_date"
                type="datetime-local"
                value={formData.event_date}
                onChange={(e) => handleChange('event_date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="package_type">Package Duration *</Label>
              <Select value={formData.package_type} onValueChange={(value) => handleChange('package_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2hr">2 Hours - $498</SelectItem>
                  <SelectItem value="3hr">3 Hours - $747</SelectItem>
                  <SelectItem value="4hr">4 Hours - $996</SelectItem>
                  <SelectItem value="5hr">5 Hours - $1,245</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue_name">Venue Name</Label>
              <Input
                id="venue_name"
                value={formData.venue_name}
                onChange={(e) => handleChange('venue_name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guest_count">Expected Guest Count</Label>
              <Input
                id="guest_count"
                type="number"
                value={formData.guest_count}
                onChange={(e) => handleChange('guest_count', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backdrop_color">Preferred Backdrop Color</Label>
              <Select value={formData.backdrop_color} onValueChange={(value) => handleChange('backdrop_color', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select backdrop color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gold">Gold Sequin</SelectItem>
                  <SelectItem value="silver">Silver Sequin</SelectItem>
                  <SelectItem value="rose_gold">Rose Gold Sequin</SelectItem>
                  <SelectItem value="black">Black Sequin</SelectItem>
                  <SelectItem value="white">White Sequin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="layout_type">Photo Layout</Label>
              <Select value={formData.layout_type} onValueChange={(value) => handleChange('layout_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="horizontal">Horizontal (Traditional)</SelectItem>
                  <SelectItem value="vertical">Vertical (Social Media Optimized)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_requests">Special Requests or Notes</Label>
            <Textarea
              id="special_requests"
              value={formData.special_requests}
              onChange={(e) => handleChange('special_requests', e.target.value)}
              placeholder="Any special requirements, themes, or additional services you'd like to discuss..."
              rows={4}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Processing...' : 'Submit Inquiry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Staff Management Component
function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/staff`);
      if (response.ok) {
        const data = await response.json();
        setStaff(data);
      }
    } catch (error) {
      console.error('Error loading staff:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span>Staff Management</span>
          </CardTitle>
          <CardDescription>
            Manage your team members and their compensation in the autonomous system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading staff data...</div>
          ) : staff.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No staff members found. Initialize sample data to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staff.map((member) => (
                <Card key={member.id} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                    <CardDescription className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{member.email}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Hourly Rate:</span>
                        <span className="font-semibold">${member.hourly_rate}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Performance:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{member.performance_score.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Earnings:</span>
                        <span className="font-semibold text-green-600">${member.total_earnings.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// About Component
function About() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-red-500" />
            <span>About Party Favor Photo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Our Revolutionary Approach</h3>
            <p className="text-gray-600 leading-relaxed">
              Party Favor Photo is pioneering a new business model that eliminates traditional executive overhead 
              through AI-driven governance. Our autonomous CMS system replaces human executives with AI decision-makers, 
              allowing us to redistribute resources directly to our wage earners while maintaining exceptional service quality.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">The AI Executive Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Brain className="h-8 w-8 text-blue-600 mb-2" />
                <h4 className="font-semibold">AI CEO</h4>
                <p className="text-sm text-gray-600">
                  Makes strategic decisions and allocates resources with wage earner priority
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <h4 className="font-semibold">AI CMO</h4>
                <p className="text-sm text-gray-600">
                  Handles marketing, pricing optimization, and partnership development
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <Settings className="h-8 w-8 text-green-600 mb-2" />
                <h4 className="font-semibold">AI COO</h4>
                <p className="text-sm text-gray-600">
                  Manages operations, scheduling, and quality assurance
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <Camera className="h-8 w-8 text-indigo-600 mb-2" />
                <h4 className="font-semibold">StudioStation Photo Booth</h4>
                <p className="text-sm text-gray-600">
                  Professional DSLR cameras, studio-quality lighting, and premium printing
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <Sparkles className="h-8 w-8 text-pink-600 mb-2" />
                <h4 className="font-semibold">Customizable Experience</h4>
                <p className="text-sm text-gray-600">
                  Sequin backdrops, custom templates, and vertical layouts for social media
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>(202) 798-0610</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>info@partyfavorphoto.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Serving the entire DMV area (DC, Maryland, Northern Virginia)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2">
                  <Camera className="h-8 w-8 text-indigo-600" />
                  <span className="text-xl font-bold text-gray-900">Party Favor Photo</span>
                </Link>
                <div className="hidden md:flex space-x-6">
                  <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link to="/inquiry" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                    Book Event
                  </Link>
                  <Link to="/staff" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                    Staff
                  </Link>
                  <Link to="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                    About
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Shield className="h-3 w-3 mr-1" />
                  AI Autonomous
                </Badge>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inquiry" element={<CustomerInquiry />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-600">
                🚀 Revolutionizing business with AI executive governance
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Eliminating traditional management overhead • Empowering wage earners
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

