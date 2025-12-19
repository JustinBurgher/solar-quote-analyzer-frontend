import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Shield, Users, Award, TrendingUp, CheckCircle, Star, Upload, Brain, FileText, Clock, Calculator, AlertTriangle, ArrowRight, Crown, X } from 'lucide-react';
import Verify from './pages/Verify';
import PremiumSuccess from './pages/PremiumSuccess';
import UpgradeModal from './components/UpgradeModal';
import PremiumAnalysisForm from './components/PremiumAnalysisForm';
import { getSession, incrementAnalysisCount, markEmailVerified, needsEmailVerification, shouldShowUpgradeModal, getSessionStatus, hasPremiumAccess } from './utils/sessionTracking';
import NewHome from './pages/NewHome';
import LandingHero from './components/LandingHero';
import LandingMockup from './components/LandingMockup';
import LandingHowItWorks from './components/LandingHowItWorks';
import LandingTrust from './components/LandingTrust';
import LandingChecklist from './components/LandingChecklist';
import LandingUpgradePreview from './components/LandingUpgradePreview';
import LandingFinalCTA from './components/LandingFinalCTA';


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
      <section className="bg-dark-bg  from-orange-500  to-orange-600 text-white py-20">
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
              <div className="text-sm opacity-80">Quotes analysed</div>
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
              <div className="bg-dark-bg from-teal-50 to-blue-50 rounded-xl p-6">
                <Shield className="w-16 h-16 ext-orange-600 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Your Protection Shield
                </h4>
                <p className="text-gray-600">
                  We analyse thousands of data points to identify overpricing, 
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
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 ext-orange-600" />
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
          
          <div className="bg-gradient-to-r  from-orange-500  to-orange-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Investment?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of homeowners who've saved money with our analysis
            </p>
            <Link to="/analyser" className="bg-white ext-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              analyse My Quote Now
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
      <section className="bg-dark-bg  from-orange-500  to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Get your solar quote analysed in 3 simple steps
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
              <div className="bg-dark-bg  from-orange-500 to-teal-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
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
              <div className="bg-dark-bg from-blue-500  to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
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
              <div className="bg-dark-bg from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
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
            <div className="bg-dark-bg  from-orange-500  to-orange-600 text-white rounded-xl shadow-lg p-8 relative">
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
                <div className="text-3xl font-bold mb-1">
                  
                </div>
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
            Ready to analyse Your Quote?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of homeowners who've saved money with our analysis
          </p>
          
          <div className="bg-gradient-to-r  from-orange-500  to-orange-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Get Started in Under 2 Minutes</h3>
            <p className="text-lg mb-6 opacity-90">
              No signup required for your first analysis
            </p>
            <Link to="/analyser" className="bg-white ext-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block">
              analyse My Quote Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Enhanced Upgrade Page Component
function Upgrade() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleClick() {
    setBusy(true);
    setMsg("");
    try {
      // Call backend to create Stripe checkout session
      const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'user@example.com' }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (e) {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with CTA */}
      <section className="bg-dark-bg  from-orange-500  to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Unlock Premium Analysis
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Get the complete buyer's protection guide with detailed insights, 
            red flag warnings, and actionable recommendations
          </p>
          
          {/* Price Display */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 inline-block">
            <div className="text-5xl font-bold mb-2">£44.99</div>
            <p className="text-sm opacity-90">One-off payment • Instant access • 30-day money-back guarantee</p>
          </div>
          
          {/* Top CTA Button */}
          <div className="mb-4">
            {msg && <p className="text-red-300 mb-4 bg-red-900/20 px-4 py-2 rounded-lg inline-block">{msg}</p>}
            <button
              onClick={handleClick}
              disabled={busy}
              className="bg-white ext-orange-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 shadow-2xl"
            >
              {busy ? "Preparing Checkout..." : "Upgrade Now - £44.99"}
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm opacity-90">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              Secure Payment
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Instant Access
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Money-Back Guarantee
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Discover in Your Premium Report
            </h2>
            <p className="text-lg text-gray-600">
              Get specific, actionable insights that could save you thousands
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Free Analysis */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    Free Analysis
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Basic A-F grade rating</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Simple £/kW calculation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">General verdict (Fair/Overpriced)</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400">No component-by-component pricing</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400">No equipment quality ratings</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400">No installer verification</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400">No specific £ overprice amount</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400">No negotiation strategy</span>
                    </li>
                  </ul>
                </div>

                {/* Premium Analysis */}
                <div className="border-2 border-teal-500 rounded-xl p-6 relative bg-dark-bg from-teal-50 to-blue-50">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    PREMIUM
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center mt-2">
                    Premium Analysis
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Crown className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold">Component Breakdown:</span>
                        <span className="text-gray-700"> Exact pricing for panels, inverter, battery, scaffolding, labor</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Crown className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold">Equipment Quality Rating:</span>
                        <span className="text-gray-700"> Are your panels Tier 1, 2, or 3? Is your inverter a premium brand?</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Crown className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold">Exact Overprice Amount:</span>
                        <span className="text-gray-700"> "Your £15,000 quote should be £9,200 - you're overpaying by £5,800"</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Crown className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold">Installer Verification:</span>
                        <span className="text-gray-700"> MCS certification status, Companies House check, trading history</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Crown className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold">Red Flag Warnings:</span>
                        <span className="text-gray-700"> Excessive markup alerts, missing warranties, unlicensed installers</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Crown className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold">Real ROI Analysis:</span>
                        <span className="text-gray-700"> Actual payback period based on your usage (not salesperson fantasy numbers)</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Crown className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold">Negotiation Script:</span>
                        <span className="text-gray-700"> Specific talking points and target prices to negotiate down</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Crown className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold">Professional PDF Report:</span>
                        <span className="text-gray-700"> Take to other installers for competitive quotes</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See how Premium analysis has helped other homeowners
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "The Premium report showed my quote was 140% overpriced. 
                Used it to negotiate and saved £12,000!"
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Sarah M.</div>
                <div className="text-gray-500">Manchester</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "Red flag warnings saved me from a scam company. 
                Found a reputable installer instead."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">James T.</div>
                <div className="text-gray-500">Birmingham</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "ROI analysis showed 18-year payback vs 8 years for fair pricing. 
                Got 3 more quotes immediately."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Emma L.</div>
                <div className="text-gray-500">Leeds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-dark-bg  from-orange-500  to-orange-600 text-white rounded-2xl p-8">
            <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to Unlock Premium?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get instant access to your comprehensive solar quote analysis
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <div className="text-4xl font-bold mb-2">£44.99</div>
              <p className="text-sm opacity-90">One-off payment • Instant access • 30-day money-back guarantee</p>
            </div>
            
            {msg && <p className="text-red-300 mb-4 bg-red-900/20 px-4 py-2 rounded-lg inline-block">{msg}</p>}
            
            <button
              onClick={handleClick}
              disabled={busy}
              className="bg-white ext-orange-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 shadow-2xl mb-6"
            >
              {busy ? "Preparing Checkout..." : "Upgrade Now - £44.99"}
            </button>
            
            <div className="flex items-center justify-center space-x-6 text-sm opacity-90">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Secure Payment
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Instant Access
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Money-Back Guarantee
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            * Average customer saves £8,500+ with Premium analysis
          </p>
        </div>
      </section>
    </div>
  );
}

// Contact Page Component
function Contact() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="opacity-80 mb-6">
        Get in touch with our team for support or questions about your solar quote analysis.
      </p>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600">hello@solarverify.co.uk</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600">We typically respond within 24 hours</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM GMT</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main App Component with existing functionality
function App() {
  // All existing state and functionality preserved
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
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisCount, setAnalysisCount] = useState(() => {
  const session = getSession();
  return session.analysisCount;
});
const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState(false);
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
    // Check premium access
    setIsPremium(hasPremiumAccess());
  }, []);

  // FIXED: Block programmatic clicks and only specific keyboard shortcuts
  useEffect(() => {
    // Block untrusted (programmatic) clicks on links
    const handleClick = (e) => {
      // isTrusted = false means it's a programmatic click, not a real user click
      if (!e.isTrusted && e.target.tagName === 'A') {
        console.log('Blocked programmatic link click:', e.target.href);
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    // Only block specific problematic keyboard shortcuts, not all keyboard events
    const handleKeyDown = (e) => {
      // Only block browser navigation shortcuts (Ctrl+K, Ctrl+L, etc.)
      // Allow all normal typing and text input
      const isNavigationShortcut = (
        (e.ctrlKey || e.metaKey) && 
        (e.key === 'k' || e.key === 'l' || e.key === 'K' || e.key === 'L')
      );

      if (isNavigationShortcut) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Don't block any other keys - let React handle them normally
    };

    // Add click blocker - this catches the programmatic clicks
    document.addEventListener('click', handleClick, {capture: true, passive: false});
    
    // Add keyboard handler - only for keydown, only block specific shortcuts
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

    // Email verification disabled for MVP launch - collect emails optionally
    if (false && !isAdmin && needsEmailVerification()) {
      // Use browser native prompt instead of buggy modal
      const userEmail = window.prompt(
        "📧 Get 2 More Free Analyses + Expert Guide\n\n" +
        "Enter your email to unlock:\n" +
        "✓ 2 additional free quote analyses\n" +
        "✓ PDF guide: 7 Red Flags in Solar Quotes\n" +
        "✓ Price comparison insights\n\n" +
        "We respect your privacy. Your email is used only for verification " +
        "and sending your analysis results. We never share your data. " +
        "See our Privacy Policy at solarverify.co.uk/privacy\n\n" +
        "Enter your email address:"
      );
      
      // If user cancelled or entered nothing
      if (!userEmail || userEmail.trim() === '') {
        setError('Email is required for additional analyses');
        return;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail.trim())) {
        setError('Please enter a valid email address');
        return;
      }
      
      // Set the email and send verification
      setEmail(userEmail.trim());
      
      // Send magic link
      try {
        const response = await fetch(`${API_BASE_URL}/send-magic-link`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail.trim(),
            analysis_data: {
              system_size: parseFloat(systemSize) || 0,
              total_price: parseFloat(totalPrice) || 0,
              has_battery: hasBattery,
              battery_brand: hasBattery ? batteryBrand : '',
              battery_quantity: hasBattery ? batteryQuantity : 0,
              battery_capacity: hasBattery ? getTotalBatteryCapacity() : 0,
            }
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send verification email');
        }

        const data = await response.json();
        
        // Show success message
        alert(
          "✅ Verification Email Sent!\n\n" +
          "Check your inbox for:\n" +
          "• Verification link to unlock 2 more free analyses\n" +
          "• PDF guide: 7 Red Flags in Solar Quotes\n" +
          "• Your analysis results\n\n" +
          "Click the link to verify and access your results!"
        );

                // Increment analysis count for the email-gated analysis
        if (!isAdmin) {
          const newCount = incrementAnalysisCount();
          setAnalysisCount(newCount);
        }
        
        // Reset form for next analysis
        setSystemSize('');
        setTotalPrice('');
        setHasBattery(false);
        setBatteryBrand('');
        setBatteryQuantity(0);
        
      } catch (error) {
        setError('Failed to send verification email. Please try again.');
        console.error('Magic link error:', error);
      }
      
      return;
    }

    // Perform analysis and show results
    await performAnalysis();
    
    // After showing results, check if upgrade modal should appear
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
      // Prepare premium analysis data
      const premiumData = {
        // Basic fields
        system_size: parseFloat(formData.systemSize) || 0,
        total_price: parseFloat(formData.totalCost) || 0,
        location: formData.location,
        user_email: formData.email,
        
        // Premium fields - Panel details
        panel_brand: formData.panelBrand,
        panel_model: formData.panelModel,
        panel_wattage: parseFloat(formData.panelWattage) || 0,
        panel_quantity: parseInt(formData.panelQuantity) || 0,
        
        // Premium fields - Inverter details
        inverter_brand: formData.inverterBrand,
        inverter_model: formData.inverterModel,
        inverter_type: formData.inverterType,
        inverter_capacity: parseFloat(formData.inverterCapacity) || 0,
        
        // Premium fields - Battery details
        has_battery: formData.batteryIncluded,
        battery_brand: formData.batteryIncluded ? formData.batteryBrand : '',
        battery_model: formData.batteryIncluded ? formData.batteryModel : '',
        battery_capacity: formData.batteryIncluded ? parseFloat(formData.batteryCapacity) || 0 : 0,
        battery_quantity: formData.batteryIncluded ? parseInt(formData.batteryQuantity) || 1 : 0,
        battery_warranty: formData.batteryIncluded ? parseInt(formData.batteryWarranty) || 0 : 0,
        
        // Premium fields - Installation details
        scaffolding_included: formData.scaffoldingIncluded,
        scaffolding_cost: formData.scaffoldingIncluded ? parseFloat(formData.scaffoldingCost) || 0 : 0,
        bird_protection_included: formData.birdProtectionIncluded,
        bird_protection_cost: formData.birdProtectionIncluded ? parseFloat(formData.birdProtectionCost) || 0 : 0,
        roof_type: formData.roofType,
        roof_material: formData.roofMaterial,
        
        // Premium fields - Installer information
        installer_company: formData.installerCompany,
        installer_location: formData.installerLocation,
        installer_mcs: formData.installerMCS,
        installer_years_in_business: formData.installerYearsInBusiness ? parseInt(formData.installerYearsInBusiness) || 0 : 0,
        installer_warranty_years: formData.installerWarrantyYears ? parseInt(formData.installerWarrantyYears) || 0 : 0,
        installation_timeline: formData.installationTimeline,
        
        // Mark as premium analysis
        is_premium: true
      };

      // If PDF is uploaded, we'll need to handle it separately
      // For now, we'll send the data without the PDF
      // TODO: Implement PDF upload handling

      const response = await fetch(`${API_BASE_URL}/analyse-premium-quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(premiumData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Show success message
      alert(
        "✅ Premium Analysis Complete!\n\n" +
        "Your comprehensive analysis report has been generated and sent to your email.\n\n" +
        "Check your inbox for:\n" +
        "• Detailed component assessment\n" +
        "• Red flags and things to consider\n" +
        "• Questions to ask your installer\n" +
        "• Comprehensive PDF report"
      );
      
      // Reset form
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      
      // Increment analysis count for non-admin users
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

  // Handle email verification
  const handleSendVerification = async () => {
    if (!email || !gdprConsent) {
      setEmailError('Please enter your email and accept the privacy policy.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send verification');
      }

      setShowVerification(true);
      setEmailError('');
    } catch (err) {
      setEmailError('Failed to send verification. Please try again.');
    }
  };

  // Handle email verification
  const handleVerifyEmail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      setEmailSuccess(true);
      setVerificationError('');
      
      // Close modal after short delay and proceed with analysis if pending
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

  // Navigation component
  function Navigation() {
    const location = useLocation();
    
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold ext-orange-600">Solar✓erify</div>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">Trusted</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`${location.pathname === '/' ? 'ext-orange-600' : 'text-gray-700'} hover:ext-orange-600 transition-colors`}>
                Home
              </Link>
              <Link to="/about" className={`${location.pathname === '/about' ? 'ext-orange-600' : 'text-gray-700'} hover:ext-orange-600 transition-colors`}>
                About
              </Link>
              <Link to="/how-it-works" className={`${location.pathname === '/how-it-works' ? 'ext-orange-600' : 'text-gray-700'} hover:ext-orange-600 transition-colors`}>
                How It Works
              </Link>
              <Link to="/upgrade" className={`${location.pathname === '/upgrade' ? 'ext-orange-600' : 'text-gray-700'} hover:ext-orange-600 transition-colors`}>
                Upgrade
              </Link>
              <Link to="/contact" className={`${location.pathname === '/contact' ? 'ext-orange-600' : 'text-gray-700'} hover:ext-orange-600 transition-colors`}>
                Contact
              </Link>
              <Link to="/analyser" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Quote analyser
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Homepage component with existing analyser
  function Homepage() {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-dark-bg  from-orange-500  to-orange-600 text-white py-20">
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
                <Shield className="w-5 h-5 ext-orange-600" />
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

        {/* Main analyser Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-dark-bg  from-orange-500  to-orange-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Solar Quote analyser</h2>
                <p className="text-lg opacity-90 mb-6">Get your instant A-F grade • Enhanced with battery analysis</p>
                
                {/* Analysis Status */}
                {!isAdmin && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <p className="text-sm">
                      {analysisCount === 0 ? "First analysis is completely free!" :
                       analysisCount < 3 ? `${3 - analysisCount} more free ${3 - analysisCount === 1 ? 'analysis' : 'analyses'} remaining` :
                       "Upgrade to Premium for unlimited analyses"}
                    </p>
                  </div>
                )}

                {/* Admin Status */}
                {isAdmin && (
                  <div className="bg-yellow-400/20 backdrop-blur-sm rounded-lg p-4 mb-6 flex items-center justify-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-300" />
                    <span className="text-sm font-medium">Admin Testing Mode - Unlimited Analyses</span>
                  </div>
                )}

                {/* Premium Status */}
                {isPremium && !isAdmin && (
                  <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Crown className="w-5 h-5 text-yellow-300" />
                      <span className="text-sm font-medium">Premium Access Active</span>
                    </div>
                    {!showPremiumForm && (
                      <button
                        onClick={() => setShowPremiumForm(true)}
                        className="px-6 py-2 bg-white ext-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
                      >
                        Start Premium Analysis →
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-white p-8">
                {/* Show Premium Form for premium users who clicked the button */}
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
                      <option value="2.5">2.5 kW</option>
                      <option value="3">3.0 kW</option>
                      <option value="3.5">3.5 kW</option>
                      <option value="4">4.0 kW</option>
                      <option value="4.5">4.5 kW</option>
                      <option value="5">5.0 kW</option>
                      <option value="5.5">5.5 kW</option>
                      <option value="6">6.0 kW</option>
                      <option value="6.5">6.5 kW</option>
                      <option value="7">7.0 kW</option>
                      <option value="7.5">7.5 kW</option>
                      <option value="8">8.0 kW</option>
                      <option value="8.5">8.5 kW</option>
                      <option value="9">9.0 kW</option>
                      <option value="9.5">9.5 kW</option>
                      <option value="10">10.0 kW</option>
                      <option value="10.5">10.5 kW</option>
                      <option value="11">11.0 kW</option>
                      <option value="11.5">11.5 kW</option>
                      <option value="12">12.0 kW</option>
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
                      <option value="4000">£4,000</option>
                      <option value="4500">£4,500</option>
                      <option value="5000">£5,000</option>
                      <option value="5500">£5,500</option>
                      <option value="6000">£6,000</option>
                      <option value="6500">£6,500</option>
                      <option value="7000">£7,000</option>
                      <option value="7500">£7,500</option>
                      <option value="8000">£8,000</option>
                      <option value="8500">£8,500</option>
                      <option value="9000">£9,000</option>
                      <option value="9500">£9,500</option>
                      <option value="10000">£10,000</option>
                      <option value="10500">£10,500</option>
                      <option value="11000">£11,000</option>
                      <option value="11500">£11,500</option>
                      <option value="12000">£12,000</option>
                      <option value="12500">£12,500</option>
                      <option value="13000">£13,000</option>
                      <option value="13500">£13,500</option>
                      <option value="14000">£14,000</option>
                      <option value="14500">£14,500</option>
                      <option value="15000">£15,000</option>
                      <option value="15500">£15,500</option>
                      <option value="16000">£16,000</option>
                      <option value="16500">£16,500</option>
                      <option value="17000">£17,000</option>
                      <option value="17500">£17,500</option>
                      <option value="18000">£18,000</option>
                      <option value="18500">£18,500</option>
                      <option value="19000">£19,000</option>
                      <option value="19500">£19,500</option>
                      <option value="20000">£20,000</option>
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
                        key="battery-checkbox"
                        type="checkbox"
                        checked={hasBattery}
                        onChange={(e) => setHasBattery(e.target.checked)}
                        className="w-5 h-5 ext-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Battery included?</span>
                    </label>
                  </div>

                  {hasBattery && (
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Battery Details</h3>
                      
                      {/* Battery Brand */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Battery Brand
                        </label>
                        <select
                          key="battery-brand-select"
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

                      {/* Battery Quantity */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Batteries
                        </label>
                        <select
                          key="battery-quantity-select"
                          value={batteryQuantity}
                          onChange={(e) => setBatteryQuantity(parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>

                      {/* Custom Capacity for "Other" */}
                      {batteryBrand === 'Other' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Battery Capacity (kWh each)
                          </label>
                          <input
                            key="custom-capacity-input"
                            type="number"
                            step="0.1"
                            value={customCapacity}
                            onChange={(e) => setCustomCapacity(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            onKeyPress={(e) => e.stopPropagation()}
                            onKeyUp={(e) => e.stopPropagation()}
                            placeholder="e.g., 5.0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            required
                          />
                        </div>
                      )}

                      {/* Total Capacity Display */}
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
                    className="w-full bg-gradient-to-r  from-orange-500  to-orange-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    {/* Grade Display */}
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

                    {/* Analysis Breakdown */}
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

                    {/* analyse Another Quote Button */}
                    <div className="text-center">
                      <button
                        onClick={() => {
                          setResult(null);
                          setSystemSize('');
                          setTotalPrice('');
                          setHasBattery(false);
                          setBatteryBrand('');
                          setBatteryQuantity(1);
                          setCustomCapacity('');
                          setError('');
                        }}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                      >
                        analyse Another Quote
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
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Saved me £12,000! The analysis showed my quote was massively overpriced."
                </p>
                <p className="text-sm text-gray-500">- Sarah M., Manchester</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Brilliant service! Used the report to negotiate a 25% discount."
                </p>
                <p className="text-sm text-gray-500">- James T., Birmingham</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Finally, an honest assessment! No sales pressure, just facts."
                </p>
                <p className="text-sm text-gray-500">- Emma L., Leeds</p>
              </div>
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
                  <li><Link to="/analyser" className="hover:text-white transition-colors">Quote Analysis</Link></li>
                  <li><Link to="/upgrade" className="hover:text-white transition-colors">Premium Reports</Link></li>
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
                  <li>hello@solarverify.co.uk</li>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
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
                      className="mt-1 w-4 h-4 ext-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="gdpr" className="text-sm text-gray-600">
                      I agree to receive analysis results and accept the privacy policy
                    </label>
                  </div>
                  
                  {emailError && (
                    <p className="text-red-600 text-sm">{emailError}</p>
                  )}
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSendVerification}
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Verification Code
                        </label>
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          onKeyDown={(e) => {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                          }}
                          onKeyPress={(e) => {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                          }}
                          onKeyUp={(e) => {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg tracking-widest"
                          placeholder="123456"
                          maxLength="6"
                        />
                      </div>
                      
                      {verificationError && (
                        <p className="text-red-600 text-sm">{verificationError}</p>
                      )}
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={handleVerifyEmail}
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

  // analyser page (same as homepage analyser)
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
          <Route path="/analyser" element={<analyser />} />
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
    </Router>
  );
}

export default App;
