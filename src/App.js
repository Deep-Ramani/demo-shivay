import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WhatsAppOutlined } from '@ant-design/icons';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrustedBanner from './components/TrustedBanner';
import Categories from './components/Categories';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ContactSection from './components/ContactSection';
import Timeline from './components/Timeline';
import AboutUs from './components/AboutUs';

function App() {
  const [showLoader,   setShowLoader]   = useState(false);
  const [loaderExiting, setLoaderExiting] = useState(false);

  const handleLogoClick = useCallback(() => {
    setLoaderExiting(false);
    setShowLoader(true);
    setTimeout(() => setLoaderExiting(true), 2800);
    setTimeout(() => {
      setShowLoader(false);
      setLoaderExiting(false);
      document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 3300);
  }, []);

  return (
    <Router>
      <div className="App">
        {showLoader && <Loader exiting={loaderExiting} />}
        <Header onLogoClick={handleLogoClick} />

        <Routes>
          {/* ── Homepage ───────────────────────────────────────── */}
          <Route
            path="/"
            element={
              <>
                <main className="main-content">
                  <HeroSection />
                  <section id="trusted"><TrustedBanner /></section>
                  <section id="categories"><Categories /></section>
                  <section id="about"><AboutUs /></section>
                  <section id="timeline"><Timeline /></section>
                  <section id="contact"><ContactSection /></section>
                </main>
                <Footer />
              </>
            }
          />

        </Routes>

        {/* Floating WhatsApp */}
        <a
          href="https://wa.me/918320287041"
          className="floating-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppOutlined />
        </a>
      </div>
    </Router>
  );
}

export default App;
