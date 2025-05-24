import React from 'react';

const Header = ({ onGetStarted }) => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-bold font-serif text-gray-900" style={{fontSize: '30px'}}>
              Journal
            </h1>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#how-it-works" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              How it works
            </a>
            <a 
              href="#dashboard" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Dashboard
            </a>
            <a 
              href="#pricing" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Pricing
            </a>
          </nav>
          
          {/* Sign In Button */}
          <div className="flex-shrink-0">
            <button
              onClick={onGetStarted}
              className="bg-teal-100 hover:bg-teal-200 text-teal-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Get Early Access
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;