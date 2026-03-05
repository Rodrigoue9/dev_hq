import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Estratégia & Briefing",
    desc: "Mergulhamos no seu negócio. Não escrevemos uma linha de código antes de entender exatamente como a sua empresa lucra, seu ICP e suas maiores objeções de vendas.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    )
  },
  {
    num: "02",
    title: "Design & Engenharia",
    desc: "Desenhamos interfaces baseadas em psicologia visual e programamos com tecnologias Edge (React/Next.js). Carregamento abaixo de 1 segundo para aniquilar perder leads.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  {
    num: "03",
    title: "Lançamento & Escala",
    desc: "Colocamos sua máquina no ar com métricas tagueadas. Acompanhamos os dados em tempo real para otimizar vendas e estabilidade estrutural até a alta escala.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.36c-5.91-.32-10.37-5.59-8.49-11.16M15.59 14.37a6 6 0 01-5.84 7.36c4.68 3.55 11.23.23 11.23-5.35V1.5l-6.04 6.74v6.13M15.59 14.37A6 6 0 0012 11.5M4.26 10.57c-1.39-3.26-.26-6.61 1.76-8.5" />
      </svg>
    )
  }
];

const Methodology: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const cards = containerRef.current.querySelectorAll('.method-card');
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="py-32 bg-bg relative z-20 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative" ref={containerRef}>
        <div className="text-center mb-24 relative z-10">
          <span className="font-display text-xs text-cyan uppercase tracking-[0.4em] mb-4 block">SEU NOVO PADRÃO</span>
          <h2 className="font-display text-4xl md:text-6xl text-white tracking-tighter">
            Como Funciona o Processo <span className="font-sans text-cyan italic">DEV_HQ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[60px] left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="method-card relative p-10 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 hover:border-cyan/30 transition-all duration-500 group">
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan group-hover:bg-cyan/10 group-hover:scale-110 transition-all duration-500">
                    {step.icon}
                  </div>
                  <span className="font-display text-6xl text-white/5 font-black group-hover:text-cyan/10 transition-colors duration-500 select-none">
                    {step.num}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl text-white mb-4">{step.title}</h3>
                <p className="font-sans text-silver/60 leading-relaxed group-hover:text-silver/90 transition-colors">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
