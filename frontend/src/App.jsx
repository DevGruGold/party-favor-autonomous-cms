import React, { useState, useEffect } from 'react'
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
import './App.css'

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
      id: 'ceo',
      name: 'AI CEO',
      role: 'Chief Executive Officer',
      status: 'ACTIVE',
      description: 'Strategic planning, resource allocation, and wage earner prioritization',
      decisions: 47,
      efficiency: 98
    },
    {
      id: 'cmo',
      name: 'AI CMO',
      role: 'Chief Marketing Officer',
      status: 'ACTIVE',
      description: 'Marketing strategy, pricing optimization, and partnership development',
      decisions: 32,
      efficiency: 95
    },
    {
      id: 'coo',
      name: 'AI COO',
      role: 'Chief Operations Officer',
      status: 'ACTIVE',
      description: 'Operations management, scheduling, and quality assurance',
      decisions: 28,
      efficiency: 97
    }
  ],
  recentBookings: [
    { id: 1, client: 'Sarah & Mike Wedding', date: '2024-06-15', status: 'confirmed', value: 1245 },
    { id: 2, client: 'TechCorp Annual Party', date: '2024-06-20', status: 'pending', value: 1995 },
    { id: 3, client: 'Johnson Anniversary', date: '2024-06-25', status: 'confirmed', value: 747 }
  ]
}

// Navigation Component
const Navigation = ({ isMobile, isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/inquiry', label: 'Book Event', icon: Calendar },
    { path: '/staff', label: 'Staff', icon: Users },
    { path: '/ai-executives', label: 'AI Executives', icon: Brain },
    { path: '/about', label: 'About', icon: Star }
  ]

  const NavContent = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsMenuOpen(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Icon size={18} />
            <span className="font-medium">{item.label}</span>
          </Link>
        )
      })}
    </>
  )

  if (isMobile) {
    return (
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-card border border-border rounded-lg shadow-lg mx-4 p-4 z-50"
          >
            <nav className="flex flex-col gap-2">
              <NavContent />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <nav className="hidden md:flex items-center gap-2">
      <NavContent />
    </nav>
  )
}

// Header Component
const Header = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Camera className="text-primary" size={24} />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Party Favor Photo
          </span>
        </Link>

        <Navigation isMobile={isMobile} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hidden sm:flex items-center gap-1">
            <Zap size={12} className="text-green-500" />
            AI Autonomous
          </Badge>
          
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

// Dashboard Page
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero Section */}
      <div className="text-center py-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
        >
          AI Executive Governance Dashboard
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          Revolutionizing business with autonomous AI leadership • Eliminating traditional management overhead • Empowering wage earners
        </motion.p>
      </div>

      {/* AI Executives Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockData.aiExecutives.map((executive, index) => (
          <motion.div
            key={executive.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Brain className="text-primary" size={24} />
                  <Badge variant="secondary" className="text-xs">
                    {executive.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{executive.name}</CardTitle>
                <CardDescription className="text-sm">{executive.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{executive.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Decisions Made</span>
                    <span className="font-medium">{executive.decisions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Efficiency</span>
                    <span className="font-medium">{executive.efficiency}%</span>
                  </div>
                  <Progress value={executive.efficiency} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Business Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-primary" size={20} />
            Business Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">${mockData.dashboard.revenue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{mockData.dashboard.bookings}</div>
              <div className="text-sm text-muted-foreground">Active Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{mockData.dashboard.rating}</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{mockData.dashboard.staff}</div>
              <div className="text-sm text-muted-foreground">Active Staff</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="h-16 flex flex-col gap-1" variant="outline">
          <Sparkles size={20} />
          <span className="text-xs">Initialize Sample Data</span>
        </Button>
        <Button className="h-16 flex flex-col gap-1" variant="outline">
          <DollarSign size={20} />
          <span className="text-xs">Distribute Profits</span>
        </Button>
        <Button className="h-16 flex flex-col gap-1" variant="outline">
          <TrendingUp size={20} />
          <span className="text-xs">Optimize Pricing</span>
        </Button>
        <Button className="h-16 flex flex-col gap-1" variant="outline">
          <BarChart3 size={20} />
          <span className="text-xs">View Analytics</span>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{booking.client}</div>
                  <div className="text-sm text-muted-foreground">{booking.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${booking.value}</div>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Event Inquiry Form
const EventInquiry = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    duration: '3',
    venue: '',
    guestCount: '',
    backdrop: '',
    layout: 'horizontal',
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const packagePrices = {
    '2': 498,
    '3': 747,
    '4': 996,
    '5': 1245
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold mb-4">Inquiry Submitted Successfully!</h2>
        <p className="text-muted-foreground mb-6">
          Our AI executives are processing your request. You'll receive a personalized quote within 24 hours.
        </p>
        <Button onClick={() => setSubmitted(false)}>
          Submit Another Inquiry
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Event Inquiry Form</h1>
        <p className="text-muted-foreground">
          Tell us about your event and our AI executives will create a personalized quote for you
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera size={20} />
            Event Details
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
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate">Event Date *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Package Duration *</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Hours - ${packagePrices['2']}</SelectItem>
                    <SelectItem value="3">3 Hours - ${packagePrices['3']}</SelectItem>
                    <SelectItem value="4">4 Hours - ${packagePrices['4']}</SelectItem>
                    <SelectItem value="5">5 Hours - ${packagePrices['5']}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="venue">Venue Name</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => handleInputChange('venue', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="guestCount">Expected Guest Count</Label>
                <Input
                  id="guestCount"
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) => handleInputChange('guestCount', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="backdrop">Preferred Backdrop Color</Label>
                <Select value={formData.backdrop} onValueChange={(value) => handleInputChange('backdrop', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select backdrop color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gold">Gold Sequin</SelectItem>
                    <SelectItem value="silver">Silver Sequin</SelectItem>
                    <SelectItem value="rose-gold">Rose Gold Sequin</SelectItem>
                    <SelectItem value="black">Black Sequin</SelectItem>
                    <SelectItem value="white">White Sequin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="layout">Photo Layout</Label>
                <Select value={formData.layout} onValueChange={(value) => handleInputChange('layout', value)}>
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

            <div>
              <Label htmlFor="notes">Special Requests or Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any special requirements, themes, or additional services you'd like to discuss..."
                rows={4}
              />
            </div>

            {formData.duration && (
              <Alert>
                <DollarSign className="h-4 w-4" />
                <AlertDescription>
                  Estimated package price: <strong>${packagePrices[formData.duration]}</strong> for {formData.duration} hours
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Processing with AI...
                </>
              ) : (
                <>
                  Submit Inquiry
                  <ArrowRight className="ml-2" size={16} />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Staff Management Page
const StaffManagement = () => {
  const staffMembers = [
    {
      id: 1,
      name: 'Alex Rodriguez',
      role: 'Lead Photographer',
      status: 'active',
      profitShare: 2850,
      performance: 96,
      events: 8
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Assistant Photographer',
      status: 'active',
      profitShare: 2100,
      performance: 94,
      events: 6
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Equipment Technician',
      status: 'active',
      profitShare: 1750,
      performance: 98,
      events: 12
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Badge variant="outline" className="flex items-center gap-1">
          <Heart size={12} className="text-red-500" />
          Wage Earner Priority
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Profit Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${staffMembers.reduce((sum, member) => sum + member.profitShare, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">70% of profits distributed to wage earners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round(staffMembers.reduce((sum, member) => sum + member.performance, 0) / staffMembers.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Team efficiency rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {staffMembers.filter(member => member.status === 'active').length}
            </div>
            <p className="text-sm text-muted-foreground">Team members</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Our AI executives ensure fair compensation and optimal resource allocation for all team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffMembers.map((member) => (
              <div key={member.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                    {member.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-green-600">${member.profitShare.toLocaleString()}</div>
                    <div className="text-muted-foreground">Monthly Profit Share</div>
                  </div>
                  <div>
                    <div className="font-medium">{member.performance}%</div>
                    <div className="text-muted-foreground">Performance Score</div>
                  </div>
                  <div>
                    <div className="font-medium">{member.events}</div>
                    <div className="text-muted-foreground">Events This Month</div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Performance</span>
                    <span>{member.performance}%</span>
                  </div>
                  <Progress value={member.performance} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Award className="h-4 w-4" />
        <AlertDescription>
          <strong>AI Executive Decision:</strong> Profit distribution optimized based on performance metrics and contribution to company success. 
          All team members receive above-market compensation through our revolutionary wage earner priority model.
        </AlertDescription>
      </Alert>
    </motion.div>
  )
}

// AI Executives Page
const AIExecutives = () => {
  const [selectedExecutive, setSelectedExecutive] = useState('ceo')

  const executiveDetails = {
    ceo: {
      decisions: [
        { id: 1, time: '2 hours ago', decision: 'Approved 15% wage increase for all staff members', impact: 'High' },
        { id: 2, time: '5 hours ago', decision: 'Optimized resource allocation for upcoming events', impact: 'Medium' },
        { id: 3, time: '1 day ago', decision: 'Implemented new profit-sharing algorithm', impact: 'High' }
      ]
    },
    cmo: {
      decisions: [
        { id: 1, time: '1 hour ago', decision: 'Adjusted pricing strategy for premium packages', impact: 'High' },
        { id: 2, time: '3 hours ago', decision: 'Launched targeted social media campaign', impact: 'Medium' },
        { id: 3, time: '6 hours ago', decision: 'Partnered with 3 new wedding venues', impact: 'High' }
      ]
    },
    coo: {
      decisions: [
        { id: 1, time: '30 minutes ago', decision: 'Optimized equipment scheduling for weekend events', impact: 'Medium' },
        { id: 2, time: '2 hours ago', decision: 'Implemented quality assurance checklist', impact: 'High' },
        { id: 3, time: '4 hours ago', decision: 'Streamlined setup and breakdown procedures', impact: 'Medium' }
      ]
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">AI Executive Team</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our autonomous AI executives make data-driven decisions to optimize business operations 
          while prioritizing wage earner compensation and eliminating traditional management overhead.
        </p>
      </div>

      <Tabs value={selectedExecutive} onValueChange={setSelectedExecutive}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ceo">AI CEO</TabsTrigger>
          <TabsTrigger value="cmo">AI CMO</TabsTrigger>
          <TabsTrigger value="coo">AI COO</TabsTrigger>
        </TabsList>

        {mockData.aiExecutives.map((executive) => (
          <TabsContent key={executive.id} value={executive.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-primary" />
                    {executive.name}
                  </CardTitle>
                  <CardDescription>{executive.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{executive.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">{executive.decisions}</div>
                      <div className="text-xs text-muted-foreground">Decisions Made</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{executive.efficiency}%</div>
                      <div className="text-xs text-muted-foreground">Efficiency Rate</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>System Performance</span>
                      <span>{executive.efficiency}%</span>
                    </div>
                    <Progress value={executive.efficiency} className="h-3" />
                  </div>

                  <Badge variant="outline" className="w-full justify-center">
                    <CheckCircle size={12} className="mr-1 text-green-500" />
                    {executive.status}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Decisions</CardTitle>
                  <CardDescription>Latest autonomous decisions and their business impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {executiveDetails[executive.id]?.decisions.map((decision) => (
                      <div key={decision.id} className="border-l-2 border-primary pl-4 py-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{decision.time}</span>
                          <Badge variant={decision.impact === 'High' ? 'default' : 'secondary'} className="text-xs">
                            {decision.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm">{decision.decision}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <strong>Transparency Notice:</strong> All AI executive decisions are logged and auditable. 
          Our autonomous governance model ensures consistent focus on wage earner welfare and business optimization.
        </AlertDescription>
      </Alert>
    </motion.div>
  )
}

// About Page
const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Party Favor Photo</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Revolutionizing the photo booth industry through AI executive governance and wage earner prioritization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Party Favor Photo is pioneering a revolutionary business model that eliminates traditional 
              executive overhead through AI governance, redirecting those resources directly to our wage earners.
            </p>
            <p>
              Our AI executives - CEO, CMO, and COO - make autonomous decisions focused on maximizing 
              worker compensation while delivering premium photo booth services to the DMV area.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="text-red-500" size={16} />
              <span>70% of profits distributed to wage earners</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              Our Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Camera className="text-primary" size={20} />
                <div>
                  <div className="font-medium">Premium Photo Booths</div>
                  <div className="text-sm text-muted-foreground">High-quality equipment with instant sharing</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-primary" size={20} />
                <div>
                  <div className="font-medium">Professional Staff</div>
                  <div className="text-sm text-muted-foreground">Experienced photographers and technicians</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="text-primary" size={20} />
                <div>
                  <div className="font-medium">Custom Setups</div>
                  <div className="text-sm text-muted-foreground">Tailored backdrops and layouts</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-primary" />
            AI Executive Governance
          </CardTitle>
          <CardDescription>
            How our autonomous leadership model works
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">AI CEO</h3>
              <p className="text-sm text-muted-foreground">
                Strategic planning and resource allocation with wage earner prioritization
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">AI CMO</h3>
              <p className="text-sm text-muted-foreground">
                Marketing strategy and pricing optimization for maximum worker benefit
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">AI COO</h3>
              <p className="text-sm text-muted-foreground">
                Operations management and quality assurance automation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-sm text-muted-foreground">(555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-primary" size={20} />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">info@partyfavorphoto.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <div>
                <div className="font-medium">Service Area</div>
                <div className="text-sm text-muted-foreground">DMV Area (DC, MD, VA)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inquiry" element={<EventInquiry />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/ai-executives" element={<AIExecutives />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <footer className="border-t bg-muted/50 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Camera className="text-primary" size={20} />
              <span className="font-semibold">Party Favor Photo</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              🚀 Revolutionizing business with AI executive governance
            </p>
            <p className="text-xs text-muted-foreground">
              Eliminating traditional management overhead • Empowering wage earners
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

