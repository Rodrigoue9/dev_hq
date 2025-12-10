import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Components
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import CanvasBackground from './components/CanvasBackground';
import Header from './components/Header';
import Home from './components/Home';
import ServiceDetail from './components/ServiceDetail';

// ScrollToTop component to ensure navigation starts at top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <main className="w-full min-h-screen bg-bg text-white selection:bg-violet selection:text-white">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        
        <CustomCursor />
        
        {/* Background is fixed globally */}
        <CanvasBackground />

        {/* Header is fixed globally */}
        {!loading && <Header />}

        {/* Routes */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}