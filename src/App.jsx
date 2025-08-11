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
  const [analysisCount, setAnalysisCount] = useState(0);

  const batteryOptions = [
    { brand: "Tesla Powerwall 2", size: "13.5" },
    { brand: "Tesla Powerwall 3", size: "13.5" },
    { brand: "GivEnergy All-in-One", size: "9.5" },
    { brand: "GivEnergy Battery", size: "5.2" },
    { brand: "Fox ESS ECS4100", size: "10.65" },
    { brand: "Pylontech US3000C", size: "3.55" },
    { brand: "Pylontech US5000", size: "4.8" },
    { brand: "Solax Triple Power", size: "11.6" },
    { brand: "Huawei LUNA2000", size: "15" },
    { brand: "LG Chem RESU", size: "9.8" },
    { brand: "Enphase IQ Battery", size: "10.08" },
    { brand: "SolarEdge Energy Bank", size: "9.7" },
    { brand: "Alpha ESS SMILE", size: "10.1" },
    { brand: "Victron Energy", size: "5.12" },
    { brand: "BYD Battery-Box", size: "13.8" },
    { brand: "Growatt ARK XH", size: "6.5" },
    { brand: "Other", size: "" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      if (field === 'batteryBrand' && value !== 'Other') {
        const selectedBattery = batteryOptions.find(b => b.brand === value);
        if (selectedBattery) {
          updated.batterySize = selectedBattery.size;
        }
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('=== SENDING TO BACKEND ===');
      console.log('Form Data:', formData);

      const systemSize = parseFloat(formData.systemSize);
      const totalPrice = parseFloat(formData.totalPrice);
      const batterySize = formData.batteryIncluded === 'yes' ? parseFloat(formData.batterySize) : 0;

      if (isNaN(systemSize) || systemSize <= 0) {
        throw new Error('Please enter a valid system size');
      }
      if (isNaN(totalPrice) || totalPrice <= 0) {
        throw new Error('Please enter a valid total price');
      }

      const payload = {
        system_size: systemSize,
        battery_size: batterySize,
        total_price: totalPrice
      };

      console.log('Processed Payload:', payload);
      console.log('API URL:', 'https://solar-verify-backend-production.up.railway.app/api/analyze-quote');

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
        console.error('JSON Parse Error:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        console.log('=== API ERROR ===');
        console.log('Error Data:', data);
        throw new Error(data.error || 'Analysis failed');
      }

      if (data.success && data.analysis) {
        setResult(data.analysis);
        setAnalysisCount(prev => prev + 1);
        
        // Show email modal after first analysis
        if (analysisCount === 0) {
          setTimeout(() => setShowEmailModal(true), 2000);
        }
      } else {
        throw new Error('Invalid response format');
      }

    } catch (err) {
      console.error('=== FULL ERROR ===');
      console.error('Error:', err);
      setError(err.message || 'Analysis failed. Check browser console (F12) for detailed debugging info.');
    } finally {
      setLoading(false);
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
        setEmail('');
      }
    } catch (err) {
      console.error('Email registration failed:', err);
    }
  };

  const isFormValid = () => {
    if (!formData.systemSize || !formData.totalPrice) return false;
    if (formData.batteryIncluded === 'yes' && (!formData.batteryBrand || !formData.batterySize)) return false;
    return true;
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-50 border-green-200';
      case 'B': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'C': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'D': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'F': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🏠</span>
              </div>
              <span className="text-xl font-bold text-gray-900">solar<span className="text-green-500">✓</span>erify</span>
            </div>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-teal-600 font-medium">About</Link>
              <a href="#quote-analyzer" className="text-gray-700 hover:text-teal-600 font-medium">Quote Analyzer</a>
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
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get an instant, unbiased analysis of your solar quote. Our AI-powered system grades quotes A-F based on real market data.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
              Analyze Your Quote
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Grading System */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How We Grade Your Solar Quote
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { grade: 'A', label: 'Excellent', desc: 'Great value', color: 'green' },
              { grade: 'B', label: 'Good', desc: 'Fair price', color: 'blue' },
              { grade: 'C', label: 'Average', desc: 'Market rate', color: 'yellow' },
              { grade: 'D', label: 'Poor', desc: 'Overpriced', color: 'orange' },
              { grade: 'F', label: 'Avoid', desc: 'Rip-off', color: 'red' }
            ].map((item) => (
              <div key={item.grade} className={`p-6 rounded-lg border-2 text-center bg-${item.color}-50 border-${item.color}-200`}>
                <div className={`text-3xl font-bold text-${item.color}-600 mb-2`}>{item.grade}</div>
                <div className={`font-semibold text-${item.color}-700 mb-1`}>{item.label}</div>
                <div className={`text-sm text-${item.color}-600`}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Analyzer */}
      <section id="quote-analyzer" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-teal-500 text-white p-6">
              <h3 className="text-2xl font-bold">Solar Quote Details</h3>
              <p className="text-teal-100 mt-2">Enter your quote information for instant analysis</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* System Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Size (kW) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.systemSize}
                  onChange={(e) => handleInputChange('systemSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 4kW, 6kW, 8kW"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">This should be on your quote (e.g., 4kW, 6kW, 8kW)</p>
              </div>

              {/* Battery Included */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Included? *
                </label>
                <select
                  value={formData.batteryIncluded}
                  onChange={(e) => handleInputChange('batteryIncluded', e.target.value)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Brand & Model *
                    </label>
                    <select
                      value={formData.batteryBrand}
                      onChange={(e) => handleInputChange('batteryBrand', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    >
                      <option value="">Select battery brand...</option>
                      {batteryOptions.map((battery) => (
                        <option key={battery.brand} value={battery.brand}>
                          {battery.brand} {battery.size && `(${battery.size}kWh)`}
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
                      step="0.1"
                      min="0"
                      value={formData.batterySize}
                      onChange={(e) => handleInputChange('batterySize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g., 13.5"
                      required
                      readOnly={formData.batteryBrand !== 'Other'}
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
                  min="0"
                  value={formData.totalPrice}
                  onChange={(e) => handleInputChange('totalPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 15000"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">The total amount you'll pay (including VAT)</p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="text-red-800 font-medium">Analysis Error</div>
                  <div className="text-red-600 text-sm mt-1">{error}</div>
                  <div className="text-red-500 text-xs mt-2">Check browser console (F12) for detailed debugging info</div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-colors ${
                  isFormValid() && !loading
                    ? 'bg-teal-500 hover:bg-teal-600'
                    : 'bg-gray-300 cursor-not-allowed'
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
                className="w-full py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Quote Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`p-6 rounded-lg border-2 text-center ${getGradeColor(result.grade)}`}>
                  <div className="text-4xl font-bold mb-2">Grade {result.grade}</div>
                  <div className="font-semibold">{result.verdict}</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Size:</span>
                    <span className="font-semibold">{result.system_size}kW</span>
                  </div>
                  {result.battery_size && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Battery Size:</span>
                      <span className="font-semibold">{result.battery_size}kWh</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="font-semibold">£{result.total_price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Price per kW:</span>
                    <span className="font-bold text-lg">£{result.price_per_kw}</span>
                  </div>
                </div>
              </div>

              {/* Premium Upgrade Section */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Want a Deeper Analysis?</h4>
                  <p className="text-gray-600 mb-4">Get our comprehensive Premium Analysis for just £39.99</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900">📊 Advanced Analysis Includes:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Component quality assessment (panels, batteries, inverters)</li>
                        <li>• Installer verification & reputation check</li>
                        <li>• Warranty comparison vs industry standards</li>
                        <li>• Payback period validation</li>
                        <li>• Performance projections</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900">🔍 Premium Features:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• MCS installer registration check</li>
                        <li>• Online reputation analysis</li>
                        <li>• Red flag detection system</li>
                        <li>• Detailed component specifications</li>
                        <li>• 30-day money-back guarantee</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link 
                      to="/login"
                      className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      Get Premium Analysis - £39.99
                    </Link>
                    <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Maybe Later
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    ✅ 30-day money-back guarantee • ✅ Instant delivery • ✅ Professional analysis
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Get 2 More Free Analyses</h3>
            <p className="text-gray-600 mb-4">
              Enter your email to unlock 2 additional free quote analyses and receive our 
              <strong> Solar Buyer's Protection Guide</strong> - a comprehensive PDF with essential 
              questions to ask installers and red flags to avoid.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              
              <div className="text-xs text-gray-500">
                <p><strong>GDPR Notice:</strong> We'll use your email to send you the Solar Buyer's Protection Guide 
                and occasional updates about solar industry insights. You can unsubscribe anytime. 
                We never share your data with third parties.</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-teal-600 transition-colors"
                >
                  Get Free Guide + 2 More Analyses
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Why Choose Solar✓erify */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Solar✓erify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unbiased Analysis</h3>
              <p className="text-gray-600">Independent assessment based on real market data, not sales pressure.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600">Get your quote grade in seconds, not days of research.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600">Avoid overpriced quotes and make informed decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions about your solar quote? We're here to help.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
              Contact Us
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              FAQ
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🏠</span>
                </div>
                <span className="text-xl font-bold">solar<span className="text-green-500">✓</span>erify</span>
              </div>
              <p className="text-gray-400">
                Protecting consumers from solar scams with unbiased quote analysis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Quote Analysis</li>
                <li>Premium Reports</li>
                <li>Installer Verification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>How It Works</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>GDPR</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Solar✓erify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Solar✓erify</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-600 mb-6">
            Solar✓erify was created to protect consumers from overpriced solar installations and questionable sales practices. 
            Our mission is to provide transparent, unbiased analysis of solar quotes using real market data.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            With thousands of homeowners getting solar quotes every day, many are unsure whether they're getting a fair deal. 
            Our AI-powered analysis system grades quotes from A to F, helping you make informed decisions about your solar investment.
          </p>
          <p className="text-lg text-gray-600">
            We believe everyone deserves access to clean, affordable solar energy without being taken advantage of by 
            unscrupulous installers. That's why we provide free basic analysis and comprehensive premium reports at transparent pricing.
          </p>
        </div>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Premium Analysis</h1>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">£39.99</div>
            <p className="text-gray-600">One-time comprehensive analysis</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900">What's Included:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✅ Component quality assessment (panels, batteries, inverters)</li>
              <li>✅ Installer verification & MCS registration check</li>
              <li>✅ Online reputation analysis</li>
              <li>✅ Warranty comparison vs industry standards</li>
              <li>✅ Payback period validation</li>
              <li>✅ Performance projections</li>
              <li>✅ Red flag detection system</li>
              <li>✅ Detailed component specifications</li>
              <li>✅ 30-day money-back guarantee</li>
            </ul>
          </div>
          
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-purple-700 transition-colors"
            >
              Get Premium Analysis - £39.99
            </button>
          </form>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            Secure payment • Instant delivery • 30-day guarantee
          </p>
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

