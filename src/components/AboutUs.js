import './AboutUs.css';

function AboutUs() {
  return (
    <section className="about-section">
      <div className="about-inner">

        {/* ── Left: overlapping circles ──────────────────────────── */}
        <div className="about-images">
          <div className="about-circle-bg" />

          <img
            src="https://picsum.photos/400/400?random=301"
            alt="Shivam Agrotech field operations"
            className="about-img-main"
          />

          <img
            src="https://picsum.photos/280/280?random=302"
            alt="Farmers using equipment"
            className="about-img-secondary"
          />

          <div className="about-badge">
            <span className="badge-num">10L+</span>
            <span className="badge-lbl">Farmers<br />Served</span>
          </div>
        </div>

        {/* ── Right: content ─────────────────────────────────────── */}
        <div className="about-content">
          <span className="about-eyebrow">About Us</span>

          <h2 className="about-heading">
            Empowering farmers with reliable agricultural equipment.
          </h2>

          <p className="about-desc">
            At Shivam Agrotech, we have been dedicated to transforming Indian agriculture
            by providing durable, high-performance equipment built for the needs of every
            farmer — from small holdings to large-scale operations.
          </p>

          <p className="about-sub-heading">Farmers Love Working With Us.</p>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-num">500+</span>
              <p className="about-stat-desc">
                Active dealers across 15+ states ensuring nationwide reach.
              </p>
            </div>
            <div className="about-stat">
              <span className="about-stat-num">OEM</span>
              <p className="about-stat-desc">
                Certified manufacturing quality trusted by industry leaders.
              </p>
            </div>
          </div>

          <button className="about-cta-btn">
            Learn More <span className="about-arrow">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}

export default AboutUs;
