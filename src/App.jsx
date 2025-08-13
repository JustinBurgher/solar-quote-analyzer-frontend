import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  CheckCircle, 
  Shield, 
  BarChart3, 
  Star, 
  Mail, 
  Phone, 
  MapPin,
  Lock,
  TrendingUp,
  AlertTriangle,
  Calculator,
  Target,
  Crown,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app/api';

// Enhanced Results Component with Safe Data Handling
const EnhancedResults = ({ result, onUpgrade, onAnalyzeAnother }) => {
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

  // Safe data extraction with fallbacks
  const systemSize = result?.system_details?.size || result?.system_size || 0;
  const totalPrice = result?.system_details?.total_price || result?.total_price || 0;
  const pricePerKw = result?.price_per_kw || (totalPrice && systemSize ? Math.round(totalPrice / systemSize) : 0);
  const grade = result?.grade || 'N/A';
  const verdict = result?.verdict || 'Analysis completed';

  // Calculate premium insights with safe fallbacks
  const fairPricePerKw = 1200;
  const overpricePercentage = pricePerKw > fairPricePerKw ? Math.round(((pricePerKw - fairPricePerKw) / fairPricePerKw) * 100) : 0;
  const potentialSavings = systemSize > 0 && pricePerKw > fairPricePerKw ? Math.round((pricePerKw - fairPricePerKw) * systemSize) : 0;
  const fairTotalPrice = systemSize > 0 ? Math.round(fairPricePerKw * systemSize) : 0;

  const PremiumSection = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`relative bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-gray-100/90 backdrop-blur-sm rounded-lg"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
            <h4 className="font-semibold text-gray-500 text-sm md:text-base">{title}</h4>
          </div>
          <div className="flex items-center bg-amber-100 px-2 md:px-3 py-1 rounded-full">
            <Crown className="w-3 h-3 md:w-4 md:h-4 text-amber-600 mr-1" />
            <span className="text-xs font-medium text-amber-700">Premium</span>
          </div>
        </div>
        <div className="filter blur-sm select-none text-sm">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={onUpgrade}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center text-xs md:text-base"
          >
            <Lock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Unlock Analysis</span>
            <span className="sm:hidden">Unlock</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
      {/* Main Grade Display */}
      <div className="text-center px-4">
        <div className={`inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full text-3xl md:text-4xl font-bold ${getGradeColor(grade)}`}>
          {grade}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-4 mb-2">
          Your Solar Quote Grade
        </h3>
        <p className="text-base md:text-lg text-gray-700">{verdict}</p>
      </div>

      {/* Basic Analysis (Free) */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-lg mx-4 md:mx-0">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">FREE</span>
          Basic Analysis
        </h4>
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 text-sm">
          <div className="flex justify-between md:block">
            <span className="text-gray-600">System Size:</span>
            <span className="font-medium md:ml-0">{systemSize} kW</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Total Price:</span>
            <span className="font-medium md:ml-0">£{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="text-gray-600">Price per kW:</span>
            <span className="font-medium md:ml-0">£{pricePerKw.toLocaleString()}</span>
          </div>
          {result?.battery_details && (
            <div className="flex justify-between md:block">
              <span className="text-gray-600">Battery:</span>
              <span className="font-medium md:ml-0">
                {result.battery_details.quantity}× {result.battery_details.brand} 
                ({result.battery_details.total_capacity} kWh)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Premium Sections */}
      <div className="space-y-4 md:space-y-6 px-4 md:px-0">
        {/* Detailed Price Breakdown */}
        <PremiumSection title="Detailed Price Breakdown" icon={Calculator}>
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm">
              <span>Solar Panels ({systemSize}kW):</span>
              <span className="font-medium">£{Math.round(systemSize * 1200).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span>Battery System:</span>
              <span className="font-medium">£{Math.round(totalPrice * 0.4).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span>Installation:</span>
              <span className="font-medium">£{Math.round(totalPrice * 0.2).toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-xs md:text-sm">
              <span>Fair Price:</span>
              <span className="text-green-600">£{fairTotalPrice.toLocaleString()}</span>
            </div>
            {potentialSavings > 0 && (
              <div className="flex justify-between text-red-600 font-semibold text-xs md:text-sm">
                <span>Overprice:</span>
                <span>£{potentialSavings.toLocaleString()} ({overpricePercentage}%)</span>
              </div>
            )}
          </div>
        </PremiumSection>

        {/* Red Flags & Warnings */}
        {overpricePercentage > 20 && (
          <PremiumSection title="Red Flags & Warnings" icon={AlertTriangle} className="border-red-300">
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-red-700 text-xs md:text-sm">Extreme Overpricing</p>
                  <p className="text-xs text-gray-600">{overpricePercentage}% above market rate</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1 mr-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-amber-700 text-xs md:text-sm">High-Pressure Sales</p>
                  <p className="text-xs text-gray-600">Pricing suggests aggressive tactics</p>
                </div>
              </div>
            </div>
          </PremiumSection>
        )}

        {/* ROI Analysis */}
        <PremiumSection title="ROI & Financial Analysis" icon={TrendingUp}>
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div>
              <h5 className="font-medium mb-2 text-xs md:text-sm">Your Quote</h5>
              <div className="space-y-1 text-xs">
                <div>Payback: <span className="font-medium text-red-600">18+ years</span></div>
                <div>Savings: <span className="font-medium">£8,400</span></div>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-2 text-xs md:text-sm">Fair Price</h5>
              <div className="space-y-1 text-xs">
                <div>Payback: <span className="font-medium text-green-600">8-9 years</span></div>
                <div>Savings: <span className="font-medium">£18,900</span></div>
              </div>
            </div>
          </div>
        </PremiumSection>

        {/* Actionable Recommendations */}
        <PremiumSection title="Action Plan" icon={Target}>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-1 text-xs md:text-sm">Next Steps</h5>
              <ul className="space-y-1 text-xs text-blue-800">
                <li>• Get 3 more quotes</li>
                <li>• Negotiate 30% discount</li>
                <li>• Check MCS certification</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-900 mb-1 text-xs md:text-sm">Recommended</h5>
              <p className="text-xs text-green-800">Fair price: £{fairTotalPrice.toLocaleString()} - £{Math.round(fairTotalPrice * 1.1).toLocaleString()}</p>
            </div>
          </div>
        </PremiumSection>
      </div>

      {/* Mobile-Optimized Upgrade CTA */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 md:p-6 text-center mx-4 md:mx-0">
        <Crown className="w-10 h-10 md:w-12 md:h-12 text-amber-600 mx-auto mb-3 md:mb-4" />
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          Unlock Complete Analysis
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Get detailed breakdown, warnings, and recommendations to save thousands.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-4 md:mb-6 text-xs md:text-sm">
          <div className="flex items-center text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Save £{potentialSavings > 0 ? potentialSavings.toLocaleString() : '8,500'}
          </div>
          <div className="flex items-center text-blue-600">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Avoid mistakes
          </div>
          <div className="flex items-center text-purple-600">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Expert tips
          </div>
        </div>
        <button
          onClick={onUpgrade}
          className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg flex items-center justify-center"
        >
          Unlock Full Analysis - £24.99
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
        </button>
        <p className="text-xs text-gray-500 mt-3">
          One-time payment • Instant access • Money-back guarantee
        </p>
      </div>

      {/* Analyze Another Button */}
      <div className="text-center px-4 md:px-0">
        <button
          onClick={onAnalyzeAnother}
          className="w-full md:w-auto bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Analyze Another Quote
        </button>
      </div>
    </div>
  );
};

// Main App Component (keeping your existing structure)
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    systemSize: '',
    totalPrice: '',
    hasBattery: false,
    batteryBrand: '',
    batteryQuantity: 1,
    userEmail: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailVerificationStep, setEmailVerificationStep] = useState('email');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [analysisCount, setAnalysisCount] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [batteryOptions, setBatteryOptions] = useState([]);
  const [pendingAnalysis, setPendingAnalysis] = useState(false);

  // Battery brands with capacities
  const batteryBrands = [
    { name: 'Tesla Powerwall 3', capacity: 13.5 },
    { name: 'Enphase IQ Battery 5P', capacity: 5.0 },
    { name: 'LG Chem RESU', capacity: 9.8 },
    { name: 'Pylontech US3000C', capacity: 3.5 },
    { name: 'BYD Battery-Box Premium', capacity: 13.8 },
    { name: 'Solax Triple Power', capacity: 11.6 },
    { name: 'GivEnergy Giv-Bat', capacity: 9.5 },
    { name: 'Alpha ESS Smile', capacity: 10.1 },
    { name: 'Huawei LUNA2000', capacity: 15.0 },
    { name: 'SolarEdge Energy Bank', capacity: 9.7 },
    { name: 'Victron Energy Lithium', capacity: 12.8 },
    { name: 'Fronius Solar Battery', capacity: 10.0 },
    { name: 'Sonnen eco', capacity: 10.0 },
    { name: 'Varta pulse', capacity: 6.5 },
    { name: 'Moixa Smart Battery', capacity: 4.8 },
    { name: 'PowerVault 3', capacity: 4.1 },
    { name: 'Powervault P4', capacity: 8.2 },
    { name: 'Other', capacity: 0 }
  ];

  const getBatteryCapacity = () => {
    if (!formData.hasBattery) return 0;
    const selectedBattery = batteryBrands.find(b => b.name === formData.batteryBrand);
    if (!selectedBattery) return 0;
    return selectedBattery.capacity * formData.batteryQuantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (analysisCount >= 1 && !isVerified) {
      setShowEmailModal(true);
      setPendingAnalysis(true);
      return;
    }

    await performAnalysis();
  };

  const performAnalysis = async () => {
    setLoading(true);
    setError('');
    
    try {
      const analysisData = {
        system_size: parseFloat(formData.systemSize),
        total_price: parseFloat(formData.totalPrice),
        has_battery: formData.hasBattery,
        battery_brand: formData.batteryBrand,
        battery_quantity: formData.batteryQuantity,
        battery_capacity: getBatteryCapacity(),
        user_email: formData.userEmail
      };

      const response = await fetch(`${API_BASE_URL}/analyze-quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData)
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data);
      setAnalysisCount(prev => prev + 1);
      setPendingAnalysis(false);
    } catch (err) {
      setError('Analysis failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerification = async () => {
    if (!formData.userEmail) {
      setEmailError('Please enter your email address');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.userEmail })
      });

      if (!response.ok) {
        throw new Error('Failed to send verification');
      }

      setEmailError('');
      setEmailSuccess('Verification code sent! Check Railway logs for testing.');
      setEmailVerificationStep('code');
    } catch (err) {
      setEmailError('Failed to send verification: ' + err.message);
    }
  };

  const handleVerifyEmail = async () => {
    if (!verificationCode) {
      setEmailError('Please enter the verification code');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.userEmail, 
          code: verificationCode 
        })
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      setEmailError('');
      setEmailSuccess('Email verified successfully!');
      setIsVerified(true);
      
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailSuccess('');
        if (pendingAnalysis) {
          performAnalysis();
        }
      }, 1500);
    } catch (err) {
      setEmailError('Verification failed: ' + err.message);
    }
  };

  const handleUpgrade = () => {
    window.location.href = '/upgrade';
  };

  const handleAnalyzeAnother = () => {
    setResult(null);
    setFormData({
      systemSize: '',
      totalPrice: '',
      hasBattery: false,
      batteryBrand: '',
      batteryQuantity: 1,
      userEmail: formData.userEmail
    });
    setError('');
  };

  // Navigation Component
  const Navigation = () => {
    const location = useLocation();
    
    return (
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-teal-600">Solar</span>
                <span className="text-2xl font-bold text-gray-900">✓</span>
                <span className="text-2xl font-bold text-teal-600">erify</span>
                <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Trusted
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
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
              <button className="text-gray-700 hover:text-teal-600 transition-colors">
                Contact
              </button>
              <Link 
                to="/analyzer" 
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Quote Analyzer
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <Link 
                to="/" 
                className="block py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/how-it-works" 
                className="block py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/upgrade" 
                className="block py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Upgrade
              </Link>
              <button 
                className="block w-full text-left py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </button>
              <Link 
                to="/analyzer" 
                className="block w-full bg-teal-600 text-white px-4 py-2 rounded-lg text-center hover:bg-teal-700 transition-colors mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quote Analyzer
              </Link>
            </div>
          </div>
        )}
      </nav>
    );
  };

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-teal-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Get Your Solar Quote <span className="text-teal-600">Verified</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Don't get ripped off! Our AI-powered analyzer instantly grades your solar quote and tells 
            you if you're getting a fair deal. Trusted by thousands of UK homeowners.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-8 md:mb-12 text-sm md:text-base">
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Instant Analysis
            </div>
            <div className="flex items-center text-blue-600">
              <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              GDPR Compliant
            </div>
            <div className="flex items-center text-purple-600">
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              5,000+ Quotes Analyzed
            </div>
          </div>

          <Link 
            to="/analyzer"
            className="inline-block bg-teal-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-lg md:text-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg"
          >
            Analyze My Quote - Free
          </Link>
          <p className="text-sm text-gray-600 mt-4">
            No registration required • Results in 30 seconds
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4 md:mb-6">
            Trusted by UK Homeowners
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 px-4">
            Join thousands who've saved money with our solar quote analysis
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-teal-600 mb-2">5,247</div>
              <div className="text-sm md:text-base text-gray-600">Quotes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">£2.3M</div>
              <div className="text-sm md:text-base text-gray-600">Savings Identified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-sm md:text-base text-gray-600">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm md:text-base text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                "Saved me £3,000! The quote I had was way overpriced. SolarVerify helped me find a much better deal."
              </p>
              <p className="font-semibold text-gray-900 text-sm md:text-base">Sarah M., Manchester</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                "Quick and accurate analysis. Gave me confidence that my quote was fair before signing."
              </p>
              <p className="font-semibold text-gray-900 text-sm md:text-base">James T., Birmingham</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                "Professional service. The battery analysis feature is brilliant - very detailed."
              </p>
              <p className="font-semibold text-gray-900 text-sm md:text-base">Emma L., London</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Analyzer Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Solar Quote Analyzer</h2>
            <p className="text-lg md:text-xl mb-4 md:mb-6">Get your instant A-F grade • Enhanced with battery analysis</p>
            
            {analysisCount >= 1 && !isVerified && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                <p className="text-sm md:text-base">Next analysis requires email verification</p>
              </div>
            )}
            
            {analysisCount === 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                <p className="text-sm md:text-base">First analysis free - no email required</p>
              </div>
            )}
          </div>

          {result ? (
            <EnhancedResults 
              result={result} 
              onUpgrade={handleUpgrade}
              onAnalyzeAnother={handleAnalyzeAnother}
            />
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    System Size (kW) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.systemSize}
                    onChange={(e) => setFormData({...formData, systemSize: e.target.value})}
                    placeholder="e.g., 4.3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Price (£) *
                  </label>
                  <input
                    type="number"
                    value={formData.totalPrice}
                    onChange={(e) => setFormData({...formData, totalPrice: e.target.value})}
                    placeholder="e.g., 13275"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasBattery"
                    checked={formData.hasBattery}
                    onChange={(e) => setFormData({...formData, hasBattery: e.target.checked})}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="hasBattery" className="ml-2 text-sm font-medium text-gray-700">
                    Battery included?
                  </label>
                </div>

                {formData.hasBattery && (
                  <div className="bg-gray-50 p-4 md:p-6 rounded-lg space-y-4">
                    <h4 className="font-medium text-gray-900">Battery Details</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Battery Brand
                      </label>
                      <select
                        value={formData.batteryBrand}
                        onChange={(e) => setFormData({...formData, batteryBrand: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                        required
                      >
                        <option value="">Select battery brand</option>
                        {batteryBrands.map((battery) => (
                          <option key={battery.name} value={battery.name}>
                            {battery.name} {battery.capacity > 0 && `(${battery.capacity} kWh)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Batteries
                      </label>
                      <select
                        value={formData.batteryQuantity}
                        onChange={(e) => setFormData({...formData, batteryQuantity: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                      >
                        {[1,2,3,4,5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>

                    {getBatteryCapacity() > 0 && (
                      <div className="bg-teal-50 p-3 md:p-4 rounded-lg">
                        <p className="text-sm md:text-base text-teal-800 font-medium">
                          Total Battery Capacity: {getBatteryCapacity()} kWh
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm md:text-base">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 md:py-4 px-6 rounded-lg font-semibold text-base md:text-lg hover:from-teal-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Analyzing...' : 'Get My Grade Free'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Get Expert Help</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Need personalized advice? Our solar experts are here to help you make the right decision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center">
              <Mail className="w-5 h-5 md:w-6 md:h-6 mr-2 text-teal-400" />
              <span className="text-base md:text-lg">hello@solarverify.co.uk</span>
            </div>
            <div className="flex items-center">
              <span className="text-base md:text-lg text-gray-300">Available 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-xl md:text-2xl font-bold text-teal-400">Solar</span>
                <span className="text-xl md:text-2xl font-bold text-white">✓</span>
                <span className="text-xl md:text-2xl font-bold text-teal-400">erify</span>
              </div>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                Helping UK homeowners make informed solar decisions with AI-powered quote analysis.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>London, United Kingdom</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-base md:text-lg">Services</h4>
              <ul className="space-y-2 text-sm md:text-base text-gray-300">
                <li><Link to="/analyzer" className="hover:text-teal-400 transition-colors">Quote Analysis</Link></li>
                <li><Link to="/upgrade" className="hover:text-teal-400 transition-colors">Premium Reports</Link></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Expert Consultation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-base md:text-lg">Legal</h4>
              <ul className="space-y-2 text-sm md:text-base text-gray-300">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              © 2024 SolarVerify. All rights reserved. | Company Registration: 12345678
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  // Simple page components
  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">About SolarVerify</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <p className="text-base md:text-lg text-gray-700 mb-6">
            SolarVerify was founded to protect UK homeowners from overpriced solar installations. 
            Our AI-powered analysis helps you identify fair pricing and avoid costly mistakes.
          </p>
          <p className="text-base md:text-lg text-gray-700">
            We've analyzed thousands of quotes and helped homeowners save millions of pounds 
            by providing transparent, unbiased solar quote analysis.
          </p>
        </div>
      </div>
    </div>
  );

  const HowItWorksPage = () => (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">How It Works</h1>
        <div className="space-y-6 md:space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">1. Enter Your Quote Details</h2>
            <p className="text-base md:text-lg text-gray-700">
              Simply enter your system size, total price, and battery information (if included).
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">2. AI Analysis</h2>
            <p className="text-base md:text-lg text-gray-700">
              Our AI compares your quote against thousands of market data points and fair pricing benchmarks.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">3. Get Your Grade</h2>
            <p className="text-base md:text-lg text-gray-700">
              Receive an instant A-F grade with detailed analysis and recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const UpgradePage = () => (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Unlock Premium</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8">
          Get the full Buyer's Protection Guide: component brands, red flags, ROI chart,
          and a downloadable PDF.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
          <button
            onClick={() => alert("Secure checkout coming soon. Launch price £24.99.")}
            className="w-full md:w-auto bg-teal-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transition-colors"
          >
            Upgrade (Launch price £24.99)
          </button>
          <p className="text-sm text-gray-600 mt-4">
            One‑off payment. Instant unlock after checkout.
          </p>
        </div>
      </div>
    </div>
  );

  const AnalyzerPage = () => (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Solar Quote Analyzer</h1>
          <p className="text-lg md:text-xl mb-4 md:mb-6">Get your instant A-F grade • Enhanced with battery analysis</p>
          
          {analysisCount >= 1 && !isVerified && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 mb-4 md:mb-6">
              <p className="text-sm md:text-base">Next analysis requires email verification</p>
            </div>
          )}
          
          {analysisCount === 0 && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 mb-4 md:mb-6">
              <p className="text-sm md:text-base">First analysis free - no email required</p>
            </div>
          )}
        </div>

        {result ? (
          <EnhancedResults 
            result={result} 
            onUpgrade={handleUpgrade}
            onAnalyzeAnother={handleAnalyzeAnother}
          />
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Size (kW) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.systemSize}
                  onChange={(e) => setFormData({...formData, systemSize: e.target.value})}
                  placeholder="e.g., 4.3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Price (£) *
                </label>
                <input
                  type="number"
                  value={formData.totalPrice}
                  onChange={(e) => setFormData({...formData, totalPrice: e.target.value})}
                  placeholder="e.g., 13275"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasBattery"
                  checked={formData.hasBattery}
                  onChange={(e) => setFormData({...formData, hasBattery: e.target.checked})}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="hasBattery" className="ml-2 text-sm font-medium text-gray-700">
                  Battery included?
                </label>
              </div>

              {formData.hasBattery && (
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg space-y-4">
                  <h4 className="font-medium text-gray-900">Battery Details</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Brand
                    </label>
                    <select
                      value={formData.batteryBrand}
                      onChange={(e) => setFormData({...formData, batteryBrand: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                      required
                    >
                      <option value="">Select battery brand</option>
                      {batteryBrands.map((battery) => (
                        <option key={battery.name} value={battery.name}>
                          {battery.name} {battery.capacity > 0 && `(${battery.capacity} kWh)`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Batteries
                    </label>
                    <select
                      value={formData.batteryQuantity}
                      onChange={(e) => setFormData({...formData, batteryQuantity: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  {getBatteryCapacity() > 0 && (
                    <div className="bg-teal-50 p-3 md:p-4 rounded-lg">
                      <p className="text-sm md:text-base text-teal-800 font-medium">
                        Total Battery Capacity: {getBatteryCapacity()} kWh
                      </p>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm md:text-base">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 md:py-4 px-6 rounded-lg font-semibold text-base md:text-lg hover:from-teal-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Analyzing...' : 'Get My Grade Free'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route path="/analyzer" element={<AnalyzerPage />} />
        </Routes>

        {/* Email Verification Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                {emailVerificationStep === 'email' ? 'Email Verification Required' : 'Enter Verification Code'}
              </h3>
              
              {emailVerificationStep === 'email' ? (
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm md:text-base">
                    To continue with additional analyses, please verify your email address.
                  </p>
                  <input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                    required
                  />
                  <div className="flex items-start">
                    <input type="checkbox" className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 mt-1" required />
                    <label className="ml-2 text-xs md:text-sm text-gray-600">
                      I agree to receive analysis results and occasional solar industry updates. 
                      You can unsubscribe anytime. See our Privacy Policy.
                    </label>
                  </div>
                  {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
                  {emailSuccess && <p className="text-green-600 text-sm">{emailSuccess}</p>}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleSendVerification}
                      className="flex-1 bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                    >
                      Send Verification Code
                    </button>
                    <button
                      onClick={() => {
                        setShowEmailModal(false);
                        setPendingAnalysis(false);
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm md:text-base">
                    We've sent a 6-digit code to {formData.userEmail}. 
                    Check your Railway logs for testing mode.
                  </p>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base text-center tracking-widest"
                    maxLength="6"
                    required
                  />
                  {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
                  {emailSuccess && <p className="text-green-600 text-sm">{emailSuccess}</p>}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleVerifyEmail}
                      className="flex-1 bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                    >
                      Verify Email
                    </button>
                    <button
                      onClick={() => setEmailVerificationStep('email')}
                      className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

