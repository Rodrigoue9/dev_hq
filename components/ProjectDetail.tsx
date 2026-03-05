import React, { useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const project = useMemo(() => PROJECTS.find(p => p.slug === slug), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!project) {
      navigate('/');
      return;
    }

    document.title = `DEV_HQ | ${project.client}`;

    // Entrance Animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    // Stagger Gallery Images
    if (galleryRef.current && project.images) {
      const images = galleryRef.current.querySelectorAll('.gallery-image');
      gsap.fromTo(images,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [slug, project, navigate]);

  if (!project) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10 bg-bg">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div ref={containerRef} className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-20">
          <button 
            onClick={() => navigate('/')}
            aria-label="Voltar para a página inicial"
            className="group flex items-center gap-2 text-silver/40 hover:text-white mb-12 text-xs uppercase tracking-[0.2em] transition-all duration-300 w-fit"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan/50 group-hover:bg-cyan/5 transition-all">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-180 group-hover:-translate-x-0.5 transition-transform">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            Voltar
          </button>

          <span className="font-display text-xs text-cyan uppercase tracking-[0.4em] mb-4 block">{project.type}</span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9] tracking-tighter">
            {project.client}
          </h1>

          <div className="flex flex-wrap gap-3 mb-12">
            {project.tags?.map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] text-white uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer" 
              className="px-8 py-4 rounded-full bg-cyan text-black hover:bg-white transition-colors font-display text-xs uppercase tracking-widest flex items-center gap-3 shrink-0"
            >
              Visitar Projeto
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 11L11 1M11 1H3M11 1V9" />
              </svg>
            </a>
            {project.roi && (
               <div className="px-6 py-4 rounded-full border border-white/10 flex items-center gap-2 bg-white/5">
                 <span className="text-cyan">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                 </span>
                 <span className="font-display text-xs uppercase tracking-widest text-white">{project.roi}</span>
               </div>
            )}
          </div>
        </div>

        {/* Full View Gallery */}
        <div ref={galleryRef} className="space-y-6 md:space-y-10">
           {project.images?.map((img, idx) => (
              <div key={idx} className="gallery-image relative w-full rounded-2xl md:rounded-[40px] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
                 <div className="absolute inset-0 bg-white/5 animate-pulse" />
                 <img 
                    src={img} 
                    alt={`${project.client} Captura ${idx + 1}`} 
                    loading="lazy"
                    className="w-full h-auto relative z-10"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).previousElementSibling?.remove();
                    }}
                 />
              </div>
           ))}
        </div>
        
        {/* Footer CTA */}
        <div className="mt-32 pt-16 border-t border-white/10 text-center">
             <h2 className="font-display text-3xl md:text-5xl text-white mb-8">
               Pronto para o<br/><span className="text-cyan">Próximo Nível?</span>
             </h2>
             <a 
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 500);
                }}
                className="inline-flex px-8 py-4 rounded-full border border-white/20 hover:border-cyan hover:text-cyan transition-colors font-display text-xs uppercase tracking-widest items-center gap-3 shrink-0"
              >
                Inicie Seu Projeto
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 11L11 1M11 1H3M11 1V9" />
                </svg>
             </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
