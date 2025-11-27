import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const desktopLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Upgrade', to: '/upgrade' },
];

function Navigation() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    navigate('/');
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-teal-600 w-9 h-9 rounded-lg flex items-center justify-center text-white text-xl">
                ✓
              </div>
              <span className="text-xl font-bold text-gray-900">
                solar<span className="text-teal-600">verify</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {desktopLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('analyzer')}
              className="text-sm font-semibold text-gray-700 hover:text-teal-600 transition-colors"
            >
              Free Analyzer
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="text-sm font-semibold text-gray-700 hover:text-teal-600 transition-colors"
            >
              Contact
            </button>
            <Link
              to="/upgrade"
              className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-teal-700 transition-colors"
            >
              Upgrade £44.99
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {desktopLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('analyzer')}
              className="w-full text-left text-gray-700 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
            >
              Free Analyzer
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="w-full text-left text-gray-700 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
            >
              Contact
            </button>
            <Link
              to="/upgrade"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-teal-600 text-white px-3 py-2 rounded-md text-base font-semibold hover:bg-teal-700"
            >
              Upgrade £44.99
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;