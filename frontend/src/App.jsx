import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Camera, Users, Brain, Calendar, DollarSign, Star, Phone, MapPin, Clock, TrendingUp, Award, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Textarea } from './components/ui/textarea'
import { Badge } from './components/ui/badge'
import './App.css'

// Navigation Component with Party Favor Photo Branding
function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: TrendingUp, color: 'bg-pfp-blue' },
    { path: '/bookings', label: 'Bookings', icon: Calendar, color: 'bg-pfp-green' },
    { path: '/customers', label: 'Customers', icon: Users, color: 'bg-pfp-orange' },
    { path: '/staff', label: 'Staff', icon: Users, color: 'bg-pfp-red' },
    { path: '/ai-executives', label: 'AI Executives', icon: Brain, color: 'bg-pfp-gold' },
    { path: '/equipment', label: 'Equipment', icon: Camera, color: 'bg-pfp-black' }
  ]

  return (
    <nav className="bg-white shadow-lg border-b-4 border-pfp-red">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <Camera className="h-8 w-8 pfp-red" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pfp-gold rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold pfp-black">partyfavorphoto</span>
              <span className="text-xs pfp-blue">Internal CMS</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? `${item.color} text-white shadow-lg` 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4 pfp-green" />
              <span>(202) 798-0610</span>
            </div>
            <Badge variant="outline" className="pfp-gold">AI Autonomous</Badge>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Dashboard Component
function Dashboard() {
  const [metrics, setMetrics] = useState({
    monthlyRevenue: 18750,
    revenueGrowth: 15,
    activeBookings: 14,
    customerRating: 4.9,
    totalReviews: 127,
    staffMembers: 3,
    profitDistribution: 70
  })

  const aiExecutives = [
    {
      role: 'AI CEO',
      name: 'Strategic Executive',
      efficiency: 98,
      focus: 'Wage Earner Prioritization & Growth Strategy',
      decisions: 52,
      latestDecision: 'Approved 18% salary increase for all staff members',
      color: 'bg-pfp-red'
    },
    {
      role: 'AI CMO',
      name: 'Marketing Executive', 
      efficiency: 96,
      focus: 'Premium Pricing & Brand Positioning',
      decisions: 38,
      latestDecision: 'Optimized pricing strategy to maximize staff compensation',
      color: 'bg-pfp-blue'
    },
    {
      role: 'AI COO',
      name: 'Operations Executive',
      efficiency: 97,
      focus: 'Service Quality & Staff Empowerment',
      decisions: 31,
      latestDecision: 'Implemented new quality standards for StudioStation equipment',
      color: 'bg-pfp-green'
    }
  ]

  const recentBookings = [
    { client: 'Sarah & Mike Wedding', date: '2024-06-15', package: '3hr StudioStation', amount: 747, status: 'confirmed' },
    { client: 'TechCorp Annual Party', date: '2024-06-20', package: '4hr StudioStation', amount: 996, status: 'confirmed' },
    { client: 'Johnson Anniversary', date: '2024-06-25', package: '2hr StudioStation', amount: 498, status: 'pending' },
    { client: 'Metro Bank Event', date: '2024-06-28', package: '3hr StudioStation', amount: 747, status: 'confirmed' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pfp-red to-pfp-orange text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Party Favor Photo - Internal CMS</h1>
        <p className="text-lg opacity-90">AI-Powered Business Management • Wage Earner Prioritization • StudioStation Excellence</p>
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Award-Winning Service</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>70% Profit to Staff</span>
          </div>
          <div className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>StudioStation Technology</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-pfp-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pfp-green">${metrics.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">+{metrics.revenueGrowth}% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-pfp-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pfp-blue">{metrics.activeBookings}</div>
            <p className="text-xs text-gray-600">StudioStation events</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-pfp-gold">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Customer Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1">
              <div className="text-2xl font-bold pfp-gold">{metrics.customerRating}</div>
              <Star className="h-5 w-5 fill-current pfp-gold" />
            </div>
            <p className="text-xs text-gray-600">Based on {metrics.totalReviews} reviews</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-pfp-red">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pfp-red">{metrics.staffMembers}</div>
            <p className="text-xs text-gray-600">All earning profit share</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Executive Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 pfp-gold" />
            <span>AI Executive Performance</span>
          </CardTitle>
          <CardDescription>
            Autonomous decision-making focused on wage earner prioritization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiExecutives.map((exec, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{exec.role}</h3>
                  <Badge className={`${exec.color} text-white`}>
                    {exec.efficiency}% Efficient
                  </Badge>
                </div>
                <p className="text-sm font-medium text-gray-700">{exec.focus}</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Decisions Made: {exec.decisions}</p>
                  <p className="text-xs text-gray-800">Latest: {exec.latestDecision}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 pfp-blue" />
            <span>Recent StudioStation Bookings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="space-y-1">
                  <h4 className="font-medium">{booking.client}</h4>
                  <p className="text-sm text-gray-600">{booking.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-semibold pfp-green">${booking.amount}</p>
                  <p className="text-sm text-gray-600">{booking.package}</p>
                </div>
                <Badge 
                  variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                  className={booking.status === 'confirmed' ? 'bg-pfp-green text-white' : ''}
                >
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Bookings Component
function Bookings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold pfp-black">StudioStation Bookings</h1>
        <Button className="bg-pfp-green hover:bg-pfp-green text-white">
          <Calendar className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600">Booking management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Customers Component  
function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold pfp-black">Customer Management</h1>
        <Button className="bg-pfp-orange hover:bg-pfp-orange text-white">
          <Users className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600">Customer management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Staff Component
function Staff() {
  const staffMembers = [
    {
      name: 'Alex Rodriguez',
      role: 'Lead Photographer',
      baseSalary: 3200,
      profitShare: 850,
      totalEarnings: 4050,
      efficiency: 98,
      eventsThisMonth: 12
    },
    {
      name: 'Maria Santos', 
      role: 'Equipment Specialist',
      baseSalary: 2800,
      profitShare: 720,
      totalEarnings: 3520,
      efficiency: 96,
      eventsThisMonth: 10
    },
    {
      name: 'Joe (Owner)',
      role: 'Business Owner',
      baseSalary: 2500,
      profitShare: 500,
      totalEarnings: 3000,
      efficiency: 94,
      eventsThisMonth: 8
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold pfp-black">Staff Management</h1>
        <Badge className="bg-pfp-red text-white text-lg px-4 py-2">
          70% Profit Distribution to Staff
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {staffMembers.map((member, index) => (
          <Card key={index} className="border-l-4 border-pfp-red">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{member.name}</span>
                <Badge className="bg-pfp-blue text-white">{member.efficiency}%</Badge>
              </CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Base Salary:</span>
                  <span className="font-medium">${member.baseSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Profit Share:</span>
                  <span className="font-medium pfp-green">+${member.profitShare}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Total Earnings:</span>
                  <span className="font-bold pfp-red">${member.totalEarnings}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Events This Month: {member.eventsThisMonth}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="pfp-gold">Wage Earner Prioritization Model</CardTitle>
          <CardDescription>
            Revolutionary business model eliminating traditional executive overhead
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold pfp-red">Traditional Model vs Our Model</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Executive Overhead:</span>
                  <span className="pfp-red">$0 (AI Managed)</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff Compensation:</span>
                  <span className="pfp-green">70% of profits</span>
                </div>
                <div className="flex justify-between">
                  <span>Reinvestment:</span>
                  <span className="pfp-blue">20% of profits</span>
                </div>
                <div className="flex justify-between">
                  <span>Owner Share:</span>
                  <span className="pfp-gold">10% of profits</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold pfp-blue">Monthly Profit Distribution</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Monthly Profit:</span>
                  <span className="font-bold">$8,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff Share (70%):</span>
                  <span className="pfp-green font-bold">$5,950</span>
                </div>
                <div className="flex justify-between">
                  <span>Equipment/Growth (20%):</span>
                  <span className="pfp-blue">$1,700</span>
                </div>
                <div className="flex justify-between">
                  <span>Owner Share (10%):</span>
                  <span className="pfp-gold">$850</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// AI Executives Component
function AIExecutives() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold pfp-black">AI Executive Governance</h1>
        <Badge className="bg-pfp-gold text-white text-lg px-4 py-2">
          <Zap className="h-4 w-4 mr-2" />
          Autonomous Operations
        </Badge>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600">AI Executive dashboard coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Equipment Component
function Equipment() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold pfp-black">StudioStation Equipment</h1>
        <Button className="bg-pfp-black hover:bg-pfp-black text-white">
          <Camera className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600">Equipment management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/ai-executives" element={<AIExecutives />} />
            <Route path="/equipment" element={<Equipment />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

