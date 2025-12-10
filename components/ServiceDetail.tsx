
import React, { useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, PROJECTS, SERVICE_TYPE_MAP } from '../constants';
import ContactForm from './ContactForm';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const adsChartRef = useRef<HTMLDivElement>(null);
  const designChartRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLDivElement>(null);

  const service = useMemo(() => SERVICES.find(s => s.id === id), [id]);
  
  const projectType = id ? SERVICE_TYPE_MAP[id] : null;
  const relatedProjects = useMemo(() => 
    PROJECTS.filter(p => p.type === projectType),
    [projectType]
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!service) {
      navigate('/');
      return;
    }

    // Entrance Animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    // E-commerce Chart Animation
    if (chartRef.current) {
      const bars = chartRef.current.querySelectorAll('.profit-bar-fill');
      gsap.fromTo(bars, 
        { width: "0%" },
        { 
          width: (i, el) => el.getAttribute('data-target') + "%", 
          duration: 1.5, 
          ease: "expo.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Ads Scale Animation
    if (adsChartRef.current) {
      const bars = adsChartRef.current.querySelectorAll('.scale-bar-fill');
      gsap.fromTo(bars, 
        { width: "0%" },
        { 
          width: (i, el) => el.getAttribute('data-target') + "%", 
          duration: 2, 
          ease: "power4.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: adsChartRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Design Attention Animation
    if (designChartRef.current) {
      const bars = designChartRef.current.querySelectorAll('.attention-bar-fill');
      gsap.fromTo(bars, 
        { width: "0%" },
        { 
          width: (i, el) => el.getAttribute('data-target') + "%", 
          duration: 2.5, 
          ease: "elastic.out(1, 0.75)",
          stagger: 0.5,
          scrollTrigger: {
            trigger: designChartRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Performance/Landing Page Animation
    if (performanceRef.current) {
      const bars = performanceRef.current.querySelectorAll('.load-bar-fill');
      
      // The slow bar "struggles"
      gsap.fromTo(bars[0], 
        { width: "0%" },
        { 
          width: "45%", 
          duration: 4, 
          ease: "none",
          scrollTrigger: {
            trigger: performanceRef.current,
            start: "top 80%",
          }
        }
      );

      // The fast bar "blasts"
      gsap.fromTo(bars[1], 
        { width: "0%" },
        { 
          width: "100%", 
          duration: 0.6, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: performanceRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Related Projects Animation
    if (relatedRef.current && relatedProjects.length > 0) {
      const cards = relatedRef.current.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: relatedRef.current,
            start: "top 85%",
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [id, service, navigate, relatedProjects]);

  if (!service) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10 bg-bg">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Left: Info */}
          <div>
            <button 
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-silver/40 hover:text-white mb-12 text-xs uppercase tracking-[0.2em] transition-all duration-300 w-fit"
            >
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan/50 group-hover:bg-cyan/5 transition-all">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-180 group-hover:-translate-x-0.5 transition-transform">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Voltar ao Início
            </button>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9] tracking-tighter">
              {service.title}
            </h1>
            
            <p className="font-sans text-xl text-silver/80 leading-relaxed mb-12 max-w-xl">
              {service.longDescription || service.description}
            </p>

            <div className="mb-12 space-y-6">
              <h3 className="font-display text-[10px] text-white/40 uppercase tracking-[0.4em]">FEATURES PREMIUM</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 bg-cyan rounded-full shadow-[0_0_8px_#00E5FF]" />
                    <span className="text-sm font-light text-silver">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky Form */}
          <div className="relative">
            <div className="lg:sticky lg:top-32 p-10 border border-white/10 rounded-3xl bg-[#0D0D0D]/90 backdrop-blur-2xl shadow-2xl">
              <div className="mb-8">
                <h3 className="font-display text-2xl text-white mb-2 tracking-tight">Iniciar Projeto</h3>
                <p className="text-sm text-silver/50">Investimento {service.price}</p>
              </div>
              <ContactForm serviceName={service.title} />
            </div>
          </div>
        </div>

        {/* --- LANDING PAGES SECTION (NEED FOR SPEED) --- */}
        {id === 'landing-pages' && (
          <div className="mb-32">
            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF00]/10 blur-[120px] -mr-48 -mt-48" />
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="font-display text-xs text-[#00FF00] uppercase tracking-[0.4em] mb-4 block">WEB PERFORMANCE</span>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight">
                      Lentidão Mata Vendas
                    </h2>
                    <p className="font-sans text-silver/60 mb-12 max-w-lg">
                      Seu cliente não espera. 40% dos usuários abandonam sites que demoram mais de 3 segundos para carregar. Nós entregamos velocidade que gera retenção e lucro.
                    </p>

                    <div ref={performanceRef} className="space-y-10">
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-xs uppercase tracking-widest text-silver/40">Site Comum (WordPress/Lento)</span>
                           <span className="text-[10px] text-red-500/60 uppercase">Perda de 40% Leads</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                           <div className="load-bar-fill h-full bg-red-500/30" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-xs uppercase tracking-widest text-[#00FF00]">Landing Page DEV_HQ (React)</span>
                           <span className="text-[10px] text-[#00FF00] uppercase font-bold italic">Carregamento Instantâneo</span>
                        </div>
                        <div className="h-6 bg-white/5 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.15)]">
                           <div className="load-bar-fill h-full bg-gradient-to-r from-[#00FF00] via-cyan to-[#00FF00] shadow-[0_0_20px_#00FF00]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Next.js & React", desc: "A tecnologia usada por Netflix e Uber para garantir velocidade absurda e estabilidade sob carga.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                      { title: "Servidores Edge", desc: "Seu site hospedado em 100 lugares ao mesmo tempo via CDN global para latência zero.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
                      { title: "Imagens Ultra-Slim", desc: "Compressão de nova geração que entrega qualidade 4K com o peso de um arquivo de texto.", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
                      { title: "SEO Ready", desc: "Google ama sites rápidos. Otimização técnica que coloca você nas primeiras posições organicamente.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }
                    ].map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#00FF00]/20 transition-all">
                        <svg className="w-6 h-6 text-[#00FF00] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon} />
                        </svg>
                        <h4 className="font-display text-[10px] text-white uppercase tracking-widest mb-2">{item.title}</h4>
                        <p className="text-[11px] text-silver/60 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* --- E-COMMERCE POWER SECTION --- */}
        {id === 'ecommerce-pro' && (
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-16 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 blur-[100px] -mr-32 -mt-32" />
               
               <div>
                  <span className="font-display text-xs text-cyan uppercase tracking-[0.4em] mb-4 block">LUCRATIVIDADE REAL</span>
                  <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight">
                    Recupere sua Margem de Lucro
                  </h2>
                  
                  <div ref={chartRef} className="space-y-8">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs uppercase tracking-widest text-silver/60">
                        <span>Marketplaces (Taxa 20%)</span>
                        <span>Seu Lucro: 80%</span>
                      </div>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                        <div className="profit-bar-fill h-full bg-white/20" data-target="80" />
                      </div>
                      <p className="text-[10px] text-red-400/60 uppercase tracking-widest italic">! Você perde R$ 20,00 a cada R$ 100,00 vendidos</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs uppercase tracking-widest text-cyan">
                        <span>Sua Loja HQ (Taxa 4%)</span>
                        <span className="font-bold">Seu Lucro: 96%</span>
                      </div>
                      <div className="h-6 bg-white/5 rounded-full overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                        <div className="profit-bar-fill h-full bg-cyan shadow-[0_0_15px_#00E5FF]" data-target="96" />
                      </div>
                      <p className="text-[10px] text-cyan/60 uppercase tracking-widest font-bold">✓ Mais de R$ 16,00 de lucro EXTRA em cada venda</p>
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Base de Dados", desc: "O cliente é seu, não da plataforma. Crie sua própria audiência.", icon: "M12 15V17M18 15V17M6 15V17M13.6 3H10.4C9.2799 3 8.71985 3 8.29202 3.21799C7.91569 3.40973 7.60973 3.71569 7.41799 4.09202C7.2 4.51985 7.2 5.0799 7.2 6.2V17.8C7.2 18.9201 7.2 19.4802 7.41799 19.908C7.60973 20.2843 7.91569 20.5903 8.29202 20.782C8.71985 21 9.2799 21 10.4 21H13.6C14.7201 21 15.2802 21 15.708 20.782C16.0843 20.5903 16.3903 20.2843 16.582 19.908C16.8 19.4802 16.8 18.9201 16.8 17.8V6.2C16.8 5.0799 16.8 4.51985 16.582 4.09202C16.3903 3.71569 16.0843 3.40973 15.708 3.21799C15.2802 3 14.7201 3 13.6 3Z" },
                    { title: "LTV & Recompra", desc: "Venda novamente via E-mail ou WhatsApp sem custo de anúncio.", icon: "M4 4V9H4.582M4.582 9C5.52238 6.43257 8.051 4.61905 11 4.61905C14.9765 4.61905 18.2 7.84251 18.2 11.819C18.2 15.7956 14.9765 19.019 11 19.019C8.4283 19.019 6.16202 17.6702 4.88775 15.65M4.582 9H9" },
                    { title: "Pixel Exclusivo", desc: "Sua inteligência de dados é protegida. Nada vaza para concorrentes.", icon: "M13 10V14M17 10V14M9 10V14M11 21H13C17.4183 21 21 17.4183 21 13V11C21 6.58172 17.4183 3 13 3H11C6.58172 3 3 6.58172 3 11V13C3 17.4183 6.58172 21 11 21Z" },
                    { title: "Escala & Branding", desc: "Sua marca assume o papel principal. Percepção de valor 10x maior.", icon: "M13 7L18 12M18 12L13 17M18 12H6" }
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan/20 transition-all">
                      <svg className="w-6 h-6 text-cyan mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                      <h4 className="font-display text-xs text-white uppercase tracking-widest mb-2">{item.title}</h4>
                      <p className="text-[11px] text-silver/60 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* --- ARTES DIGITAIS SECTION (DESIGN ESTRATÉGICO) --- */}
        {id === 'artes-digitais' && (
          <div className="mb-32">
            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/10 blur-[120px] -mr-48 -mt-48" />
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="font-display text-xs text-cyan uppercase tracking-[0.4em] mb-4 block">VISUAL PSYCHOLOGY</span>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight">
                      A Regra dos <span className="text-cyan">3 Segundos</span>
                    </h2>
                    <p className="font-sans text-silver/60 mb-12 max-w-lg">
                      Você tem exatamente 3 segundos para capturar a atenção antes que o usuário role para o concorrente. O design estratégico é o que separa o "ignorado" do "desejado".
                    </p>

                    <div ref={designChartRef} className="space-y-10">
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-xs uppercase tracking-widest text-silver/40">Design Genérico (Canva/Templates)</span>
                           <span className="text-[10px] text-silver/40 uppercase">Ignorado em 1s</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                           <div className="attention-bar-fill h-full bg-white/10" data-target="15" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-xs uppercase tracking-widest text-cyan">Design Estratégico DEV_HQ</span>
                           <span className="text-[10px] text-cyan uppercase font-bold">Retenção Máxima</span>
                        </div>
                        <div className="h-6 bg-white/5 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.15)]">
                           <div className="attention-bar-fill h-full bg-gradient-to-r from-cyan via-white to-cyan shadow-[0_0_20px_#00E5FF]" data-target="100" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Autoridade Instantânea", desc: "Seu visual dita o preço que você pode cobrar. Pareça o melhor do seu nicho.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.947 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 1.947 3.42 3.42 0 010 4.438 3.42 3.42 0 00-1.947 1.946 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-1.947 3.42 3.42 0 010-4.438z" },
                      { title: "CTR Booster", desc: "Artes otimizadas para o clique. Transformamos impressões em visitas reais.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                      { title: "Identidade Única", desc: "Fuja dos templates que todo mundo usa. Tenha um visual 100% autêntico.", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
                      { title: "Psychology of Color", desc: "Usamos as cores certas para evocar as emoções que levam à compra.", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }
                    ].map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan/20 transition-all">
                        <svg className="w-6 h-6 text-cyan mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon} />
                        </svg>
                        <h4 className="font-display text-[10px] text-white uppercase tracking-widest mb-2">{item.title}</h4>
                        <p className="text-[11px] text-silver/60 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* --- ADS POWER SECTION (TRAFEGO PAGO) --- */}
        {id === 'trafego-pago' && (
          <div className="mb-32">
            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-violet/10 blur-[120px] -mr-48 -mt-48" />
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan/10 blur-[120px] -ml-48 -mb-48" />

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="font-display text-xs text-violet uppercase tracking-[0.4em] mb-4 block">PERFORMANCE ADVERTISING</span>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight">
                      Pare de Postar e Comece a <span className="text-cyan">Escalar</span>
                    </h2>
                    <p className="font-sans text-silver/60 mb-12 max-w-lg">
                      O orgânico morreu para quem tem pressa de vender. Com nossa estratégia de Ads, transformamos seu investimento em uma máquina previsível de geração de demanda.
                    </p>

                    <div ref={adsChartRef} className="space-y-10">
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-xs uppercase tracking-widest text-silver/40">Alcance Orgânico (Espera & Sorte)</span>
                           <span className="text-[10px] text-red-500/60 uppercase">Efeito Lento</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                           <div className="scale-bar-fill h-full bg-white/10" data-target="8" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-xs uppercase tracking-widest text-cyan">Tráfego Pago DEV_HQ (Impacto Imediato)</span>
                           <span className="text-[10px] text-cyan uppercase font-bold">Controle 100%</span>
                        </div>
                        <div className="h-6 bg-white/5 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.15)]">
                           <div className="scale-bar-fill h-full bg-gradient-to-r from-cyan to-violet shadow-[0_0_15px_#00E5FF]" data-target="100" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { title: "Segmentação Laser", val: "Foco no Comprador", desc: "Apareça apenas para quem já está buscando seu produto ou tem o perfil exato do seu cliente ideal.", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
                      { title: "ROAS & ROI", val: "Previsibilidade", desc: "Saiba exatamente quanto volta para cada real investido. Marketing que não é gasto, é investimento.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                      { title: "Remarketing Infinito", val: "Venda de Cerco", desc: "Não deixe ninguém escapar. 'Persiga' quem visitou seu site até que a conversão aconteça.", icon: "M13 5l7 7-7 7M5 5l7 7-7 7" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-violet/30 transition-all group">
                         <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d={item.icon} />
                            </svg>
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-2">
                               <h4 className="font-display text-[10px] text-white uppercase tracking-widest">{item.title}</h4>
                               <span className="text-[9px] px-2 py-0.5 bg-violet/20 text-violet rounded-full font-bold uppercase tracking-tighter">{item.val}</span>
                            </div>
                            <p className="text-xs text-silver/50 leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* --- RELAXED CASES SECTION --- */}
        {relatedProjects.length > 0 && (
          <div ref={relatedRef} className="pt-32 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-xl">
                <span className="font-display text-xs text-cyan uppercase tracking-[0.4em] mb-4 block">CASE STUDIES</span>
                <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
                  Projetos de <span className="text-white/30 italic">{projectType}</span>
                </h2>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/5 to-transparent mx-8 hidden md:block mb-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {relatedProjects.map((project, index) => (
                <a 
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card group block relative"
                >
                  <div className="relative aspect-[16/11] rounded-[32px] overflow-hidden border border-white/5 bg-[#0D0D0D]">
                    <img 
                      src={project.image} 
                      alt={project.client} 
                      className={`w-full h-full object-cover transition-all duration-1000 ${id === 'artes-digitais' ? 'opacity-80 group-hover:opacity-100' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'} group-hover:scale-105`}
                    />
                    
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] text-white uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.roi && (
                      <div className={`absolute top-6 right-6 ${id === 'landing-pages' ? 'bg-[#00FF00]' : 'bg-cyan'} px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,229,255,0.3)] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2`}>
                        {id === 'landing-pages' && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-black">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                        <span className="text-[10px] font-display font-bold text-black uppercase">{project.roi}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                      <div>
                        <span className="text-[10px] font-accent text-cyan/60 uppercase tracking-[0.3em] mb-2 block">{project.year} — {project.type}</span>
                        <h3 className="font-display text-3xl md:text-4xl text-white group-hover:text-cyan transition-colors">{project.client}</h3>
                      </div>
                      <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-500">
                        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:text-black transition-colors">
                          <path d="M1 11L11 1M11 1H3M11 1V9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
