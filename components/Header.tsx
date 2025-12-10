import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const triangleRef = useRef<SVGPathElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const chevronRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Intro animation: Fade in from top
    const tl = gsap.timeline({ delay: 1.8 });
    
    tl.fromTo(containerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    );
  }, []);

  const handleMouseEnter = () => {
    // Magnetic Levitation / Separation Animation
    // Triangle moves UP
    gsap.to(triangleRef.current, { 
      y: -6, 
      fill: "#FFFFFF", // Turns white on hover for interaction feedback
      duration: 0.4, 
      ease: "power2.out" 
    });
    
    // Arc expands slightly
    gsap.to(arcRef.current, { 
      scale: 1.1, 
      stroke: "#FFFFFF",
      duration: 0.4, 
      ease: "power2.out", 
      transformOrigin: "center" 
    });
    
    // Chevron moves DOWN
    gsap.to(chevronRef.current, { 
      y: 6, 
      stroke: "#FFFFFF",
      duration: 0.4, 
      ease: "power2.out" 
    });
    
    // Glow intensifies
    gsap.to(glowRef.current, { 
      opacity: 0.6, 
      scale: 1.8, 
      duration: 0.4 
    });

    // Underline expands
    gsap.to(lineRef.current, {
        width: "100%",
        backgroundColor: "#00E5FF",
        duration: 0.4,
        ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    // Return to original state with elastic bounce
    
    // Triangle returns to Cyan
    gsap.to(triangleRef.current, { 
      y: 0, 
      fill: "#00E5FF", 
      duration: 0.6, 
      ease: "elastic.out(1, 0.5)" 
    });
    
    // Arc returns to Darker Blue
    gsap.to(arcRef.current, { 
      scale: 1, 
      stroke: "#0090FF", // Darker Blue
      duration: 0.6, 
      ease: "elastic.out(1, 0.5)" 
    });
    
    // Chevron returns to Cyan
    gsap.to(chevronRef.current, { 
      y: 0, 
      stroke: "#00E5FF", 
      duration: 0.6, 
      ease: "elastic.out(1, 0.5)" 
    });
    
    gsap.to(glowRef.current, { 
      opacity: 0, 
      scale: 1, 
      duration: 0.5 
    });

    gsap.to(lineRef.current, {
        width: "16px", // w-4
        backgroundColor: "#00E5FF",
        duration: 0.5
    });
  };

  return (
    <header 
      ref={containerRef}
      className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 mix-blend-exclusion pointer-events-none select-none"
    >
      <div 
        className="inline-flex items-center gap-5 pointer-events-auto cursor-pointer group"
        onClick={() => {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Custom Geometric Logo Container */}
        <div className="relative w-14 h-14 flex items-center justify-center">
           <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 48 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
            style={{ transform: 'matrix(0.8, 0, 0, 1, 0, 0)' }}
          >
            {/* Top Triangle (Sector Shape with Curved Bottom) */}
            <path 
              ref={triangleRef}
              d="M24 4 L38 18 Q24 26 10 18 Z" 
              fill="#00E5FF" 
              className="transition-colors duration-300"
            />
            
            {/* Middle Arc (Concentric Curve) - Darker Blue */}
            <path 
              ref={arcRef}
              d="M10 26 Q24 34 38 26" 
              stroke="#0090FF" 
              strokeWidth="4" 
              strokeLinecap="round"
              fill="none"
              className="transition-colors duration-300"
            />

            {/* Bottom Chevron (Arrow Down) */}
            <path 
              ref={chevronRef}
              d="M10 34 L24 44 L38 34" 
              stroke="#00E5FF" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
              className="transition-colors duration-300"
            />
          </svg>
          
          {/* Neon Glow behind the logo */}
          <div 
            ref={glowRef} 
            className="absolute inset-0 bg-[#00E5FF] blur-2xl opacity-0 rounded-full transition-all duration-300" 
          />
        </div>

        {/* Brand Text */}
        <div className="flex flex-col">
          <h1 className="font-display font-bold text-white text-xl tracking-widest leading-none">
            DEV_HQ
          </h1>
          <div className="flex items-center gap-2 mt-1 overflow-hidden">
             {/* Animated Underline */}
             <div ref={lineRef} className="h-[2px] w-4 bg-cyan transition-all duration-500 rounded-full" />
             <span className="font-accent text-[10px] text-white/50 tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
               Engineering
             </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;