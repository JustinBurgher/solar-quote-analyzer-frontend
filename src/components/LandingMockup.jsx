import React from 'react';

function LandingMockup() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 bg-dark-bg">
      <div className="bg-dark-card p-4 sm:p-8 rounded-3xl shadow-2xl shadow-orange-900/50 border border-secondary-blue/30">
        <div className="aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center p-6 border-4 border-gray-700/50 relative overflow-hidden">
          {/* Abstract Dashboard Lines (for style) */}
          <div className="absolute inset-0 bg-grid-white/[0.05] opacity-5"></div>

          <div className="text-center relative z-10">
            <p className="text-xl sm:text-3xl font-bold text-gray-200 mb-4">What Your Free Basic Check Provides:</p>
            <div className="text-left inline-block space-y-2">
              <p className="text-green-400 font-semibold text-lg flex items-center">
                <span className="mr-2 text-2xl">•</span> Verdict: <span className="text-gray-50 ml-2">Good / Fair / Overpriced</span>
              </p>
              <p className="text-secondary-blue font-semibold text-lg flex items-center">
                <span className="mr-2 text-2xl">•</span> System Sizing Check: <span className="text-gray-50 ml-2">Optimal?</span>
              </p>
              <p className="text-primary-orange font-semibold text-lg flex items-center">
                <span className="mr-2 text-2xl">•</span> Red Flag Detection: <span className="text-gray-50 ml-2">Any missing details?</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingMockup;
