import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Move floating image with cursor
    const moveImage = (e: MouseEvent) => {
      if (!floatingImageRef.current) return;
      
      const { clientX, clientY } = e;
      
      gsap.to(floatingImageRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: "power3.out"
      });
      
      // Tiny rotation based on movement for "liquid" feel
      const xVelocity = e.movementX;
      gsap.to(imageInnerRef.current, {
        skewX: -xVelocity * 0.5,
        scale: 1 + Math.abs(xVelocity) * 0.005,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', moveImage);
    return () => window.removeEventListener('mousemove', moveImage);
  }, []);

  const handleMouseEnter = (image: string) => {
    setActiveImage(image);
    gsap.to(floatingImageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    gsap.to(cursorLabelRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    gsap.to(floatingImageRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });
    gsap.to(cursorLabelRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3
    });
    setActiveImage(null);
  };

  return (
    <section id="projects" className="relative py-32 px-6 z-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="font-display text-sm md:text-base text-silver uppercase tracking-widest mb-12 opacity-60">
          Projetos Selecionados
        </h2>

        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
            <a 
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => handleMouseEnter(project.image)}
              onMouseLeave={handleMouseLeave}
              className="group relative border-t border-white/10 py-16 transition-colors hover:bg-white/5 cursor-none block"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 z-10 relative px-4 pointer-events-none">
                <h3 className="font-display text-4xl md:text-6xl text-white group-hover:text-cyan transition-colors duration-300 group-hover:translate-x-4 ease-out">
                  {project.client}
                </h3>
                <span className="font-accent text-silver group-hover:text-white transition-colors duration-300">
                  {project.type}
                </span>
              </div>
            </a>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>

      {/* Floating Image Portal */}
      <div 
        ref={floatingImageRef}
        className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg mix-blend-hard-light"
      >
        {activeImage && (
          <img 
            ref={imageInnerRef}
            src={activeImage} 
            alt="Project Preview" 
            className="w-full h-full object-cover filter brightness-125 contrast-125"
          />
        )}
        <div className="absolute inset-0 bg-cyan/20 mix-blend-overlay" />
      </div>

      {/* Custom Label for Cursor */}
      <div 
        ref={cursorLabelRef}
        className="fixed top-0 left-0 pointer-events-none z-[60] opacity-0 -translate-x-1/2 -translate-y-1/2 mt-32 bg-black/80 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/20 font-sans tracking-widest uppercase"
      >
        Ver Projeto
      </div>
    </section>
  );
};

export default Projects;