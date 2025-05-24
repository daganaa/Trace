import React from 'react';

const WaveformAnimation = () => {
  return (
    <div className="flex items-center justify-center space-x-1 h-32">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="bg-teal-500 rounded-full animate-pulse"
          style={{
            width: '4px',
            height: `${Math.random() * 60 + 20}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.5s'
          }}
        />
      ))}
    </div>
  );
};

export default WaveformAnimation;