import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-primary-orange">SolarVerify</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The UK's independent solar quote verification tool. We don't sell solar — we just help you avoid getting ripped off.
          </p>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Why SolarVerify Exists</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Solar quotes in the UK are confusing. Prices for identical systems can vary by <span className="text-primary-orange font-semibold">£5,000 to £10,000</span> between installers. Technical jargon makes it hard to compare. And salespeople have every incentive to upsell you.
              </p>
              <p>
                We built SolarVerify because homeowners deserve a simple way to check if their quote is fair — without the pressure, without the jargon, and without hidden agendas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">What Makes Us Different</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* 100% Independent */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">100% Independent</h3>
              <p className="text-gray-400">
                We're not owned by, affiliated with, or funded by any solar installer or manufacturer. Our only interest is helping you.
              </p>
            </div>

            {/* Zero Commission */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Zero Commission</h3>
              <p className="text-gray-400">
                We don't receive referral fees or kickbacks from installers. Our recommendations are based purely on data, not who pays us.
              </p>
            </div>

            {/* Built for Homeowners */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Built for Homeowners</h3>
              <p className="text-gray-400">
                We translate technical jargon into plain English. You'll understand exactly what you're buying and whether it's a fair deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Brief */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 md:p-12 border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">How It Works</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center text-gray-900 font-bold">1</span>
                <p><strong className="text-white">Enter your quote details</strong> — system size, price, and battery info (if included)</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center text-gray-900 font-bold">2</span>
                <p><strong className="text-white">Get an instant grade</strong> — we compare your quote against UK market data</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center text-gray-900 font-bold">3</span>
                <p><strong className="text-white">Make an informed decision</strong> — know if you're getting a fair deal before you sign</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Our Commitment</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            We believe every UK homeowner deserves transparent, honest information when making one of their biggest home investments. No pressure. No sales tactics. Just facts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/old-home" 
              className="px-8 py-4 bg-primary-orange hover:bg-orange-600 text-gray-900 font-semibold rounded-lg shadow-lg shadow-primary-orange/30 transition duration-300"
            >
              Check Your Quote Free
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border-2 border-gray-600 hover:border-primary-orange text-white font-semibold rounded-lg transition duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="py-8"></div>
    </div>
  );
}

export default About;
