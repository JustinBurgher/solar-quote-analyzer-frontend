import React, { useState } from 'react';
import { X, Crown, CheckCircle, Shield, TrendingUp, MapPin, Award, FileText, Zap } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://solar-verify-backend-production.up.railway.app';

const UpgradeModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setLoading(true);
    setError('');

    try {
      // Get email from session storage (from email verification)
      const sessionData = localStorage.getItem('solarverify_session');
      const session = sessionData ? JSON.parse(sessionData) : null;
      const email = session?.verifiedEmail;

      if (!email) {
        // If no email in session, prompt for it
        const userEmail = window.prompt(
          "Enter your email to proceed with payment:\n\n" +
          "This will be used for your receipt and premium access."
        );

        if (!userEmail || userEmail.trim() === '') {
          setError('Email is required for payment');
          setLoading(false);
          return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail.trim())) {
          setError('Please enter a valid email address');
          setLoading(false);
          return;
        }

        // Create checkout session with the provided email
        const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail.trim()
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const data = await response.json();

        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        // Use email from session
        const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const data = await response.json();

        // Redirect to Stripe checkout
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Upgrade error:', err);
      setError('Failed to start checkout. Please try again.');
      setLoading(false);
    }
  };

  const premiumFeatures = [
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
      title: 'Scaffolding Inclusion',
      description: 'Verify if scaffolding costs are included and fairly priced in your quote'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Bird Protection Verification',
      description: 'Check if bird protection measures are included to protect your investment'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Installer Location Analysis',
      description: 'Regional pricing insights based on installer location across the UK'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'MCS Registration Check',
      description: 'Verify installer credentials and MCS certification status'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Regional Pricing Insights',
      description: 'Understand how costs vary by region and get location-specific recommendations'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Personalized Recommendations',
      description: 'Custom advice tailored to your specific quote and circumstances'
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
                You've used your 3 free analyses! Unlock unlimited access with detailed insights.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

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
            <button 
              onClick={handleUpgrade}
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
              onClick={handleUpgrade}
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
