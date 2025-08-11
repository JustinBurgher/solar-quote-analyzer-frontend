import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Home Component with Enhanced Quote Analyzer
const Home = () => {
  const [systemSize, setSystemSize] = useState('');
  const [hasBattery, setHasBattery] = useState('no');
  const [batteryBrand, setBatteryBrand] = useState('');
  const [batteryQuantity, setBatteryQuantity] = useState(1);
  const [batterySize, setBatterySize] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [analysisCount, setAnalysisCount] = useState(0); // Track completed analyses
  const [emailCollected, setEmailCollected] = useState(false);

  // Enhanced battery options with accurate pricing data
  const batteryOptions = [
    { brand: 'Tesla Powerwall 3', size: '13.5', basePrice: 7750 },
    { brand: 'Tesla Powerwall 2', size: '13.5', basePrice: 7500 },
    { brand: 'Enphase IQ Battery 5P', size: '5.0', basePrice: 4200 },
    { brand: 'Enphase IQ Battery 10', size: '10.1', basePrice: 4800 },
    { brand: 'Enphase IQ Battery 10T', size: '10.5', basePrice: 5000 },
    { brand: 'GivEnergy Giv-Bat 2.6', size: '2.6', basePrice: 3200 },
    { brand: 'GivEnergy Giv-Bat 5.2', size: '5.2', basePrice: 3800 },
    { brand: 'GivEnergy Giv-Bat 9.5', size: '9.5', basePrice: 4500 },
    { brand: 'Fox ESS ECS2900', size: '2.9', basePrice: 3000 },
    { brand: 'Fox ESS ECS4100', size: '4.1', basePrice: 3500 },
    { brand: 'Pylontech Force H2', size: '7.1', basePrice: 4000 },
    { brand: 'Pylontech Force L2', size: '3.55', basePrice: 3200 },
    { brand: 'Solax Triple Power T58', size: '5.8', basePrice: 4100 },
    { brand: 'Solax Triple Power T63', size: '6.3', basePrice: 4300 },
    { brand: 'Huawei LUNA2000-5', size: '5.0', basePrice: 3900 },
    { brand: 'Huawei LUNA2000-10', size: '10.0', basePrice: 4700 },
    { brand: 'LG Chem RESU10H', size: '9.8', basePrice: 4600 },
    { brand: 'LG Chem RESU16H', size: '16.0', basePrice: 6200 },
    { brand: 'Other', size: '', basePrice: 0 }
  ];

  // Handle battery brand selection
  const handleBatteryBrandChange = (brand) => {
    setBatteryBrand(brand);
    const selectedBattery = batteryOptions.find(b => b.brand === brand);
    if (selectedBattery && selectedBattery.brand !== 'Other') {
      setBatterySize(selectedBattery.size);
    } else {
      setBatterySize('');
    }
  };

  // Calculate total battery capacity
  const getTotalBatteryCapacity = () => {
    if (hasBattery === 'yes' && batterySize) {
      return (parseFloat(batterySize) * batteryQuantity).toFixed(1);
    }
    return '0';
  };

  // Enhanced form validation
  const isFormValid = () => {
    const sizeValid = systemSize && parseFloat(systemSize) > 0;
    const priceValid = totalPrice && parseFloat(totalPrice) > 0;
    
    if (hasBattery === 'yes') {
      const batteryValid = batteryBrand && batterySize && parseFloat(batterySize) > 0;
      return sizeValid && priceValid && batteryValid;
    }
    
    return sizeValid && priceValid;
  };

  // Get remaining free analyses
  const getRemainingAnalyses = () => {
    if (emailCollected) {
      return Math.max(0, 3 - analysisCount); // 3 total if email provided
    } else {
      return Math.max(0, 1 - analysisCount); // 1 free without email
    }
  };

  // Handle quote analysis with improved email timing
  const handleAnalyze = async () => {
    if (!isFormValid()) {
      setError('Please fill in all required fields with valid values.');
      return;
    }

    // Check if this would be the second analysis and email not collected
    if (analysisCount >= 1 && !emailCollected) {
      setShowEmailModal(true);
      return;
    }

    // Check if user has exceeded their limit
    const remaining = getRemainingAnalyses();
    if (remaining <= 0) {
      setError('You have used all your free analyses. Please upgrade to Premium for unlimited access.');
      return;
    }

    await performAnalysis();
  };

  // Perform the actual analysis
  const performAnalysis = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Prepare payload with enhanced data
      const payload = {
        system_size: parseFloat(systemSize),
        has_battery: hasBattery === 'yes',
        battery_brand: hasBattery === 'yes' ? batteryBrand : null,
        battery_quantity: hasBattery === 'yes' ? batteryQuantity : 0,
        battery_size: hasBattery === 'yes' ? parseFloat(batterySize) : 0,
        total_battery_capacity: hasBattery === 'yes' ? parseFloat(getTotalBatteryCapacity()) : 0,
        total_price: parseFloat(totalPrice)
      };

      console.log('Sending enhanced request payload:', payload);

      const response = await fetch('https://solar-verify-backend.onrender.com/api/analyze-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      
      const rawResponse = await response.text();
      console.log('Raw response:', rawResponse);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${rawResponse}`);
      }

      const data = JSON.parse(rawResponse);
      console.log('Parsed response:', data);

      setResult(data);
      setAnalysisCount(prev => prev + 1); // Increment after successful analysis
      
    } catch (err) {
      console.error('Analysis error:', err);
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle email collection
  const handleEmailSubmit = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://solar-verify-backend.onrender.com/api/register-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setEmailCollected(true);
        setShowEmailModal(false);
        // Now proceed with the analysis
        await performAnalysis();
      } else {
        console.error('Email registration failed');
        // Still allow analysis to proceed
        setEmailCollected(true);
        setShowEmailModal(false);
        await performAnalysis();
      }
    } catch (error) {
      console.error('Email registration error:', error);
      // Still allow analysis to proceed
      setEmailCollected(true);
      setShowEmailModal(false);
      await performAnalysis();
    }
  };

  // Get grade color
  const getGradeColor = (grade) => {
    const colors = {
      'A': 'text-green-600 bg-green-50 border-green-200',
      'B': 'text-blue-600 bg-blue-50 border-blue-200',
      'C': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'D': 'text-orange-600 bg-orange-50 border-orange-200',
      'F': 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[grade] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Solar<span className="text-green-500">✓</span>erify
              </span>
            </div>
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">About</Link>
              <a href="#analyzer" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Quote Analyzer</a>
              <a href="#contact" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Don't Get Ripped Off By Solar Companies
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-teal-100">
            Get an instant A-F grade on any solar quote. Know if you're getting a fair deal.
          </p>
          <a href="#analyzer" className="bg-white text-teal-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Analyze Your Quote Free
          </a>
        </div>
      </div>

      {/* A-F Grading System */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our A-F Grading System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { grade: 'A', label: 'Excellent', desc: 'Outstanding value', color: 'green' },
              { grade: 'B', label: 'Good', desc: 'Good value for money', color: 'blue' },
              { grade: 'C', label: 'Fair', desc: 'Market average price', color: 'yellow' },
              { grade: 'D', label: 'Overpriced', desc: 'Above market rate', color: 'orange' },
              { grade: 'F', label: 'Avoid', desc: 'Severely overpriced', color: 'red' }
            ].map((item) => (
              <div key={item.grade} className={`p-6 rounded-lg border-2 text-center ${getGradeColor(item.grade)}`}>
                <div className="text-3xl font-bold mb-2">{item.grade}</div>
                <div className="font-semibold mb-1">{item.label}</div>
                <div className="text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Quote Analyzer */}
      <div id="analyzer" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">Solar Quote Analyzer</h2>
              <p className="text-teal-100">
                Get your instant A-F grade • {getRemainingAnalyses()} free analyses remaining
                {emailCollected && <span> • Email verified ✓</span>}
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* System Size */}
                <div>
                  <label htmlFor="system-size" className="block text-sm font-medium text-gray-700 mb-2">
                    System Size (kW) *
                  </label>
                  <input
                    type="number"
                    id="system-size"
                    name="system-size"
                    step="0.1"
                    min="0"
                    value={systemSize}
                    onChange={(e) => setSystemSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g., 5.0"
                  />
                </div>

                {/* Total Price */}
                <div>
                  <label htmlFor="total-price" className="block text-sm font-medium text-gray-700 mb-2">
                    Total Price (£) *
                  </label>
                  <input
                    type="number"
                    id="total-price"
                    name="total-price"
                    step="100"
                    min="0"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g., 12000"
                  />
                </div>
              </div>

              {/* Battery Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Included? *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="battery"
                      value="no"
                      checked={hasBattery === 'no'}
                      onChange={(e) => setHasBattery(e.target.value)}
                      className="mr-2"
                    />
                    No, Solar Panels Only
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="battery"
                      value="yes"
                      checked={hasBattery === 'yes'}
                      onChange={(e) => setHasBattery(e.target.value)}
                      className="mr-2"
                    />
                    Yes, Battery Included
                  </label>
                </div>
              </div>

              {/* Enhanced Battery Details */}
              {hasBattery === 'yes' && (
                <div className="mt-6 space-y-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Battery Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Battery Brand */}
                    <div>
                      <label htmlFor="battery-brand" className="block text-sm font-medium text-gray-700 mb-2">
                        Battery Brand *
                      </label>
                      <select
                        id="battery-brand"
                        name="battery-brand"
                        value={batteryBrand}
                        onChange={(e) => handleBatteryBrandChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select battery brand...</option>
                        {batteryOptions.map((battery) => (
                          <option key={battery.brand} value={battery.brand}>
                            {battery.brand} {battery.size && `(${battery.size}kWh)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Battery Quantity */}
                    <div>
                      <label htmlFor="battery-quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Batteries *
                      </label>
                      <select
                        id="battery-quantity"
                        name="battery-quantity"
                        value={batteryQuantity}
                        onChange={(e) => setBatteryQuantity(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Battery Size */}
                  <div>
                    <label htmlFor="battery-size" className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Size per Unit (kWh) *
                    </label>
                    <input
                      type="number"
                      id="battery-size"
                      name="battery-size"
                      step="0.1"
                      min="0"
                      value={batterySize}
                      onChange={(e) => setBatterySize(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g., 13.5"
                      disabled={batteryBrand && batteryBrand !== 'Other'}
                    />
                  </div>

                  {/* Total Battery Capacity Display */}
                  {batterySize && (
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-600">
                        <strong>Total Battery Capacity:</strong> {getTotalBatteryCapacity()}kWh 
                        ({batteryQuantity} × {batterySize}kWh)
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600">{error}</p>
                  <p className="text-sm text-red-500 mt-1">Check browser console (F12) for detailed debugging info.</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={!isFormValid() || loading || getRemainingAnalyses() <= 0}
                  className={`w-full py-3 px-4 rounded-md font-semibold text-lg transition-colors ${
                    isFormValid() && !loading && getRemainingAnalyses() > 0
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? 'Analyzing...' : 
                   getRemainingAnalyses() <= 0 ? 'Upgrade for More Analyses' :
                   'Get My Grade Free'}
                </button>
              </div>

              {/* Results Display */}
              {result && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Quote Analysis</h3>
                  
                  <div className={`inline-block px-4 py-2 rounded-lg text-2xl font-bold mb-4 ${getGradeColor(result.grade)}`}>
                    Grade: {result.grade}
                  </div>
                  
                  <div className="space-y-2 text-gray-700">
                    <p><strong>System Size:</strong> {result.system_size}kW</p>
                    {result.has_battery && (
                      <>
                        <p><strong>Battery:</strong> {result.battery_brand} × {result.battery_quantity}</p>
                        <p><strong>Total Battery Capacity:</strong> {result.total_battery_capacity}kWh</p>
                      </>
                    )}
                    <p><strong>Total Price:</strong> £{result.total_price?.toLocaleString()}</p>
                    
                    {/* Enhanced Cost Breakdown */}
                    <div className="mt-4 p-3 bg-white rounded border">
                      <h4 className="font-semibold mb-2">Cost Breakdown:</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Solar Panels:</strong> £{result.solar_panel_cost?.toLocaleString()} (£{result.price_per_kw?.toLocaleString()}/kW)</p>
                        {result.has_battery && (
                          <p><strong>Battery System:</strong> £{result.battery_cost?.toLocaleString()}</p>
                        )}
                        <p><strong>Installation:</strong> £{result.installation_cost?.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <p className="mt-3"><strong>Verdict:</strong> {result.verdict}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Upgrade Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Want a Deeper Analysis?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Get our comprehensive Premium Analysis for just £39.99
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-left">
              <h3 className="font-semibold mb-3">Advanced Analysis Includes:</h3>
              <ul className="space-y-2 text-purple-100">
                <li>• Component quality assessment</li>
                <li>• Installer verification & reputation check</li>
                <li>• Warranty comparison vs industry standards</li>
                <li>• Payback period validation</li>
                <li>• Performance projections</li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-3">Premium Features:</h3>
              <ul className="space-y-2 text-purple-100">
                <li>• MCS installer registration check</li>
                <li>• Online reputation analysis</li>
                <li>• Red flag detection system</li>
                <li>• Detailed component specifications</li>
                <li>• 30-day money-back guarantee</li>
              </ul>
            </div>
          </div>
          
          <Link to="/login" className="bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Upgrade to Premium Analysis
          </Link>
        </div>
      </div>

      {/* Email Collection Modal - Improved Timing */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Get 2 More Free Analyses</h3>
            <p className="text-gray-600 mb-4">
              You've used your first free analysis! Enter your email to unlock 2 additional free quote analyses, 
              plus receive our <strong>Solar Buyer's Protection Guide</strong> with essential tips to avoid costly mistakes.
            </p>
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
            />
            
            <p className="text-xs text-gray-500 mb-4">
              By providing your email, you agree to receive our Solar Buyer's Protection Guide and occasional updates about solar industry insights. We respect your privacy and will never share your data. You can unsubscribe at any time.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleEmailSubmit}
                className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
              >
                Get Free Guide & Analyses
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Questions? We're Here to Help</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get expert advice on your solar investment
          </p>
          <a href="mailto:hello@solarverify.co.uk" className="bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

// About Component
const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </div>
              <Link to="/" className="text-xl font-bold text-gray-900">
                Solar<span className="text-green-500">✓</span>erify
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Home</Link>
              <Link to="/about" className="text-teal-600 px-3 py-2 text-sm font-medium font-semibold">About</Link>
              <Link to="/#analyzer" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Quote Analyzer</Link>
              <Link to="/#contact" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Solar✓erify</h1>
          
          <div className="prose prose-lg text-gray-700 space-y-6">
            <p>
              Solar✓erify was created to solve a critical problem in the UK solar industry: 
              homeowners getting ripped off by unscrupulous solar companies charging vastly 
              inflated prices for substandard installations.
            </p>
            
            <p>
              After seeing countless families pay £15,000+ for solar systems worth half that 
              amount, we knew something had to change. That's why we built the UK's first 
              independent solar quote verification platform.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p>
              To empower UK homeowners with the knowledge and tools they need to make informed 
              solar investment decisions, ensuring they get fair value for their money and avoid 
              costly mistakes.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Help</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Instant A-F grading of any solar quote</li>
              <li>Component quality assessment and verification</li>
              <li>Installer reputation and certification checks</li>
              <li>Fair pricing analysis based on current market rates</li>
              <li>Red flag detection for common solar scams</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Trust Us?</h2>
            <p>
              Our analysis is based on real market data, industry standards, and years of 
              experience in the solar sector. We're completely independent - we don't sell 
              solar systems, so our only interest is giving you honest, unbiased advice.
            </p>
            
            <p>
              Don't let solar companies take advantage of you. Get your quote verified today 
              and invest with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Component (Premium Upgrade Page)
const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </div>
              <Link to="/" className="text-xl font-bold text-gray-900">
                Solar<span className="text-green-500">✓</span>erify
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">About</Link>
              <Link to="/#analyzer" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Quote Analyzer</Link>
              <Link to="/#contact" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Upgrade Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Solar Analysis</h1>
            <p className="text-xl text-gray-600">
              Get the complete picture with our comprehensive £39.99 analysis
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-purple-600 mb-2">£39.99</div>
              <p className="text-gray-600">One-time comprehensive analysis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Component quality assessment (panels, batteries, inverters)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Installer verification & MCS registration check
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Online reputation analysis & review scanning
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Warranty comparison vs industry standards
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Payback period validation & performance projections
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Features:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Upload detailed quote documents
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Red flag detection system
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Detailed component specifications analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Comprehensive PDF report
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    30-day money-back guarantee
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors mb-4">
                Get Premium Analysis
              </button>
              <p className="text-sm text-gray-500">
                Secure payment • Instant delivery • 30-day guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

