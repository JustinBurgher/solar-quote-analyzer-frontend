import React, { useRef } from 'react';
import LandingHero from '../components/landing/LandingHero';
import LandingMockup from '../components/landing/LandingMockup';
import LandingHowItWorks from '../components/landing/LandingHowItWorks';
import LandingTrust from '../components/landing/LandingTrust';
import LandingChecklist from '../components/landing/LandingChecklist';
import LandingUpgradePreview from '../components/landing/LandingUpgradePreview';
import LandingFinalCTA from '../components/landing/LandingFinalCTA';
import QuoteAnalyzer from '../components/QuoteAnalyzer';

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
      
      {/* Embedded Quote Analyzer */}
      <section id="analyzer" ref={analyzerRef} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Check Your Quote Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your free basic analysis in seconds. No signup required for your first quote.
            </p>
          </div>
          <QuoteAnalyzer />
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
