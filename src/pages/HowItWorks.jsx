import React from 'react';
import { Link } from 'react-router-dom';

function HowItWorks() {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How <span className="text-primary-orange">SolarVerify</span> Works
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Simple, fast, and accurate solar quote analysis in just a few clicks. No technical knowledge required.
          </p>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">Our 4-Step Process</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Enter Quote Details</h3>
                  <p className="text-gray-400 mb-4">
                    Simply enter your system size, battery capacity, and total quote price. Takes less than 30 seconds.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">System size (kW)</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Battery capacity (kWh)</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Total quote price (£)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Instant Analysis</h3>
                  <p className="text-gray-400 mb-4">
                    Our algorithm compares your quote against thousands of real UK installations and current market data.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Real-time market comparison</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Component quality assessment</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Price per kW calculation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Get Your Grade</h3>
                  <p className="text-gray-400 mb-4">
                    Receive a clear A-F grade with detailed explanation of your quote's value and any red flags.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Clear A-F grading</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Detailed explanation</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Red flag warnings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">Make Informed Decisions</h3>
                  <p className="text-gray-400 mb-4">
                    Use our analysis to negotiate better prices, avoid poor installers, or find better alternatives.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Negotiation strategies</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Alternative recommendations</span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">Confidence in your decision</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">What We Analyze</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pricing Analysis */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-orange/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Pricing Analysis</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Compare your quote against current UK market rates and identify overpriced systems.
              </p>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li className="flex items-center"><span className="text-primary-orange mr-2">•</span> Price per kW comparison</li>
                <li className="flex items-center"><span className="text-primary-orange mr-2">•</span> Regional market variations</li>
                <li className="flex items-center"><span className="text-primary-orange mr-2">•</span> Hidden cost detection</li>
              </ul>
            </div>

            {/* Component Quality */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-orange/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Component Quality</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Assess the quality and reliability of proposed solar panels, inverters, and batteries.
              </p>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li className="flex items-center"><span className="text-primary-orange mr-2">•</span> Panel efficiency ratings</li>
                <li className="flex items-center"><span className="text-primary-orange mr-2">•</span> Inverter reliability scores</li>
                <li className="flex items-center"><span className="text-primary-orange mr-2">•</span> Warranty comparison</li>
              </ul>
            </div>

            {/* Installer Credentials */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-orange/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Installer Credentials</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Verify installer qualifications, certifications, and track record.
              </p>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li className="flex items-center"><span className="text-primary-orange mr-2">•</span> MCS certification status</li>
                <li className="flex items-center"><span className="text-primary-orange mr-2">•</span> Customer review analysis</li>
                <li className="flex items-center"><span className="text-primary-orange mr-2">•</span> Complaint history check</li>
              </ul>
            </div>

            {/* Red Flag Detection */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-xl">🚨</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Red Flag Detection</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Identify common scam tactics and problematic contract terms.
              </p>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li className="flex items-center"><span className="text-red-500 mr-2">•</span> High-pressure sales tactics</li>
                <li className="flex items-center"><span className="text-red-500 mr-2">•</span> Unrealistic savings claims</li>
                <li className="flex items-center"><span className="text-red-500 mr-2">•</span> Poor contract terms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Grading System */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">Our Grading System</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Every quote receives a clear A-F grade based on value, quality, and risk factors.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Grade A */}
            <div className="bg-green-900/30 border border-green-500/30 p-4 md:p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">A</div>
              <h3 className="text-sm md:text-base font-semibold text-white mb-1">Excellent</h3>
              <p className="text-xs text-gray-400 hidden md:block">Outstanding value, quality components</p>
            </div>

            {/* Grade B */}
            <div className="bg-blue-900/30 border border-blue-500/30 p-4 md:p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">B</div>
              <h3 className="text-sm md:text-base font-semibold text-white mb-1">Good</h3>
              <p className="text-xs text-gray-400 hidden md:block">Good value with minor improvements</p>
            </div>

            {/* Grade C */}
            <div className="bg-yellow-900/30 border border-yellow-500/30 p-4 md:p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">C</div>
              <h3 className="text-sm md:text-base font-semibold text-white mb-1">Average</h3>
              <p className="text-xs text-gray-400 hidden md:block">Market rate, standard components</p>
            </div>

            {/* Grade D */}
            <div className="bg-orange-900/30 border border-orange-500/30 p-4 md:p-6 rounded-xl text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">D</div>
              <h3 className="text-sm md:text-base font-semibold text-white mb-1">Poor</h3>
              <p className="text-xs text-gray-400 hidden md:block">Overpriced or quality concerns</p>
            </div>

            {/* Grade F */}
            <div className="bg-red-900/30 border border-red-500/30 p-4 md:p-6 rounded-xl text-center col-span-2 md:col-span-1">
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">F</div>
              <h3 className="text-sm md:text-base font-semibold text-white mb-1">Avoid</h3>
              <p className="text-xs text-gray-400 hidden md:block">Significant red flags detected</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">How accurate is your analysis?</h3>
              <p className="text-gray-400">
                Our analysis is based on real UK market data from thousands of installations. We update our database regularly and achieve 95%+ accuracy in identifying overpriced systems.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Do you work with any solar installers?</h3>
              <p className="text-gray-400">
                No, we're completely independent. We don't receive commissions, referral fees, or any payments from installers. This ensures our analysis is unbiased.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Can you analyze quotes from any installer?</h3>
              <p className="text-gray-400">
                Yes, our analysis works for quotes from any UK solar installer. We have data on thousands of installers regardless of company size or location.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">How do you protect my data?</h3>
              <p className="text-gray-400">
                We take data protection seriously. Your quote details are encrypted, never shared with third parties, and used only for analysis purposes. We're fully GDPR compliant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-orange/20 to-orange-600/10 rounded-2xl p-8 md:p-12 border border-primary-orange/30 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Analyze Your Quote?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Get professional analysis in minutes and make your solar decision with confidence.
            </p>
            <Link 
              to="/old-home" 
              className="inline-block px-8 py-4 bg-primary-orange hover:bg-orange-600 text-gray-900 font-semibold rounded-lg shadow-lg shadow-primary-orange/30 transition duration-300"
            >
              Start Free Analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="py-8"></div>
    </div>
  );
}

export default HowItWorks;
