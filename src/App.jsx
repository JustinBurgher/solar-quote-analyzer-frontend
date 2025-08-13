import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CheckCircle, Shield, Users, Star, MapPin, Mail, Phone, Award } from 'lucide-react';

// API Base URL - Updated to use correct Railway URL
const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app/api';

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
            <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">Trusted</span>
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
            <Link to="/upgrade" className="text-gray-700 hover:text-teal-600 transition-colors">
              Upgrade
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

// Email Verification Modal Component (keeping your existing one)
const EmailVerificationModal = ({ isOpen, onClose, onVerified }) => {
  const [step, setStep] = useState('email'); // 'email', 'verification', 'success'
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const resetModal = () => {
    setStep('email');
    setEmail('');
    setVerificationCode('');
    setGdprConsent(false);
    setLoading(false);
    setError('');
    setIsAdmin(false);
  };

  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleEmailSubmit = async () => {
    setError('');
    
    if (!email || !gdprConsent) {
      setError('Please enter your email and accept the privacy policy');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/send-verification`, {
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
      const response = await fetch(`${API_BASE_URL}/verify-email`, {
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
      const response = await fetch(`${API_BASE_URL}/send-verification`, {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        <div className="space-y-6">
          {step === 'email' && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                <p className="text-gray-600">
                  Get access to 2 additional free analyses and your Solar Buyer's Protection Guide
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="gdpr"
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="gdpr" className="text-sm text-gray-700">
                  I agree to receive email communications and understand my data will be processed 
                  according to the privacy policy. I can unsubscribe at any time.
                </label>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleEmailSubmit}
                disabled={loading}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          )}

          {step === 'verification' && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    We've sent a 6-digit verification code to:
                  </p>
                  <p className="font-semibold text-blue-900">{email}</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Testing Mode:</strong> Check the Railway logs in your dashboard 
                    to see the verification code.
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                  placeholder="123456"
                  maxLength="6"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
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

// Professional Hero Section
const HeroSection = () => {
  const scrollToAnalyzer = () => {
    const element = document.getElementById('analyzer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get Your Solar Quote <span className="text-teal-600">Verified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Don't get ripped off! Our AI-powered analyzer instantly grades your solar quote and tells 
            you if you're getting a fair deal. Trusted by thousands of UK homeowners.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mb-12 flex-wrap gap-4">
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Instant Analysis</span>
            </div>
            <div className="flex items-center text-green-600">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center text-green-600">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-medium">5,000+ Quotes Analyzed</span>
            </div>
          </div>

          <button 
            onClick={scrollToAnalyzer}
            className="bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 shadow-lg transition-colors"
          >
            Analyze My Quote - Free
          </button>
          <p className="text-sm text-gray-500 mt-3">No registration required • Results in 30 seconds</p>
        </div>
      </div>
    </section>
  );
};

// Trust Section with Stats and Testimonials
const TrustSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by UK Homeowners</h2>
          <p className="text-gray-600">Join thousands who've saved money with our solar quote analysis</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">5,247</div>
            <div className="text-gray-600">Quotes Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">£2.3M</div>
            <div className="text-gray-600">Savings Identified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
            <div className="text-gray-600">Available</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "Saved me £3,000! The quote I had was way overpriced. SolarVerify helped me find a much better deal."
            </p>
            <div className="font-medium text-gray-900">Sarah M., Manchester</div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "Quick and accurate analysis. Gave me confidence that my quote was fair before signing."
            </p>
            <div className="font-medium text-gray-900">James T., Birmingham</div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "Professional service. The battery analysis feature is brilliant - very detailed."
            </p>
            <div className="font-medium text-gray-900">Emma L., London</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Professional Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Solar✓erify</h3>
            <p className="text-gray-400 mb-4">
              Helping UK homeowners make informed solar decisions since 2024.
            </p>
            <div className="flex items-center text-gray-400 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">London, United Kingdom</span>
            </div>
            <div className="flex items-center text-gray-400 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">hello@solarverify.co.uk</span>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#analyzer" className="hover:text-white">Quote Analysis</a></li>
              <li><a href="#analyzer" className="hover:text-white">Battery Analysis</a></li>
              <li><Link to="/upgrade" className="hover:text-white">Premium Reports</Link></li>
              <li><a href="#contact" className="hover:text-white">Expert Consultation</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><a href="#" className="hover:text-white">Reviews</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 SolarVerify Ltd. All rights reserved. Company No: 12345678
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">🔒 SSL Secured</span>
            <span className="text-gray-400 text-sm">🛡️ GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Home Component with Quote Analyzer (keeping your existing functionality)
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
      const response = await fetch(`${API_BASE_URL}/battery-options`);
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
      const response = await fetch(`${API_BASE_URL}/analyze-quote`, {
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

  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'text-green-600 bg-green-50',
      'A': 'text-green-600 bg-green-50',
      'B': 'text-blue-600 bg-blue-50',
      'C': 'text-yellow-600 bg-yellow-50',
      'D': 'text-orange-600 bg-orange-50',
      'F': 'text-red-600 bg-red-50'
    };
    return colors[grade] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Trust Section */}
      <TrustSection />

      {/* Quote Analyzer Section */}
      <section id="analyzer" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white mb-2">Solar Quote Analyzer</h2>
              <p className="text-teal-100">Get your instant A-F grade • Enhanced with battery analysis</p>
              
              {/* Status indicators */}
              <div className="mt-4 flex flex-wrap gap-4">
                {isAdmin && (
                  <div className="flex items-center bg-purple-500 bg-opacity-20 px-3 py-1 rounded-full">
                    <span className="text-yellow-300 mr-2">👑</span>
                    <span className="text-white text-sm font-medium">Admin Testing Mode</span>
                  </div>
                )}
                
                {!isAdmin && (
                  <div className="bg-teal-500 bg-opacity-20 px-3 py-1 rounded-full">
                    <span className="text-white text-sm">
                      {analysisCount >= 1 && !isVerified 
                        ? 'Next analysis requires email verification'
                        : analysisCount === 0 
                        ? 'First analysis free - no email required'
                        : `${Math.max(0, 3 - analysisCount)} analyses remaining`
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    min="0"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., 13275"
                  />
                </div>

                {/* Battery Section */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="has_battery"
                      id="has_battery"
                      checked={formData.has_battery}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label htmlFor="has_battery" className="ml-2 text-sm font-medium text-gray-700">
                      Battery included?
                    </label>
                  </div>

                  {formData.has_battery && (
                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                      <h3 className="font-medium text-gray-900">Battery Details</h3>
                      
                      {/* Battery Brand */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Battery Brand *
                        </label>
                        <select
                          name="battery_brand"
                          value={formData.battery_brand}
                          onChange={handleBatteryBrandChange}
                          required={formData.has_battery}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          <option value="">Select battery brand...</option>
                          {batteryOptions.map((battery, index) => (
                            <option key={index} value={battery.brand}>
                              {battery.brand} {battery.capacity > 0 && `(${battery.capacity} kWh)`}
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>

                      {/* Manual Capacity for Other */}
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
                            min="0"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="e.g., 13.5"
                          />
                        </div>
                      )}

                      {/* Total Capacity Display */}
                      {calculateTotalCapacity() > 0 && (
                        <div className="bg-teal-50 p-4 rounded-lg">
                          <p className="text-sm text-teal-800">
                            <strong>Total Battery Capacity:</strong> {calculateTotalCapacity().toFixed(1)} kWh
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-teal-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                >
                  {loading ? 'Analyzing...' : 'Get My Grade Free'}
                </button>
              </form>

              {/* Error Display */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">Analysis failed:</p>
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Results Display */}
              {result && (
                <div className="mt-8 space-y-6">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                      Your Solar Quote Grade
                    </h3>
                    <p className="text-lg text-gray-700">{result.verdict}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Analysis Breakdown</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">System Size:</span>
                        <span className="font-medium ml-2">{result.system_details.size} kW</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Price:</span>
                        <span className="font-medium ml-2">£{result.system_details.total_price.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Price per kW:</span>
                        <span className="font-medium ml-2">£{result.price_per_kw.toLocaleString()}</span>
                      </div>
                      {result.battery_details && (
                        <div>
                          <span className="text-gray-600">Battery:</span>
                          <span className="font-medium ml-2">
                            {result.battery_details.quantity}× {result.battery_details.brand} 
                            ({result.battery_details.total_capacity} kWh)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={resetForm}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Analyze Another Quote
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Expert Help</h2>
          <p className="text-xl text-gray-600 mb-8">
            Need personalized advice? Our solar experts are here to help you make the right decision.
          </p>
          <div className="flex justify-center items-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>hello@solarverify.co.uk</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>Available 24/7</span>
            </div>
          </div>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

// About Page
const About = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About SolarVerify</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-lg text-gray-700 mb-6">
          SolarVerify was founded to help UK homeowners make informed decisions about solar installations. 
          Our AI-powered analysis tool has helped thousands of customers identify overpriced quotes and 
          find better deals.
        </p>
        <p className="text-lg text-gray-700">
          We believe everyone deserves access to fair, transparent solar pricing information. Our mission 
          is to bring clarity to the solar market and help homeowners save money while going green.
        </p>
      </div>
    </div>
  </div>
);

// How It Works Page
const HowItWorks = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">How It Works</h1>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-teal-600">1</span>
            </div>
            <h2 className="text-2xl font-semibold">Enter Your Quote Details</h2>
          </div>
          <p className="text-gray-700">
            Simply input your system size, total price, and battery information (if included). 
            Our form guides you through each step.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-teal-600">2</span>
            </div>
            <h2 className="text-2xl font-semibold">AI Analysis</h2>
          </div>
          <p className="text-gray-700">
            Our algorithm compares your quote against thousands of market data points, 
            considering regional pricing, component costs, and installation complexity.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-teal-600">3</span>
            </div>
            <h2 className="text-2xl font-semibold">Get Your Grade</h2>
          </div>
          <p className="text-gray-700">
            Receive an instant A-F grade with detailed breakdown, price per kW analysis, 
            and actionable recommendations for your solar investment.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Upgrade Page
const Upgrade = () => {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleClick() {
    setBusy(true);
    setMsg("");
    try {
      alert("Secure checkout coming soon. Launch price £24.99.");
    } catch (e) {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Award className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Unlock Premium</h1>
            <p className="text-gray-600">
              Get the full Buyer's Protection Guide: component brands, red flags, ROI chart,
              and a downloadable PDF.
            </p>
          </div>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>Detailed component brand analysis</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>Red flags and warning signs guide</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>ROI calculation and payback analysis</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>Downloadable PDF report</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span>Unlimited quote analyses</span>
            </div>
          </div>

          {msg && <p className="text-red-600 mb-4 text-center">{msg}</p>}
          
          <button
            onClick={handleClick}
            disabled={busy}
            className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold text-lg hover:from-teal-700 hover:to-blue-700 disabled:opacity-60 transition-all shadow-lg"
          >
            {busy ? "Preparing…" : "Upgrade (Launch price £24.99)"}
          </button>
          
          <p className="text-sm text-gray-500 mt-4 text-center">
            One‑off payment. Instant unlock after checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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
}

