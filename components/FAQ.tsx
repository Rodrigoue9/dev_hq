import React, { useState } from 'react';

const faqData = [
  {
    question: "Qual é o tempo médio de entrega?",
    answer: "A maioria das agências demora meses enrolando o cliente. Aqui, o processo é projetado para hiper-velocidade mantendo o padrão premium. Landing Pages levam em média de 7 a 15 dias, e E-commerces completos levam de 20 a 30 dias para irem ao ar."
  },
  {
    question: "Vocês oferecem suporte depois que o site estiver no ar?",
    answer: "Absolutamente! Nós não te entregamos o código e sumimos. Todos os nossos projetos acompanham um período de garantia de 30 a 90 dias para ajustes estruturais, e oferecemos planos contínuos de manutenção para quem deseja crescer conosco no longo prazo."
  },
  {
    question: "Eu preciso já ter domínio e hospedagem comprados?",
    answer: "Não! Se você ainda não possui, nós guiamos você na compra do melhor domínio para a sua marca e configuramos toda a infraestrutura de hospedagem na AWS/Vercel (as plataformas mais robustas do mundo) para garantir que seu site suporte até 100 mil acessos simultâneos."
  },
  {
    question: "O meu site vai funcionar bem em celulares (Mobile)?",
    answer: "Mais do que 'funcionar bem', o seu site é desenhado com a filosofia Mobile-First. Hoje, mais de 80% do tráfego web vem pelo celular. Portanto, otimizamos primeiro a experiência Mobile para máxima conversão, e em seguida adaptamos para computadores."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 bg-bg relative z-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-display text-xs text-silver/40 uppercase tracking-[0.4em] mb-4 block">DÚVIDAS FREQUENTES</span>
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-tighter">
            Respostas Diretas, <br /><span className="text-cyan italic">Sem Enrolação</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-cyan/50 bg-white/5' : 'border-white/10 bg-transparent hover:border-white/20'}`}
            >
              <button
                className="w-full text-left px-6 lg:px-10 py-6 lg:py-8 flex justify-between items-center group cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className={`font-display text-lg lg:text-xl transition-colors ${openIndex === index ? 'text-cyan' : 'text-white group-hover:text-silver/80'}`}>
                  {faq.question}
                </h3>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === index ? 'border-cyan bg-cyan/10 text-cyan rotate-180' : 'border-white/10 text-white group-hover:border-white/30'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </button>
              
              <div 
                className={`px-6 lg:px-10 overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="font-sans text-silver/60 pt-4 border-t border-white/5 leading-relaxed text-sm lg:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
