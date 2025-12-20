import React from 'react';

function LandingHowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Upload Your Quote",
      description: "Securely upload the PDF quote you received from any UK installer."
    },
    {
      number: 2,
      title: "System Scans Details",
      description: "Our system quickly scans for price, components, sizing, and key warranties."
    },
    {
      number: 3,
      title: "Receive Your Analysis",
      description: "Get an instant verdict: Good, Fair, or Overpriced, plus critical component quality info."
    },
    {
      number: 4,
      title: "Decide with Confidence",
      description: "Use the report to renegotiate your price or move forward knowing you have a solid deal."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-50">How SolarVerify Works in 4 Simple Steps</h2>
        <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto mb-16">
          Get clarity on your quote in under 2 minutes. No calls, no spam, just facts.
        </p>

        {/* Desktop: 4-column grid, Mobile: Vertical stack */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center p-6">
              <div className="p-4 w-16 h-16 bg-primary-orange/20 text-primary-orange rounded-full inline-flex items-center justify-center mx-auto mb-4 text-2xl font-bold border-2 border-primary-orange">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-50">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical stack with arrows */}
        <div className="md:hidden flex flex-col items-center space-y-6 max-w-sm mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="text-center p-6 bg-gray-800/50 rounded-xl w-full">
                <div className="p-4 w-16 h-16 bg-primary-orange/20 text-primary-orange rounded-full inline-flex items-center justify-center mx-auto mb-4 text-2xl font-bold border-2 border-primary-orange">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-50">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              
              {/* Arrow between steps (not after the last step) */}
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandingHowItWorks;
