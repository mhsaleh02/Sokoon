const BreathingGradient = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Primary breathing gradient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80dvh] animate-breath breath-gradient rounded-full"
        style={{ filter: 'blur(60px)' }}
      />
      
      {/* Secondary slower breath */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60dvh] animate-breath-slow rounded-full"
        style={{ 
          background: 'radial-gradient(ellipse at center, hsla(0, 0%, 30%, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animationDelay: '-4s'
        }}
      />
    </div>
  );
};

export default BreathingGradient;
