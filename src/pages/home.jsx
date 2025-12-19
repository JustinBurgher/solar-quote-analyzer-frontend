
function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 mobile-py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 mobile-text-4xl">
            Stop Solar Rip-Offs Before You Sign
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Get instant professional analysis of your solar quotes. Spot overpriced systems, low-quality components, and misleading claims before you sign.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#analyzer" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium transition-colors">
              Analyze My Quote Free
            </a>
            <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-md text-lg font-medium transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Quote Analyzer Section */}
      <section id="analyzer" className="py-16 mobile-py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solar Quote Analyzer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter your quote details below for instant professional analysis. Takes less than 30 seconds.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form id="quote-form" className="space-y-6">
              {/* System Size */}
              <div>
                <label htmlFor="system-size" className="block text-sm font-medium text-gray-700 mb-2">
                  System Size (kW) *
                </label>
                <input
                  type="number"
                  id="system-size"
                  name="system-size"
                  step="0.1"
                  min="1"
                  max="50"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg"
                  placeholder="e.g., 8.2"
                />
                <p className="text-sm text-gray-500 mt-1">The total kW capacity of your solar panel system</p>
              </div>

              {/* Battery Size */}
              <div>
                <label htmlFor="battery-size" className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Size (kWh)
                </label>
                <input
                  type="number"
                  id="battery-size"
                  name="battery-size"
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg"
                  placeholder="e.g., 20.7 (or leave blank if no battery)"
                />
                <p className="text-sm text-gray-500 mt-1">Leave blank if your quote doesn't include a battery</p>
              </div>

              {/* Quote Price */}
              <div>
                <label htmlFor="quote-price" className="block text-sm font-medium text-gray-700 mb-2">
                  Total Quote Price (£) *
                </label>
                <input
                  type="number"
                  id="quote-price"
                  name="quote-price"
                  min="1000"
                  max="100000"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg"
                  placeholder="e.g., 11250"
                />
                <p className="text-sm text-gray-500 mt-1">The total price including installation and VAT</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-4 px-6 rounded-md text-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
                Check My Quote
              </button>
            </form>

            {/* Results will be displayed here */}
            <div id="results" className="mt-8 hidden">
              {/* Results content will be populated by JavaScript */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Solar✓erify?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Independent analysis you can trust, with no hidden agendas or installer partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Analysis</h3>
              <p className="text-gray-600">Get professional-grade analysis in seconds, not days. No waiting for callbacks or appointments.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Independent & Unbiased</h3>
              <p className="text-gray-600">We don't sell solar or take commissions. Our only goal is helping you make the right decision.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real UK Data</h3>
              <p className="text-gray-600">Analysis based on thousands of real UK installations and current market pricing data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and accurate analysis in 4 easy steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Details</h3>
              <p className="text-gray-600">System size, battery, and price</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Analysis</h3>
              <p className="text-gray-600">Compare against market data</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Your Grade</h3>
              <p className="text-gray-600">Clear A-F rating with explanation</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Make Decision</h3>
              <p className="text-gray-600">Negotiate or find better options</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="/how-it-works" className="text-teal-600 hover:text-teal-700 font-medium">
              Learn more about our process →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about your solar quote? Need help understanding your analysis? We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-teal-600 mr-3">📧</span>
                  <span className="text-gray-600">support@solarverify.co.uk</span>
                </div>
                <div className="flex items-center">
                  <span className="text-teal-600 mr-3">⏰</span>
                  <span className="text-gray-600">Response within 24 hours</span>
                </div>
                <div className="flex items-center">
                  <span className="text-teal-600 mr-3">🇬🇧</span>
                  <span className="text-gray-600">UK-based support team</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Is the analysis really free?</h4>
                  <p className="text-gray-600 text-sm">Yes, basic analysis is completely free with no hidden costs.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">How accurate is your analysis?</h4>
                  <p className="text-gray-600 text-sm">95%+ accuracy based on real UK market data and thousands of installations.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Do you work with installers?</h4>
                  <p className="text-gray-600 text-sm">No, we're completely independent with no installer partnerships.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
