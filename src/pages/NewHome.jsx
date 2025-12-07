import React, { useRef } from 'react';
import LandingHero from '../components/landing/LandingHero';
import LandingMockup from '../components/landing/LandingMockup';
import LandingHowItWorks from '../components/landing/LandingHowItWorks';
import LandingTrust from '../components/landing/LandingTrust';
import LandingChecklist from '../components/landing/LandingChecklist';
import LandingUpgradePreview from '../components/landing/LandingUpgradePreview';
import LandingFinalCTA from '../components/landing/LandingFinalCTA';

function NewHome() {
  const analyzerRef = useRef(null);
  const checklistRef = useRef(null);

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToChecklist = () => {
    checklistRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Landing Page Sections */}
      <LandingHero 
        onCheckQuoteClick={scrollToAnalyzer}
        onChecklistClick={scrollToChecklist}
      />
      <LandingMockup />
      <LandingHowItWorks />
      <LandingTrust />
      
      {/* Placeholder for Analyzer - Will be integrated later */}
      <section id="analyzer" ref={analyzerRef} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Check Your Quote Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get your free basic analysis in seconds. No signup required for your first quote.
            </p>
            
            {/* Temporary message - analyzer will be integrated next */}
            <div className="bg-primary-orange/10 border-2 border-primary-orange rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🚀 Analyzer Coming Soon!
              </h3>
              <p className="text-gray-700 mb-6">
                The quote analyzer is being integrated into this new landing page. 
                For now, you can use the existing analyzer at the main homepage.
              </p>
              <a 
                href="/"
                className="inline-block px-8 py-4 bg-primary-orange hover:bg-orange-600 text-gray-900 font-bold rounded-lg shadow-lg transition duration-300"
              >
                Use Current Analyzer →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free Checklist Section */}
      <div ref={checklistRef}>
        <LandingChecklist />
      </div>
      
      {/* Upgrade Preview */}
      <LandingUpgradePreview />
      
      {/* Final CTA */}
      <LandingFinalCTA onCheckQuoteClick={scrollToAnalyzer} />
    </div>
  );
}

export default NewHome;
