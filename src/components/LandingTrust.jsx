import React from 'react';
import { Sun, CreditCard, Link2 } from 'lucide-react';

function LandingTrust() {
  const trustPillars = [
    {
      icon: Sun,
      title: "100% Independent",
      description: "We are not owned by, affiliated with, or funded by any solar installer or manufacturer. Our only client is you."
    },
    {
      icon: CreditCard,
      title: "Zero Commission",
      description: "We do not receive referral fees or commissions. Our recommendations are purely based on data and industry standards."
    },
    {
      icon: Link2,
      title: "Built for Homeowners",
      description: "We translate technical jargon into simple language, so you always understand exactly what you are buying."
    }
  ];

  return (
    <section id="trust" className="py-20 bg-dark-card grid-bg border-t border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-50">Why Trust SolarVerify?</h2>
        <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto mb-16">
          Buying solar is a big investment. We protect you from confusion and overspending.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div key={index} className="text-center p-6 rounded-xl border border-secondary-blue/30 shadow-lg shadow-secondary-blue/10">
                <IconComponent className="w-9 h-9 mx-auto mb-4 text-secondary-blue" strokeWidth={2} />
                <h3 className="text-xl font-semibold mb-2 text-gray-50">{pillar.title}</h3>
                <p className="text-gray-400">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingTrust;
