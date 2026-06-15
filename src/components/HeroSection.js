import { useEffect, useRef } from 'react';
import './HeroSection.css';

function HeroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      sectionRef.current?.classList.add('hero-animated');
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section className="hero-section" id="home" ref={sectionRef}>
      <div className="hero-inner">

        {/* ── Left: copy ─────────────────────────────────────────── */}
        <div className="hero-copy">
          <span className="hero-eyebrow">India&apos;s #1 Agricultural Brand</span>

          <div className="hero-title-group">
            <p className="hero-script">Premium Quality</p>
            <h1 className="hero-heading">
              AGRICULTURAL<br />
              <span>EQUIPMENT</span>
            </h1>
          </div>

          <p className="hero-desc">
            Proin eget tortor risus. Proin eget tortor risus. Nulla quis lorem ut libero
            malesuada feugiat. Cras ultricies ligula sed magna dictum porta.
          </p>

          <button className="hero-cta-btn" onClick={() => scrollTo('#categories')}>
            Explore <span className="cta-arrow">→</span>
          </button>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-num">10L+</span>
              <span className="stat-lbl">Farmers Served</span>
            </div>
            <div className="stat-sep" />
            <div className="hero-stat">
              <span className="stat-num">1,500+</span>
              <span className="stat-lbl">Active Dealers</span>
            </div>
            <div className="stat-sep" />
            <div className="hero-stat">
              <span className="stat-num">OEM</span>
              <span className="stat-lbl">Certified</span>
            </div>
          </div>
        </div>

        {/* ── Right: image ───────────────────────────────────────── */}
        <div className="hero-visual">
          <img
            src="https://picsum.photos/700/600?random=200"
            alt="Shivam Agrotech Equipment"
            className="hero-img"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

export default HeroSection;
