import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Shield, Users, TrendingUp, CheckCircle, Star, Crown } from 'lucide-react';

// Page imports
import Verify from './pages/Verify';
import PremiumSuccess from './pages/PremiumSuccess';
import NewHome from './pages/NewHome';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Upgrade from './pages/Upgrade';
import Contact from './pages/Contact';

// Component imports
import Navigation from './components/ui/Navigation';
import UpgradeModal from './components/UpgradeModal';
import PremiumAnalysisForm from './components/PremiumAnalysisForm';
import FeedbackButton from './components/FeedbackButton';

// Utility imports
import { getSession, incrementAnalysisCount, needsEmailVerification, shouldShowUpgradeModal, hasPremiumAccess } from './utils/sessionTracking';

// API Configuration
const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app/api';

// Battery options data
const batteryOptions = [
  { brand: 'Tesla Powerwall 3', capacity: 13.5 },
  { brand: 'Enphase IQ Battery 5P', capacity: 5.0 },
  { brand: 'LG Chem RESU10H', capacity: 9.8 },
  { brand: 'Pylontech US3000C', capacity: 3.55 },
  { brand: 'GivEnergy Giv-Bat 2.6', capacity: 2.6 },
  { brand: 'Solax Triple Power T58', capacity: 5.8 },
  { brand: 'Huawei LUNA2000-5kWh', capacity: 5.0 },
  { brand: 'BYD Battery-Box Premium LVS', capacity: 4.0 },
  { brand: 'Alpha ESS SMILE-B3', capacity: 2.9 },
  { brand: 'Victron Energy Lithium', capacity: 5.0 },
  { brand: 'Puredrive PureStorage II', capacity: 4.8 },
  { brand: 'Moixa Smart Battery', capacity: 2.0 },
  { brand: 'Powervault P4', capacity: 4.1 },
  { brand: 'Sonnen eco 8', capacity: 8.0 },
  { brand: 'Varta pulse 6', capacity: 6.5 },
  { brand: 'Samsung SDI All-in-One', capacity: 3.6 },
  { brand: 'Fronius Solar Battery', capacity: 4.5 },
  { brand: 'SMA Sunny Island', capacity: 4.4 },
  { brand: 'Other', capacity: 0 }
];

// Main App Component
function App() {
  // Form state
  const [systemSize, setSystemSize] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [systemSizeOption, setSystemSizeOption] = useState('');
  const [totalPriceOption, setTotalPriceOption] = useState('');
  const [showCustomSystemSize, setShowCustomSystemSize] = useState(false);
  const [showCustomPrice, setShowCustomPrice] = useState(false);
  const [hasBattery, setHasBattery] = useState(false);
  const [batteryBrand, setBatteryBrand] = useState('');
  const [batteryQuantity, setBatteryQuantity] = useState(1);
  const [customCapacity, setCustomCapacity] = useState('');
  
  // Analysis state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisCount, setAnalysisCount] = useState(() => {
    const session = getSession();
    return session.analysisCount;
  });
  
  // Modal state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  // Email verification state
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState(false);
  
  // User state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPremiumForm, setShowPremiumForm] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const adminEmails = ['justinburgher@live.co.uk'];
    setIsAdmin(adminEmails.includes(email.toLowerCase()));
  }, [email]);

  // Sync with localStorage session
  useEffect(() => {
    const session = getSession();
    setAnalysisCount(session.analysisCount);
    if (session.isVerified && session.email) {
      setEmail(session.email);
    }
    setIsPremium(hasPremiumAccess());
  }, []);

  // Block programmatic clicks and specific keyboard shortcuts
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.isTrusted && e.target.tagName === 'A') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyDown = (e) => {
      const isNavigationShortcut = (
        (e.ctrlKey || e.metaKey) && 
        (e.key === 'k' || e.key === 'l' || e.key === 'K' || e.key === 'L')
      );
      if (isNavigationShortcut) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('click', handleClick, {capture: true, passive: false});
    document.addEventListener('keydown', handleKeyDown, {capture: true, passive: false});

    return () => {
      document.removeEventListener('click', handleClick, {capture: true});
      document.removeEventListener('keydown', handleKeyDown, {capture: true});
    };
  }, []);

  // Calculate total battery capacity
  const getTotalBatteryCapacity = () => {
    if (!hasBattery) return 0;
    const selectedBattery = batteryOptions.find(b => b.brand === batteryBrand);
    if (!selectedBattery) return 0;
    if (selectedBattery.brand === 'Other') {
      return parseFloat(customCapacity) * batteryQuantity || 0;
    }
    return selectedBattery.capacity * batteryQuantity;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await performAnalysis();
    if (!isAdmin && shouldShowUpgradeModal()) {
      setShowUpgradeModal(true);
    }
  };

  // Handle premium form submission
  const handlePremiumSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const premiumData = {
        system_size: parseFloat(formData.systemSize) || 0,
        total_price: parseFloat(formData.totalCost) || 0,
        location: formData.location,
        user_email: formData.email,
        panel_brand: formData.panelBrand,
        panel_model: formData.panelModel,
        panel_wattage: parseFloat(formData.panelWattage) || 0,
        panel_quantity: parseInt(formData.panelQuantity) || 0,
        inverter_brand: formData.inverterBrand,
        inverter_model: formData.inverterModel,
        inverter_type: formData.inverterType,
        inverter_capacity: parseFloat(formData.inverterCapacity) || 0,
        has_battery: formData.batteryIncluded,
        battery_brand: formData.batteryIncluded ? formData.batteryBrand : '',
        battery_model: formData.batteryIncluded ? formData.batteryModel : '',
        battery_capacity: formData.batteryIncluded ? parseFloat(formData.batteryCapacity) || 0 : 0,
        battery_quantity: formData.batteryIncluded ? parseInt(formData.batteryQuantity) || 1 : 0,
        battery_warranty: formData.batteryIncluded ? parseInt(formData.batteryWarranty) || 0 : 0,
        scaffolding_included: formData.scaffoldingIncluded,
        scaffolding_cost: formData.scaffoldingIncluded ? parseFloat(formData.scaffoldingCost) || 0 : 0,
        bird_protection_included: formData.birdProtectionIncluded,
        bird_protection_cost: formData.birdProtectionIncluded ? parseFloat(formData.birdProtectionCost) || 0 : 0,
        roof_type: formData.roofType,
        roof_material: formData.roofMaterial,
        installer_company: formData.installerCompany,
        installer_location: formData.installerLocation,
        installer_mcs: formData.installerMCS,
        installer_years_in_business: formData.installerYearsInBusiness ? parseInt(formData.installerYearsInBusiness) || 0 : 0,
        installer_warranty_years: formData.installerWarrantyYears ? parseInt(formData.installerWarrantyYears) || 0 : 0,
        installation_timeline: formData.installationTimeline,
        is_premium: true
      };

      const response = await fetch(`${API_BASE_URL}/analyse-premium-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(premiumData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert(
        "✅ Premium Analysis Complete!\n\n" +
        "Your comprehensive analysis report has been generated and sent to your email."
      );
      setShowPremiumForm(false);
    } catch (err) {
      console.error('Premium analysis error:', err);
      setError('Premium analysis failed. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  // Perform the actual analysis
  const performAnalysis = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const analysisData = {
        system_size: parseFloat(systemSize) || 0,
        total_price: parseFloat(totalPrice) || 0,
        has_battery: hasBattery,
        battery_brand: hasBattery ? batteryBrand : '',
        battery_quantity: hasBattery ? batteryQuantity : 0,
        battery_capacity: hasBattery ? getTotalBatteryCapacity() : 0,
        user_email: email || ''
      };

      const response = await fetch(`${API_BASE_URL}/analyse-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysisData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      
      if (!isAdmin) {
        const newCount = incrementAnalysisCount();
        setAnalysisCount(newCount);
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  // Close modal handler
  const closeModal = () => {
    setShowEmailModal(false);
    setShowVerification(false);
    setEmailError('');
    setVerificationError('');
    setEmailSuccess(false);
    setVerificationCode('');
    setPendingAnalysis(false);
  };

  // Homepage component with quote analyser
  function Homepage() {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-dark-bg from-orange-500 to-orange-600 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Your Solar Quote <span className="text-teal-200">Verified</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Don't get ripped off! Our AI-powered analyser instantly grades your solar quote and tells 
              you if you're getting a fair deal.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center text-lg">
                <CheckCircle className="w-6 h-6 mr-2 text-teal-200" />
                Instant Analysis
              </div>
              <div className="flex items-center text-lg">
                <CheckCircle className="w-6 h-6 mr-2 text-teal-200" />
                Fair Price Check
              </div>
              <div className="flex items-center text-lg">
                <CheckCircle className="w-6 h-6 mr-2 text-teal-200" />
                Battery Analysis
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">5,247+ Quotes analysed</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">£2.3M+ Savings Identified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Analyser Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-dark-bg from-orange-500 to-orange-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Solar Quote Analyser</h2>
                <p className="text-lg opacity-90 mb-6">Get your instant A-F grade • Enhanced with battery analysis</p>
                
                {!isAdmin && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <p className="text-sm">Analyze unlimited quotes for free • Premium features coming soon</p>
                  </div>
                )}

                {isAdmin && (
                  <div className="bg-yellow-400/20 backdrop-blur-sm rounded-lg p-4 mb-6 flex items-center justify-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-300" />
                    <span className="text-sm font-medium">Admin Testing Mode - Unlimited Analyses</span>
                  </div>
                )}

                {isPremium && !isAdmin && (
                  <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Crown className="w-5 h-5 text-yellow-300" />
                      <span className="text-sm font-medium">Premium Access Active</span>
                    </div>
                    {!showPremiumForm && (
                      <button
                        onClick={() => setShowPremiumForm(true)}
                        className="px-6 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
                      >
                        Start Premium Analysis →
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-white p-8">
                {showPremiumForm && isPremium ? (
                  <PremiumAnalysisForm 
                    onSubmit={handlePremiumSubmit}
                    onCancel={() => setShowPremiumForm(false)}
                  />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* System Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        System Size (kW) *
                      </label>
                      <select
                        value={systemSizeOption}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSystemSizeOption(value);
                          if (value === 'custom') {
                            setShowCustomSystemSize(true);
                            setSystemSize('');
                          } else {
                            setShowCustomSystemSize(false);
                            setSystemSize(value);
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                        required={!showCustomSystemSize}
                      >
                        <option value="">Select system size...</option>
                        {[2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12].map(size => (
                          <option key={size} value={size}>{size} kW</option>
                        ))}
                        <option value="custom">Other size (custom)...</option>
                      </select>
                      
                      {showCustomSystemSize && (
                        <input
                          type="number"
                          step="0.1"
                          value={systemSize}
                          onChange={(e) => setSystemSize(e.target.value)}
                          placeholder="Enter custom size (e.g., 4.3)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mt-2"
                          required
                        />
                      )}
                    </div>

                    {/* Total Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Price (£) *
                      </label>
                      <select
                        value={totalPriceOption}
                        onChange={(e) => {
                          const value = e.target.value;
                          setTotalPriceOption(value);
                          if (value === 'custom') {
                            setShowCustomPrice(true);
                            setTotalPrice('');
                          } else {
                            setShowCustomPrice(false);
                            setTotalPrice(value);
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                        required={!showCustomPrice}
                      >
                        <option value="">Select total price...</option>
                        {[4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500, 20000].map(price => (
                          <option key={price} value={price}>£{price.toLocaleString()}</option>
                        ))}
                        <option value="custom">Other price (custom)...</option>
                      </select>
                      
                      {showCustomPrice && (
                        <input
                          type="number"
                          value={totalPrice}
                          onChange={(e) => setTotalPrice(e.target.value)}
                          placeholder="Enter exact price (e.g., 13275)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mt-2"
                          required
                        />
                      )}
                    </div>

                    {/* Battery Section */}
                    <div>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasBattery}
                          onChange={(e) => setHasBattery(e.target.checked)}
                          className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Battery included?</span>
                      </label>
                    </div>

                    {hasBattery && (
                      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Battery Details</h3>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Battery Brand</label>
                          <select
                            value={batteryBrand}
                            onChange={(e) => setBatteryBrand(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select battery brand</option>
                            {batteryOptions.map((battery) => (
                              <option key={battery.brand} value={battery.brand}>
                                {battery.brand} {battery.capacity > 0 && `(${battery.capacity} kWh each)`}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Batteries</label>
                          <select
                            value={batteryQuantity}
                            onChange={(e) => setBatteryQuantity(parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>

                        {batteryBrand === 'Other' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Battery Capacity (kWh each)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={customCapacity}
                              onChange={(e) => setCustomCapacity(e.target.value)}
                              placeholder="e.g., 5.0"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              required
                            />
                          </div>
                        )}

                        {batteryBrand && getTotalBatteryCapacity() > 0 && (
                          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-orange-800">
                              Total Battery Capacity: {getTotalBatteryCapacity().toFixed(1)} kWh
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Analyzing...' : 'Get My Grade Free'}
                    </button>
                  </form>
                )}

                {/* Error Display */}
                {error && (
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium">Analysis failed:</p>
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {/* Results Display */}
                {result && (
                  <div className="mt-8 space-y-6">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold text-white mb-4 ${
                        result.grade === 'A' ? 'bg-green-500' :
                        result.grade === 'B' ? 'bg-blue-500' :
                        result.grade === 'C' ? 'bg-yellow-500' :
                        result.grade === 'D' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}>
                        {result.grade || 'F'}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Solar Quote Grade</h3>
                      <p className="text-gray-600">{result.verdict || 'Analysis completed'}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Analysis Breakdown</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">System Size:</span>
                          <span className="font-medium">{systemSize} kW</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Price:</span>
                          <span className="font-medium">£{parseInt(totalPrice).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price per kW:</span>
                          <span className="font-medium">£{(result.price_per_kw || result.analysis?.price_per_kw) ? Math.round(result.price_per_kw || result.analysis?.price_per_kw).toLocaleString() : 'N/A'}</span>
                        </div>
                        {hasBattery && getTotalBatteryCapacity() > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Battery Capacity:</span>
                            <span className="font-medium">{getTotalBatteryCapacity().toFixed(1)} kWh</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">How was your experience?</h4>
                      <p className="text-gray-600 mb-4">Help us improve SolarVerify by sharing your feedback</p>
                      <button
                        onClick={() => {
                          const feedbackButton = document.querySelector('[aria-label="Send Feedback"]');
                          if (feedbackButton) feedbackButton.click();
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Share Feedback
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => {
                          setResult(null);
                          setSystemSize('');
                          setTotalPrice('');
                          setSystemSizeOption('');
                          setTotalPriceOption('');
                          setHasBattery(false);
                          setBatteryBrand('');
                          setBatteryQuantity(1);
                          setCustomCapacity('');
                          setError('');
                        }}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                      >
                        Analyse Another Quote
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Homeowners</h2>
              <p className="text-lg text-gray-600">See how we've helped others save money</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: "Saved me £12,000! The analysis showed my quote was massively overpriced.", name: "Sarah M., Manchester" },
                { quote: "Brilliant service! Used the report to negotiate a 25% discount.", name: "James T., Birmingham" },
                { quote: "Finally, an honest assessment! No sales pressure, just facts.", name: "Emma L., Leeds" }
              ].map((testimonial, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <p className="text-sm text-gray-500">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold text-teal-400 mb-4">Solar✓erify</div>
                <p className="text-gray-400 text-sm">
                  Protecting UK homeowners from overpriced solar installations with AI-powered analysis.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to="/old-home" className="hover:text-white transition-colors">Quote Analysis</Link></li>
                  <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>support@solarverify.co.uk</li>
                  <li>Response within 24 hours</li>
                  <li>Mon-Fri: 9AM-5PM GMT</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 SolarVerify Ltd. Company Registration: 12345678. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Email Verification Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {showVerification ? 'Enter Verification Code' : 'Email Verification Required'}
              </h3>
              
              {!showVerification ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    To continue with additional analyses, please verify your email address.
                  </p>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="gdpr"
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="gdpr" className="text-sm text-gray-600">
                      I agree to receive analysis results and accept the privacy policy
                    </label>
                  </div>
                  
                  {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={async () => {
                        if (!email || !gdprConsent) {
                          setEmailError('Please enter your email and accept the privacy policy.');
                          return;
                        }
                        try {
                          const response = await fetch(`${API_BASE_URL}/send-verification`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email }),
                          });
                          if (!response.ok) throw new Error('Failed to send verification');
                          setShowVerification(true);
                          setEmailError('');
                        } catch (err) {
                          setEmailError('Failed to send verification. Please try again.');
                        }
                      }}
                      className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Send Verification Code
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {emailSuccess ? (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="text-green-600 font-medium">Email verified successfully!</p>
                      <p className="text-sm text-gray-600">Proceeding with analysis...</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600">
                        We've sent a 6-digit code to <strong>{email}</strong>
                      </p>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg tracking-widest"
                          placeholder="123456"
                          maxLength="6"
                        />
                      </div>
                      
                      {verificationError && <p className="text-red-600 text-sm">{verificationError}</p>}
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={async () => {
                            try {
                              const response = await fetch(`${API_BASE_URL}/verify-email`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email, code: verificationCode }),
                              });
                              if (!response.ok) throw new Error('Verification failed');
                              setEmailSuccess(true);
                              setVerificationError('');
                              setTimeout(() => {
                                setShowEmailModal(false);
                                setEmailSuccess(false);
                                setShowVerification(false);
                                setVerificationCode('');
                                if (pendingAnalysis) {
                                  setPendingAnalysis(false);
                                  performAnalysis();
                                }
                              }, 1500);
                            } catch (err) {
                              setVerificationError('Invalid verification code. Please try again.');
                            }
                          }}
                          className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Verify Email
                        </button>
                        <button
                          onClick={closeModal}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Analyser redirect
  function Analyser() {
    return <Navigate to="/old-home" replace />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<NewHome />} />
          <Route path="/old-home" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/analyser" element={<Analyser />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/premium-success" element={<PremiumSuccess />} />
          <Route path="/new-home" element={<NewHome />} />
        </Routes>
      </div>
      {showUpgradeModal && (
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      )}
      <FeedbackButton />
    </Router>
  );
}

export default App;
