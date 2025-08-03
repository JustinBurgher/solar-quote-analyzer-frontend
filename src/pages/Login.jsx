function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center">
            <div className="logo-icon bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-lg">🏠</span>
            </div>
            <div className="logo-text text-2xl font-bold text-gray-900">
              solar<span className="text-teal-600">✓</span>erify
            </div>
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your quote history and premium features
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6">
            <a
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-teal-600 rounded-md shadow-sm text-sm font-medium text-teal-600 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Start with free analysis
            </a>
          </div>
        </div>

        {/* Premium Features */}
        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Premium Features
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-teal-600">✓</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">PDF quote upload & analysis</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-teal-600">✓</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Component quality deep-dive</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-teal-600">✓</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Contract red flag detection</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-teal-600">✓</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Installer credential check</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-teal-600">✓</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Professional PDF report</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-teal-600">✓</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Email support</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-900">£29.99</span>
                <span className="text-gray-600 ml-1">one-time</span>
              </div>
              <p className="text-sm text-gray-500 text-center mt-1">
                Lifetime access to premium features
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <a href="/" className="hover:text-teal-600">
              Back to Home
            </a>
            <a href="/about" className="hover:text-teal-600">
              About Us
            </a>
            <a href="/how-it-works" className="hover:text-teal-600">
              How It Works
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

