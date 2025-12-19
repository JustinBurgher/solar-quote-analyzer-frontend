import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ onSkipToTool }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-sm shadow-xl shadow-orange-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          {/* Simple SVG Logo (Checkmark inside Sun/Circle) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
            <circle cx="12" cy="12" r="7" stroke="#f97316" fill="rgba(249, 115, 22, 0.1)"></circle>
            <path d="M9 12l2 2 4-4" stroke="#f97316"></path>
          </svg>
          <span className="text-2xl font-bold text-gray-50">SolarVerify</span>
        </Link>

        {/* Navigation Links (Hidden on mobile) */}
        <nav className="hidden md:flex space-x-8 items-center">
          {isHomePage ? (
            <>
              <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-primary-orange transition duration-300">How It Works</a>
              <a href="#trust" className="text-sm font-medium text-gray-300 hover:text-primary-orange transition duration-300">Why Trust Us</a>
              <a href="#checklist" className="text-sm font-medium text-gray-300 hover:text-primary-orange transition duration-300">Free Checklist</a>
            </>
          ) : (
            <>
              <Link to="/" className="text-sm font-medium text-gray-300 hover:text-primary-orange transition duration-300">Home</Link>
              <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-primary-orange transition duration-300">About</Link>
              <Link to="/how-it-works" className="text-sm font-medium text-gray-300 hover:text-primary-orange transition duration-300">How It Works</Link>
              <Link to="/contact" className="text-sm font-medium text-gray-300 hover:text-primary-orange transition duration-300">Contact</Link>
            </>
          )}
        </nav>

        {/* CTA Button */}
        {isHomePage && onSkipToTool ? (
          <button
            onClick={onSkipToTool}
            className="px-4 py-2 bg-primary-orange hover:bg-orange-600 text-gray-900 font-semibold rounded-lg shadow-lg shadow-primary-orange/40 transition duration-300 hidden sm:block"
          >
            Skip to Tool →
          </button>
        ) : (
          <Link
            to="/old-home"
            className="px-4 py-2 bg-primary-orange hover:bg-orange-600 text-gray-900 font-semibold rounded-lg shadow-lg shadow-primary-orange/40 transition duration-300 hidden sm:block"
          >
            Quote analyser
          </Link>
        )}
        
        {/* Mobile Menu Icon (Placeholder) */}
        <button className="md:hidden text-gray-300 hover:text-primary-orange">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navigation;
