import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Brain, 
  DollarSign, 
  TrendingUp, 
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Progress } from './components/ui/progress'
import { Separator } from './components/ui/separator'
import { Alert, AlertDescription } from './components/ui/alert'
import './index.css'

// Mock data for demonstration
const mockData = {
  dashboard: {
    revenue: 15750,
    bookings: 12,
    rating: 4.9,
    staff: 3
  },
  aiExecutives: [
    {
      id: 1,
      role: 'AI CEO',
      name: 'Strategic Executive',
      efficiency: 98,
      decisions: 47,
      focus: 'Wage Earner Prioritization & Growth Strategy',
      lastDecision: 'Approved 15% salary increase for all staff',
      status: 'active'
    },
    {
      id: 2,
      role: 'AI CMO',
      name: 'Marketing Executive',
      efficiency: 95,
      decisions: 32,
      focus: 'Premium Pricing & Brand Positioning',
      lastDecision: 'Optimized pricing strategy for maximum staff compensation',
      status: 'active'
    },
    {
      id: 3,
      role: 'AI COO',
      name: 'Operations Executive',
      efficiency: 97,
      decisions: 28,
      focus: 'Service Quality & Staff Empowerment',
      lastDecision: 'Implemented new quality standards for StudioStation',
      status: 'active'
    }
  ],
  staff: [
    {
      id: 1,
      name: 'Alex Rodriguez',
      role: 'Lead Photographer',
      baseSalary: 2850,
      profitShare: 1200,
      totalEarnings: 4050,
      performance: 96,
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Event Coordinator',
      baseSalary: 2400,
      profitShare: 950,
      totalEarnings: 3350,
      performance: 94,
      status: 'active'
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      role: 'Equipment Specialist',
      baseSalary: 2200,
      profitShare: 850,
      totalEarnings: 3050,
      performance: 92,
      status: 'active'
    }
  ],
  recentBookings: [
    { id: 1, client: 'Sarah & Mike Wedding', date: '2024-06-15', package: '3hr StudioStation', amount: 747 },
    { id: 2, client: 'TechCorp Annual Party', date: '2024-06-20', package: '4hr StudioStation', amount: 996 },
    { id: 3, client: 'Johnson Anniversary', date: '2024-06-25', package: '2hr StudioStation', amount: 498 }
  ]
}

// Navigation component with Party Favor Photo branding
const Navigation = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: BarChart3, color: 'pfp-blue' },
    { path: '/inquiry', label: 'Book Event', icon: Calendar, color: 'pfp-orange' },
    { path: '/staff', label: 'Staff', icon: Users, color: 'pfp-green' },
    { path: '/executives', label: 'AI Executives', icon: Brain, color: 'pfp-red' },
    { path: '/about', label: 'About', icon: Heart, color: 'pink-500' }
  ]

  return (
    <nav className="bg-white shadow-lg border-b-4 border-pfp-gold">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <Camera className="h-8 w-8 text-pfp-red" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pfp-blue rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pfp-green rounded-full"></div>
              <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-pfp-orange rounded-full"></div>
            </div>
            <div className="text-xl font-bold">
              <span className="text-pfp-blue">party</span>
              <span className="text-pfp-green">favor</span>
              <span className="text-pfp-orange">photo</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? `bg-${item.color} text-white shadow-lg` 
                      : `text-gray-600 hover:bg-${item.color} hover:text-white hover:shadow-md`
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4 text-pfp-red" />
              <span>(202) 798-0610</span>
            </div>
            <Badge variant="outline" className="text-pfp-gold border-pfp-gold">
              AI Autonomous
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Dashboard component with Party Favor Photo branding
const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pfp-red via-pfp-orange to-pfp-gold text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Party Favor Photo - Autonomous CMS</h1>
        <p className="text-lg opacity-90">AI-Powered Business Management • Wage Earner Prioritization • StudioStation Excellence</p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Award-Winning Service</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>70% Profit to Staff</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>StudioStation Technology</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-pfp-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pfp-blue">${mockData.dashboard.revenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-pfp-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pfp-green">{mockData.dashboard.bookings}</div>
            <p className="text-xs text-gray-500 mt-1">StudioStation events</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-pfp-orange">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Customer Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-pfp-orange">{mockData.dashboard.rating}</div>
              <Star className="h-5 w-5 text-pfp-gold fill-current" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on 127 reviews</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-pfp-red">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pfp-red">{mockData.dashboard.staff}</div>
            <p className="text-xs text-gray-500 mt-1">All earning profit share</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Executives Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-pfp-red" />
            <span>AI Executive Performance</span>
          </CardTitle>
          <CardDescription>Autonomous decision-making focused on wage earner prioritization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockData.aiExecutives.map((exec) => (
              <div key={exec.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-pfp-black">{exec.role}</h3>
                  <Badge variant="outline" className="text-pfp-green border-pfp-green">
                    {exec.efficiency}% Efficient
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exec.focus}</p>
                <div className="text-xs text-gray-500">
                  <div>Decisions Made: {exec.decisions}</div>
                  <div className="mt-1 font-medium">Latest: {exec.lastDecision}</div>
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
            <Calendar className="h-5 w-5 text-pfp-orange" />
            <span>Recent StudioStation Bookings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-pfp-black">{booking.client}</div>
                  <div className="text-sm text-gray-500">{booking.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-pfp-green">${booking.amount}</div>
                  <div className="text-xs text-gray-500">{booking.package}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Event Inquiry Form with Party Favor Photo branding
const EventInquiry = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    packageDuration: '3 Hours - $747',
    venueName: '',
    guestCount: '',
    backdropColor: '',
    photoLayout: 'Horizontal (Traditional)',
    specialRequests: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! Our AI executives will review your inquiry and send a personalized quote within 24 hours.')
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-pfp-blue to-pfp-green text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Event Inquiry Form</h1>
        <p className="text-lg">Tell us about your event and our AI executives will create a personalized quote for you</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-pfp-red" />
            <span>Event Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  required
                  className="border-pfp-gold focus:border-pfp-red"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="border-pfp-gold focus:border-pfp-red"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="border-pfp-gold focus:border-pfp-red"
                />
              </div>
              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Select value={formData.eventType} onValueChange={(value) => handleChange('eventType', value)}>
                  <SelectTrigger className="border-pfp-gold focus:border-pfp-red">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate">Event Date *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleChange('eventDate', e.target.value)}
                  required
                  className="border-pfp-gold focus:border-pfp-red"
                />
              </div>
              <div>
                <Label htmlFor="packageDuration">Package Duration *</Label>
                <Select value={formData.packageDuration} onValueChange={(value) => handleChange('packageDuration', value)}>
                  <SelectTrigger className="border-pfp-gold focus:border-pfp-red">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2 Hours - $498">2 Hours - $498</SelectItem>
                    <SelectItem value="3 Hours - $747">3 Hours - $747</SelectItem>
                    <SelectItem value="4 Hours - $996">4 Hours - $996</SelectItem>
                    <SelectItem value="5 Hours - $1245">5 Hours - $1245</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="venueName">Venue Name</Label>
                <Input
                  id="venueName"
                  value={formData.venueName}
                  onChange={(e) => handleChange('venueName', e.target.value)}
                  className="border-pfp-gold focus:border-pfp-red"
                />
              </div>
              <div>
                <Label htmlFor="guestCount">Expected Guest Count</Label>
                <Input
                  id="guestCount"
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) => handleChange('guestCount', e.target.value)}
                  className="border-pfp-gold focus:border-pfp-red"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="backdropColor">Preferred Backdrop Color</Label>
                <Select value={formData.backdropColor} onValueChange={(value) => handleChange('backdropColor', value)}>
                  <SelectTrigger className="border-pfp-gold focus:border-pfp-red">
                    <SelectValue placeholder="Select backdrop color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gold-sequin">Gold Sequin</SelectItem>
                    <SelectItem value="silver-sequin">Silver Sequin</SelectItem>
                    <SelectItem value="rose-gold-sequin">Rose Gold Sequin</SelectItem>
                    <SelectItem value="black-sequin">Black Sequin</SelectItem>
                    <SelectItem value="white-sequin">White Sequin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="photoLayout">Photo Layout</Label>
                <Select value={formData.photoLayout} onValueChange={(value) => handleChange('photoLayout', value)}>
                  <SelectTrigger className="border-pfp-gold focus:border-pfp-red">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Horizontal (Traditional)">Horizontal (Traditional)</SelectItem>
                    <SelectItem value="Vertical (Social Media Optimized)">Vertical (Social Media Optimized)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests or Notes</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleChange('specialRequests', e.target.value)}
                rows={4}
                className="border-pfp-gold focus:border-pfp-red"
              />
            </div>

            {/* Pricing Display */}
            <div className="bg-pfp-gold/10 border border-pfp-gold rounded-lg p-4">
              <div className="flex items-center space-x-2 text-pfp-black">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">Estimated package price:</span>
              </div>
              <div className="text-2xl font-bold text-pfp-green mt-1">
                ${formData.packageDuration.includes('$498') ? '498' : 
                   formData.packageDuration.includes('$996') ? '996' : 
                   formData.packageDuration.includes('$1245') ? '1245' : '747'}
              </div>
              <div className="text-sm text-gray-600">
                for {formData.packageDuration.split(' - ')[0] || '3 hours'}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-pfp-red hover:bg-pfp-red/90 text-white py-3 text-lg font-semibold"
            >
              Submit Inquiry
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Staff Management with Party Favor Photo branding
const StaffManagement = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pfp-green to-pfp-blue text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Staff Management</h1>
        <p className="text-lg">Wage Earner Prioritization • 70% Profit Distribution • Transparent Compensation</p>
      </div>

      {/* Profit Distribution Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-pfp-green" />
            <span>Monthly Profit Distribution</span>
          </CardTitle>
          <CardDescription>Revolutionary business model prioritizing wage earners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-pfp-green/10 rounded-lg border border-pfp-green">
              <div className="text-2xl font-bold text-pfp-green">$6,700</div>
              <div className="text-sm text-gray-600">Total Profit Distribution</div>
              <div className="text-xs text-gray-500 mt-1">70% to wage earners</div>
            </div>
            <div className="text-center p-4 bg-pfp-blue/10 rounded-lg border border-pfp-blue">
              <div className="text-2xl font-bold text-pfp-blue">$2,867</div>
              <div className="text-sm text-gray-600">Average per Staff Member</div>
              <div className="text-xs text-gray-500 mt-1">Base + profit share</div>
            </div>
            <div className="text-center p-4 bg-pfp-orange/10 rounded-lg border border-pfp-orange">
              <div className="text-2xl font-bold text-pfp-orange">94%</div>
              <div className="text-sm text-gray-600">Staff Satisfaction</div>
              <div className="text-xs text-gray-500 mt-1">AI-optimized compensation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-pfp-blue" />
            <span>Team Members</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.staff.map((member) => (
              <div key={member.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-pfp-black">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <Badge variant="outline" className="text-pfp-green border-pfp-green">
                    {member.performance}% Performance
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Base Salary</div>
                    <div className="font-semibold text-pfp-blue">${member.baseSalary}/month</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Profit Share</div>
                    <div className="font-semibold text-pfp-green">+${member.profitShare}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Total Earnings</div>
                    <div className="font-bold text-pfp-red">${member.totalEarnings}/month</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Status</div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-pfp-green" />
                      <span className="text-pfp-green capitalize">{member.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI-Driven Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-pfp-red" />
            <span>AI-Optimized Benefits</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-pfp-black mb-2">Performance Bonuses</h3>
              <p className="text-sm text-gray-600">AI tracks customer satisfaction and automatically adjusts compensation</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-pfp-black mb-2">Skill Development</h3>
              <p className="text-sm text-gray-600">AI identifies training opportunities and funds professional development</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-pfp-black mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600">AI optimizes schedules based on staff preferences and business needs</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-pfp-black mb-2">Equipment Upgrades</h3>
              <p className="text-sm text-gray-600">AI prioritizes equipment investments that improve working conditions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// AI Executives with Party Favor Photo branding
const AIExecutives = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pfp-red to-pfp-orange text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">AI Executive Team</h1>
        <p className="text-lg">Autonomous Decision Making • Wage Earner Focus • Transparent Governance</p>
      </div>

      {/* AI Executives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockData.aiExecutives.map((exec) => (
          <Card key={exec.id} className="border-l-4 border-pfp-red">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-pfp-black">{exec.role}</span>
                <Badge variant="outline" className="text-pfp-green border-pfp-green">
                  {exec.efficiency}% Efficient
                </Badge>
              </CardTitle>
              <CardDescription>{exec.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Primary Focus</div>
                  <div className="font-medium text-pfp-black">{exec.focus}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Decisions Made</div>
                  <div className="text-2xl font-bold text-pfp-blue">{exec.decisions}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Latest Decision</div>
                  <div className="text-sm text-pfp-black bg-gray-50 p-2 rounded border-l-2 border-pfp-gold">
                    {exec.lastDecision}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-pfp-green" />
                  <span className="text-sm text-pfp-green">Active & Monitoring</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Decision Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-pfp-blue" />
            <span>Recent AI Decisions</span>
          </CardTitle>
          <CardDescription>Transparent decision-making process focused on staff welfare</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '2 hours ago', executive: 'AI CEO', decision: 'Approved equipment upgrade budget increase by 25%', impact: 'Positive' },
              { time: '5 hours ago', executive: 'AI CMO', decision: 'Optimized pricing strategy to increase staff profit share', impact: 'Positive' },
              { time: '1 day ago', executive: 'AI COO', decision: 'Implemented new quality control measures for StudioStation', impact: 'Positive' },
              { time: '2 days ago', executive: 'AI CEO', decision: 'Authorized additional training budget for staff development', impact: 'Positive' },
              { time: '3 days ago', executive: 'AI CMO', decision: 'Launched customer feedback integration system', impact: 'Positive' }
            ].map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  <Brain className="h-5 w-5 text-pfp-red" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-pfp-black">{log.executive}</span>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                  <div className="text-sm text-gray-700">{log.decision}</div>
                  <Badge variant="outline" className="mt-2 text-pfp-green border-pfp-green text-xs">
                    {log.impact} Impact
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// About page with Party Favor Photo information
const About = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pfp-blue via-pfp-green to-pfp-orange text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">About Party Favor Photo</h1>
        <p className="text-lg">Award-Winning StudioStation • AI-Powered Excellence • Wage Earner Revolution</p>
      </div>

      {/* Company Story */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-pfp-red" />
            <span>Our Story</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Welcome to Party Favor Photo! We have completed our personnel turnover and are back in business with a revolutionary approach to photo booth services in the Washington D.C. area.
          </p>
          <p className="text-gray-700">
            Our flagship <strong className="text-pfp-red">StudioStation Photo Booth</strong> features a real DSLR camera, popping strobe flash, glamorous sequin backdrops, goofy props, and unlimited custom prints. This elegant ballroom service will be the highlight of your party!
          </p>
          <p className="text-gray-700">
            What makes us unique is our <strong className="text-pfp-blue">AI Executive Governance System</strong> that eliminates traditional management overhead and redirects 70% of profits directly to our wage earners, creating the most ethical and sustainable business model in the industry.
          </p>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-pfp-orange" />
            <span>StudioStation Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-pfp-black">Equipment Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-pfp-green" />
                  <span>Real DSLR camera with professional quality</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-pfp-green" />
                  <span>Popping strobe flash for perfect lighting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-pfp-green" />
                  <span>Glamorous sequin backdrops (multiple colors)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-pfp-green" />
                  <span>Fun props and accessories</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-pfp-green" />
                  <span>Unlimited custom printing</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-pfp-black">Service Packages</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg border-pfp-gold">
                  <div className="font-medium text-pfp-black">2hr StudioStation</div>
                  <div className="text-sm text-gray-600">3 hours total (includes 1hr setup)</div>
                  <div className="font-bold text-pfp-green">From $498</div>
                </div>
                <div className="p-3 border rounded-lg border-pfp-gold bg-pfp-gold/10">
                  <div className="font-medium text-pfp-black">3hr StudioStation ⭐ Popular</div>
                  <div className="text-sm text-gray-600">4 hours total (includes 1hr setup)</div>
                  <div className="font-bold text-pfp-green">From $747</div>
                </div>
                <div className="p-3 border rounded-lg border-pfp-gold">
                  <div className="font-medium text-pfp-black">4hr StudioStation</div>
                  <div className="text-sm text-gray-600">5 hours total (includes 1hr setup)</div>
                  <div className="font-bold text-pfp-green">From $996</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-pfp-blue" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pfp-red" />
                <div>
                  <div className="font-medium text-pfp-black">Phone</div>
                  <div className="text-gray-700">(202) 798-0610</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pfp-blue" />
                <div>
                  <div className="font-medium text-pfp-black">WhatsApp</div>
                  <div className="text-gray-700">+50661500559</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-pfp-green" />
                <div>
                  <div className="font-medium text-pfp-black">Service Areas</div>
                  <div className="text-gray-700">Washington D.C., Texas, Colorado, Florida</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-pfp-orange" />
                <div>
                  <div className="font-medium text-pfp-black">Availability</div>
                  <div className="text-gray-700">Flexible scheduling determined by you</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-pfp-gold" />
                <div>
                  <div className="font-medium text-pfp-black">Cancellation Policy</div>
                  <div className="text-gray-700">We keep a credit for you</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-pfp-red" />
                <div>
                  <div className="font-medium text-pfp-black">Owner</div>
                  <div className="text-gray-700">Joe - Direct contact available</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main App component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inquiry" element={<EventInquiry />} />
              <Route path="/staff" element={<StaffManagement />} />
              <Route path="/executives" element={<AIExecutives />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  )
}

export default App

