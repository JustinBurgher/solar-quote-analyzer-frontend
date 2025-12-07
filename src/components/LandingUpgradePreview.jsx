import React from 'react';
import { Link } from 'react-router-dom';

function LandingUpgradePreview() {
  return (
    <section className="py-20 bg-dark-bg border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-50 mb-4">Need the Full Breakdown?</h2>
        <p className="text-lg text-gray-400 mb-8">
          Upgrade to the Full SolarVerify Report for detailed <strong>Basic ROI estimate</strong>, a <strong>Component Quality Summary</strong> (Is that panel brand top-tier?), and personalized sizing recommendations.
        </p>
        
        {/* Blurred Paid Report Mockup */}
        <div className="relative w-full p-8 bg-gray-900 rounded-2xl shadow-inner border border-gray-700 mx-auto">
          <div className="blur-sm opacity-50 space-y-4 text-left">
            <p className="text-2xl font-bold text-green-400">Full Verdict: Exceptional Value</p>
            <p className="text-lg text-gray-300"><strong>Panel Score:</strong> A (Tier 1 manufacturer, 25-year warranty)</p>
            <p className="text-lg text-gray-300"><strong>Inverter Match:</strong> Perfect match for system size. Expected lifespan: 12 years.</p>
            <p className="text-lg text-gray-300"><strong>Estimated ROI:</strong> 4.5 Years @ 7p/kWh export rate.</p>
          </div>
          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-dark-bg/60 rounded-2xl">
            <Link
              to="/upgrade"
              className="px-8 py-3 bg-primary-orange hover:bg-orange-600 text-gray-900 font-bold rounded-xl shadow-xl shadow-primary-orange/50 transition duration-300"
            >
              See Upgrade Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingUpgradePreview;
