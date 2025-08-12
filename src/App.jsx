import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// Navigation Component
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-teal-600">Solar✓erify</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-teal-600 transition-colors">
              About
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-teal-600 transition-colors">
              How It Works
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('analyzer')}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Quote Analyzer
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Email Verification Modal
const EmailVerificationModal = ({ isOpen, onClose, onVerified }) => {
  const [step, setStep] = useState('email'); // 'email', 'verification', 'success'
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const resetModal = () => {
    setStep('email');
    setEmail('');
    setVerificationCode('');
    setGdprConsent(false);
    setError('');
    setLoading(false);
  };

  const handleEmailSubmit = async () => {
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!gdprConsent) {
      setError('Please accept our privacy policy to continue');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://solar-verify-backend-production.up.railway.app/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          gdpr_consent: gdprConsent,
          consent_timestamp: new Date().toISOString()
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep('verification');
      } else {
        setError(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async () => {
    setError('');
    
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://solar-verify-backend-production.up.railway.app/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          verification_code: verificationCode
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep('success');
        setTimeout(() => {
          onVerified(email);
          onClose();
          resetModal();
        }, 2000);
      } else {
        setError(data.error || 'Invalid verification code');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('https://solar-verify-backend-production.up.railway.app/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          gdpr_consent: gdprConsent,
          consent_timestamp: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setError('New verification code sent!');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to resend code');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Privacy Policy Modal */}
        {showPrivacyPolicy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Privacy Policy</h3>
                <button 
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4 text-sm text-gray-700">
                <h4 className="font-semibold">Data Controller</h4>
                <p>Solar✓erify, hello@solarverify.co.uk</p>
                
                <h4 className="font-semibold">Legal Basis</h4>
                <p>We process your data based on your consent under Article 6(1)(a) GDPR.</p>
                
                <h4 className="font-semibold">Purpose</h4>
                <p>We collect your email to send you the Solar Buyer's Protection Guide and provide additional quote analyses.</p>
                
                <h4 className="font-semibold">Data Retention</h4>
                <p>We retain your data for 3 years or until you request deletion.</p>
                
                <h4 className="font-semibold">Your Rights</h4>
                <ul className="list-disc pl-5">
                  <li>Access your data</li>
                  <li>Rectify incorrect data</li>
                  <li>Delete your data</li>
                  <li>Port your data</li>
                  <li>Withdraw consent</li>
                </ul>
                
                <h4 className="font-semibold">Contact</h4>
                <p>For data requests: hello@solarverify.co.uk</p>
              </div>
              <button 
                onClick={() => setShowPrivacyPolicy(false)}
                className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 'email' && 'Unlock Additional Analyses'}
              {step === 'verification' && 'Verify Your Email'}
              {step === 'success' && 'Welcome to Solar✓erify!'}
            </h2>
            <button 
              onClick={() => { onClose(); resetModal(); }}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          {step === 'email' && (
            <div className="space-y-4">
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-semibold text-teal-800 mb-2">What You'll Get:</h3>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>✓ 2 additional free quote analyses</li>
                  <li>✓ Solar Buyer's Protection Guide (PDF)</li>
                  <li>✓ 20 essential questions to ask installers</li>
                  <li>✓ Red flags to avoid</li>
                  <li>✓ Warranty checklist</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">
                    I consent to receive the Solar Buyer's Protection Guide and occasional solar industry insights. 
                    I understand my data will be processed according to the{' '}
                    <button 
                      onClick={() => setShowPrivacyPolicy(true)}
                      className="text-teal-600 hover:text-teal-700 underline"
                    >
                      Privacy Policy
                    </button>
                    . I can unsubscribe at any time.
                  </span>
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <button
                onClick={handleEmailSubmit}
                disabled={loading}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Sending...' : 'Send Verification Email'}
              </button>

              <div className="text-xs text-gray-500 text-center">
                We respect your privacy and will never share your data with third parties.
              </div>
            </div>
          )}

          {step === 'verification' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="bg-teal-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-teal-700">
                    We've sent a 6-digit verification code to:
                  </p>
                  <p className="font-semibold text-teal-800">{email}</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Testing Mode:</strong> Check the Railway logs in your dashboard to see the verification code.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code *
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-center text-2xl font-mono tracking-widest"
                  placeholder="123456"
                  maxLength="6"
                />
              </div>

              {error && (
                <div className={`border px-4 py-3 rounded ${
                  error.includes('sent') 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  {error}
                </div>
              )}

              <button
                onClick={handleVerificationSubmit}
                disabled={loading}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>

              <div className="text-center">
                <button
                  onClick={handleResendCode}
                  disabled={loading}
                  className="text-sm text-teal-600 hover:text-teal-700 underline"
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="text-6xl">🎉</div>
              <h3 className="text-xl font-semibold text-green-600">Email Verified!</h3>
              <p className="text-gray-700">
                You now have access to 2 additional free quote analyses and your Solar Buyer's Protection Guide.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">
                  Redirecting you back to the analyzer...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Home Component with Quote Analyzer
const Home = () => {
  const [formData, setFormData] = useState({
    system_size: '',
    total_price: '',
    has_battery: false,
    battery_brand: '',
    battery_quantity: 1,
    battery_capacity: ''
  });
  
  const [batteryOptions, setBatteryOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisCount, setAnalysisCount] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // Fetch battery options on component mount
  useEffect(() => {
    fetchBatteryOptions();
  }, []);

  const fetchBatteryOptions = async () => {
    try {
      const response = await fetch('https://solar-verify-backend-production.up.railway.app/api/battery-options');
      if (response.ok) {
        const data = await response.json();
        setBatteryOptions(data.battery_options || []);
      }
    } catch (error) {
      console.error('Failed to fetch battery options:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        // Reset battery fields when unchecking
        ...(name === 'has_battery' && !checked ? {
          battery_brand: '',
          battery_quantity: 1,
          battery_capacity: ''
        } : {})
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!formData.system_size || parseFloat(formData.system_size) <= 0) {
      setError('Please enter a valid system size');
      return false;
    }
    
    if (!formData.total_price || parseFloat(formData.total_price) <= 0) {
      setError('Please enter a valid total price');
      return false;
    }
    
    if (formData.has_battery) {
      if (!formData.battery_brand) {
        setError('Please select a battery brand');
        return false;
      }
      
      if (formData.battery_brand === 'other' && (!formData.battery_capacity || parseFloat(formData.battery_capacity) <= 0)) {
        setError('Please enter battery capacity for other batteries');
        return false;
      }
      
      if (formData.battery_quantity < 1 || formData.battery_quantity > 5) {
        setError('Battery quantity must be between 1 and 5');
        return false;
      }
    }
    
    return true;
  };

  const analyzeQuote = async () => {
    setError('');
    
    // Check if this is the second analysis and user needs to verify email
    if (analysisCount >= 1 && !isVerified) {
      setShowEmailModal(true);
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const payload = {
        system_size: parseFloat(formData.system_size),
        total_price: parseFloat(formData.total_price),
        has_battery: formData.has_battery,
        battery_brand: formData.battery_brand,
        battery_quantity: parseInt(formData.battery_quantity),
        battery_capacity: formData.battery_capacity ? parseFloat(formData.battery_capacity) : 0
      };
      
      const response = await fetch('https://solar-verify-backend-production.up.railway.app/api/analyze-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }
      
      const data = await response.json();
      setResult(data);
      setAnalysisCount(prev => prev + 1);
      
    } catch (error) {
      console.error('Analysis error:', error);
      setError(error.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      system_size: '',
      total_price: '',
      has_battery: false,
      battery_brand: '',
      battery_quantity: 1,
      battery_capacity: ''
    });
    setResult(null);
    setError('');
  };

  const handleEmailVerified = (email) => {
    setUserEmail(email);
    setIsVerified(true);
    setShowEmailModal(false);
    // Automatically trigger analysis after verification
    setTimeout(() => {
      analyzeQuote();
    }, 500);
  };

  const getGradeColor = (grade) => {
    const colors = {
      'A': 'bg-green-100 text-green-800 border-green-200',
      'B': 'bg-blue-100 text-blue-800 border-blue-200',
      'C': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'D': 'bg-orange-100 text-orange-800 border-orange-200',
      'F': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[grade] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const selectedBattery = batteryOptions.find(b => b.value === formData.battery_brand);
  const totalBatteryCapacity = selectedBattery && selectedBattery.value !== 'other' 
    ? selectedBattery.capacity * formData.battery_quantity 
    : formData.battery_capacity * formData.battery_quantity;

  const remainingAnalyses = isVerified ? Math.max(0, 3 - analysisCount) : Math.max(0, 1 - analysisCount);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Email Verification Modal */}
      <EmailVerificationModal 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onVerified={handleEmailVerified}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Don't Get Scammed on Solar
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get your instant A-F grade on any solar quote. Protect yourself from overpriced installations and make informed decisions.
          </p>
          <button 
            onClick={() => document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Analyze My Quote Free
          </button>
        </div>
      </section>

      {/* Grade Scale */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Grading System</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              { grade: 'A', label: 'Excellent', desc: 'Outstanding value', color: 'bg-green-100 text-green-800' },
              { grade: 'B', label: 'Good', desc: 'Good value for money', color: 'bg-blue-100 text-blue-800' },
              { grade: 'C', label: 'Fair', desc: 'Market average price', color: 'bg-yellow-100 text-yellow-800' },
              { grade: 'D', label: 'Overpriced', desc: 'Above market rate', color: 'bg-orange-100 text-orange-800' },
              { grade: 'F', label: 'Avoid', desc: 'Severely overpriced', color: 'bg-red-100 text-red-800' }
            ].map((item) => (
              <div key={item.grade} className={`${item.color} p-4 rounded-lg text-center border-2`}>
                <div className="text-2xl font-bold">{item.grade}</div>
                <div className="font-semibold">{item.label}</div>
                <div className="text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Analyzer */}
      <section id="analyzer" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold">Solar Quote Analyzer</h2>
            <p className="mt-2">Get your instant A-F grade • Enhanced with battery analysis</p>
            {isVerified && (
              <div className="mt-2 bg-white bg-opacity-20 rounded px-3 py-1 inline-block">
                <span className="text-sm">✓ Verified • {remainingAnalyses} analyses remaining</span>
              </div>
            )}
            {!isVerified && analysisCount > 0 && (
              <div className="mt-2 bg-yellow-500 bg-opacity-20 rounded px-3 py-1 inline-block">
                <span className="text-sm">Next analysis requires email verification</span>
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-b-lg shadow-lg">
            {!result ? (
              <div className="space-y-6">
                {/* System Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    System Size (kW) *
                  </label>
                  <input
                    type="number"
                    name="system_size"
                    value={formData.system_size}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g., 5.0"
                  />
                </div>

                {/* Total Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Price (£) *
                  </label>
                  <input
                    type="number"
                    name="total_price"
                    value={formData.total_price}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g., 12000"
                  />
                </div>

                {/* Battery Included */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="has_battery"
                      checked={formData.has_battery}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Battery included?</span>
                  </label>
                </div>

                {/* Battery Options */}
                {formData.has_battery && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">Battery Details</h3>
                    
                    {/* Battery Brand */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Battery Brand *
                      </label>
                      <select
                        name="battery_brand"
                        value={formData.battery_brand}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select battery brand</option>
                        {batteryOptions.map((battery) => (
                          <option key={battery.value} value={battery.value}>
                            {battery.label} {battery.capacity > 0 && `(${battery.capacity}kWh)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Battery Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Batteries
                      </label>
                      <select
                        name="battery_quantity"
                        value={formData.battery_quantity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>

                    {/* Custom Battery Capacity */}
                    {formData.battery_brand === 'other' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Battery Capacity per Unit (kWh) *
                        </label>
                        <input
                          type="number"
                          name="battery_capacity"
                          value={formData.battery_capacity}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="e.g., 13.5"
                        />
                      </div>
                    )}

                    {/* Total Battery Capacity Display */}
                    {formData.battery_brand && totalBatteryCapacity > 0 && (
                      <div className="text-sm text-gray-600 bg-white p-3 rounded border">
                        <strong>Total Battery Capacity:</strong> {totalBatteryCapacity.toFixed(1)} kWh
                        {formData.battery_quantity > 1 && (
                          <span> ({formData.battery_quantity} × {(totalBatteryCapacity / formData.battery_quantity).toFixed(1)} kWh)</span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={analyzeQuote}
                  disabled={loading}
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Analyzing...' : 'Get My Grade Free'}
                </button>

                {/* Analysis Counter */}
                <div className="text-center text-sm text-gray-500">
                  {!isVerified && (
                    <span>
                      {analysisCount === 0 ? 'First analysis is completely free' : 'Email verification required for additional analyses'}
                    </span>
                  )}
                  {isVerified && (
                    <span>
                      {remainingAnalyses} free analyses remaining
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* Results Display */
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`inline-block px-8 py-4 rounded-lg border-2 ${getGradeColor(result.grade)}`}>
                    <div className="text-4xl font-bold">{result.grade}</div>
                  </div>
                  <h3 className="text-2xl font-bold mt-4 mb-2">Your Quote Grade</h3>
                  <p className="text-lg text-gray-600">{result.verdict}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Price per kW</div>
                    <div className="text-2xl font-bold text-gray-900">£{result.price_per_kw}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">System Size</div>
                    <div className="text-2xl font-bold text-gray-900">{result.system_details.system_size} kW</div>
                  </div>
                </div>

                {/* Battery Info */}
                {result.system_details.has_battery && result.system_details.battery_info && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Battery System</h4>
                    <div className="text-sm text-blue-800">
                      <div><strong>Brand:</strong> {result.system_details.battery_info.brand}</div>
                      <div><strong>Quantity:</strong> {result.system_details.battery_info.quantity}</div>
                      <div><strong>Total Capacity:</strong> {result.system_details.battery_info.total_capacity} kWh</div>
                    </div>
                  </div>
                )}

                {/* Premium Teaser */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Want More Details?</h3>
                  <p className="mb-4">Premium analysis includes detailed cost breakdowns, component-specific recommendations, and installer verification.</p>
                  <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Upgrade to Premium - £39.99
                  </button>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetForm}
                  className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Analyze Another Quote
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions about your solar quote? We're here to help.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <a 
              href="mailto:hello@solarverify.co.uk" 
              className="text-teal-600 hover:text-teal-700 font-semibold"
            >
              hello@solarverify.co.uk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// About Component
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">About Solar✓erify</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Solar✓erify was created to protect UK homeowners from solar scams and overpriced installations. 
            We provide instant, unbiased analysis of solar quotes using real market data and industry expertise.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Why We Exist</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            The solar industry has seen explosive growth, but unfortunately, some companies take advantage 
            of homeowners' lack of technical knowledge. We've seen quotes ranging from £8,000 to £25,000 
            for identical systems. Our tool helps you identify fair pricing and avoid costly mistakes.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-900">How We Help</h2>
          <ul className="text-gray-700 space-y-2 leading-relaxed">
            <li>• Instant A-F grading of any solar quote</li>
            <li>• Real-time market price comparisons</li>
            <li>• Battery system analysis and recommendations</li>
            <li>• Component-specific pricing insights</li>
            <li>• Protection from overpriced installations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// How It Works Component
const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">How It Works</h1>
        
        <div className="space-y-8">
          {[
            {
              step: "1",
              title: "Enter Your Quote Details",
              description: "Input your system size, total price, and battery information (if included). Our enhanced analyzer supports 18+ battery brands with accurate specifications."
            },
            {
              step: "2", 
              title: "Instant Analysis",
              description: "Our algorithm compares your quote against real UK market data, considering solar panels, batteries, and installation costs separately for accurate grading."
            },
            {
              step: "3",
              title: "Get Your Grade",
              description: "Receive an instant A-F grade with detailed verdict. Grades A-B indicate excellent value, while D-F suggest overpricing that you should avoid."
            },
            {
              step: "4",
              title: "Email Verification (Optional)", 
              description: "For additional analyses and our Solar Buyer's Protection Guide, verify your email. This unlocks 2 more free analyses and valuable resources."
            },
            {
              step: "5",
              title: "Make Informed Decisions", 
              description: "Use your grade to negotiate better prices, compare multiple quotes, or confidently proceed with fairly-priced installations."
            }
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors inline-block"
          >
            Try the Analyzer Now
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

