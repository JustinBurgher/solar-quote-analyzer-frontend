import Upgrade from './pages/Upgrade.jsx';
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
            <Link to="/upgrade" className="text-gray-700 hover:text-teal-600 transition-colors">Upgrade</Link>
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
  const [isAdmin, setIsAdmin] = useState(false);

  const resetModal = () => {
    setStep('email');
    setEmail('');
    setVerificationCode('');
    setGdprConsent(false);
    setError('');
    setLoading(false);
    setIsAdmin(false);
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
        setIsAdmin(data.is_admin || false);
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
        setIsAdmin(data.is_admin || false);
        // Auto-close and proceed after shorter delay
        setTimeout(() => {
          onVerified(email, data.is_admin || false);
          onClose();
          resetModal();
        }, 1500);
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

  // Auto-close modal when user clicks outside or presses escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
        resetModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

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
              {step === 'success' && (isAdmin ? 'Admin Access Granted!' : 'Welcome to Solar✓erify!')}
            </h2>
            <button 
              onClick={() => { onClose(); resetModal(); }}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Admin Badge */}
          {isAdmin && (
            <div className="mb-4 bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <span className="text-purple-600">👑</span>
                <span className="text-sm font-semibold text-purple-800">Admin Testing Mode</span>
              </div>
              <p className="text-xs text-purple-600 mt-1">Unlimited analyses for testing purposes</p>
            </div>
          )}

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
              <div className="text-6xl">{isAdmin ? '👑' : '🎉'}</div>
              <h3 className="text-xl font-semibold text-green-600">
                {isAdmin ? 'Admin Access Granted!' : 'Email Verified!'}
              </h3>
              <p className="text-gray-700">
                {isAdmin 
                  ? 'You have unlimited access for testing purposes.'
                  : 'You now have access to 2 additional free quote analyses and your Solar Buyer\'s Protection Guide.'
                }
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">
                  Proceeding with your analysis...
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState(false);

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

  const handleBatteryBrandChange = (e) => {
    const selectedBrand = e.target.value;
    const selectedBattery = batteryOptions.find(b => b.brand === selectedBrand);
    
    setFormData(prev => ({
      ...prev,
      battery_brand: selectedBrand,
      battery_capacity: selectedBrand === "Other (specify capacity)" ? '' : 
                      selectedBattery ? selectedBattery.capacity : ''
    }));
  };

  const calculateTotalCapacity = () => {
    if (!formData.has_battery) return 0;
    
    if (formData.battery_brand === "Other (specify capacity)") {
      return parseFloat(formData.battery_capacity) * formData.battery_quantity || 0;
    }
    
    const selectedBattery = batteryOptions.find(b => b.brand === formData.battery_brand);
    return selectedBattery ? selectedBattery.capacity * formData.battery_quantity : 0;
  };

  const handleEmailVerified = (email, adminStatus = false) => {
    setUserEmail(email);
    setIsVerified(true);
    setIsAdmin(adminStatus);
    
    // If analysis was pending, trigger it now
    if (pendingAnalysis) {
      setPendingAnalysis(false);
      setTimeout(() => {
        handleSubmit();
      }, 100);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Check if email verification is needed (non-admin users only)
    if (!isAdmin && analysisCount >= 1 && !isVerified) {
      setPendingAnalysis(true);
      setShowEmailModal(true);
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://solar-verify-backend-production.up.railway.app/api/analyze-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_email: userEmail
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
        setAnalysisCount(data.analysis_count || analysisCount + 1);
        setIsAdmin(data.is_admin || false);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
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

  const getRemainingAnalyses = () => {
    if (isAdmin) return "unlimited";
    if (!isVerified) return analysisCount >= 1 ? 0 : 1;
    return Math.max(0, 3 - analysisCount);
  };

  const shouldShowUpgrade = () => {
    return !isAdmin && analysisCount >= 3 && isVerified;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get Your Solar Quote <span className="text-teal-600">Verified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Don't get ripped off! Our AI-powered analyzer instantly grades your solar quote 
            and tells you if you're getting a fair deal.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">Instant Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">Fair Price Check</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">Battery Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Analyzer Section */}
      <section id="analyzer" className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Solar Quote Analyzer</h2>
              <p className="text-teal-100 mb-4">Get your instant A-F grade • Enhanced with battery analysis</p>
              
              {/* Admin Status Indicator */}
              {isAdmin && (
                <div className="bg-purple-500 bg-opacity-30 border border-purple-300 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">👑</span>
                    <div>
                      <p className="font-semibold">Admin Testing Mode Active</p>
                      <p className="text-sm text-purple-100">Unlimited analyses for testing purposes</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Analysis Counter */}
              {!isAdmin && (
                <div className="bg-teal-500 bg-opacity-30 border border-teal-300 rounded-lg p-3">
                  <p className="text-sm">
                    {!isVerified && analysisCount === 0 && "Next analysis requires email verification"}
                    {!isVerified && analysisCount >= 1 && "Email verification required for additional analyses"}
                    {isVerified && getRemainingAnalyses() > 0 && `${getRemainingAnalyses()} analyses remaining`}
                    {shouldShowUpgrade() && "Upgrade for unlimited analyses"}
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
                  min="0.1"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., 4.3"
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
                  min="1"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., 13275"
                />
              </div>

              {/* Battery Included */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="has_battery"
                  id="has_battery"
                  checked={formData.has_battery}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="has_battery" className="text-sm font-medium text-gray-700">
                  Battery included?
                </label>
              </div>

              {/* Battery Details */}
              {formData.has_battery && (
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Battery Details</h3>
                  
                  {/* Battery Brand */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Brand *
                    </label>
                    <select
                      name="battery_brand"
                      value={formData.battery_brand}
                      onChange={handleBatteryBrandChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select battery brand...</option>
                      {batteryOptions.map((battery, index) => (
                        <option key={index} value={battery.brand}>
                          {battery.brand} {battery.capacity > 0 && `(${battery.capacity}kWh)`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of Batteries */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Batteries
                    </label>
                    <select
                      name="battery_quantity"
                      value={formData.battery_quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Capacity for "Other" */}
                  {formData.battery_brand === "Other (specify capacity)" && (
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
                        min="0.1"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="e.g., 10.0"
                      />
                    </div>
                  )}

                  {/* Total Capacity Display */}
                  {calculateTotalCapacity() > 0 && (
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <p className="text-sm text-teal-800">
                        <strong>Total Battery Capacity:</strong> {calculateTotalCapacity().toFixed(1)} kWh
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (shouldShowUpgrade() && !isAdmin)}
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-teal-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? 'Analyzing...' : shouldShowUpgrade() && !isAdmin ? 'Upgrade Required' : 'Get My Grade Free'}
              </button>

              {/* Upgrade Message */}
              {shouldShowUpgrade() && !isAdmin && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">You've used all 3 free analyses</p>
                  <button
                    type="button"
                    className="text-teal-600 hover:text-teal-700 font-semibold underline"
                  >
                    Upgrade to Premium - £39.99
                  </button>
                </div>
              )}

              {/* Email verification notice */}
              {!isAdmin && !isVerified && analysisCount >= 1 && (
                <p className="text-center text-sm text-gray-600">
                  Email verification required for additional analyses
                </p>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="font-semibold">Analysis failed:</p>
                  <p>{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Results Section */}
          {result && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Your Quote Grade</h3>
                    <p className="text-green-100">Analysis complete</p>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl font-bold">{result.grade}</div>
                    <div className="text-sm text-green-100">Grade</div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Verdict</h4>
                  <p className="text-gray-700">{result.verdict}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Price Analysis</h4>
                    <p className="text-blue-700">£{result.price_per_kw}/kW</p>
                    <p className="text-sm text-blue-600">Price per kilowatt</p>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-900 mb-2">System Details</h4>
                    <p className="text-teal-700">{result.system_details.system_size}kW System</p>
                    <p className="text-sm text-teal-600">Total: £{result.system_details.total_price}</p>
                  </div>
                </div>

                {result.system_details.has_battery && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Battery Information</h4>
                    <p className="text-purple-700">{result.system_details.battery_info}</p>
                    <p className="text-sm text-purple-600">Total Capacity: {result.system_details.total_capacity}</p>
                  </div>
                )}

                {/* Premium Teaser */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Want More Details?</h4>
                  <p className="text-sm text-yellow-800 mb-3">
                    Premium includes detailed cost breakdowns, installation analysis, and component-specific recommendations.
                  </p>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors">
                    Upgrade to Premium - £39.99
                  </button>
                </div>

                {/* Analysis Another Quote Button */}
                <div className="text-center pt-4">
                  <button
                    onClick={resetForm}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Analyze Another Quote
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          setPendingAnalysis(false);
        }}
        onVerified={handleEmailVerified}
      />

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get Expert Help</h2>
          <p className="text-xl text-gray-300 mb-8">
            Need personalized advice? Our solar experts are here to help you make the right decision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Email Support</h3>
              <p className="text-gray-300 mb-4">Get detailed analysis and recommendations</p>
              <a href="mailto:hello@solarverify.co.uk" className="text-teal-400 hover:text-teal-300">
                hello@solarverify.co.uk
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Premium Analysis</h3>
              <p className="text-gray-300 mb-4">Comprehensive quote review and negotiation tips</p>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// About Component
const About = () => (
  <div className="min-h-screen bg-gray-50 pt-20">
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Solar✓erify</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-6">
          We're on a mission to protect homeowners from overpriced solar installations 
          and help them make informed decisions about renewable energy.
        </p>
        <p className="text-gray-700 mb-6">
          Our AI-powered analysis tool has reviewed thousands of solar quotes and can 
          instantly tell you if you're getting a fair deal. We consider factors like 
          system size, equipment quality, installation complexity, and regional pricing 
          to give you an accurate assessment.
        </p>
        <p className="text-gray-700">
          Don't let high-pressure sales tactics rush you into a bad deal. Get your 
          quote verified first and negotiate from a position of knowledge.
        </p>
      </div>
    </div>
  </div>
);

// How It Works Component
const HowItWorks = () => (
  <div className="min-h-screen bg-gray-50 pt-20">
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">How It Works</h1>
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">1</div>
            <h3 className="text-xl font-semibold">Enter Your Quote Details</h3>
          </div>
          <p className="text-gray-700">
            Input your system size, total price, and battery information (if included). 
            Our form guides you through all the necessary details.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">2</div>
            <h3 className="text-xl font-semibold">AI Analysis</h3>
          </div>
          <p className="text-gray-700">
            Our algorithm compares your quote against thousands of installations, 
            considering equipment costs, installation complexity, and regional pricing.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">3</div>
            <h3 className="text-xl font-semibold">Get Your Grade</h3>
          </div>
          <p className="text-gray-700">
            Receive an instant A-F grade with detailed feedback on whether you're 
            getting a fair deal, plus tips for negotiation.
          </p>
        </div>
      </div>
    </div>
  </div>
);

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
          <Route path="/upgrade" element={<Upgrade />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
