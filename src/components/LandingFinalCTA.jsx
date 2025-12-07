import React from 'react';

function LandingFinalCTA({ onCheckQuoteClick }) {
  return (
    <section className="py-24 bg-dark-card border-t border-b border-primary-orange/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-50 mb-4">Get Unbiased Clarity Today.</h2>
        <p className="text-lg text-gray-400 mb-8">
          Don't sign a five-figure quote until you know it's right. Use our free tool to gain peace of mind.
        </p>
        <button
          onClick={onCheckQuoteClick}
          className="inline-block px-12 py-4 bg-primary-orange hover:bg-orange-600 text-gray-900 font-bold text-lg rounded-xl shadow-2xl shadow-primary-orange/50 transition duration-300 transform hover:scale-[1.05]"
        >
          Start Your Free Quote Check Now
        </button>
      </div>
    </section>
  );
}

export default LandingFinalCTA;
