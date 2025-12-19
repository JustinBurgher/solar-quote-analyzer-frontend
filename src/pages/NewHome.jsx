import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import LandingHero from '../components/LandingHero';
import LandingMockup from '../components/LandingMockup';
import LandingHowItWorks from '../components/LandingHowItWorks';
import LandingTrust from '../components/LandingTrust';
import LandingChecklist from '../components/LandingChecklist';
import LandingUpgradePreview from '../components/LandingUpgradePreview';
import LandingFinalCTA from '../components/LandingFinalCTA';

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
      
      {/* Embedded Quote Analyzer - Link to old-home page with working analyzer */}
      <section id="analyzer" ref={analyzerRef} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Check Your Quote Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get your free analysis in seconds. No signup required - analyze unlimited quotes.
            </p>
            
            {/* CTA to working analyzer */}
            <div className="bg-white border-2 border-primary-orange rounded-xl p-8 max-w-2xl mx-auto shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Analyze Your Quote?
              </h3>
              <p className="text-gray-700 mb-6">
                Click below to access our free solar quote analyzer. Get your A-F grade instantly!
              </p>
              <Link 
                to="/old-home"
                className="inline-block px-8 py-4 bg-primary-orange hover:bg-orange-600 text-gray-900 font-bold rounded-lg shadow-lg transition duration-300"
              >
                Start Free Analysis →
              </Link>
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
