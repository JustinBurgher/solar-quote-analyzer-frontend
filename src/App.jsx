import { useState } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [formData, setFormData] = useState({
    systemSize: '',
    hasBattery: 'no',
    batterySize: '',
    batteryBrand: '',
    totalPrice: ''
  })
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [quotesUsed, setQuotesUsed] = useState(0)

  // UK market battery brands with sizes
  const batteryOptions = [
    { brand: 'Tesla Powerwall 2', size: '13.5' },
    { brand: 'Tesla Powerwall 3', size: '13.5' },
    { brand: 'GivEnergy All in One', size: '9.5' },
    { brand: 'GivEnergy Battery', size: '5.2' },
    { brand: 'Fox ESS ECS2900', size: '2.9' },
    { brand: 'Fox ESS ECS4100', size: '4.1' },
    { brand: 'SolarEdge Home Battery', size: '9.7' },
    { brand: 'SolaX Triple Power', size: '5.8' },
    { brand: 'Growatt ARK XH', size: '6.5' },
    { brand: 'Huawei LUNA2000', size: '5' },
    { brand: 'EcoFlow PowerOcean', size: '5' },
    { brand: 'Myenergi Libbi', size: '5' },
    { brand: 'Enphase IQ Battery 5P', size: '5' },
    { brand: 'Sungrow SBR', size: '9.6' },
    { brand: 'LG Chem RESU', size: '9.8' },
    { brand: 'Pylontech US3000C', size: '3.5' },
    { brand: 'BYD Battery-Box Premium', size: '10.24' },
    { brand: 'Other (specify)', size: 'custom' }
  ]

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSelectChange = (e, fieldName) => {
    const value = e.target.value
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value
    }))
    
    // Auto-fill battery size when brand is selected
    if (fieldName === 'batteryBrand') {
      const selectedBattery = batteryOptions.find(b => b.brand === value)
      if (selectedBattery && selectedBattery.size !== 'custom') {
        setFormData(prevData => ({
          ...prevData,
          batterySize: selectedBattery.size
        }))
      } else if (selectedBattery && selectedBattery.size === 'custom') {
        setFormData(prevData => ({
          ...prevData,
          batterySize: ''
        }))
      }
    }
  }

  const analyzeQuote = async () => {
    setLoading(true)
    
    try {
      // Check if this is the second quote and email not provided
      if (quotesUsed >= 1 && !emailSubmitted) {
        setShowEmailModal(true)
        setLoading(false)
        return
      }

      // Correct API endpoint
      const response = await fetch("https://solar-verify-backend-production.up.railway.app/api/analyze-quote", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemSize: parseFloat(formData.systemSize),
          hasBattery: formData.hasBattery === 'yes',
          batterySize: formData.hasBattery === 'yes' ? parseFloat(formData.batterySize) : 0,
          batteryBrand: formData.hasBattery === 'yes' ? formData.batteryBrand : '',
          totalPrice: parseFloat(formData.totalPrice),
          solarPanelName: 'Standard Panel',
          solarPanelOutput: 400,
          email: emailSubmitted ? email : null
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setAnalysis(result)
        setQuotesUsed(prev => prev + 1)
      } else {
        console.error('Analysis failed:', result.error)
        setAnalysis({
          error: true,
          message: 'Unable to analyze quote. Please check your internet connection and try again.'
        })
      }
    } catch (err) {
      console.error('Network error:', err)
      setAnalysis({
        error: true,
        message: 'Unable to connect to analysis service. Please check your internet connection and try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const submitEmail = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    try {
      const response = await fetch("https://solar-verify-backend-production.up.railway.app/api/register-email", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setEmailSubmitted(true)
        setShowEmailModal(false)
        // Now proceed with the analysis
        analyzeQuote()
      } else {
        alert('Failed to register email. Please try again.')
      }
    } catch (err) {
      console.error('Email registration error:', err)
      alert('Failed to register email. Please try again.')
    }
  }

  const resetForm = () => {
    setFormData({
      systemSize: '',
      hasBattery: 'no',
      batterySize: '',
      batteryBrand: '',
      totalPrice: ''
    })
    setAnalysis(null)
  }

  const getGradeColor = (grade) => {
    switch (grade?.toUpperCase()) {
      case 'A':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'B':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'C':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'D':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'F':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getGradeDescription = (grade) => {
    switch (grade?.toUpperCase()) {
      case 'A':
        return 'Excellent value - this is a competitive quote'
      case 'B':
        return 'Good value with minor areas for improvement'
      case 'C':
        return 'Average market pricing'
      case 'D':
        return 'Overpriced - you can likely find better deals'
      case 'F':
        return 'Avoid - significant red flags detected'
      default:
        return 'Unable to determine grade'
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderEmailModal = () => {
    if (!showEmailModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get 2 More Free Quotes!</h3>
            <p className="text-gray-600">
              You've used your first free analysis. Enter your email to get 2 more free quote analyses.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="modal-email"
                name="modal-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p className="font-medium mb-2">🔒 GDPR Compliance Notice:</p>
              <p>
                By providing your email, you consent to us storing it securely to provide your free quote analyses. 
                We will never share your email with third parties or send spam. You can request deletion of your 
                data at any time by contacting hello@solarverify.co.uk.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={submitEmail}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Get 2 More Free Quotes
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
      {renderEmailModal()}
      
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

      {/* Grading System Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our A-F Grading System</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get a clear, easy-to-understand grade for your solar quote based on real UK market data
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-8">
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">A</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellent</h3>
              <p className="text-sm text-gray-600">Outstanding value, quality components</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">B</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Good</h3>
              <p className="text-sm text-gray-600">Good value with minor improvements possible</p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">C</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Average</h3>
              <p className="text-sm text-gray-600">Market rate pricing</p>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">D</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Poor</h3>
              <p className="text-sm text-gray-600">Overpriced - negotiate or look elsewhere</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">F</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Avoid</h3>
              <p className="text-sm text-gray-600">Significant red flags detected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Analyzer Section */}
      <section id="analyzer" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Solar Quote Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your grade in 30 seconds. {emailSubmitted ? 'Unlimited analyses' : `${3 - quotesUsed} free analyses remaining`}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-teal-600 text-white p-6">
              <h3 className="text-2xl font-bold">Solar Quote Details</h3>
              <p className="text-teal-100">Enter your quote information for instant analysis</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="systemSize" className="block text-sm font-medium text-gray-700">
                      System Size (kW) *
                    </label>
                    <input 
                      id="systemSize" 
                      name="systemSize"
                      type="number" 
                      placeholder="e.g., 4.0" 
                      value={formData.systemSize} 
                      onChange={handleChange}
                      className="w-full px-3 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <p className="text-sm text-gray-500">This should be on your quote (e.g., 4kW, 6kW, 8kW)</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="hasBattery" className="block text-sm font-medium text-gray-700">
                      Battery Included? *
                    </label>
                    <select 
                      id="hasBattery"
                      name="hasBattery"
                      value={formData.hasBattery} 
                      onChange={(e) => handleSelectChange(e, 'hasBattery')}
                      className="w-full px-3 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="yes">Yes, Battery Included</option>
                      <option value="no">No Battery</option>
                    </select>
                  </div>

                  {formData.hasBattery === 'yes' && (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="batteryBrand" className="block text-sm font-medium text-gray-700">
                          Battery Brand & Model *
                        </label>
                        <select 
                          id="batteryBrand"
                          name="batteryBrand"
                          value={formData.batteryBrand} 
                          onChange={(e) => handleSelectChange(e, 'batteryBrand')}
                          className="w-full px-3 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        >
                          <option value="">Select battery brand</option>
                          {batteryOptions.map((battery) => (
                            <option key={battery.brand} value={battery.brand}>
                              {battery.brand} {battery.size !== 'custom' ? `(${battery.size}kWh)` : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="batterySize" className="block text-sm font-medium text-gray-700">
                          Battery Size (kWh) *
                        </label>
                        <input 
                          id="batterySize" 
                          name="batterySize"
                          type="number" 
                          placeholder="e.g., 10" 
                          value={formData.batterySize} 
                          onChange={handleChange}
                          disabled={formData.batteryBrand && formData.batteryBrand !== 'Other (specify)'}
                          className="w-full px-3 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                        />
                        <p className="text-sm text-gray-500">
                          {formData.batteryBrand && formData.batteryBrand !== 'Other (specify)' 
                            ? 'Auto-filled based on selected battery' 
                            : 'Enter the battery capacity in kWh'}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">
                      Total Price (£) *
                    </label>
                    <input 
                      id="totalPrice" 
                      name="totalPrice"
                      type="number" 
                      placeholder="e.g., 8000" 
                      value={formData.totalPrice} 
                      onChange={handleChange}
                      className="w-full px-3 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <p className="text-sm text-gray-500">The total amount you'll pay (including VAT)</p>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={analyzeQuote} 
                      disabled={loading || !formData.systemSize || !formData.totalPrice || (formData.hasBattery === 'yes' && (!formData.batteryBrand || !formData.batterySize))} 
                      className="flex-1 py-4 text-lg bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors"
                    >
                      {loading ? 'Analyzing...' : 'Get My Grade Free'}
                    </button>
                    <button 
                      onClick={resetForm} 
                      className="flex-1 py-4 text-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {analysis && !analysis.error && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your Quote Grade</h3>
                      <div className={`inline-block p-6 rounded-lg border-2 ${getGradeColor(analysis.grade)}`}>
                        <div className="text-6xl font-bold mb-2">{analysis.grade || 'N/A'}</div>
                        <p className="text-lg font-medium">{getGradeDescription(analysis.grade)}</p>
                      </div>
                      
                      {analysis.price_per_kw && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                          <p className="text-lg font-semibold text-gray-700">
                            £{analysis.price_per_kw}/kW
                          </p>
                          <p className="text-sm text-gray-600">Price per kilowatt</p>
                        </div>
                      )}
                    </div>

                    {/* Upgrade Teaser */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">🔓 Want More Details?</h4>
                      <p className="text-gray-700 mb-4">
                        Get detailed breakdown including:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        <li>• Component quality analysis</li>
                        <li>• Installer background check</li>
                        <li>• Negotiation strategies</li>
                        <li>• Alternative recommendations</li>
                        <li>• Contract red flag detection</li>
                      </ul>
                      <button 
                        onClick={() => setCurrentPage('login')}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                      >
                        Upgrade for Full Analysis - £9.99
                      </button>
                    </div>
                  </div>
                )}

                {analysis && analysis.error && (
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">Analysis Error</h3>
                      <p className="text-red-700">{analysis.message}</p>
                      <button 
                        onClick={analyzeQuote} 
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Solar✓erify?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Independent analysis you can trust, with no hidden agendas or installer partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Analysis</h3>
              <p className="text-gray-600">Get professional-grade analysis in seconds, not days. No waiting for callbacks or appointments.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Independent & Unbiased</h3>
              <p className="text-gray-600">We don't sell solar or take commissions. Our only goal is helping you make the right decision.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real UK Data</h3>
              <p className="text-gray-600">Analysis based on thousands of real UK installations and current market pricing data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
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
                  <h4 className="font-medium text-gray-900">Is the basic analysis really free?</h4>
                  <p className="text-gray-600 text-sm">Yes, you get your A-F grade completely free. Email required after first analysis for 2 more free quotes.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">How accurate is your analysis?</h4>
                  <p className="text-gray-600 text-sm">95%+ accuracy based on real UK market data and thousands of installations.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">What's included in the premium analysis?</h4>
                  <p className="text-gray-600 text-sm">Detailed component analysis, installer checks, negotiation tips, and alternative recommendations.</p>
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
            <p className="text-gray-700 text-center">System size, battery details, and total price. Takes 30 seconds.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-teal-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Get Your A-F Grade</h3>
            <p className="text-gray-700 text-center">Instant analysis comparing your quote to thousands of UK installations.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-teal-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Email for More</h3>
            <p className="text-gray-700 text-center">After your first analysis, provide email for 2 more free quotes.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-teal-600">4</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Upgrade for Details</h3>
            <p className="text-gray-700 text-center">Get comprehensive analysis, negotiation tips, and installer background checks.</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Analysis</h1>
            <p className="text-gray-600">Get detailed insights for £9.99</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">What's Included:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Detailed component quality analysis</li>
                <li>• Installer background & credential check</li>
                <li>• Personalized negotiation strategies</li>
                <li>• Alternative installer recommendations</li>
                <li>• Contract red flag detection</li>
                <li>• 30-day money-back guarantee</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                id="login-email" 
                name="login-email"
                type="email" 
                placeholder="your@email.com" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                id="login-password" 
                name="login-password"
                type="password" 
                placeholder="••••••••" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Sign In & Upgrade - £9.99
            </button>
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

