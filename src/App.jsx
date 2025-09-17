import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Users, Award, TrendingUp, CheckCircle, Star, Upload, Brain, FileText, Clock, Calculator, AlertTriangle, ArrowRight, Crown, X } from 'lucide-react';

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

// Mobile-First CSS Styles
const mobileStyles = `
  /* Mobile-First Responsive Fixes */
  * {
    box-sizing: border-box;
  }

  html, body {
    overflow-x: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  /* Ensure containers don't exceed screen width */
  .container, .max-w-6xl, .max-w-4xl {
    max-width: 100% !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  /* Mobile navigation fixes */
  @media (max-width: 768px) {
    .hidden.md\\:flex {
      display: none !important;
    }
    
    /* Make text smaller on mobile */
    .text-4xl.md\\:text-6xl, .text-4xl.md\\:text-5xl {
      font-size: 2rem !important;
    }
    
    .text-xl.md\\:text-2xl {
      font-size: 1.125rem !important;
    }
    
    .text-3xl {
      font-size: 1.5rem !important;
    }
    
    .text-2xl {
      font-size: 1.25rem !important;
    }
    
    /* Fix form width on mobile */
    .bg-gradient-to-br.from-teal-500.to-blue-600 {
      margin: 0 0.5rem;
      border-radius: 1rem;
    }
    
    /* Ensure buttons are touch-friendly */
    button {
      min-height: 44px;
      padding: 12px 16px;
    }
    
    /* Fix input fields on mobile */
    input, select {
      font-size: 16px !important; /* Prevents zoom on iOS */
      min-height: 44px;
    }
    
    /* Mobile navigation menu */
    .mobile-menu {
      display: block !important;
    }
    
    /* Hide desktop navigation on mobile */
    .desktop-nav {
      display: none !important;
    }
    
    /* Stack elements vertically on mobile */
    .flex.flex-wrap.justify-center.gap-8 {
      flex-direction: column !important;
      gap: 1rem !important;
    }
    
    /* Adjust padding for mobile */
    .py-20 {
      padding-top: 3rem !important;
      padding-bottom: 3rem !important;
    }
    
    .py-16 {
      padding-top: 2rem !important;
      padding-bottom: 2rem !important;
    }
    
    /* Grid adjustments for mobile */
    .grid.md\\:grid-cols-2, .grid.md\\:grid-cols-3 {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
  }

  /* Tablet fixes */
  @media (max-width: 1024px) {
    .max-w-6xl {
      max-width: 95% !important;
    }
  }
`;

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
                <div className="text-3xl font-bold text-teal-600">£0</div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Instant A-F grade</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Basic price analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Market comparison</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Battery analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Basic recommendations</span>
                </div>
              </div>
              
              <Link to="/analyzer" className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors mt-6 block text-center">
                Start Free Analysis
              </Link>
            </div>

            {/* Premium Analysis */}
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-xl shadow-lg p-8 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium Analysis</h3>
                <div className="text-3xl font-bold">£9.99</div>
                <p className="opacity-90">Complete professional report</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>Everything in Free, plus:</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>Detailed PDF report</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>Component quality analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>Installer reputation check</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>ROI calculations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>Negotiation strategies</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>Email support</span>
                </div>
              </div>
              
              <Link to="/upgrade" className="w-full bg-white text-teal-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors mt-6 block text-center">
                Upgrade to Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of homeowners who've saved money with our analysis
          </p>
          <Link to="/analyzer" className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200 inline-block">
            Analyze My Quote Now
          </Link>
        </div>
      </section>
    </div>
  );
}

// Contact Page Component
function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Get in touch with our solar analysis experts
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600">hello@solarverify.co.uk</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9AM - 5PM GMT</p>
                  <p className="text-gray-600">Weekend: Emergency support only</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">
                    SolarVerify Ltd<br />
                    123 Green Energy Street<br />
                    London, UK SW1A 1AA
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Premium Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-200">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Upgrade Page Component
function Upgrade() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Upgrade to Premium</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Get the complete professional analysis your solar investment deserves
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Analysis</h2>
              <div className="text-5xl font-bold text-teal-600 mb-2">£9.99</div>
              <p className="text-gray-600">One-time payment • Instant access • 30-day guarantee</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Get:</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Comprehensive PDF report (15+ pages)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Component quality analysis</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Installer reputation check</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>ROI and payback calculations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Negotiation strategies</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Market comparison data</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Email support for 30 days</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Upgrade?</h3>
                <div className="space-y-4">
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <h4 className="font-semibold text-teal-800 mb-2">Save Thousands</h4>
                    <p className="text-sm text-teal-700">Our premium analysis has helped customers save an average of £3,200 on their solar installations.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Professional Report</h4>
                    <p className="text-sm text-blue-700">Use our detailed PDF report to negotiate with installers and make informed decisions.</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Expert Support</h4>
                    <p className="text-sm text-green-700">Get direct access to our solar experts for personalized advice and guidance.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200">
                Upgrade Now - £9.99
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Secure payment • 30-day money-back guarantee • Instant access
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Main App Component
function App() {
  // State management
  const [systemSize, setSystemSize] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [hasBattery, setHasBattery] = useState(false);
  const [batteryBrand, setBatteryBrand] = useState('');
  const [batteryQuantity, setBatteryQuantity] = useState(1);
  const [customCapacity, setCustomCapacity] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [analysisCount, setAnalysisCount] = useState(0);
  const [email, setEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState(false);

  // Admin mode (for testing)
  const [isAdmin] = useState(false); // Set to true for unlimited testing

  // Calculate total battery capacity
  const getTotalBatteryCapacity = () => {
    if (!hasBattery || !batteryBrand) return 0;
    
    if (batteryBrand === 'Other') {
      return parseFloat(customCapacity) * batteryQuantity || 0;
    }
    
    const selectedBattery = batteryOptions.find(b => b.brand === batteryBrand);
    return selectedBattery ? selectedBattery.capacity * batteryQuantity : 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user needs email verification (non-admin users only)
    if (!isAdmin && analysisCount >= 1 && !email) {
      setShowEmailModal(true);
      setPendingAnalysis(true);
      return;
    }

    await performAnalysis();
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

      const response = await fetch(`${API_BASE_URL}/analyze-quote`, {
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
        setAnalysisCount(prev => prev + 1);
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
              <div className="text-2xl font-bold text-teal-600">Solar✓erify</div>
              <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">Trusted</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8 desktop-nav">
              <Link to="/" className={`${location.pathname === '/' ? 'text-teal-600' : 'text-gray-700'} hover:text-teal-600 transition-colors`}>
                Home
              </Link>
              <Link to="/about" className={`${location.pathname === '/about' ? 'text-teal-600' : 'text-gray-700'} hover:text-teal-600 transition-colors`}>
                About
              </Link>
              <Link to="/how-it-works" className={`${location.pathname === '/how-it-works' ? 'text-teal-600' : 'text-gray-700'} hover:text-teal-600 transition-colors`}>
                How It Works
              </Link>
              <Link to="/upgrade" className={`${location.pathname === '/upgrade' ? 'text-teal-600' : 'text-gray-700'} hover:text-teal-600 transition-colors`}>
                Upgrade
              </Link>
              <Link to="/contact" className={`${location.pathname === '/contact' ? 'text-teal-600' : 'text-gray-700'} hover:text-teal-600 transition-colors`}>
                Contact
              </Link>
              <Link to="/analyzer" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Quote Analyzer
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Homepage component with existing analyzer
  function Homepage() {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Your Solar Quote <span className="text-teal-200">Verified</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Don't get ripped off! Our AI-powered analyzer instantly grades your solar quote and tells 
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
                <Shield className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-gray-700">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">5,247+ Quotes Analyzed</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">£2.3M+ Savings Identified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Analyzer Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Solar Quote Analyzer</h2>
                <p className="text-lg opacity-90 mb-6">Get your instant A-F grade • Enhanced with battery analysis</p>
                
                {/* Analysis Status */}
                {!isAdmin && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <p className="text-sm">
                      {analysisCount === 0 ? "First analysis is completely free!" :
                       analysisCount === 1 ? "Next analysis requires email verification" :
                       analysisCount === 2 ? "1 more free analysis remaining" :
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
              </div>

              <div className="bg-white p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* System Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      System Size (kW) *
                    </label>
                    <input
                      key="system-size-input"
                      type="number"
                      step="0.1"
                      value={systemSize}
                      onChange={(e) => setSystemSize(e.target.value)}
                      placeholder="e.g., 4.3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Total Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Price (£) *
                    </label>
                    <input
                      key="total-price-input"
                      type="number"
                      value={totalPrice}
                      onChange={(e) => setTotalPrice(e.target.value)}
                      placeholder="e.g., 13275"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Battery Section */}
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        key="battery-checkbox"
                        type="checkbox"
                        checked={hasBattery}
                        onChange={(e) => setHasBattery(e.target.checked)}
                        className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                            placeholder="e.g., 5.0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            required
                          />
                        </div>
                      )}

                      {/* Total Capacity Display */}
                      {batteryBrand && getTotalBatteryCapacity() > 0 && (
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-teal-800">
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
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Analyzing...' : 'Get My Grade Free'}
                  </button>
                </form>

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
                        result.grade === 'F' ? 'bg-red-500' : 'bg-gray-500'
                      }`}>
                        {result.grade}
                        {result.grade === 'A' && '+'}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Solar Quote Grade</h3>
                      <p className="text-lg text-gray-600">{result.assessment}</p>
                    </div>

                    {/* Analysis Breakdown */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Analysis Breakdown</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">System Size:</span>
                          <span className="font-medium">{result.system_size} kW</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Price:</span>
                          <span className="font-medium">£{result.total_price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price per kW:</span>
                          <span className="font-medium">£{result.price_per_kw}</span>
                        </div>
                        {result.has_battery && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Battery Capacity:</span>
                            <span className="font-medium">{result.battery_capacity} kWh</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recommendations */}
                    {result.recommendations && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-blue-900 mb-3">Recommendations</h4>
                        <p className="text-blue-800">{result.recommendations}</p>
                      </div>
                    )}

                    {/* Savings Alert */}
                    {result.potential_savings && result.potential_savings > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-green-900 mb-3">💰 Potential Savings</h4>
                        <p className="text-green-800">
                          You could save up to <strong>£{result.potential_savings}</strong> by getting additional quotes!
                        </p>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="text-center">
                      <button
                        onClick={() => {
                          setResult(null);
                          setSystemSize('');
                          setTotalPrice('');
                          setHasBattery(false);
                          setBatteryBrand('');
                          setCustomCapacity('');
                        }}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
                      >
                        Analyze Another Quote
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Homeowners</h2>
              <p className="text-lg text-gray-600">See how we've helped others save money</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Saved me £12,000! The analysis showed my quote was massively overpriced."
                </p>
                <p className="text-sm text-gray-500">- Sarah M., Manchester</p>
              </div>
              
              <div className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Brilliant service! Used the report to negotiate a 25% discount."
                </p>
                <p className="text-sm text-gray-500">- James T., Birmingham</p>
              </div>
              
              <div className="text-center p-6">
                <div className="flex justify-center mb-4">
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
      </div>
    );
  }

  // Analyzer Page Component (same as homepage analyzer)
  function AnalyzerPage() {
    return <Homepage />;
  }

  return (
    <>
      {/* Inject mobile styles */}
      <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />
      
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/analyzer" element={<AnalyzerPage />} />
          </Routes>

          {/* Email Modal */}
          {showEmailModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {showVerification ? 'Verify Your Email' : 'Get 2 More Free Analyses'}
                  </h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {emailSuccess ? (
                  <div className="text-center py-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-green-900 mb-2">Email Verified!</h4>
                    <p className="text-green-700">Proceeding with your analysis...</p>
                  </div>
                ) : showVerification ? (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      We've sent a verification code to <strong>{email}</strong>. 
                      Please enter it below to continue.
                    </p>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        maxLength="6"
                      />
                    </div>

                    {verificationError && (
                      <p className="text-red-600 text-sm">{verificationError}</p>
                    )}

                    <button
                      onClick={handleVerifyEmail}
                      disabled={!verificationCode}
                      className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Verify & Continue
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Enter your email to unlock 2 more free analyses and receive our 
                      comprehensive Solar Buying Guide PDF.
                    </p>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="gdpr-consent"
                        checked={gdprConsent}
                        onChange={(e) => setGdprConsent(e.target.checked)}
                        className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 mt-0.5"
                      />
                      <label htmlFor="gdpr-consent" className="text-sm text-gray-600">
                        I agree to receive the Solar Buying Guide and occasional updates about solar analysis. 
                        You can unsubscribe at any time.
                      </label>
                    </div>

                    {emailError && (
                      <p className="text-red-600 text-sm">{emailError}</p>
                    )}

                    <button
                      onClick={handleSendVerification}
                      disabled={!email || !gdprConsent}
                      className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send Verification Code
                    </button>

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <h4 className="font-semibold text-teal-800 mb-2">What you'll get:</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• 2 additional free quote analyses</li>
                        <li>• Comprehensive Solar Buying Guide PDF</li>
                        <li>• Tips to avoid overpriced installations</li>
                        <li>• No spam, unsubscribe anytime</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="text-2xl font-bold text-teal-400 mb-4">Solar✓erify</div>
                  <p className="text-gray-400 text-sm">
                    Protecting UK homeowners from overpriced solar installations with 
                    AI-powered analysis.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Services</h3>
                  <div className="space-y-2 text-sm">
                    <Link to="/analyzer" className="block text-gray-400 hover:text-white transition-colors">
                      Quote Analysis
                    </Link>
                    <Link to="/upgrade" className="block text-gray-400 hover:text-white transition-colors">
                      Premium Reports
                    </Link>
                    <Link to="/how-it-works" className="block text-gray-400 hover:text-white transition-colors">
                      How It Works
                    </Link>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company</h3>
                  <div className="space-y-2 text-sm">
                    <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                      About Us
                    </Link>
                    <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                      Contact
                    </Link>
                    <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                    <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>hello@solarverify.co.uk</p>
                    <p>Response within 24 hours</p>
                    <p>Mon-Fri: 9AM-5PM GMT</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                © 2024 SolarVerify Ltd. Company Registration: 12345678. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </>
  );
}

export default App;
