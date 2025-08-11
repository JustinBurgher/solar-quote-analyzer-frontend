// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

// Home Component with full Solar✓erify design
function Home() {
  const [formData, setFormData] = useState({
    systemSize: '',
    hasBattery: 'no',
    batteryBrand: '',
    batterySize: '',
    totalPrice: '',
    email: ''
  });
  
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(3);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const batteryOptions = [
    { name: 'Tesla Powerwall 2', size: 13.5 },
    { name: 'Tesla Powerwall 3', size: 13.5 },
    { name: 'GivEnergy All in One', size: 9.5 },
    { name: 'GivEnergy Battery', size: 5.2 },
    { name: 'Fox ESS ECS2900', size: 2.9 },
    { name: 'Fox ESS ECS4100', size: 4.1 },
    { name: 'SolarEdge Home Battery', size: 9.7 },
    { name: 'SolaX Triple Power', size: 5.8 },
    { name: 'Growatt ARK XH', size: 6.5 },
    { name: 'Huawei LUNA2000', size: 5.0 },
    { name: 'EcoFlow PowerOcean', size: 5.0 },
    { name: 'Myenergi Libbi', size: 5.0 },
    { name: 'Enphase IQ Battery 5P', size: 5.0 },
    { name: 'Sungrow SBR', size: 9.6 },
    { name: 'LG Chem RESU', size: 9.8 },
    { name: 'Pylontech US3000C', size: 3.5 },
    { name: 'BYD Battery-Box Premium', size: 10.24 },
    { name: 'Other', size: 0 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-fill battery size when brand is selected
    if (name === 'batteryBrand') {
      const selectedBattery = batteryOptions.find(b => b.name === value);
      if (selectedBattery && selectedBattery.size > 0) {
        setFormData(prev => ({ ...prev, batterySize: selectedBattery.size.toString() }));
      } else {
        setFormData(prev => ({ ...prev, batterySize: '' }));
      }
    }
  };

  const analyzeQuote = async () => {
    // Check if this is the second analysis and email is needed
    if (analysisCount <= 1 && !formData.email) {
      setShowEmailModal(true);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const payload = {
        systemSize: parseFloat(formData.systemSize),
        hasBattery: formData.hasBattery === 'yes',
        batterySize: formData.hasBattery === 'yes' ? parseFloat(formData.batterySize) : null,
        batteryBrand: formData.hasBattery === 'yes' ? formData.batteryBrand : null,
        totalPrice: parseFloat(formData.totalPrice),
        solarPanelName: "Standard Panel",
        solarPanelOutput: 400,
        email: formData.email || null
      };

      console.log('Sending request to:', 'https://solar-verify-backend-production.up.railway.app/api/analyze-quote');
      console.log('Payload:', payload);

      const response = await fetch('https://solar-verify-backend-production.up.railway.app/api/analyze-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
      setAnalysisCount(prev => prev - 1);
      
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    try {
      // Register email with backend
      await fetch('https://solar-verify-backend-production.up.railway.app/api/register-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email })
      });
      
      setShowEmailModal(false);
      setAnalysisCount(3); // Reset to 3 free analyses
      analyzeQuote(); // Proceed with analysis
    } catch (err) {
      console.error('Email registration error:', err);
      // Continue anyway
      setShowEmailModal(false);
      analyzeQuote();
    }
  };

  const isFormValid = () => {
    if (!formData.systemSize || !formData.totalPrice) return false;
    if (formData.hasBattery === 'yes' && (!formData.batteryBrand || !formData.batterySize)) return false;
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Don't Get <span className="text-yellow-300">Ripped Off</span><br />
              By Solar Companies
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto">
              Get instant professional analysis of your solar quotes. Spot overpriced systems, low-quality components, and misleading claims before you sign.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#analyzer" className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300">
                Analyze My Quote Free
              </a>
              <Link to="/about" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition duration-300">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* A-F Grading Explanation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How We Grade Your Quote</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our A-F grading system gives you instant clarity on your solar quote value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">A</div>
              <div className="text-lg font-semibold text-green-800 mb-2">Excellent</div>
              <div className="text-sm text-green-700">Outstanding value, quality components</div>
            </div>
            <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">B</div>
              <div className="text-lg font-semibold text-blue-800 mb-2">Good</div>
              <div className="text-sm text-blue-700">Good value with minor improvements possible</div>
            </div>
            <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-700 mb-2">C</div>
              <div className="text-lg font-semibold text-yellow-800 mb-2">Average</div>
              <div className="text-sm text-yellow-700">Market rate pricing</div>
            </div>
            <div className="bg-orange-100 border-2 border-orange-500 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-700 mb-2">D</div>
              <div className="text-lg font-semibold text-orange-800 mb-2">Poor</div>
              <div className="text-sm text-orange-700">Overpriced - negotiate or look elsewhere</div>
            </div>
            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-700 mb-2">F</div>
              <div className="text-lg font-semibold text-red-800 mb-2">Avoid</div>
              <div className="text-sm text-red-700">Significant red flags detected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Analyzer Section */}
      <section id="analyzer" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Free Solar Quote Analysis</h3>
            <p className="text-xl text-gray-600">Get your grade in 30 seconds. {analysisCount} free analyses remaining</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Email Modal */}
            {showEmailModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                  <h4 className="text-xl font-bold text-blue-800 mb-3">🔓 Get 2 More Free Analyses</h4>
                  <p className="text-blue-700 mb-4">Enter your email to unlock 2 additional free quote checks plus solar tips and guides.</p>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <div className="text-xs text-gray-600">
                      We respect your privacy. Unsubscribe anytime. GDPR compliant.
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                      >
                        Get Free Analyses
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEmailModal(false)}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition duration-300"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-teal-600 text-white p-6 rounded-t-lg">
              <h4 className="text-xl font-semibold mb-2">Solar Quote Details</h4>
              <p className="text-teal-100">Enter your quote information for instant analysis</p>
            </div>

            <div className="p-6 space-y-6">
              {/* System Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Size (kW) *
                </label>
                <input
                  type="number"
                  name="systemSize"
                  value={formData.systemSize}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  placeholder="e.g., 4.0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">This should be on your quote (e.g., 4kW, 6kW, 8kW)</p>
              </div>

              {/* Battery Included */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Included? *
                </label>
                <select
                  name="hasBattery"
                  value={formData.hasBattery}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="no">No Battery</option>
                  <option value="yes">Yes, Battery Included</option>
                </select>
              </div>

              {/* Battery Brand & Model */}
              {formData.hasBattery === 'yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Brand & Model *
                    </label>
                    <select
                      name="batteryBrand"
                      value={formData.batteryBrand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select battery brand</option>
                      {batteryOptions.map((battery, index) => (
                        <option key={index} value={battery.name}>
                          {battery.name} {battery.size > 0 && `(${battery.size}kWh)`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Size (kWh) *
                    </label>
                    <input
                      type="number"
                      name="batterySize"
                      value={formData.batterySize}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      placeholder="e.g., 10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">Auto-filled based on selected battery</p>
                  </div>
                </>
              )}

              {/* Total Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Price (£) *
                </label>
                <input
                  type="number"
                  name="totalPrice"
                  value={formData.totalPrice}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="e.g., 8000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">The total amount you'll pay (including VAT)</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-red-800 font-medium">Analysis Error</div>
                  <div className="text-red-700">{error}</div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  onClick={analyzeQuote}
                  disabled={!isFormValid() || loading}
                  className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </span>
                  ) : (
                    'Get My Grade Free'
                  )}
                </button>
                <button
                  onClick={() => {
                    setFormData({
                      systemSize: '',
                      hasBattery: 'no',
                      batteryBrand: '',
                      batterySize: '',
                      totalPrice: '',
                      email: formData.email
                    });
                    setResult(null);
                    setError('');
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition duration-300"
                >
                  Reset
                </button>
              </div>

              {/* Results */}
              {result && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                  <h5 className="text-xl font-bold mb-4">Your Quote Analysis</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Grade:</span>
                      <span className={`px-3 py-1 rounded font-bold text-white ${
                        result.grade === 'A' ? 'bg-green-500' :
                        result.grade === 'B' ? 'bg-blue-500' :
                        result.grade === 'C' ? 'bg-yellow-500' :
                        result.grade === 'D' ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {result.grade}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Price per kW:</span>
                      <span>£{result.pricePerKw}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Assessment:</span>
                      <span className="text-right max-w-xs">{result.message}</span>
                    </div>
                  </div>
                  
                  {/* Upgrade Teaser */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg">
                    <h6 className="font-bold text-yellow-800 mb-2">🚀 Want More Detailed Analysis?</h6>
                    <p className="text-yellow-700 text-sm mb-3">
                      Get component-by-component analysis, installer background checks, and personalized recommendations for just £9.99
                    </p>
                    <Link to="/login" className="inline-block bg-yellow-500 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-600 transition duration-300">
                      Upgrade to Premium
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Solar✓erify */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Solar✓erify?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Independent analysis you can trust, with no hidden agendas or installer partnerships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Analysis</h3>
              <p className="text-gray-600">Get professional-grade analysis in seconds, not days. No waiting for callbacks or appointments.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Independent & Unbiased</h3>
              <p className="text-gray-600">We don't sell solar or take commissions. Our only goal is helping you make the right decision.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real UK Data</h3>
              <p className="text-gray-600">Analysis based on thousands of real UK installations and current market pricing data.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// About Component
function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Solar✓erify</h1>
          <p className="text-xl text-gray-600 mb-8">Independent solar quote analysis to help you avoid overpriced systems</p>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                After 7 years running my own business, I've seen how easy it is for homeowners to get taken advantage of in complex markets. 
                The solar industry is no different - with quotes varying by tens of thousands of pounds for identical systems.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Solar✓erify was born from a simple mission: give UK homeowners the tools and knowledge they need to make informed 
                decisions about solar installations, without the pressure from salespeople or hidden agendas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Independent Analysis</h3>
                <p className="text-gray-700">
                  We don't sell solar panels or take commissions from installers. Just honest, data-driven analysis to help you 
                  make the best decision for your home and budget.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">UK Market Data</h3>
                <p className="text-gray-700">
                  Real pricing and installer data from thousands of UK installations, updated regularly to reflect current 
                  market conditions and pricing trends.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We Started Solar✓erify</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The solar industry in the UK has grown rapidly, but with that growth has come confusion for homeowners. We've seen:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Quotes for identical systems varying by £10,000+ between installers</li>
                <li>Low-quality components being sold at premium prices</li>
                <li>Misleading claims about energy savings and payback periods</li>
                <li>High-pressure sales tactics that rush homeowners into poor decisions</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We believe every homeowner deserves access to independent, professional analysis before making such a significant investment.
              </p>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-teal-800 mb-2">🔍 Transparency</h4>
                  <p className="text-gray-700 text-sm">We show you exactly how we calculate grades and what factors influence your quote analysis.</p>
                </div>
                <div>
                  <h4 className="font-bold text-teal-800 mb-2">🎯 Accuracy</h4>
                  <p className="text-gray-700 text-sm">Our analysis is based on real market data from thousands of UK installations and current pricing trends.</p>
                </div>
                <div>
                  <h4 className="font-bold text-teal-800 mb-2">🚫 No Conflicts</h4>
                  <p className="text-gray-700 text-sm">We don't sell solar systems or take commissions. Our only revenue comes from premium analysis services.</p>
                </div>
                <div>
                  <h4 className="font-bold text-teal-800 mb-2">🇬🇧 UK Focused</h4>
                  <p className="text-gray-700 text-sm">All our data, pricing, and recommendations are specific to the UK market and regulations.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Analyze Your Quote?</h3>
              <p className="text-gray-600 mb-6">Get your free A-F grade in 30 seconds</p>
              <Link to="/" className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
                Analyze My Quote Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">🏠</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  solar<span className="text-green-600">✓</span>erify
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                <Link to="/about" className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </Link>
                <a href="#analyzer" className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Quote Analyzer
                </a>
                <a href="mailto:hello@solarverify.co.uk" className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h1 className="text-2xl font-bold text-center mb-6">Premium Analysis</h1>
              <p className="text-gray-600 text-center mb-6">
                Get detailed component analysis, installer background checks, and personalized recommendations.
              </p>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">£9.99</div>
                <p className="text-gray-500 mb-6">One-time payment</p>
                <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

