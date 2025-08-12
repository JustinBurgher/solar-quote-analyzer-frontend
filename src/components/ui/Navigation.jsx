import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();

  const handleQuoteAnalyzer = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('analyzer');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleContact = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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

<Link
  to="/upgrade"
  className="text-gray-700 hover:text-teal-600 transition-colors"
>
  Upgrade
</Link>

              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
 <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
  <Link
    to="/"
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-teal-600 hover:bg-gray-50 transition-colors"
  >
    Home
  </Link>
  <Link
    to="/about"
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-teal-600 hover:bg-gray-50 transition-colors"
  >
    About
  </Link>
  <Link
    to="/how-it-works"
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-teal-600 hover:bg-gray-50 transition-colors"
  >
    How It Works
  </Link>
  <Link
    to="/upgrade"
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
  >
    Upgrade
  </Link>
</div>

      </div>
    </nav>
  );
}

export default Navigation;

