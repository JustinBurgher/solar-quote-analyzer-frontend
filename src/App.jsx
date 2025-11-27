

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Users, Award, TrendingUp, CheckCircle, Star, Upload, Brain, FileText, Clock, Calculator, AlertTriangle, ArrowRight, Crown, X } from 'lucide-react';
import Verify from './pages/Verify';
import PremiumSuccess from './pages/PremiumSuccess';
import Upgrade from './pages/Upgrade';
import UpgradeModal from './components/UpgradeModal';
import PremiumAnalysisForm from './components/PremiumAnalysisForm';
import { getSession, incrementAnalysisCount, markEmailVerified, needsEmailVerification, shouldShowUpgradeModal, getSessionStatus, hasPremiumAccess } from './utils/sessionTracking';


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

// Enhanced About Page Component
function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About SolarVerify
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Protecting UK homeowners from overpriced solar installations with AI-powered quote analysis
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-[200px]">
              <div className="text-3xl font-bold">5,247+</div>
              <div className="text-sm opacity-80">Quotes Analyzed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-[200px]">
              <div className="text-3xl font-bold">£2.3M+</div>
              <div className="text-sm opacity-80">Savings Identified</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-[200px]">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm opacity-80">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              Empowering homeowners with transparent, unbiased solar quote analysis
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why We Started SolarVerify
                </h3>
                <p className="text-gray-600 mb-4">
                  After seeing countless homeowners fall victim to overpriced solar installations, 
                  we knew something had to change. Door-to-door salespeople and aggressive marketing 
                  tactics were costing families thousands of pounds.
                </p>
                <p className="text-gray-600">
                  Our AI-powered analysis tool levels the playing field, giving you the knowledge 
                  to make informed decisions and negotiate fair prices.
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6">
                <Shield className="w-16 h-16 text-teal-600 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Your Protection Shield
                </h4>
                <p className="text-gray-600">
                  We analyze thousands of data points to identify overpricing, 
                  red flags, and help you save money on your solar investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600">
                No hidden agendas. We provide clear, honest analysis with 
                detailed explanations of our findings.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your interests come first. We're not affiliated with any 
                installers - our loyalty is to you.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Cutting-edge AI technology combined with market expertise 
                to deliver the most accurate analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Trusted by Homeowners</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-3">
                "Saved me £12,000! The analysis showed my quote was massively overpriced. 
                Got 3 more quotes and found a much better deal."
              </p>
              <p className="text-sm text-gray-500">- Sarah M., Manchester</p>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-3">
                "Brilliant service! The detailed report helped me negotiate a 
                25% discount with my installer. Highly recommended."
              </p>
              <p className="text-sm text-gray-500">- James T., Birmingham</p>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-3">
                "Finally, an honest assessment! No sales pressure, just 
                facts and data. Exactly what I needed to make the right choice."
              </p>
              <p className="text-sm text-gray-500">- Emma L., Leeds</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Investment?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of homeowners who've saved money with our analysis
            </p>
            <Link to="/analyzer" className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Analyze My Quote Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Enhanced How It Works Page Component
function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Get your solar quote analyzed in 3 simple steps
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="flex items-center text-lg">
              <Clock className="w-5 h-5 mr-2" />
              Takes less than 2 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  1. Enter Your Quote Details
                </h3>
                <p className="text-gray-600 mb-6">
                  Simply enter your system size, total price, and battery information 
                  (if included). Our form guides you through each step.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    System size in kW (e.g., 4.3kW)
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Total price including installation
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Battery details (brand & quantity)
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-teal-500" />
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  2. AI Analysis
                </h3>
                <p className="text-gray-600 mb-6">
                  Our AI compares your quote against thousands of market data points 
                  and fair pricing benchmarks in real-time.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Market price comparison
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Component-level analysis
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Red flag detection
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-blue-500" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  3. Get Your Grade & Report
                </h3>
                <p className="text-gray-600 mb-6">
                  Receive an instant A-F grade with detailed analysis, 
                  recommendations, and actionable next steps.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Instant A-F grade
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Detailed breakdown
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Clear recommendations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Premium */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Free vs Premium Analysis</h2>
            <p className="text-lg text-gray-600">
              See what's included in each tier
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Analysis</h3>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Instant A-F grade</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Basic price per kW calculation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Simple verdict (Fair/Expensive)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">System size breakdown</span>
                </li>
              </ul>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">FREE</div>
                <p className="text-sm text-gray-600">3 analyses included</p>
              </div>
            </div>
            
            {/* Premium Analysis */}
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-xl shadow-lg p-8 relative">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                MOST POPULAR
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium Analysis</h3>
                <p className="opacity-90">Complete buyer protection</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span>Everything in Free, plus:</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span>Detailed component breakdown</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span>Exact overprice amount (£)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span>Red flag warnings & scam detection</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span>ROI & payback period analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span>Negotiation recommendations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span>Downloadable PDF report</span>
                </li>
              </ul>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">£44.99</div>
                <p className="text-sm opacity-80">Launch price - Limited time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Analyze Your Quote?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of homeowners who've saved money with our analysis
          </p>
          
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Get Started in Under 2 Minutes</h3>
            <p className="text-lg mb-6 opacity-90">
              No signup required for your first analysis
            </p>
            <Link to="/analyzer" className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block">
              Analyze My Quote Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Analyzer page (same as homepage analyzer)
  function Analyzer() {
    return <Homepage />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/premium-success" element={<PremiumSuccess />} />
        </Routes>
      </div>
    {showUpgradeModal && (
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      )}
    </Router>
  );
}

export default App;
