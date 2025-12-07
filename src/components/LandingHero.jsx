import React from 'react';

function LandingHero({ onCheckQuoteClick, onChecklistClick }) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Gradient Background Effect (Orange/Blue) */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="w-96 h-96 bg-primary-orange rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute top-10 left-1/4 transform -translate-x-1/2"></div>
          <div className="w-80 h-80 bg-secondary-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute bottom-0 right-1/4 transform translate-x-1/2"></div>
        </div>

        <div className="relative z-10">
          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-gray-50">
            Stop Guessing. Get <span className="text-primary-orange">Clarity.</span>
            <span className="block text-4xl sm:text-5xl mt-2">
              Before You Buy Solar.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-xl md:text-2xl font-light text-gray-300 max-w-4xl mx-auto mb-8">
            The UK's independent tool to verify your solar quotes are fair, sized correctly, and complete.
          </p>

          {/* Problem Solved Paragraph */}
          <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto mb-10">
            Solar quotes are confusing, technical, and often inconsistent. Before you commit £6,000–£15,000,
            SolarVerify gives you the unbiased confidence you need. <strong>We don't sell solar, we just check quotes.</strong>
          </p>

          {/* Main CTA & Secondary CTA */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onCheckQuoteClick}
              className="w-full sm:w-auto px-10 py-4 bg-primary-orange hover:bg-orange-600 text-gray-900 font-bold text-lg rounded-xl shadow-2xl shadow-primary-orange/50 transition duration-300 transform hover:scale-[1.02]"
            >
              Check My Quote (Free Basic Analysis)
            </button>
            <button
              onClick={onChecklistClick}
              className="w-full sm:w-auto px-10 py-4 bg-dark-card border border-gray-600 hover:border-secondary-blue text-gray-300 font-semibold rounded-xl transition duration-300"
            >
              Download the Free 15-Point Checklist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
