import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnaFProposal: React.FC = () => {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Generate the 30 images array
  const images = [
    ...Array.from({ length: 15 }, (_, i) => `/projects/promobia/${i + 1}.jpg`),
    ...Array.from({ length: 15 }, (_, i) => `/projects/promobia-admin/${i + 1}.jpg`)
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Ana F | Proposta E-commerce Premium";

    // Intro animation
    gsap.fromTo(".ana-f-hero", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(".ana-f-card",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "expo.out", scrollTrigger: ".ana-f-features" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10 bg-bg">
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto ana-f-hero">
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-silver/40 hover:text-white mb-12 text-xs uppercase tracking-[0.2em] transition-all duration-300 w-fit"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan/50 group-hover:bg-cyan/5 transition-all">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-180 group-hover:-translate-x-0.5 transition-transform">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Voltar
        </button>

        <div className="mb-20">
          <span className="font-display text-xs text-cyan uppercase tracking-[0.4em] mb-4 block">PROPOSTA EXCLUSIVA</span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9] tracking-tighter">
            Ana F <br /><span className="text-white/30 italic">E-commerce Premium</span>
          </h1>
          <p className="font-sans text-xl text-silver/80 leading-relaxed max-w-2xl">
            Apresentamos um ecossistema de vendas completo para a sua marca. Unindo uma jornada de compra de classe mundial com um painel administrativo robusto, desenvolvido cirurgicamente para engajar, reter e maximizar suas vendas automáticas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 ana-f-features">
          {[
            { title: "Painel Admin V2", desc: "Controle total de produtos, clientes e pedidos em tempo real." },
            { title: "Checkout Turbo", desc: "Fluxo de pagamento em 1-clique desenhado para redução drástica de abandono." },
            { title: "Mobile-First", desc: "Performance cirúrgica e design perfeito para a tela do celular do seu cliente." },
            { title: "Independência Total", desc: "Pare de pagar taxas abusivas para marketplaces e assuma o controle da sua margem." }
          ].map((item, i) => (
            <div key={i} className="ana-f-card p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan/30 transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <h4 className="font-display text-sm text-white uppercase tracking-widest mb-4">{item.title}</h4>
               <p className="text-xs text-silver/60 leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Gallery */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <span className="font-display text-xs text-cyan uppercase tracking-[0.4em] mb-4 block">PREVIEW DA PLATAFORMA</span>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
                Visão do <span className="text-white/30 italic">Projeto</span>
              </h2>
              <p className="font-sans text-silver/60">
                Arraste pela galeria abaixo para explorar todas as 30 telas detalhadas da sua nova plataforma, incluindo a loja virtual de alta conversão e o seu painel gerencial privado.
              </p>
            </div>
            <a 
              href="https://promobia.online/"
              target="_blank"
              rel="noopener noreferrer" 
              className="px-6 py-3 rounded-full border border-cyan/50 bg-cyan/10 hover:bg-cyan/20 text-cyan transition-all font-display text-xs uppercase tracking-widest flex items-center gap-3 shrink-0"
            >
              Ver Protótipo Ao Vivo
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 11L11 1M11 1H3M11 1V9" />
              </svg>
            </a>
          </div>

          <div className="relative w-full rounded-[40px] overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl">
            {/* Main Image */}
            <div className="relative aspect-[16/10] md:aspect-video w-full bg-black">
              <img 
                src={images[activeImageIndex]} 
                alt={`Tela ${activeImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 font-display text-xs text-white uppercase tracking-widest">
                  {activeImageIndex < 15 ? 'Loja Virtual' : 'Painel Admin'} — {activeImageIndex + 1} de {images.length}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex overflow-x-auto gap-4 p-6 no-scrollbar bg-[#050505] border-t border-white/5">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-32 md:w-48 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === idx ? 'border-cyan scale-105 shadow-[0_0_20px_rgba(0,229,255,0.2)]' : 'border-white/10 opacity-40 hover:opacity-100 hover:border-white/30'}`}
                >
                  <img src={img} alt={`Miniatura ${idx+1}`} className="w-full h-full object-cover" />
                  {activeImageIndex === idx && <div className="absolute inset-0 bg-cyan/10" />}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnaFProposal;
