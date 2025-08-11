// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [formData, setFormData] = useState({
    systemSize: '',
    batteryIncluded: 'no',
    batteryBrand: '',
    batterySize: '',
    totalPrice: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [quoteCount, setQuoteCount] = useState(0);

  const batteryOptions = [
    { brand: 'Tesla Powerwall 2', size: 13.5 },
    { brand: 'Tesla Powerwall 3', size: 13.5 },
    { brand: 'GivEnergy All-in-One', size: 9.5 },
    { brand: 'Pylontech US3000C', size: 3.5 },
    { brand: 'Pylontech US5000', size: 4.8 },
    { brand: 'Fox ESS HV2600', size: 2.6 },
    { brand: 'SolarEdge Energy Bank', size: 9.7 },
    { brand: 'Enphase IQ Battery 5P', size: 5.0 },
    { brand: 'Huawei LUNA2000', size: 5.0 },
    { brand: 'LG Chem RESU10H', size: 9.8 },
    { brand: 'Sonnen eco 8', size: 8.0 },
    { brand: 'Alpha ESS SMILE5', size: 5.2 },
    { brand: 'BYD Battery-Box Premium', size: 2.5 },
    { brand: 'Victron Energy Lithium', size: 5.0 },
    { brand: 'Growatt ARK XH', size: 2.5 },
    { brand: 'Other', size: 0 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-fill battery size when brand is selected
    if (name === 'batteryBrand') {
      const selectedBattery = batteryOptions.find(b => b.brand === value);
      if (selectedBattery && selectedBattery.brand !== 'Other') {
        setFormData(prev => ({
          ...prev,
          batterySize: selectedBattery.size.toString()
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          batterySize: ''
        }));
      }
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://solar-verify-backend-production.up.railway.app/api/register-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setShowEmailModal(false);
        setQuoteCount(prev => prev + 1);
        // Continue with analysis after email registration
        await analyzeQuote();
      } else {
        setError('Failed to register email');
      }
    } catch (err) {
      setError('Failed to register email');
    }
  };

  const analyzeQuote = async () => {
    setLoading(true);
    setError('');

    try {
      // Validate form data
      const systemSize = parseFloat(formData.systemSize);
      const totalPrice = parseFloat(formData.totalPrice);
      
      if (!systemSize || systemSize <= 0) {
        setError('Please enter a valid system size');
        setLoading(false);
        return;
      }
      
      if (!totalPrice || totalPrice <= 0) {
        setError('Please enter a valid total price');
        setLoading(false);
        return;
      }

      // Prepare payload in backend-compatible format (snake_case)
      const payload = {
        system_size: systemSize,  // Backend expects snake_case
        total_price: totalPrice,  // Backend expects snake_case
        email: email || null
      };

      // Add battery data if included
      if (formData.batteryIncluded === 'yes') {
        const batterySize = parseFloat(formData.batterySize);
        if (batterySize && batterySize > 0) {
          payload.battery_size = batterySize;  // Backend expects snake_case
        }
      }

      console.log('=== SENDING TO BACKEND ===');
      console.log('API URL:', 'https://solar-verify-backend-production.up.railway.app/api/analyze-quote');
      console.log('Payload:', JSON.stringify(payload, null, 2));

      const response = await fetch('https://solar-verify-backend-production.up.railway.app/api/analyze-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('=== RESPONSE STATUS ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);

      const responseText = await response.text();
      console.log('=== RAW RESPONSE ===');
      console.log('Raw Response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('=== PARSED RESPONSE ===');
        console.log('Parsed Data:', data);
      } catch (parseError) {
        console.error('=== JSON PARSE ERROR ===');
        console.error('Parse Error:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (response.ok && data.success) {
        setResult(data.analysis);
        setQuoteCount(prev => prev + 1);
      } else {
        console.error('=== API ERROR ===');
        console.error('Error Data:', data);
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      console.error('=== NETWORK ERROR ===');
      console.error('Network Error:', err);
      setError('Unable to connect to analysis service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if email is required (after first quote)
    if (quoteCount >= 1 && !email) {
      setShowEmailModal(true);
      return;
    }
    
    await analyzeQuote();
  };

  const isFormValid = () => {
    const hasSystemSize = formData.systemSize && parseFloat(formData.systemSize) > 0;
    const hasTotalPrice = formData.totalPrice && parseFloat(formData.totalPrice) > 0;
    const hasBatteryData = formData.batteryIncluded === 'no' || 
      (formData.batteryBrand && formData.batterySize && parseFloat(formData.batterySize) > 0);
    
    return hasSystemSize && hasTotalPrice && hasBatteryData;
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-blue-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'F': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏠</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Solar<span className="text-teal-600">✓</span>erify
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-teal-600 font-medium">About</Link>
              <a href="#analyzer" className="text-gray-700 hover:text-teal-600 font-medium">Quote Analyzer</a>
              <a href="#contact" className="text-gray-700 hover:text-teal-600 font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Don't Get Ripped Off By Solar Companies
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get an instant, unbiased analysis of your solar quote. Our AI-powered system grades quotes A-F based on real market data.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <p className="text-sm font-medium text-green-700">Excellent</p>
                <p className="text-xs text-gray-500">Great value</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <p className="text-sm font-medium text-blue-700">Good</p>
                <p className="text-xs text-gray-500">Fair price</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <p className="text-sm font-medium text-yellow-700">Average</p>
                <p className="text-xs text-gray-500">Market rate</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <p className="text-sm font-medium text-orange-700">Poor</p>
                <p className="text-xs text-gray-500">Overpriced</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <p className="text-sm font-medium text-red-700">Avoid</p>
                <p className="text-xs text-gray-500">Rip-off</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Analyzer */}
      <section id="analyzer" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-teal-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">Solar Quote Details</h2>
              <p className="text-teal-100">Enter your quote information for instant analysis</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* System Size */}
              <div>
                <label htmlFor="systemSize" className="block text-sm font-medium text-gray-700 mb-2">
                  System Size (kW) *
                </label>
                <input
                  type="number"
                  id="systemSize"
                  name="systemSize"
                  value={formData.systemSize}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 4kW, 6kW, 8kW"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">This should be on your quote (e.g., 4kW, 6kW, 8kW)</p>
              </div>

              {/* Battery Included */}
              <div>
                <label htmlFor="batteryIncluded" className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Included? *
                </label>
                <select
                  id="batteryIncluded"
                  name="batteryIncluded"
                  value={formData.batteryIncluded}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="no">No, Solar Panels Only</option>
                  <option value="yes">Yes, Battery Included</option>
                </select>
              </div>

              {/* Battery Brand & Size (conditional) */}
              {formData.batteryIncluded === 'yes' && (
                <>
                  <div>
                    <label htmlFor="batteryBrand" className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Brand & Model *
                    </label>
                    <select
                      id="batteryBrand"
                      name="batteryBrand"
                      value={formData.batteryBrand}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    >
                      <option value="">Select battery brand...</option>
                      {batteryOptions.map((battery, index) => (
                        <option key={index} value={battery.brand}>
                          {battery.brand} {battery.brand !== 'Other' ? `(${battery.size}kWh)` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="batterySize" className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Size (kWh) *
                    </label>
                    <input
                      type="number"
                      id="batterySize"
                      name="batterySize"
                      value={formData.batterySize}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g., 13.5"
                      required
                      readOnly={formData.batteryBrand && formData.batteryBrand !== 'Other'}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.batteryBrand && formData.batteryBrand !== 'Other' 
                        ? 'Auto-filled based on selected battery' 
                        : 'Enter the battery capacity in kWh'}
                    </p>
                  </div>
                </>
              )}

              {/* Total Price */}
              <div>
                <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                  Total Price (£) *
                </label>
                <input
                  type="number"
                  id="totalPrice"
                  name="totalPrice"
                  value={formData.totalPrice}
                  onChange={handleInputChange}
                  step="1"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 12000"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">The total amount you'll pay (including VAT)</p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="text-red-800 font-medium">Analysis Error</div>
                  <div className="text-red-600">{error}</div>
                  <div className="text-sm text-red-500 mt-1">Check browser console (F12) for detailed debugging info</div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={!isFormValid() || loading}
                  className={`flex-1 py-3 px-6 rounded-md font-medium ${
                    isFormValid() && !loading
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? 'Analyzing...' : 'Get My Grade Free'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      systemSize: '',
                      batteryIncluded: 'no',
                      batteryBrand: '',
                      batterySize: '',
                      totalPrice: ''
                    });
                    setResult(null);
                    setError('');
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Results */}
            {result && (
              <div className="border-t border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 ${getGradeColor(result.grade)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white font-bold text-3xl">{result.grade}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Grade {result.grade}</h3>
                  <p className="text-lg text-gray-600">{result.verdict}</p>
                  <p className="text-sm text-gray-500 mt-2">£{result.price_per_kw} per kW</p>
                </div>

                {/* Upgrade Teaser */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white text-center">
                  <h4 className="text-xl font-bold mb-2">Want More Detailed Analysis?</h4>
                  <p className="mb-4">Get component-by-component breakdown, installer verification, and personalized recommendations</p>
                  <ul className="text-sm mb-4 space-y-1">
                    <li>✓ Panel quality assessment</li>
                    <li>✓ Inverter efficiency analysis</li>
                    <li>✓ Installation quality check</li>
                    <li>✓ ROI calculations</li>
                  </ul>
                  <Link 
                    to="/login" 
                    className="inline-block bg-white text-purple-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100"
                  >
                    Upgrade for £9.99
                  </Link>
                  <p className="text-xs mt-2 opacity-90">30-day money-back guarantee</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Get 2 More Free Quotes</h3>
            <p className="text-gray-600 mb-4">
              Enter your email to unlock 2 additional free quote analyses. We'll also send you our solar buying guide.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                required
              />
              <p className="text-xs text-gray-500 mb-4">
                We respect your privacy. Your email will only be used for solar-related updates. 
                You can unsubscribe anytime. See our privacy policy for details.
              </p>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
                >
                  Get Free Analyses
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Why Choose Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Solar✓erify?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unbiased Analysis</h3>
              <p className="text-gray-600">Independent assessment based on real market data, not sales pressure</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600">Get your quote grade in seconds, not days of research</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Thousands</h3>
              <p className="text-gray-600">Avoid overpriced quotes and negotiate better deals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Questions? We're Here to Help</h2>
          <p className="text-lg text-gray-600 mb-8">
            Get expert advice on your solar journey. Our team has analyzed thousands of quotes.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">hello@solarverify.co.uk</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                <p className="text-gray-600">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏠</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Solar<span className="text-teal-600">✓</span>erify
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">Home</Link>
              <Link to="/about" className="text-teal-600 font-medium">About</Link>
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">Quote Analyzer</Link>
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Solar✓erify</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              We believe every homeowner deserves transparent, unbiased information when making one of their biggest investments. 
              Solar✓erify was created to level the playing field between consumers and solar companies.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 mb-6">
              Our AI-powered analysis engine compares your quote against thousands of real installations across the UK. 
              We factor in system size, component quality, regional pricing, and current market conditions to give you 
              an accurate grade from A to F.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Trust Us?</h2>
            <ul className="text-gray-600 space-y-2">
              <li>✓ Independent analysis - we're not affiliated with any solar companies</li>
              <li>✓ Real market data from thousands of installations</li>
              <li>✓ Transparent methodology based on industry standards</li>
              <li>✓ Continuously updated pricing database</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏠</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Solar<span className="text-teal-600">✓</span>erify
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-teal-600 font-medium">About</Link>
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">Quote Analyzer</Link>
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Premium Analysis</h1>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-teal-600 mb-2">£9.99</div>
              <p className="text-gray-600">One-time payment</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <span className="text-teal-600">✓</span>
                <span>Component-by-component analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-teal-600">✓</span>
                <span>Installer background check</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-teal-600">✓</span>
                <span>ROI calculations</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-teal-600">✓</span>
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-teal-600">✓</span>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
            
            <button className="w-full bg-teal-600 text-white py-3 px-6 rounded-md font-medium hover:bg-teal-700 mb-4">
              Get Premium Analysis
            </button>
            
            <p className="text-center text-sm text-gray-500">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

