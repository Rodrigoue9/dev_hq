import React from 'react';

interface ContactFormProps {
  serviceName?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ serviceName }) => {
  return (
    <form 
      action="https://formsubmit.co/rodrigoue9oficial@gmail.com" 
      method="POST"
      className="flex flex-col gap-6 w-full"
    >
      {/* FormSubmit Configuration */}
      <input type="hidden" name="_subject" value={`Novo contato via Portfolio: ${serviceName || 'Geral'}`} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      
      {/* Context info */}
      <input type="hidden" name="service_interest" value={serviceName || 'Consulta Geral'} />

      <div className="group relative">
        <input
          type="text"
          name="name"
          required
          placeholder="SEU NOME"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan/50 transition-colors"
        />
      </div>

      <div className="group relative">
        <input
          type="email"
          name="email"
          required
          placeholder="SEU EMAIL"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan/50 transition-colors"
        />
      </div>

      <div className="group relative">
        <textarea
          name="message"
          rows={4}
          required
          placeholder="FALE SOBRE SEU PROJETO"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan/50 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="group relative w-full py-4 bg-white text-black font-display font-bold tracking-widest uppercase rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
      >
        <span className="absolute inset-0 bg-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <span className="relative z-10 flex items-center justify-center gap-2">
          Enviar Proposta
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 11L11 1M11 1H3M11 1V9" />
          </svg>
        </span>
      </button>
    </form>
  );
};

export default ContactForm;