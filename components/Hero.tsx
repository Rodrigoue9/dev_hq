import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO_HEADLINE, HERO_SUBHEADLINE } from '../constants';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 }); // Wait for preloader

    // Text Reveal
    tl.fromTo(titleRef.current,
      { y: 120, opacity: 0, skewY: 5, filter: 'blur(10px)' },
      { y: 0, opacity: 1, skewY: 0, filter: 'blur(0px)', duration: 1.5, ease: "power4.out" }
    )
    .fromTo(subRef.current,
      { y: 30, opacity: 0, filter: 'blur(5px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: "power2.out" },
      "-=1.2"
    )
    .fromTo(ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.8"
    );

    // Subtle parallax on scroll
    const handleScroll = () => {
      if (!titleRef.current || !containerRef.current) return;
      const scrolled = window.scrollY;
      gsap.to(titleRef.current, {
        y: scrolled * 0.4,
        opacity: 1 - scrolled / 700,
        ease: "none",
        duration: 0
      });
      gsap.to(subRef.current, {
        y: scrolled * 0.2,
        opacity: 1 - scrolled / 500,
        ease: "none",
        duration: 0
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden z-10 perspective-1000">
      <div className="max-w-7xl mx-auto w-full text-center relative z-20 mix-blend-screen">
        <h1 
          ref={titleRef}
          className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 font-display font-black text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tighter mb-8 select-none"
        >
          {HERO_HEADLINE}
        </h1>
        
        <div className="overflow-hidden mb-12">
          <p 
            ref={subRef}
            className="font-accent text-silver text-lg md:text-2xl font-light tracking-wide uppercase opacity-80"
          >
            {HERO_SUBHEADLINE}
          </p>
        </div>

        <button
          ref={ctaRef}
          onClick={scrollToProjects}
          className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden hover:border-cyan/50 transition-colors duration-500"
        >
          <span className="absolute inset-0 bg-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative font-sans text-sm font-semibold tracking-widest text-white group-hover:text-cyan transition-colors duration-300">
            INICIAR PROJETO
          </span>
        </button>
      </div>
      
      {/* Decorative Grids */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-white/10" />
    </section>
  );
};

export default Hero;