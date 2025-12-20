function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How Solar✓erify Works
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Simple, fast, and accurate solar quote analysis in just a few clicks.
          </p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Fast, Accurate</h2>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Get professional-grade analysis of your solar quotes in minutes, not days. No technical knowledge required.
          </p>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our 4-Step Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Enter Quote Details</h3>
              <p className="text-gray-700 text-center mb-4">
                Simply enter your system size, battery capacity, and total quote price. Takes less than 30 seconds.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• System size (kW)</li>
                <li>• Battery capacity (kWh)</li>
                <li>• Total quote price (£)</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Instant Analysis</h3>
              <p className="text-gray-700 text-center mb-4">
                Our algorithm compares your quote against thousands of real UK installations and current market data.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time market comparison</li>
                <li>• Component quality assessment</li>
                <li>• Price per kW calculation</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Get Your Grade</h3>
              <p className="text-gray-700 text-center mb-4">
                Receive a clear A-F grade with detailed explanation of your quote's value and any red flags.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Clear A-F grading</li>
                <li>• Detailed explanation</li>
                <li>• Red flag warnings</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-teal-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Make Informed Decisions</h3>
              <p className="text-gray-700 text-center mb-4">
                Use our analysis to negotiate better prices, avoid poor installers, or find better alternatives.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Negotiation strategies</li>
                <li>• Alternative recommendations</li>
                <li>• Confidence in your decision</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Analyze</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Pricing Analysis */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">💰</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Pricing Analysis</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Compare your quote against current UK market rates and identify overpriced systems.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Price per kW comparison</li>
                <li>• Regional market variations</li>
                <li>• System size optimization</li>
                <li>• Value for money assessment</li>
                <li>• Hidden cost detection</li>
              </ul>
            </div>

            {/* Component Quality */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">⚡</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Component Quality</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Assess the quality and reliability of proposed solar panels, inverters, and batteries.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Panel efficiency ratings</li>
                <li>• Inverter reliability scores</li>
                <li>• Battery technology assessment</li>
                <li>• Warranty comparison</li>
                <li>• Long-term performance data</li>
              </ul>
            </div>

            {/* Installer Credentials */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">🏆</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Installer Credentials</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Verify installer qualifications, certifications, and track record.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• MCS certification status</li>
                <li>• Insurance verification</li>
                <li>• Customer review analysis</li>
                <li>• Installation experience</li>
                <li>• Complaint history check</li>
              </ul>
            </div>

            {/* Red Flag Detection */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">🚨</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Red Flag Detection</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Identify common scam tactics and problematic contract terms.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• High-pressure sales tactics</li>
                <li>• Unrealistic savings claims</li>
                <li>• Poor contract terms</li>
                <li>• Overpriced financing</li>
                <li>• Questionable guarantees</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Grading System */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Grading System</h2>
          <div className="grid md:grid-cols-5 gap-4">
            
            {/* Grade A */}
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">A</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellent</h3>
              <p className="text-sm text-gray-700">Outstanding value, quality components, reputable installer</p>
            </div>

            {/* Grade B */}
            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">B</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Good</h3>
              <p className="text-sm text-gray-700">Good value with minor areas for improvement</p>
            </div>

            {/* Grade C */}
            <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">C</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Average</h3>
              <p className="text-sm text-gray-700">Market rate pricing with standard components</p>
            </div>

            {/* Grade D */}
            <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">D</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Poor</h3>
              <p className="text-sm text-gray-700">Overpriced or quality concerns identified</p>
            </div>

            {/* Grade F */}
            <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">F</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Avoid</h3>
              <p className="text-sm text-gray-700">Significant red flags or extremely poor value</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How accurate is your analysis?</h3>
              <p className="text-gray-700">
                Our analysis is based on real UK market data from thousands of installations. We update our database regularly and achieve 95%+ accuracy in identifying overpriced systems and quality issues.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Do you work with any solar installers?</h3>
              <p className="text-gray-700">
                No, we're completely independent. We don't receive commissions, referral fees, or any payments from installers. This ensures our analysis is unbiased and focused solely on your best interests.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What if I disagree with my grade?</h3>
              <p className="text-gray-700">
                Our analysis is based on objective market data, but we understand every situation is unique. Contact us with your specific concerns and we'll review your quote in more detail.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How do you protect my data?</h3>
              <p className="text-gray-700">
                We take data protection seriously. Your quote details are encrypted, never shared with third parties, and used only for analysis purposes. We're fully GDPR compliant.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can you analyze quotes from any installer?</h3>
              <p className="text-gray-700">
                Yes, our analysis works for quotes from any UK solar installer. We have data on thousands of installers and can assess quotes regardless of company size or location.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What happens after I get my analysis?</h3>
              <p className="text-gray-700">
                You'll receive actionable recommendations based on your grade. This might include negotiation strategies, alternative installer suggestions, or advice on improving your quote terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Analyze Your Quote?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Get professional analysis in minutes and make your solar decision with confidence.
          </p>
          <a href="/old-home" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium transition-colors">
            Start Free Analysis →
          </a>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;

