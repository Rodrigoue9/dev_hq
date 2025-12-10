import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Simulates loading time

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power3.inOut"
      })
      .to(containerRef.current, {
        height: 0,
        duration: 1,
        ease: "expo.inOut",
        delay: -0.2
      });
    }
  }, [progress, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-bg flex items-center justify-center overflow-hidden"
    >
      <div ref={textRef} className="flex flex-col items-center">
        <h1 className="text-white font-display font-black text-6xl md:text-8xl tracking-tighter mb-4">
          DEV_HQ
        </h1>
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-24 bg-white/20">
            <div 
              className="h-full bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)]" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-accent text-sm text-cyan tabular-nums">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
