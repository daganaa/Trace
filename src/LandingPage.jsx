import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';

function LandingPage({ onGetStarted }) {
  return (
    <div>
      <Header onGetStarted={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
    </div>
  );
}

export default LandingPage;