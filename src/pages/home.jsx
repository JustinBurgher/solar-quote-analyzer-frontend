// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import EmailVerificationModal from '../components/EmailVerificationModal';

// Adjust this if you store it in a config file
const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app/api';

export default function Home() {
  // Form state
  const [formData, setFormData] = useState({
    system_size: '',
    total_price: '',
    has_battery: false,
    battery_brand: '',
    battery_quantity: 1,
    battery_capacity: '',
  });

  // Other state variables
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

  // Fetch battery options once on mount
  useEffect(() => {
    fetchBatteryOptions();
  }, []);

  const fetchBatteryOptions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/battery-options`);
      if (res.ok) {
        const data = await res.json();
        // Expect data.battery_options
        setBatteryOptions(data.battery_options || []);
      }
    } catch (err) {
      console.error('Failed to fetch battery options:', err);
    }
  };

  // Handle input changes for text/number and checkbox fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        ...(name === 'has_battery' && !checked
          ? { battery_brand: '', battery_quantity: 1, battery_capacity: '' }
          : {}),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Update brand and capacity when selecting a battery
  const handleBatteryBrandChange = (e) => {
    const selected = e.target.value;
    const batteryInfo = batteryOptions.find((b) => b.brand === selected);
    setFormData((prev) => ({
      ...prev,
      battery_brand: selected,
      battery_capacity:
        selected === 'Other' || !batteryInfo ? '' : batteryInfo.capacity,
    }));
  };

  // Compute total capacity for display
  const calculateTotalCapacity = () => {
    if (!formData.has_battery) return 0;
    if (formData.battery_brand === 'Other') {
      return (
        parseFloat(formData.battery_capacity || 0) *
        Number(formData.battery_quantity || 1)
      );
    }
    const batteryInfo = batteryOptions.find(
      (b) => b.brand === formData.battery_brand,
    );
    return batteryInfo
      ? batteryInfo.capacity * Number(formData.battery_quantity)
      : 0;
  };

  // Called when email is successfully verified
  const handleEmailVerified = (email, adminStatus = false) => {
    setUserEmail(email);
    setIsVerified(true);
    setIsAdmin(adminStatus);
    if (pendingAnalysis) {
      setPendingAnalysis(false);
      // Trigger the original analysis after verification
      setTimeout(() => {
        handleSubmit();
      }, 100);
    }
  };

  // Main submission handler
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // If not admin and user has used one free analysis, require verification
    if (!isAdmin && analysisCount >= 1 && !isVerified && !pendingAnalysis) {
      setPendingAnalysis(true);
      setShowEmailModal(true);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/analyze-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          user_email: userEmail,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        // Use remaining_analyses to compute count or rely on back-end count
        setAnalysisCount((prev) => (data.remaining_analyses === 'unlimited' ? prev + 1 : prev + 1));
        setIsAdmin(data.is_admin || false);
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset the form for another analysis
  const resetForm = () => {
    setFormData({
      system_size: '',
      total_price: '',
      has_battery: false,
      battery_brand: '',
      battery_quantity: 1,
      battery_capacity: '',
    });
    setResult(null);
    setError('');
  };

  // Show upgrade prompt after 3 analyses (non-admin, verified)
  const shouldShowUpgrade = () =>
    !isAdmin && isVerified && analysisCount >= 3;

  // For display, remaining analyses
  const getRemainingAnalyses = () => {
    if (isAdmin) return 'unlimited';
    if (!isVerified) return analysisCount >= 1 ? 0 : 1;
    return Math.max(0, 3 - analysisCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get Your Solar Quote <span className="text-teal-600">Verified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Don't get ripped off! Our AI-powered analyzer instantly grades your
            solar quote and tells you if you're getting a fair deal.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            {['Instant Analysis', 'Fair Price Check', 'Battery Analysis'].map(
              (text) => (
                <div key={text} className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">{text}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Quote Analyzer Section */}
      <section id="analyzer" className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Solar Quote Analyzer</h2>
              <p className="text-teal-100 mb-4">
                Get your instant A-F grade • Enhanced with battery analysis
              </p>
              {/* Admin indicator */}
              {isAdmin && (
                <div className="bg-purple-500 bg-opacity-30 border border-purple-300 rounded-lg p-3 mb-4">
                  <p className="font-semibold text-purple-200">
                    Admin Testing Mode Active
                  </p>
                </div>
              )}
              {/* Analysis counter */}
              {!isAdmin && (
                <div className="bg-teal-500 bg-opacity-30 border border-teal-300 rounded-lg p-3">
                  <p className="text-sm">
                    {!isVerified && analysisCount === 0 &&
                      'Next analysis requires email verification'}
                    {!isVerified && analysisCount >= 1 &&
                      'Email verification required for additional analyses'}
                    {isVerified && getRemainingAnalyses() > 0 &&
                      `${getRemainingAnalyses()} analyses remaining`}
                    {shouldShowUpgrade() && 'Upgrade for unlimited analyses'}
                  </p>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* System size */}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. 4.3"
                />
              </div>

              {/* Total price */}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. 13275"
                />
              </div>

              {/* Battery included */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="has_battery"
                  name="has_battery"
                  checked={formData.has_battery}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="has_battery" className="text-sm font-medium text-gray-700">
                  Battery included?
                </label>
              </div>

              {/* Battery details */}
              {formData.has_battery && (
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Battery Details</h3>

                  {/* Brand select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Brand *
                    </label>
                    <select
                      name="battery_brand"
                      value={formData.battery_brand}
                      onChange={handleBatteryBrandChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select battery brand...</option>
                      {batteryOptions.map(({ brand }, idx) => (
                        <option key={idx} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Batteries
                    </label>
                    <select
                      name="battery_quantity"
                      value={formData.battery_quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Capacity field for 'Other' */}
                  {formData.battery_brand === 'Other' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Battery Capacity (kWh per battery) *
                      </label>
                      <input
                        type="number"
                        name="battery_capacity"
                        value={formData.battery_capacity}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0.1"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g. 13.5"
                      />
                    </div>
                  )}

                  {/* Total capacity display */}
                  {calculateTotalCapacity() > 0 && (
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-teal-900">
                        Total Battery Capacity: {calculateTotalCapacity()} kWh
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || (shouldShowUpgrade() && !isAdmin)}
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-teal-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading
                  ? 'Analyzing...'
                  : shouldShowUpgrade() && !isAdmin
                  ? 'Upgrade Required'
                  : 'Get My Grade Free'}
              </button>

              {/* Upgrade prompt for non-admins */}
              {shouldShowUpgrade() && !isAdmin && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    You've used all 3 free analyses
                  </p>
                  <button type="button" className="text-teal-600 hover:text-teal-700 font-semibold underline">
                    Upgrade to Premium - £24.99
                  </button>
                </div>
              )}

              {/* Email verification notice */}
              {!isAdmin && !isVerified && analysisCount >= 1 && (
                <p className="text-center text-sm text-gray-600">
                  Email verification required for additional analyses
                </p>
              )}

              {/* Error display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="font-semibold">Analysis failed:</p>
                  <p>{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Display analysis result */}
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
                    <p className="text-sm text-blue-600">Price per kW</p>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-900 mb-2">System Details</h4>
                    <p className="text-teal-700">{result.system_details.system_size}kW System</p>
                    <p className="text-sm text-teal-600">
                      Total: £{result.system_details.total_price}
                    </p>
                  </div>
                </div>
                {/* Battery info */}
                {result.system_details.has_battery && result.system_details.battery_info && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Battery Information</h4>
                    <p className="text-purple-700">{result.system_details.battery_info}</p>
                    {result.system_details.total_capacity && (
                      <p className="text-sm text-purple-600">
                        Total Capacity: {result.system_details.total_capacity} kWh
                      </p>
                    )}
                  </div>
                )}
                {/* Premium teaser */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">
                    Want More Details?
                  </h4>
                  <p className="text-sm text-yellow-800 mb-3">
                    Premium includes detailed cost breakdowns, installation analysis, and component-specific recommendations.
                  </p>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors">
                    Upgrade to Premium - £24.99
                  </button>
                </div>
                {/* Reset button */}
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

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get Expert Help</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Need personalized advice? Our solar experts are here to help you make the right decision.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl mb-2">📧</div>
              <a href="mailto:hello@solarverify.co.uk" className="text-teal-400 hover:text-teal-300">
                hello@solarverify.co.uk
              </a>
            </div>
          </div>
          <div className="mt-12">
            <button className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors">
              Learn More
            </button>
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
    </div>
  );
}
