
import React from 'react';
import { Circle, Triangle } from 'lucide-react';

const Logo = () => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Background circle - yellow */}
      <Circle 
        className="absolute text-solar-yellow w-full h-full z-10" 
        fill="currentColor" 
        strokeWidth={1}
      />
      
      {/* Triangular sun rays */}
      <div className="absolute z-20 flex items-center justify-center">
        {/* Top ray */}
        <Triangle 
          className="absolute top-0 text-solar-dark transform -rotate-90" 
          size={24} 
          strokeWidth={2}
        />
        
        {/* Bottom ray */}
        <Triangle 
          className="absolute bottom-0 text-solar-dark transform rotate-90" 
          size={24} 
          strokeWidth={2}
        />
        
        {/* Left ray */}
        <Triangle 
          className="absolute left-0 text-solar-dark transform rotate-180" 
          size={24} 
          strokeWidth={2}
        />
        
        {/* Right ray */}
        <Triangle 
          className="absolute right-0 text-solar-dark" 
          size={24} 
          strokeWidth={2}
        />
      </div>
    </div>
  );
};

export default Logo;
