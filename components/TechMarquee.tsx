import React from 'react';

const technologies = [
  { name: 'React', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"></circle><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"></ellipse></svg> },
  { name: 'Next.js', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path><path d="M15 15L9 9"></path><path d="M9 15V9H10.5V13.5L14.5 9H15V15H13.5V10.5L9.5 15H9Z"></path></svg> },
  { name: 'Node.js', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7L12 12L22 7L12 2Z"></path><path d="M2 17L12 22L22 17"></path><path d="M2 12L12 17L22 12"></path></svg> },
  { name: 'Tailwind CSS', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.5 4.5A5.5 5.5 0 0 1 18 10V14A5.5 5.5 0 0 1 12.5 19.5A5.5 5.5 0 0 1 7 14V10A5.5 5.5 0 0 1 12.5 4.5Z"></path><path d="M12.5 10A5.5 5.5 0 0 0 7 4.5V4.5A5.5 5.5 0 0 0 1.5 10V14A5.5 5.5 0 0 0 7 19.5V19.5A5.5 5.5 0 0 0 12.5 14Z"></path></svg> },
  { name: 'Figma', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18.5C6 20.433 7.567 22 9.5 22C11.433 22 13 20.433 13 18.5V15H9.5C7.567 15 6 16.567 6 18.5Z"></path><path d="M9.5 15H13V8H9.5C7.567 8 6 9.567 6 11.5C6 13.433 7.567 15 9.5 15Z"></path><path d="M13 15C13 16.933 14.567 18.5 16.5 18.5C18.433 18.5 20 16.933 20 15C20 13.067 18.433 11.5 16.5 11.5H13V15Z"></path><path d="M13 11.5H16.5C18.433 11.5 20 9.933 20 8C20 6.067 18.433 4.5 16.5 4.5C14.567 4.5 13 6.067 13 8V11.5Z"></path><path d="M9.5 8H13V4.5C13 2.567 11.433 1 9.5 1C7.567 1 6 2.567 6 4.5C6 6.433 7.567 8 9.5 8Z"></path></svg> },
  { name: 'TypeScript', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M9 10L10 10C10.5523 10 11 10.4477 11 11V15C11 15.5523 10.5523 16 10 16H8C7.44772 16 7 15.5523 7 15V14"></path><path d="M16 14H15C14.4477 14 14 13.5523 14 13V11C14 10.4477 14.4477 10 15 10H17"></path><path d="M11 13H15"></path></svg> },
  { name: 'Stripe', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg> },
  { name: 'GSAP', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> },
];

const TechMarquee: React.FC = () => {
  return (
    <div className="py-20 border-y border-white/5 bg-black overflow-hidden relative z-20">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 mb-8">
         <span className="font-display text-[10px] text-silver/40 uppercase tracking-[0.4em]">Engineered with High-End Technology</span>
      </div>

      <div className="flex w-fit animate-marquee hover:pause select-none">
        {/* We double the array for an infinite loop effect */}
        {[...technologies, ...technologies, ...technologies].map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 px-12 opacity-40 hover:opacity-100 transition-opacity duration-300 group cursor-default"
          >
            <div className="w-8 h-8 text-silver group-hover:text-cyan transition-colors">
              {tech.icon}
            </div>
            <span className="font-display text-xl text-white tracking-widest uppercase">{tech.name}</span>
          </div>
        ))}
      </div>
      
      {/* Required CSS for the marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); } /* Since we tripled the array, slide 1/3 of the width */
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TechMarquee;
