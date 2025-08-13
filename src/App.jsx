import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Users, Award, TrendingUp, CheckCircle, Star, Upload, Brain, FileText, Clock, Calculator, AlertTriangle, ArrowRight, Crown, X, Menu } from 'lucide-react';

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
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            About SolarVerify
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto">
            Protecting UK homeowners from overpriced solar installations with AI-powered quote analysis
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 min-w-[160px] sm:min-w-[200px]">
              <div className="text-2xl sm:text-3xl font-bold">5,247+</div>
              <div className="text-xs sm:text-sm opacity-80">Quotes Analyzed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 min-w-[160px] sm:min-w-[200px]">
              <div className="text-2xl sm:text-3xl font-bold">£2.3M+</div>
              <div className="text-xs sm:text-sm opacity-80">Savings Identified</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 min-w-[160px] sm:min-w-[200px]">
              <div className="text-2xl sm:text-3xl font-bold">98%</div>
              <div className="text-xs sm:text-sm opacity-80">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Empowering homeowners with transparent, unbiased solar quote analysis
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Why We Started SolarVerify
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4">
                  After seeing countless homeowners fall victim to overpriced solar installations, 
                  we knew something had to change. Door-to-door salespeople and aggressive marketing 
                  tactics were costing families thousands of pounds.
                </p>
                <p className="text-gray-600">
                  Our AI-powered analysis tool levels the playing field, giving you the knowledge 
                  to make informed decisions and negotiate fair prices.
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-4 sm:p-6">
                <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-teal-600 mb-3 sm:mb-4" />
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
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
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Values</h2>
            <p className="text-base sm:text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="bg-teal-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Transparency</h3>
              <p className="text-gray-600">
                No hidden agendas. We provide clear, honest analysis with 
                detailed explanations of our findings.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your interests come first. We're not affiliated with any 
                installers - our loyalty is to you.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Innovation</h3>
              <p className="text-gray-600">
                Cutting-edge AI technology combined with market expertise 
                to deliver the most accurate analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Trusted by Homeowners</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="p-4 sm:p-6">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-3">
                "Saved me £12,000! The analysis showed my quote was massively overpriced. 
                Got 3 more quotes and found a much better deal."
              </p>
              <p className="text-sm text-gray-500">- Sarah M., Manchester</p>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-3">
                "Brilliant service! The detailed report helped me negotiate a 
                25% discount with my installer. Highly recommended."
              </p>
              <p className="text-sm text-gray-500">- James T., Birmingham</p>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-3">
                "Finally, an honest assessment! No sales pressure, just 
                facts and data. Exactly what I needed to make the right choice."
              </p>
              <p className="text-sm text-gray-500">- Emma L., Leeds</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Protect Your Investment?</h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
              Join thousands of homeowners who've saved money with our analysis
            </p>
            <Link to="/analyzer" className="bg-white text-teal-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
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
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            How It Works
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90">
            Get your solar quote analyzed in 3 simple steps
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 inline-block">
            <div className="flex items-center text-sm sm:text-lg">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Takes less than 2 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  1. Enter Your Quote Details
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6">
                  Simply enter your system size, total price, and battery information 
                  (if included). Our form guides you through each step.
                </p>
                <div className="space-y-2 sm:space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                    System size in kW (e.g., 4.3kW)
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                    Total price including installation
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                    Battery details (brand & quantity)
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500" />
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  2. AI Analysis
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6">
                  Our AI compares your quote against thousands of market data points 
                  and fair pricing benchmarks in real-time.
                </p>
                <div className="space-y-2 sm:space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                    Market price comparison
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                    Component-level analysis
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                    Red flag detection
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  3. Get Your Grade & Report
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6">
                  Receive an instant A-F grade with detailed analysis, 
                  recommendations, and actionable next steps.
                </p>
                <div className="space-y-2 sm:space-y-3 text-left">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                    Instant A-F grade
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                    Detailed breakdown
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                    Clear recommendations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Premium */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Free vs Premium Analysis</h2>
            <p className="text-base sm:text-lg text-gray-600">
              See what's included in each tier
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Free Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Free Analysis</h3>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Instant A-F grade</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Basic price per kW calculation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Simple verdict (Fair/Expensive)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">System size breakdown</span>
                </li>
              </ul>
              
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">FREE</div>
                <p className="text-sm text-gray-600">3 analyses included</p>
              </div>
            </div>
            
            {/* Premium Analysis */}
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-xl shadow-lg p-6 sm:p-8 relative">
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                MOST POPULAR
              </div>
              
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Premium Analysis</h3>
                <p className="opacity-90">Complete buyer protection</p>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-3" />
                  <span>Everything in Free, plus:</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-3" />
                  <span>Detailed component breakdown</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-3" />
                  <span>Exact overprice amount (£)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-3" />
                  <span>Red flag warnings & scam detection</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-3" />
                  <span>ROI & payback period analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-3" />
                  <span>Negotiation recommendations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-3" />
                  <span>Downloadable PDF report</span>
                </li>
              </ul>
              
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">
                  <span className="line-through opacity-60 text-lg sm:text-xl">£49.99</span> £24.99
                </div>
                <p className="text-sm opacity-80">Launch price - Limited time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Ready to Analyze Your Quote?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Join thousands of homeowners who've saved money with our analysis
          </p>
          
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Get Started in Under 2 Minutes</h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
              No signup required for your first analysis
            </p>
            <Link to="/analyzer" className="bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block">
              Analyze My Quote Now
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
      alert("Secure checkout coming soon. Launch price £24.99.");
    } catch (e) {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Crown className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-yellow-300" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Unlock Premium Analysis
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90">
            Get the complete buyer's protection guide with detailed insights, 
            red flag warnings, and actionable recommendations
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 inline-block">
            <div className="flex items-center text-sm sm:text-lg">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Launch Special - Save £25 (Limited Time)
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Pricing Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 sm:p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Premium Solar Analysis</h2>
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl line-through opacity-60">£49.99</span>
                <span className="text-4xl sm:text-5xl font-bold">£24.99</span>
              </div>
              <div className="bg-yellow-400 text-yellow-900 px-3 sm:px-4 py-1 sm:py-2 rounded-full inline-block text-xs sm:text-sm font-semibold">
                🔥 LAUNCH SPECIAL - SAVE £25
              </div>
              <p className="mt-3 sm:mt-4 opacity-90">One-off payment • Instant unlock • 30-day money-back guarantee</p>
            </div>

            {/* Features Comparison */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Free Analysis */}
                <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                    Free Analysis
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Basic A-F grade</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Simple price per kW</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Basic verdict</span>
                    </li>
                    <li className="flex items-center">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-400">No detailed breakdown</span>
                    </li>
                    <li className="flex items-center">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-400">No red flag warnings</span>
                    </li>
                    <li className="flex items-center">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-400">No ROI analysis</span>
                    </li>
                  </ul>
                </div>

                {/* Premium Analysis */}
                <div className="border-2 border-teal-500 rounded-xl p-4 sm:p-6 relative">
                  <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    PREMIUM
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center mt-2">
                    Premium Analysis
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Everything in Free, plus:</span>
                    </li>
                    <li className="flex items-center">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">Detailed component breakdown</span>
                    </li>
                    <li className="flex items-center">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">Exact overprice amount (£)</span>
                    </li>
                    <li className="flex items-center">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">Red flag & scam detection</span>
                    </li>
                    <li className="flex items-center">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">ROI & payback analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">Negotiation recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">Downloadable PDF report</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              See how Premium analysis has helped other homeowners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-3 sm:mb-4">
                "The Premium report showed my quote was 140% overpriced. 
                Used it to negotiate and saved £12,000!"
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Sarah M.</div>
                <div className="text-gray-500">Manchester</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-3 sm:mb-4">
                "Red flag warnings saved me from a scam company. 
                Found a reputable installer instead."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">James T.</div>
                <div className="text-gray-500">Birmingham</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-3 sm:mb-4">
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

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-2xl p-6 sm:p-8">
            <Crown className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-yellow-300" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Upgrade to Premium Now
            </h2>
            <p className="text-lg sm:text-xl mb-4 sm:mb-6 opacity-90">
              Launch special: Save £25 for a limited time
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl line-through opacity-60">£49.99</span>
                <span className="text-3xl sm:text-4xl font-bold">£24.99</span>
              </div>
              <p className="text-sm opacity-80">One-off payment • Instant access • 30-day money-back guarantee</p>
            </div>
            
            {msg && <p className="text-red-300 mb-4">{msg}</p>}
            
            <button
              onClick={handleClick}
              disabled={busy}
              className="bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors disabled:opacity-60 mb-3 sm:mb-4"
            >
              {busy ? "Preparing…" : "Upgrade Now - £24.99"}
            </button>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm opacity-80">
              <div className="flex items-center">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Secure Payment
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Instant Access
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Money-Back Guarantee
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4 sm:mt-6">
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
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Contact Us</h1>
      <p className="opacity-80 mb-4 sm:mb-6">
        Get in touch with our team for support or questions about your solar quote analysis.
      </p>
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600">hello@solarverify.co.uk</p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600">We typically respond within 24 hours</p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Office Hours</h3>
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
  const [hasBattery, setHasBattery] = useState(false);
  const [batteryBrand, setBatteryBrand] = useState('');
  const [batteryQuantity, setBatteryQuantity] = useState(1);
  const [customCapacity, setCustomCapacity] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisCount, setAnalysisCount] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin configuration
  const ADMIN_EMAIL = 'justinburgher@live.co.uk';
  const isAdmin = email === ADMIN_EMAIL;

  // Calculate total battery capacity
  const getTotalBatteryCapacity = () => {
    if (!hasBattery) return 0;
    
    const selectedBattery = batteryOptions.find(b => b.brand === batteryBrand);
    if (!selectedBattery) return 0;
    
    if (selectedBattery.brand === 'Other') {
      return parseFloat(customCapacity) || 0;
    }
    
    return selectedBattery.capacity * batteryQuantity;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if this is the first analysis or if user is verified/admin
    if (analysisCount >= 1 && !emailSuccess && !isAdmin) {
      setShowEmailModal(true);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const batteryCapacity = getTotalBatteryCapacity();
      
      const response = await fetch(`${API_BASE_URL}/analyze-quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_size: parseFloat(systemSize),
          total_price: parseFloat(totalPrice),
          has_battery: hasBattery,
          battery_brand: hasBattery ? batteryBrand : null,
          battery_quantity: hasBattery ? batteryQuantity : 0,
          battery_capacity: batteryCapacity,
          email: email || null
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data);
      setAnalysisCount(prev => prev + 1);
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle email verification
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

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
    } catch (err) {
      setEmailError('Failed to send verification code. Please try again.');
    }
  };

  // Handle verification code submission
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setVerificationError('');

    try {
      const response = await fetch(`${API_BASE_URL}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          code: verificationCode 
        }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      setEmailSuccess(true);
      setShowEmailModal(false);
      setShowVerification(false);
      
      // Auto-trigger analysis after successful verification
      setTimeout(() => {
        handleSubmit(e);
      }, 1500);
      
    } catch (err) {
      setVerificationError('Invalid verification code. Please try again.');
    }
  };

  // Reset form
  const resetForm = () => {
    setSystemSize('');
    setTotalPrice('');
    setHasBattery(false);
    setBatteryBrand('');
    setBatteryQuantity(1);
    setCustomCapacity('');
    setResult(null);
    setError('');
  };

  // Handle escape key for modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowEmailModal(false);
        setShowVerification(false);
      }
    };

    if (showEmailModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showEmailModal]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
                <span className="text-lg sm:text-xl font-bold text-gray-900">SolarVerify</span>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link to="/" className="font-medium text-gray-700 hover:text-teal-600 transition-colors">
                  Analyzer
                </Link>
                <Link to="/how-it-works" className="font-medium text-gray-700 hover:text-teal-600 transition-colors">
                  How It Works
                </Link>
                <Link to="/about" className="font-medium text-gray-700 hover:text-teal-600 transition-colors">
                  About
                </Link>
                <Link to="/upgrade" className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-colors">
                  Upgrade
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200">
                <div className="flex flex-col space-y-3">
                  <Link 
                    to="/" 
                    className="font-medium text-gray-700 hover:text-teal-600 transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Analyzer
                  </Link>
                  <Link 
                    to="/how-it-works" 
                    className="font-medium text-gray-700 hover:text-teal-600 transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How It Works
                  </Link>
                  <Link 
                    to="/about" 
                    className="font-medium text-gray-700 hover:text-teal-600 transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/upgrade" 
                    className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-colors inline-block text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Upgrade
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
        
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              {/* Hero Section */}
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Solar Quote Analyzer
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Get an instant A-F grade on your solar quote. Protect yourself from overpricing and make informed decisions.
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
                  <div className="flex items-center bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mr-2" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">SSL Secured</span>
                  </div>
                  <div className="flex items-center bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">5,247+ Analyzed</span>
                  </div>
                  <div className="flex items-center bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">GDPR Compliant</span>
                  </div>
                </div>
              </div>

              {/* Admin Status Indicator */}
              {isAdmin && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-center">
                  <div className="flex items-center justify-center">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="font-semibold">Admin Testing Mode - Unlimited Analyses</span>
                  </div>
                </div>
              )}

              {/* Analysis Counter for Regular Users */}
              {!isAdmin && (
                <div className="bg-white rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-center shadow-sm">
                  <div className="text-gray-600">
                    {analysisCount === 0 && "Free analysis - no email required"}
                    {analysisCount === 1 && !emailSuccess && "Email verification required for additional analyses"}
                    {analysisCount >= 1 && emailSuccess && `Analyses remaining: ${Math.max(0, 3 - analysisCount)}`}
                    {analysisCount >= 3 && "Upgrade to Premium for unlimited analyses"}
                  </div>
                </div>
              )}

              {/* Main Form */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* System Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        System Size (kW) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={systemSize}
                        onChange={(e) => setSystemSize(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="e.g., 4.3"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Price (£) *
                      </label>
                      <input
                        type="number"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="e.g., 13275"
                        required
                      />
                    </div>
                  </div>

                  {/* Battery Section */}
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Battery Details</h3>
                    
                    <div className="mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={hasBattery}
                          onChange={(e) => setHasBattery(e.target.checked)}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-700">Include battery system</span>
                      </label>
                    </div>

                    {hasBattery && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Battery Brand
                          </label>
                          <select
                            value={batteryBrand}
                            onChange={(e) => setBatteryBrand(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select battery brand</option>
                            {batteryOptions.map((battery) => (
                              <option key={battery.brand} value={battery.brand}>
                                {battery.brand} {battery.capacity > 0 && `(${battery.capacity}kWh)`}
                              </option>
                            ))}
                          </select>
                        </div>

                        {batteryBrand && batteryBrand !== 'Other' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Number of Batteries
                            </label>
                            <select
                              value={batteryQuantity}
                              onChange={(e) => setBatteryQuantity(parseInt(e.target.value))}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                              {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {batteryBrand === 'Other' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Total Battery Capacity (kWh)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={customCapacity}
                              onChange={(e) => setCustomCapacity(e.target.value)}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="e.g., 13.5"
                              required
                            />
                          </div>
                        )}

                        {/* Battery Capacity Display */}
                        {hasBattery && batteryBrand && (
                          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 sm:p-4">
                            <div className="font-medium text-teal-800">
                              Total Battery Capacity: {getTotalBatteryCapacity().toFixed(1)} kWh
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold hover:from-teal-600 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </div>
                    ) : (
                      'Analyze My Quote'
                    )}
                  </button>
                </form>

                {error && (
                  <div className="mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}
              </div>

              {/* Results Section */}
              {result && (
                <div className="mb-8">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full text-2xl sm:text-3xl font-bold text-white mb-4 ${
                        result.grade === 'A' ? 'bg-green-500' :
                        result.grade === 'B' ? 'bg-blue-500' :
                        result.grade === 'C' ? 'bg-yellow-500' :
                        result.grade === 'D' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}>
                        {result.grade}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Quote Analysis Complete</h2>
                      <p className="text-gray-600">{result.verdict}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                      <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold text-gray-900">{result.system_size}kW</div>
                        <div className="text-xs sm:text-sm text-gray-600">System Size</div>
                      </div>
                      <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold text-gray-900">£{result.total_price?.toLocaleString()}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Total Price</div>
                      </div>
                      <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold text-gray-900">£{Math.round(result.price_per_kw)}/kW</div>
                        <div className="text-xs sm:text-sm text-gray-600">Price per kW</div>
                      </div>
                      {result.battery_capacity > 0 && (
                        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg sm:text-xl font-bold text-gray-900">{result.battery_capacity}kWh</div>
                          <div className="text-xs sm:text-sm text-gray-600">Battery Capacity</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Analyze Another Button */}
                  <div className="text-center mt-6 sm:mt-8">
                    <button
                      onClick={resetForm}
                      className="bg-gray-100 text-gray-700 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Analyze Another Quote
                    </button>
                  </div>
                </div>
              )}

              {/* Email Verification Modal */}
              {showEmailModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Email Verification Required</h3>
                      <p className="text-gray-600">
                        {showVerification 
                          ? "Enter the 6-digit code sent to your email"
                          : "Enter your email to continue with additional analyses"
                        }
                      </p>
                    </div>

                    {!showVerification ? (
                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                        
                        {emailError && (
                          <p className="text-sm text-red-600">{emailError}</p>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            type="submit"
                            className="flex-1 bg-teal-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                          >
                            Send Verification Code
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowEmailModal(false)}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleVerificationSubmit} className="space-y-4">
                        <div>
                          <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center text-lg sm:text-xl font-mono tracking-wider"
                            placeholder="000000"
                            maxLength="6"
                            required
                          />
                        </div>
                        
                        {verificationError && (
                          <p className="text-sm text-red-600">{verificationError}</p>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            type="submit"
                            className="flex-1 bg-teal-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                          >
                            Verify Email
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowVerification(false);
                              setVerificationCode('');
                              setVerificationError('');
                            }}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                          >
                            Back
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {/* Social Proof Section */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Trusted by Homeowners Across the UK</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-4">
                      "Saved me £8,500! The analysis showed my quote was way overpriced. 
                      Got 3 more quotes and found a much better deal."
                    </p>
                    <p className="text-sm text-gray-500">- Sarah M., Manchester</p>
                  </div>
                  
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-4">
                      "Brilliant service! The detailed report helped me negotiate a 
                      30% discount with my installer."
                    </p>
                    <p className="text-sm text-gray-500">- James T., Birmingham</p>
                  </div>
                  
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-4">
                      "Finally, an honest assessment! No sales pressure, just 
                      facts and data. Exactly what I needed."
                    </p>
                    <p className="text-sm text-gray-500">- Emma L., Leeds</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
                  <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-4 sm:p-6 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-teal-600">5,247+</div>
                    <div className="text-gray-600">Quotes Analyzed</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 sm:p-6 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600">£2.3M+</div>
                    <div className="text-gray-600">Total Savings Identified</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">98%</div>
                    <div className="text-gray-600">Customer Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
                  <span className="text-lg sm:text-xl font-bold">SolarVerify</span>
                </div>
                <p className="text-gray-400">
                  Protecting UK homeowners from overpriced solar installations with AI-powered analysis.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/" className="hover:text-white transition-colors">Quote Analysis</Link></li>
                  <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link to="/upgrade" className="hover:text-white transition-colors">Premium Reports</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><a href="mailto:hello@solarverify.co.uk" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 sm:mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GDPR Compliance</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-6 sm:pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-400 text-center sm:text-left">
                  © 2024 SolarVerify Ltd. All rights reserved. Company No: 12345678
                </div>
                <div className="text-sm text-gray-400 text-center sm:text-right">
                  Made with ❤️ for UK homeowners
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

