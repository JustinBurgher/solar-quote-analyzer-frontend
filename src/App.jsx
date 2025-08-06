import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [formData, setFormData] = useState({
    systemSize: '',
    solarPanelOutput: '',
    solarPanelName: '',
    solarPanelNameCustom: '',
    batteryBrandName: '',
    batteryBrandNameCustom: '',
    batterySize: '',
    totalPrice: '',
    hasBattery: 'no'
  })
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  // Enhanced UK market panel brands
  const panelBrands = [
    'Aiko', 'Trina Solar', 'Longi', 'Jinko Solar', 'Eurener', 'Perlight',
    'SolFiT BIPV', 'InstaGen', 'Canadian Solar', 'SunPower', 'REC',
    'JA Solar', 'Risen Energy', 'Astronergy', 'Hanwha Q Cells',
    'Sharp', 'Panasonic', 'Other (specify)'
  ]

  // Enhanced UK market battery brands
  const batteryBrands = [
    'Tesla Powerwall', 'GivEnergy', 'Fox ESS', 'SolarEdge', 'SolaX',
    'Growatt', 'Huawei', 'EcoFlow', 'Myenergi (Libbi)', 'Enphase',
    'Sungrow', 'Atmoce', 'Eleven Energy', 'LG Chem', 'Pylontech',
    'BYD', 'Other (specify)'
  ]

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSelectChange = (value, id) => {
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const getActualPanelName = () => {
    if (formData.solarPanelName === 'Other (specify)') {
      return formData.solarPanelNameCustom
    }
    return formData.solarPanelName
  }

  const getActualBatteryName = () => {
    if (formData.batteryBrandName === 'Other (specify)') {
      return formData.batteryBrandNameCustom
    }
    return formData.batteryBrandName
  }

  const analyzeQuote = async () => {
    setLoading(true)
    
    try {
      const response = await fetch("/api/analyze/quote", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          solarPanelName: getActualPanelName(),
          batteryBrandName: getActualBatteryName()
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setAnalysis(result)
      } else {
        console.error('Analysis failed:', result.error)
        // Fallback to mock data if API fails
        const mockResult = {
          overall: 'good',
          score: 75,
          breakdown: {
            price: 'good',
            panelOutput: 'good',
            panelBrand: 'okay',
            batteryBrand: 'good',
            systemSize: 'good'
          },
          recommendations: [
            'Analysis completed with mock data',
            'Please check API connection for live analysis'
          ]
        }
        setAnalysis(mockResult)
      }
    } catch (err) {
      console.error('Network error:', err)
      // Fallback to mock data if network fails
      const mockResult = {
        overall: 'good',
        score: 75,
        breakdown: {
          price: 'good',
          panelOutput: 'good',
          panelBrand: 'okay',
          batteryBrand: 'good',
          systemSize: 'good'
        },
        recommendations: [
          'Analysis completed with mock data',
          'Please check network connection for live analysis'
        ]
      }
      setAnalysis(mockResult)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      systemSize: '',
      solarPanelOutput: '',
      solarPanelName: '',
      solarPanelNameCustom: '',
      batteryBrandName: '',
      batteryBrandNameCustom: '',
      batterySize: '',
      totalPrice: '',
      hasBattery: 'no'
    })
    setAnalysis(null)
  }

  const getOverallColor = (overall) => {
    switch (overall) {
      case 'excellent':
        return 'text-green-600'
      case 'good':
        return 'text-emerald-600'
      case 'poor':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getBreakdownColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-green-600'
      case 'okay':
        return 'text-yellow-600'
      case 'poor':
        return 'text-red-600'
      default:
        return 'text-gray-500'
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="logo-icon bg-teal-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">🏠</span>
              </div>
              <button onClick={() => setCurrentPage('home')} className="logo-text text-xl font-bold text-gray-900">
                solar<span className="text-teal-600">✓</span>erify
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => setCurrentPage('how-it-works')}
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('home')
                  setTimeout(() => scrollToSection('analyzer'), 100)
                }}
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Quote Analyzer
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('home')
                  setTimeout(() => scrollToSection('contact'), 100)
                }}
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </button>
              <button 
                onClick={() => setCurrentPage('login')}
                className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )

  const renderHomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Stop Solar Rip-Offs Before You Sign
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Get instant professional analysis of your solar quotes. Spot overpriced systems, low-quality components, and misleading claims before you sign.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('analyzer')}
              className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium transition-colors"
            >
              Analyze My Quote Free
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-md text-lg font-medium transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Quote Analyzer Section */}
      <section id="analyzer" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enhanced Solar Quote Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get detailed analysis with real panel specifications. Takes less than 30 seconds.
            </p>
          </div>

          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-teal-600 text-white">
              <CardTitle className="text-2xl font-bold">Solar Quote Details</CardTitle>
              <CardDescription className="text-teal-100">Enter your solar installation quote details to get an instant analysis</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="systemSize">System Size (kW) *</Label>
                    <Input id="systemSize" type="number" placeholder="e.g., 4.0" value={formData.systemSize} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="solarPanelOutput">Solar Panel Output (W per panel)</Label>
                    <Input id="solarPanelOutput" type="number" placeholder="e.g., 400" value={formData.solarPanelOutput} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="solarPanelName">Solar Panel Brand/Name</Label>
                    <Select value={formData.solarPanelName} onValueChange={(value) => handleSelectChange(value, 'solarPanelName')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select panel brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {panelBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.solarPanelName === 'Other (specify)' && (
                      <Input
                        id="solarPanelNameCustom"
                        placeholder="Enter panel brand name"
                        value={formData.solarPanelNameCustom}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hasBattery">Battery Included?</Label>
                    <Select value={formData.hasBattery} onValueChange={(value) => handleSelectChange(value, 'hasBattery')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, Battery Included</SelectItem>
                        <SelectItem value="no">No Battery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.hasBattery === 'yes' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="batteryBrandName">Battery Brand Name</Label>
                        <Select value={formData.batteryBrandName} onValueChange={(value) => handleSelectChange(value, 'batteryBrandName')}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select battery brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {batteryBrands.map((brand) => (
                              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formData.batteryBrandName === 'Other (specify)' && (
                          <Input
                            id="batteryBrandNameCustom"
                            placeholder="Enter battery brand name"
                            value={formData.batteryBrandNameCustom}
                            onChange={handleChange}
                            className="mt-2"
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batterySize">Battery Size (kWh)</Label>
                        <Input id="batterySize" type="number" placeholder="e.g., 10" value={formData.batterySize} onChange={handleChange} />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="totalPrice">Total Price (£) *</Label>
                    <Input id="totalPrice" type="number" placeholder="e.g., 6000" value={formData.totalPrice} onChange={handleChange} />
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button onClick={analyzeQuote} disabled={loading} className="flex-1 py-3 text-lg bg-teal-600 hover:bg-teal-700">
                      {loading ? 'Analyzing...' : 'Analyze Quote'}
                    </Button>
                    <Button onClick={resetForm} variant="outline" className="flex-1 py-3 text-lg">
                      Reset
                    </Button>
                  </div>
                </div>

                {analysis && (
                  <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-inner">
                    <h3 className="text-xl font-semibold text-gray-700">Analysis Results</h3>
                    <div className="text-center">
                      <p className="text-lg font-medium">Overall Assessment:</p>
                      <p className={`text-5xl font-bold ${getOverallColor(analysis.overall)}`}>
                        {analysis.overall.charAt(0).toUpperCase() + analysis.overall.slice(1)}
                      </p>
                      <p className="text-sm text-gray-500">Score: {analysis.score}%</p>
                      {analysis.price_per_kw && (
                        <p className="text-sm text-gray-500">Price: £{analysis.price_per_kw}/kW</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-md font-semibold text-gray-700">Breakdown:</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Price: <span className={getBreakdownColor(analysis.breakdown.price)}>{analysis.breakdown.price}</span></li>
                        <li>Panel Output: <span className={getBreakdownColor(analysis.breakdown.panelOutput)}>{analysis.breakdown.panelOutput}</span></li>
                        <li>Panel Brand: <span className={getBreakdownColor(analysis.breakdown.panelBrand)}>{analysis.breakdown.panelBrand}</span></li>
                        {formData.hasBattery === 'yes' && analysis.breakdown.batteryBrand && (
                          <li>Battery Brand: <span className={getBreakdownColor(analysis.breakdown.batteryBrand)}>{analysis.breakdown.batteryBrand}</span></li>
                        )}
                        <li>System Size: <span className={getBreakdownColor(analysis.breakdown.systemSize)}>{analysis.breakdown.systemSize}</span></li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-md font-semibold text-gray-700">Recommendations:</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {analysis.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about your solar quote? Need help understanding your analysis? We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-teal-600 mr-3">📧</span>
                  <span className="text-gray-600">hello@solarverify.co.uk</span>
                </div>
                <div className="flex items-center">
                  <span className="text-teal-600 mr-3">⏰</span>
                  <span className="text-gray-600">Response within 24 hours</span>
                </div>
                <div className="flex items-center">
                  <span className="text-teal-600 mr-3">🇬🇧</span>
                  <span className="text-gray-600">UK-based support team</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Is the analysis really free?</h4>
                  <p className="text-gray-600 text-sm">Yes, basic analysis is completely free with no hidden costs.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">How accurate is your analysis?</h4>
                  <p className="text-gray-600 text-sm">95%+ accuracy based on real UK market data and thousands of installations.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Do you work with installers?</h4>
                  <p className="text-gray-600 text-sm">No, we're completely independent with no installer partnerships.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderAboutPage = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Solar✓erify</h1>
          <p className="text-xl text-gray-600">Independent solar quote analysis to help you avoid overpriced systems</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            After 7 years running my own business, I've seen how easy it is for homeowners to get taken advantage of in complex markets. 
            The solar industry is no different - with quotes varying by tens of thousands of pounds for identical systems.
          </p>
          <p className="text-gray-700">
            Solar✓erify was born from a simple mission: give UK homeowners the tools and knowledge they need to make informed 
            decisions about solar installations, without the pressure from salespeople or hidden agendas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Independent Analysis</h3>
            <p className="text-gray-700">We don't sell solar panels or take commissions from installers. Just honest, data-driven analysis.</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">UK Market Data</h3>
            <p className="text-gray-700">Real pricing and installer data from thousands of UK installations.</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderHowItWorksPage = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How Solar✓erify Works</h1>
          <p className="text-xl text-gray-600">Simple, fast, and accurate solar quote analysis in just a few clicks</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-teal-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Enter Quote Details</h3>
            <p className="text-gray-700 text-center">Simply enter your system size, battery capacity, and total quote price. Takes less than 30 seconds.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-teal-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Instant Analysis</h3>
            <p className="text-gray-700 text-center">Our algorithm compares your quote against thousands of real UK installations and current market data.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-teal-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Get Your Grade</h3>
            <p className="text-gray-700 text-center">Receive a clear A-F grade with detailed explanation of your quote's value and any red flags.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-teal-600">4</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Make Informed Decisions</h3>
            <p className="text-gray-700 text-center">Use our analysis to negotiate better prices, avoid poor installers, or find better alternatives.</p>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-3 rounded-md text-lg font-medium transition-colors"
          >
            Try It Now
          </button>
        </div>
      </div>
    </div>
  )

  const renderLoginPage = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
            <p className="text-gray-600">Access your Solar✓erify account</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Sign In
            </Button>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">Don't have an account? <span className="text-teal-600 cursor-pointer">Sign up</span></p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'about' && renderAboutPage()}
      {currentPage === 'how-it-works' && renderHowItWorksPage()}
      {currentPage === 'login' && renderLoginPage()}
    </div>
  )
}

export default App

