import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="logo-icon bg-teal-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">🏠</span>
              </div>
              <Link to="/" className="logo-text text-xl font-bold text-gray-900">
                solar<span className="text-teal-600">✓</span>erify
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link 
                to="/how-it-works" 
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                How It Works
              </Link>
              <a 
                href="#analyzer" 
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Quote Analyzer
              </a>
              <a 
                href="#contact" 
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </a>
              <Link 
                to="/login" 
                className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-teal-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-gray-600 hover:text-teal-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link 
            to="/how-it-works" 
            className="text-gray-600 hover:text-teal-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            How It Works
          </Link>
          <a 
            href="#analyzer" 
            className="text-gray-600 hover:text-teal-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Quote Analyzer
          </a>
          <a 
            href="#contact" 
            className="text-gray-600 hover:text-teal-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
          <Link 
            to="/login" 
            className="bg-teal-600 text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

