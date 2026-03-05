import React, { useEffect } from 'react';
import Hero from './Hero';
import TechMarquee from './TechMarquee';
import Services from './Services';
import Methodology from './Methodology';
import Projects from './Projects';
import FAQ from './FAQ';
import Footer from './Footer';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "DEV_HQ | Engenharia de Software & Marketing";
  }, []);
  return (
    <>
      <Hero />
      <div id="tech">
        <TechMarquee />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="methodology">
        <Methodology />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <Footer />
    </>
  );
};

export default Home;