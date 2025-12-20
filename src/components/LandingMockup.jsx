import React from 'react';

function LandingMockup() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 bg-dark-bg">
      <div className="bg-dark-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl shadow-orange-900/50 border border-secondary-blue/30">
        <div className="bg-gray-900 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-4 sm:p-6 border-2 sm:border-4 border-gray-700/50 relative overflow-hidden">
          {/* Abstract Dashboard Lines (for style) */}
          <div className="absolute inset-0 bg-grid-white/[0.05] opacity-5"></div>

          <div className="text-center relative z-10 w-full">
            <p className="text-lg sm:text-xl md:text-3xl font-bold text-gray-200 mb-4 sm:mb-6">
              What Your Free Basic Check Provides:
            </p>
            
            {/* Mobile: Stack vertically, Desktop: Inline */}
            <div className="space-y-3 sm:space-y-4">
              {/* Verdict */}
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2">
                <div className="flex items-center justify-center sm:justify-start">
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                  <span className="text-green-400 font-semibold text-base sm:text-lg">Verdict:</span>
                </div>
                <span className="text-gray-50 text-sm sm:text-lg">Good / Fair / Overpriced</span>
              </div>
              
              {/* System Sizing Check */}
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2">
                <div className="flex items-center justify-center sm:justify-start">
                  <span className="w-3 h-3 bg-secondary-blue rounded-full mr-2"></span>
                  <span className="text-secondary-blue font-semibold text-base sm:text-lg">System Sizing Check:</span>
                </div>
                <span className="text-gray-50 text-sm sm:text-lg">Optimal?</span>
              </div>
              
              {/* Red Flag Detection */}
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2">
                <div className="flex items-center justify-center sm:justify-start">
                  <span className="w-3 h-3 bg-primary-orange rounded-full mr-2"></span>
                  <span className="text-primary-orange font-semibold text-base sm:text-lg">Red Flag Detection:</span>
                </div>
                <span className="text-gray-50 text-sm sm:text-lg">Any missing details?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingMockup;
