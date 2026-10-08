import React from 'react';

const GlobalEffects: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Scanlines - very subtle, no blinking */}
      <div 
        className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"
      />
      {/* Static vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
    </div>
  );
};

export default GlobalEffects;
