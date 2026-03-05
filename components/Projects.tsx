import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { PROJECTS } from '../constants';
import { ProjectItem } from '../types';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let xTo = gsap.quickTo(floatingImageRef.current, "x", {duration: 0.6, ease: "power3.out"});
    let yTo = gsap.quickTo(floatingImageRef.current, "y", {duration: 0.6, ease: "power3.out"});
    let skewTo = gsap.quickTo(imageInnerRef.current, "skewX", {duration: 0.4, ease: "power2.out"});
    let scaleTo = gsap.quickTo(imageInnerRef.current, "scale", {duration: 0.4, ease: "power2.out"});
    
    // Move floating image with cursor
    const moveImage = (e: MouseEvent) => {
      if (!floatingImageRef.current) return;
      
      const { clientX, clientY } = e;
      xTo(clientX);
      yTo(clientY);
      
      // Tiny rotation based on movement for "liquid" feel
      const xVelocity = e.movementX;
      skewTo(-xVelocity * 0.5);
      scaleTo(1 + Math.abs(xVelocity) * 0.005);
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
            <button 
              key={index}
              onClick={() => {
                if (project.slug === 'promobia-moveis') {
                  navigate('/ana-f');
                } else if (project.type === 'E-commerce' || project.type === 'Painel E-commerce Exclusivo' || project.type === 'E-commerce & Painel Exclusivo') {
                  if (project.slug) navigate(`/project/${project.slug}`);
                } else {
                  setSelectedProject(project);
                }
              }}
              onMouseEnter={() => handleMouseEnter(project.image)}
              onMouseLeave={handleMouseLeave}
              className="group relative border-t border-white/10 py-16 transition-colors hover:bg-white/5 cursor-none block w-full text-left"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 z-10 relative px-4 pointer-events-none">
                <h3 className="font-display text-4xl md:text-6xl text-white group-hover:text-cyan transition-colors duration-300 group-hover:translate-x-4 ease-out">
                  {project.client}
                </h3>
                <span className="font-accent text-silver group-hover:text-white transition-colors duration-300">
                  {project.type}
                </span>
              </div>
            </button>
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
            loading="lazy"
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
        Ver Galeria
      </div>

      {/* Lightbox Gallery Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 md:p-10 z-10 bg-gradient-to-b from-black/80 to-transparent">
            <div>
              <h2 className="font-display text-2xl md:text-4xl text-white">{selectedProject.client}</h2>
              <span className="font-accent text-xs text-cyan uppercase tracking-widest">{selectedProject.type}</span>
            </div>
            <div className="flex items-center gap-6">
              <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest bg-white/10 hover:bg-cyan hover:text-black py-3 px-6 rounded-full transition-colors"
              >
                Visitar Site Ao Vivo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Fechar Galeria"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          {/* Scrollable Gallery Area */}
          <div className="flex-1 overflow-y-auto w-full flex flex-col items-center pb-20 px-4 md:px-0 scroll-smooth" data-lenis-prevent>
            <div className="w-full max-w-5xl space-y-4 md:space-y-12 pt-10">
              {selectedProject.images && selectedProject.images.map((imgSrc, idx) => (
                <div key={idx} className="relative w-full rounded-lg md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
                  <img 
                    src={imgSrc} 
                    alt={`${selectedProject.client} - Tela ${idx + 1}`} 
                    loading="lazy"
                    className="w-full h-auto relative z-10 block"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).previousElementSibling?.remove();
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center md:hidden">
               <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-cyan text-black py-4 px-8 rounded-full font-bold"
              >
                Visitar Site Ao Vivo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;