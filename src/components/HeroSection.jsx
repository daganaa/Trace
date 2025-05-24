import React from 'react';
import {useTypewriter, Cursor} from 'react-simple-typewriter'; 
import WaveformAnimation from './WaveformAnimation';

const HeroSection = ({ onGetStarted }) => {
    const [typeEffect] = useTypewriter({
        words: ['Immortalised.', 'Preserved.', 'Captured.'],
        loop: 0, // infinite loop
        delaySpeed: 2000,
        typeSpeed: 120,
        deleteSpeed: 80
      });

  return (
    <section className="relative bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
                <h1 className="text-[100vw] lg:text-[80vw] font-bold font-serif text-gray-900 leading-none overflow-visible">
                    Your<br/>voice,{' '}
                    <span className="text-teal-600 block">
                        {typeEffect}
                        <Cursor cursorStyle="|" cursorColor="#0d9488" />
                    </span>
                </h1>
            </div>
            
            {/* Description */}
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Transform conversations into insights through AI-powered voice journaling. Speak freely, reflect deeply.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStarted}
                className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
              >
                Book My First Call
              </button>
              <button 
                onClick={onGetStarted}
                className="inline-flex items-center px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg border-2 border-teal-500 hover:bg-teal-50 transition-colors"
                >
                Watch a 45s Demo
            </button>
              
            </div>
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;