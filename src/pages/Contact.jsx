import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in <span className="text-primary-orange">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about your solar quote? We're here to help. Reach out and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email Support */}
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
              <p className="text-gray-400 mb-4">For general enquiries and quote analysis questions</p>
              <a 
                href="mailto:support@solarverify.co.uk" 
                className="text-primary-orange hover:text-orange-400 font-medium transition-colors"
              >
                support@solarverify.co.uk
              </a>
            </div>

            {/* Response Time */}
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Response Time</h3>
              <p className="text-gray-400 mb-4">We aim to respond to all enquiries promptly</p>
              <span className="text-primary-orange font-medium">Within 24 hours</span>
            </div>

            {/* Office Hours */}
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Office Hours</h3>
              <p className="text-gray-400 mb-4">When our team is available</p>
              <span className="text-primary-orange font-medium">Mon - Fri: 9:00 AM - 5:00 PM GMT</span>
            </div>

            {/* Location */}
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-primary-orange/50 transition-colors">
              <div className="w-12 h-12 bg-primary-orange/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-400 mb-4">Serving homeowners across the UK</p>
              <span className="text-primary-orange font-medium">United Kingdom</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/30 rounded-2xl p-8 md:p-12 border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Common Questions</h2>
            <p className="text-gray-400 mb-6">
              Before reaching out, you might find your answer in our How It Works page which covers frequently asked questions about our service.
            </p>
            <Link 
              to="/how-it-works" 
              className="inline-flex items-center text-primary-orange hover:text-orange-400 font-medium transition-colors"
            >
              View How It Works
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-orange/20 to-orange-600/10 rounded-2xl p-8 md:p-12 border border-primary-orange/30 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Check Your Quote?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Get instant analysis of your solar quote and find out if you're getting a fair deal.
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

export default Contact;
