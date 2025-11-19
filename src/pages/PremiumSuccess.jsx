import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Crown, Loader } from 'lucide-react';
import PremiumAnalysisForm from '../components/PremiumAnalysisForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://solar-verify-backend-production.up.railway.app';

const PremiumSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

          // Store premium access in session
          const sessionData = localStorage.getItem('solarverify_session');
          const session = sessionData ? JSON.parse(sessionData) : {};
          session.premiumAccess = true;
          session.premiumEmail = data.email;
          localStorage.setItem('solarverify_session', JSON.stringify(session));
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

  const handlePremiumSubmit = async (formData) => {
    setSubmitting(true);
    try {
      // Submit premium analysis
      const response = await fetch(`${API_BASE_URL}/api/analyze-premium`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: email,
          premium: true
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      
      // Navigate to results page or show success message
      alert('✅ Premium Analysis Complete!\\n\\nYour detailed analysis has been sent to your email.\\n\\nCheck your inbox for the comprehensive PDF report with all premium insights.');
      
      // Redirect to home or analyzer
      navigate('/');
      
    } catch (err) {
      console.error('Analysis error:', err);
      alert('❌ Analysis failed. Please try again or contact support.');
    } finally {
      setSubmitting(false);
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Success Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🎉 Welcome to Premium!
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Your payment was successful. Premium access is now activated!
              </p>
              
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 px-6 py-3 rounded-full">
                <Crown className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-900">Premium Account: {email}</span>
              </div>
            </div>
          </div>

          {/* Premium Analysis Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Start Your First Premium Analysis
              </h2>
              <p className="text-gray-600">
                Fill out the form below with your solar quote details. We'll analyze everything and send you a comprehensive PDF report with detailed insights, recommendations, and red flags to watch out for.
              </p>
            </div>

            {/* Show Premium Form */}
            <PremiumAnalysisForm 
              onSubmit={handlePremiumSubmit}
              onCancel={() => navigate('/')}
            />
            
            {submitting && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                  <Loader className="w-16 h-16 text-teal-600 animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Quote...</h3>
                  <p className="text-gray-600">This may take a moment. We're performing a comprehensive analysis.</p>
                </div>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Need help? Contact us at <a href="mailto:justinburgher@solarverify.co.uk" className="text-teal-600 hover:underline">justinburgher@solarverify.co.uk</a></p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PremiumSuccess;
