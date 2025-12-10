import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CONTACT_CTA, CONTACT_PHONE } from '../constants';

const Footer: React.FC = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Magnetic effect
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
      
      if (textRef.current) {
        gsap.to(textRef.current, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      if (textRef.current) {
        gsap.to(textRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      }
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <footer className="relative py-32 bg-bg flex flex-col items-center justify-center overflow-hidden z-20 border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet/10 pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <h2 className="relative font-display font-black text-5xl md:text-8xl text-center leading-none mb-16 mix-blend-overlay opacity-90">
        {CONTACT_CTA}
      </h2>

      <a
        ref={buttonRef}
        href={`https://wa.me/${CONTACT_PHONE.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-48 h-48 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm transition-colors hover:border-cyan/50 hover:bg-white/5"
      >
        <span ref={textRef} className="relative z-10 font-sans font-semibold text-sm tracking-widest text-white group-hover:text-cyan transition-colors">
          FALE AGORA
        </span>
        
        {/* Hover Pulse */}
        <div className="absolute inset-0 rounded-full bg-cyan/20 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out blur-xl" />
      </a>

      <div className="absolute bottom-8 w-full flex justify-between px-8 text-white/20 text-xs font-sans uppercase tracking-widest">
        <span>© {new Date().getFullYear()} DEV_HQ</span>
        <span>BR — GO</span>
      </div>
    </footer>
  );
};

export default Footer;