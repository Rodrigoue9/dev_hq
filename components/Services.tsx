import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ServiceItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

// --- Modal Component ---
const ServiceModal = ({ service, onClose }: { service: ServiceItem, onClose: () => void }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Entrance Animation
    const tl = gsap.timeline();
    
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    })
    .fromTo(contentRef.current, 
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.2"
    );

    // Escape key listener
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClose = () => {
    // Exit Animation
    gsap.to(contentRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in"
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose
    });
  };

  const handleKnowMore = () => {
    // Close modal first logic handles by pure navigation which unmounts or we can animate out first
    // For speed, strict navigation is better.
    navigate(`/service/${service.id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        ref={overlayRef} 
        className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0"
        onClick={handleClose}
      />
      
      <div 
        ref={contentRef}
        className="relative bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 md:p-12 max-w-lg w-full shadow-2xl overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-cyan/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-violet/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <span className="font-accent text-cyan text-xs uppercase tracking-widest mb-4 block">
            Detalhes do Serviço
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-white mb-6">
            {service.title}
          </h3>
          <p className="font-sans text-silver text-base leading-relaxed mb-8">
            {service.description}
          </p>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pt-6 border-t border-white/10 gap-6">
            <div className="flex flex-col">
              <span className="text-xs text-white/40 uppercase tracking-widest mb-1">Investimento</span>
              <span className="font-display text-white text-lg">{service.price}</span>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={handleClose}
                  className="flex-1 md:flex-none px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 hover:text-white text-silver transition-colors duration-300 text-xs font-bold tracking-widest uppercase"
                >
                  Fechar
                </button>
                
                <button 
                  onClick={handleKnowMore}
                  className="flex-1 md:flex-none group relative px-8 py-3 rounded-full bg-white text-black overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-shadow duration-300"
                >
                  <span className="absolute inset-0 bg-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-xs font-black tracking-widest uppercase group-hover:text-black transition-colors">
                    Saber Mais
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transform group-hover:translate-x-1 transition-transform duration-300">
                        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Tilt Card Component (Existing) ---
const TiltCard = ({ item, index }: { item: ServiceItem, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !contentRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
    });

    gsap.to(contentRef.current, {
      x: (x - centerX) * 0.1,
      y: (y - centerY) * 0.1,
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !contentRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      boxShadow: "0 0 0 rgba(0,0,0,0)"
    });
    
    gsap.to(contentRef.current, {
      x: 0,
      y: 0,
      duration: 0.6
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 w-[300px] md:w-[450px] h-[300px] mx-4 relative perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-colors hover:bg-white/10 group cursor-pointer">
        <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
          <div>
            <span className="font-display text-4xl text-white/20 mb-4 block">0{index + 1}</span>
            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-cyan transition-colors duration-300">
              {item.title}
            </h3>
            <p className="font-sans text-silver/80 text-sm leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
            <span className="font-accent text-xs uppercase tracking-widest text-cyan/80 truncate max-w-[150px]">
              {item.price}
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan group-hover:border-cyan transition-all duration-300">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:text-black text-white transition-colors">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan/5 to-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
};

// --- Main Component ---
const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const duration = 25;
      
      gsap.to(containerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: duration,
        repeat: -1
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const displayServices = [...SERVICES, ...SERVICES];

  return (
    <section ref={triggerRef} className="py-32 relative overflow-hidden bg-bg z-20">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="font-display text-4xl md:text-5xl text-white mb-6">SERVIÇOS</h2>
        <div className="w-full h-px bg-white/10" />
      </div>

      {/* Marquee */}
      <div className="w-full overflow-hidden cursor-grab active:cursor-grabbing mb-16">
        <div ref={containerRef} className="flex w-max px-6">
          {displayServices.map((service, index) => (
            <div key={`${index}-${service.title}`} onClick={() => setSelectedService(service)}>
               <TiltCard item={service} index={index % SERVICES.length} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h3 className="font-sans text-xs text-silver/60 uppercase tracking-widest shrink-0">
            Acesso Rápido
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {SERVICES.map((service) => (
              <button
                key={service.title}
                onClick={() => setSelectedService(service)}
                className="group relative px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan/50 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-xs font-accent uppercase tracking-wider text-white group-hover:text-cyan transition-colors">
                  {service.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  );
};

export default Services;