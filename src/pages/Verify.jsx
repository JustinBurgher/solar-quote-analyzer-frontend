import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react';
import { markEmailVerified } from '../utils/sessionTracking';

const API_BASE_URL = 'https://solar-verify-backend-production.up.railway.app/api';

function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [email, setEmail] = useState('');

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
          setEmail(data.email || '');
          
          // Mark email as verified in localStorage session
          if (data.email) {
            markEmailVerified(data.email);
          }
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

  // Helper function to get grade color
  const getGradeColor = (grade) => {
    if (!grade || grade === 'N/A') return 'text-gray-600';
    const gradeUpper = grade.toUpperCase();
    if (gradeUpper === 'A') return 'text-green-600';
    if (gradeUpper === 'B') return 'text-teal-600';
    if (gradeUpper === 'C') return 'text-yellow-600';
    if (gradeUpper === 'D') return 'text-orange-600';
    if (gradeUpper === 'E' || gradeUpper === 'F') return 'text-red-600';
    return 'text-gray-600';
  };

  // Helper function to format price
  const formatPrice = (price) => {
    if (!price || price === 0) return '£0';
    return `£${Math.round(parseFloat(price)).toLocaleString('en-GB')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-white rounded-xl shadow-lg px-6 py-3 border-2 border-teal-500">
              <h1 className="text-4xl font-bold text-gray-900">
                Solar<span className="text-teal-600">✓</span>erify
              </h1>
            </div>
          </div>
          <p className="text-gray-600 text-lg">Your Solar Quote Analysis & Free Buyer's Guide</p>
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
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Email Verified Successfully! 🎉
                </h2>
                <p className="text-gray-600 mb-2">
                  {message}
                </p>
                <p className="text-sm text-teal-600 font-medium">
                  You now have 2 more free analyses remaining
                </p>
              </div>

              {/* Analysis Results */}
              {analysisData && (
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl p-8 mb-6 text-white text-center">
                    <h3 className="text-xl font-semibold mb-4">
                      Your Quote Grade
                    </h3>
                    <div className={`text-8xl font-bold mb-2 ${analysisData.grade && analysisData.grade !== 'N/A' ? '' : 'text-white/70'}`}>
                      {analysisData.grade || 'N/A'}
                    </div>
                    <p className="text-lg opacity-90">
                      {analysisData.verdict || 'Analysis complete'}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Analysis Breakdown
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">System Size</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {analysisData.system_size || 0} <span className="text-lg">kW</span>
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Total Price</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(analysisData.total_price)}
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Price per kW</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {analysisData.system_size && analysisData.total_price && analysisData.system_size > 0
                            ? formatPrice(analysisData.total_price / analysisData.system_size)
                            : '£N/A'}
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Battery</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {analysisData.has_battery ? 'Included' : 'Not Included'}
                        </p>
                        {analysisData.has_battery && analysisData.battery_capacity && (
                          <p className="text-sm text-gray-600 mt-1">
                            {analysisData.battery_capacity} kWh
                          </p>
                        )}
                      </div>
                    </div>

                    {analysisData.has_battery && analysisData.battery_brand && (
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Battery Details</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {analysisData.battery_brand}
                        </p>
                        {analysisData.battery_quantity && (
                          <p className="text-sm text-gray-600">
                            Quantity: {analysisData.battery_quantity}
                          </p>
                        )}
                      </div>
                    )}
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
                      We've sent your comprehensive <strong>Solar Buyer's Guide PDF</strong> with 7 red flags to watch for. 
                      Check your inbox (and spam folder) for the complete analysis and recommendations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-teal-900 mb-1">
                      Your Account is Active
                    </p>
                    <p className="text-sm text-teal-700">
                      You can now analyze <strong>2 more quotes for free</strong>. Your verified email ({email}) has been saved for your convenience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/analyzer')}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  Analyze Another Quote
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-white text-teal-600 border-2 border-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                >
                  Return to Home
                </button>
              </div>

              {/* Close Tab Hint */}
              <p className="text-center text-sm text-gray-500 mt-6">
                You can close this tab and return to your original window to continue
              </p>
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
                  onClick={() => navigate('/analyzer')}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-white text-teal-600 border-2 border-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                >
                  Return to Home
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
