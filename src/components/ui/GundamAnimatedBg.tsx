import React from 'react';

interface GundamAnimatedBgProps {
  className?: string;
  opacity?: string;
  mode?: 'all' | 'blue' | 'yellow' | 'red';
}

export const GundamAnimatedBg: React.FC<GundamAnimatedBgProps> = ({ 
  className = '', 
  opacity = 'opacity-100',
  mode = 'all'
}) => {
  if (mode === 'blue') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-0 select-none ${opacity} ${className}`}>
        {/* Deep Core Blue Orb */}
        <div className="absolute -top-24 -left-20 w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full bg-[#155EEF]/35 blur-[90px] animate-gundam-blue" />
        
        {/* Electric Cyan / Sky Blue Orb */}
        <div className="absolute top-1/3 -right-24 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-[#0086C9]/30 blur-[80px] animate-gundam-blue" style={{ animationDelay: '-4s' }} />
        
        {/* Soft Cobalt Blue Orb */}
        <div className="absolute -bottom-24 left-1/3 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-[#2970FF]/30 blur-[95px] animate-gundam-blue" style={{ animationDelay: '-7s' }} />
      </div>
    );
  }

  if (mode === 'yellow') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-0 select-none ${opacity} ${className}`}>
        {/* Rich Gundam Gold Orb */}
        <div className="absolute -top-20 -left-20 w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full bg-[#F5C400]/40 blur-[85px] animate-gundam-yellow" />
        
        {/* Warm Amber Orb */}
        <div className="absolute top-1/2 -right-24 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-[#FDB022]/35 blur-[80px] animate-gundam-yellow" style={{ animationDelay: '-5s' }} />
        
        {/* Golden Sun Accent Orb */}
        <div className="absolute -bottom-24 left-1/4 w-[440px] sm:w-[580px] h-[440px] sm:h-[580px] rounded-full bg-[#EAAA08]/35 blur-[90px] animate-gundam-yellow" style={{ animationDelay: '-8s' }} />
      </div>
    );
  }

  if (mode === 'red') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-0 select-none ${opacity} ${className}`}>
        {/* Deep Gundam Crimson Orb */}
        <div className="absolute -top-20 -left-20 w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full bg-[#D92D20]/35 blur-[90px] animate-gundam-red" />
        
        {/* Vivid Flame Coral Orb */}
        <div className="absolute top-1/3 -right-24 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-[#F04438]/30 blur-[80px] animate-gundam-red" style={{ animationDelay: '-5s' }} />
        
        {/* Scarlet Ruby Orb */}
        <div className="absolute -bottom-24 left-1/3 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-[#B42318]/30 blur-[95px] animate-gundam-red" style={{ animationDelay: '-9s' }} />
      </div>
    );
  }

  // mode === 'all' (Tricolor Blend)
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-0 select-none ${opacity} ${className}`}>
      {/* Gundam Blue Floating Glow Orb */}
      <div className="absolute -top-20 -left-20 w-[400px] sm:w-[520px] h-[400px] sm:h-[520px] rounded-full bg-[#155EEF]/35 blur-[85px] animate-gundam-blue" />
      
      {/* Gundam Yellow Floating Glow Orb */}
      <div className="absolute top-1/2 -right-20 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-[#F5C400]/35 blur-[85px] animate-gundam-yellow" />
      
      {/* Gundam Red Floating Glow Orb */}
      <div className="absolute -bottom-24 left-1/4 w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] rounded-full bg-[#D92D20]/30 blur-[90px] animate-gundam-red" />
    </div>
  );
};
