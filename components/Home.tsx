import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Projects from './Projects';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <div id="services">
        <Services />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <Footer />
    </>
  );
};

export default Home;