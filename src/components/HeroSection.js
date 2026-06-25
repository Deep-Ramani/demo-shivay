import { useEffect, useRef, useState } from 'react';
import './HeroSection.css';

const HERO_IMAGES = [
  { src: 'https://picsum.photos/700/600?random=200', alt: 'Shivam Agrotech Equipment' },
  { src: 'https://picsum.photos/700/600?random=210', alt: 'Agricultural Machinery' },
  { src: 'https://picsum.photos/700/600?random=220', alt: 'Farming Solutions' },
  { src: 'https://picsum.photos/700/600?random=230', alt: 'Crop Equipment' },
];

const INTERVAL_MS = 3500;

function HeroSection() {
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      sectionRef.current?.classList.add('hero-animated');
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_IMAGES.length);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (idx) => {
    setCurrent(idx);
    resetTimer();
  };

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

        {/* ── Right: carousel ─────────────────────────────────────── */}
        <div className="hero-visual">
          <div className="hero-carousel">
            {HERO_IMAGES.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className={`hero-img${i === current ? ' hero-img--active' : ''}`}
              />
            ))}

            <div className="hero-carousel-dots">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === current ? ' carousel-dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
