import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Crown, ArrowRight, Loader } from 'lucide-react';
import { grantPremiumAccess } from '../utils/sessionTracking';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://solar-verify-backend-production.up.railway.app';

const PremiumSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');

      if (!sessionId) {
        setError('No payment session found');
        setVerifying(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/verify-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionId
          }),
        });

        if (!response.ok) {
          throw new Error('Payment verification failed');
        }

        const data = await response.json();

        if (data.success && data.premium_access) {
          setVerified(true);
          setEmail(data.email);

          // Grant premium access using session tracking utility
          grantPremiumAccess(data.email);
        } else {
          setError('Payment verification failed. Please contact support.');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('Failed to verify payment. Please contact support with your payment confirmation.');
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Loader className="w-16 h-16 text-teal-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your purchase</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/analyzer')}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Return to Analyzer
          </button>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎉 Welcome to Premium!
            </h1>
            <p className="text-lg text-gray-600">
              Your payment was successful. Premium access is now activated!
            </p>
          </div>

          {/* Account Info */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-900">Your Premium Account</h2>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Status:</strong> <span className="text-teal-600 font-semibold">Premium Active</span>
              </p>
              <p>
                <strong>Access:</strong> Unlimited detailed analyses
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Start your first premium analysis with detailed component assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Get personalized recommendations based on your specific quote</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Receive a comprehensive PDF report via email</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Analyze unlimited quotes with full premium features</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/analyzer')}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-bold text-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Start Premium Analysis
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Return to Home
            </button>
          </div>

          {/* Receipt Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>A receipt has been sent to {email}</p>
            <p className="mt-1">Need help? Contact us at justinburgher@solarverify.co.uk</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PremiumSuccess;
