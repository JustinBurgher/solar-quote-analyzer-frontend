import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';

const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app/api';

function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('No verification token found. Please check your email link.');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully!');
          setAnalysisData(data.analysis_data);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed. The link may have expired or been used already.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Network error. Please check your connection and try again.');
        console.error('Verification error:', error);
      }
    };

    verifyToken();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Enhanced Logo/Header with White Box */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white px-8 py-4 rounded-xl shadow-lg border-3 border-teal-500 mb-4">
            <h1 className="text-4xl font-bold text-gray-900 m-0">
              Solar<span className="text-teal-600">✓</span>erify
            </h1>
          </div>
          <p className="text-gray-700 text-lg font-medium">Email Verification</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {status === 'verifying' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-100 rounded-full mb-6">
                <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Verifying Your Email...
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Email Verified Successfully! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>

              {/* Analysis Results */}
              {analysisData && (
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 mb-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Quote Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Grade:</span>
                      <span className="text-2xl font-bold text-teal-600">
                        {analysisData.grade}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-gray-700">
                        <strong>Verdict:</strong> {analysisData.verdict}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PDF Delivery Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      Check Your Email
                    </p>
                    <p className="text-sm text-blue-700">
                      We've sent your comprehensive Solar Buyer's Guide PDF to your email address. 
                      Check your inbox (and spam folder) for the complete analysis and recommendations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Return to Home
                </button>
                <button
                  onClick={() => navigate('/quote-analyzer')}
                  className="px-6 py-3 bg-white text-teal-600 border-2 border-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                >
                  Analyze Another Quote
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>

              {/* Error Help */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Common reasons:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                  <li>The verification link has expired (links are valid for 10 minutes)</li>
                  <li>The link has already been used</li>
                  <li>The link was copied incorrectly</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Return to Home
                </button>
                <button
                  onClick={() => navigate('/quote-analyzer')}
                  className="px-6 py-3 bg-white text-teal-600 border-2 border-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Need help? Contact us at justinburgher@solarverify.co.uk</p>
        </div>
      </div>
    </div>
  );
}

export default Verify;

