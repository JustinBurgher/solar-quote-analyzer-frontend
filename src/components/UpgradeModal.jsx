import React, { useState } from 'react';
import { X, Crown, CheckCircle, Shield, TrendingUp, MapPin, Award, FileText, Zap } from 'lucide-react';

const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app/api';

const UpgradeModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  if (!isOpen) return null;

  const handleUpgradeClick = async () => {
    // Check if we have email from session
    const session = localStorage.getItem('solarverify_session');
    let userEmail = '';
    
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        userEmail = sessionData.email || '';
      } catch (e) {
        console.error('Error parsing session:', e);
      }
    }

    // If no email, show email input
    if (!userEmail && !email) {
      setShowEmailInput(true);
      return;
    }

    const emailToUse = userEmail || email;

    setLoading(true);
    setError('');

    try {
      // Call backend to create Stripe checkout session
      const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailToUse
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start checkout');
      }

      const data = await response.json();

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to start checkout. Please try again.');
      setLoading(false);
    }
  };

  const premiumFeatures = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Professional PDF Report',
      description: 'Comprehensive analysis report emailed to you with detailed breakdowns and recommendations'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Panel Brand Analysis',
      description: 'Detailed assessment of solar panel quality, efficiency ratings, and manufacturer reputation'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Inverter Quality Check',
      description: 'Expert evaluation of inverter brand, warranty coverage, and performance reliability'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Battery Assessment',
      description: 'In-depth analysis of battery technology, capacity, and long-term value'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Component Validation',
      description: 'Verify all components (scaffolding, bird protection, etc.) are included and fairly priced'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Regional Pricing Analysis',
      description: 'UK-wide pricing insights based on installer location and regional market rates'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Installer Verification',
      description: 'Check MCS registration, years in business, and warranty coverage'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Value-for-Money Score',
      description: 'Detailed breakdown showing if you\'re getting good value compared to market rates'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Red Flags & Questions',
      description: 'Specific concerns to address and questions to ask your installer before signing'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-teal-500 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-8 h-8 text-yellow-300" />
                <h2 className="text-3xl font-bold">Upgrade to Premium</h2>
              </div>
                            <p className="text-lg opacity-90">
                You've used your 3 free analyses! Unlock unlimited premium analyses with comprehensive PDF reports.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Pricing Section */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 mb-8 text-center">
            <div className="mb-4">
              <div className="text-gray-500 line-through text-xl mb-1">£49.99</div>
              <div className="text-5xl font-bold text-teal-600 mb-2">£24.99</div>
              <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-semibold text-sm">
                🔥 LAUNCH SPECIAL - SAVE £25
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              One-time payment • Instant unlock • 30-day money-back guarantee
            </p>
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Email Input (if needed) */}
            {showEmailInput && (
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
                />
                <p className="text-sm text-gray-600">We'll send your receipt and premium access confirmation to this email</p>
              </div>
            )}

            <button 
              onClick={handleUpgradeClick}
              disabled={loading}
              className="w-full md:w-auto px-8 py-4 bg-teal-600 text-white rounded-lg font-bold text-lg hover:bg-teal-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Upgrade Now - £24.99'}
            </button>
          </div>

          {/* Features Grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What You'll Get with Premium
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {premiumFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Why Premium is Worth It
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Make informed decisions</strong> - Know exactly what you're paying for
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Avoid costly mistakes</strong> - Identify overpriced or low-quality components
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Negotiate with confidence</strong> - Armed with detailed market insights
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Save thousands</strong> - Premium analysis typically saves £2,000+ on average
                </span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button 
              onClick={handleUpgradeClick}
              disabled={loading}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-bold text-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Crown className="w-5 h-5 inline mr-2" />
              {loading ? 'Processing...' : 'Unlock Premium Analysis - £24.99'}
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Secure payment • Instant access • Cancel anytime
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600" />
                <span>Trusted by 5,247+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
