import React from 'react';

function LandingChecklist() {
  const handleDownload = () => {
    // This will be updated to download the actual PDF
    window.open('/solar-quote-checklist.pdf', '_blank');
  };

  return (
    <section id="checklist" className="py-24 bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-dark-card p-8 rounded-3xl border border-primary-orange/30 shadow-2xl shadow-primary-orange/10">
        <h2 className="text-3xl font-extrabold text-gray-50 mb-4">Before You Get Your Next Quote...</h2>
        <p className="text-lg text-gray-300 mb-6">
          Download our <strong>Free 15-Point Solar Quote Checklist PDF</strong>. It ensures you know exactly what essential details and components must be included in any quality solar proposal.
        </p>
        
        {/* Placeholder for Checklist Preview (Simulated PDF Outline) */}
        <div className="mx-auto w-48 h-56 bg-white p-2 rounded-lg border-4 border-gray-300 shadow-xl relative mb-6">
          <div className="w-full h-full bg-gray-100 flex flex-col justify-start items-start p-3 space-y-1">
            <div className="text-sm font-bold text-gray-900 mb-2">Solar Quote Checklist</div>
            <div className="w-3/4 h-2 bg-primary-orange rounded-full"></div>
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-11/12 h-1 bg-gray-300"></div>
            <div className="w-3/4 h-1 bg-gray-300"></div>
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-10/12 h-1 bg-gray-300"></div>
            <div className="w-2/3 h-1 bg-gray-300"></div>
            <div className="w-full h-1 bg-gray-300"></div>
          </div>
          <span className="absolute bottom-[-15px] right-[-15px] bg-primary-orange text-white text-xs font-bold px-2 py-1 rounded-full rotate-12">FREE</span>
        </div>

        <button
          onClick={handleDownload}
          className="inline-block px-12 py-3 bg-secondary-blue hover:bg-blue-600 text-white font-bold text-lg rounded-xl shadow-xl shadow-secondary-blue/50 transition duration-300 transform hover:scale-[1.05]"
        >
          Get the Free PDF Checklist
        </button>
      </div>
    </section>
  );
}

export default LandingChecklist;
