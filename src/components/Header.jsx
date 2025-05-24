import React from 'react';
import logoSvg from '/Group 2.svg';

const Header = ({ onGetStarted }) => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with SVG - Left Corner */}
          <div className="flex-shrink-0 flex items-end space-x-3">
            <img 
              src={logoSvg} 
              alt="Logo" 
              className="h-8 w-8"
            />
            <h1 className="font-bold font-serif text-gray-900" style={{fontSize: '30px', lineHeight: '1'}}>
              Libro
            </h1>
          </div>
          
          {/* Navigation Links and Button - Right Side */}
          <div className="flex items-center space-x-6">
            {/* Navigation Links - Moved to right */}
            <nav className="hidden md:flex space-x-8">
              <a 
                href="#how-it-works" 
                className="text-black hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
              >
                How it works
              </a>
              <a 
                href="#dashboard" 
                className="text-black hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
              >
                Dashboard
              </a>
              <a 
                href="#pricing" 
                className="text-black hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
              >
                Pricing
              </a>
            </nav>
            
            {/* Sign-Up Today Button */}
            <button
              onClick={onGetStarted}
              className="flex items-center px-8 py-2 bg-blue-200 text-white font-semibold rounded-lg hover:bg-blue-300 transition-colors text-lg"
            >
              Sign-Up Today
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;