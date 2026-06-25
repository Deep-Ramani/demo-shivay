import { useEffect, useState, useCallback } from 'react';
import { WhatsAppOutlined, CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './ProductModal.css';

function ProductModal({ product, onClose }) {
  const [current, setCurrent] = useState(0);

  /* Generate 4 carousel images from the product */
  const images = product.images ?? [
    product.image,
    `https://picsum.photos/600/500?random=${product.id + 100}`,
    `https://picsum.photos/600/500?random=${product.id + 150}`,
    `https://picsum.photos/600/500?random=${product.id + 200}`,
  ];

  const goTo = useCallback(idx => setCurrent(idx), []);
  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  useEffect(() => {
    setCurrent(0); // reset on product change
  }, [product.id]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = e => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, current]);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm-panel" onClick={e => e.stopPropagation()}>

        <button className="pm-close" onClick={onClose} aria-label="Close">
          <CloseOutlined />
        </button>

        {/* ── Left: carousel ───────────────────────────────────── */}
        <div className="pm-img-side">
          {product.badge && <span className="pm-badge">{product.badge}</span>}

          {/* Main image */}
          <div className="pm-carousel-main">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${product.name} view ${i + 1}`}
                className={`pm-car-img${i === current ? ' pm-car-img--active' : ''}`}
              />
            ))}

            <button className="pm-car-arrow pm-car-arrow--prev" onClick={prev} aria-label="Previous image">
              <LeftOutlined />
            </button>
            <button className="pm-car-arrow pm-car-arrow--next" onClick={next} aria-label="Next image">
              <RightOutlined />
            </button>

            <div className="pm-car-counter">{current + 1} / {images.length}</div>
          </div>

          {/* Thumbnail strip */}
          <div className="pm-thumbnails">
            {images.map((src, i) => (
              <button
                key={i}
                className={`pm-thumb${i === current ? ' pm-thumb--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt={`Thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: details ───────────────────────────────────── */}
        <div className="pm-detail-side">
          <span className="pm-category">{product.category}</span>

          <h2 className="pm-title">{product.name}</h2>

          <div className="pm-price-row">
            <span className="pm-price">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="pm-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            <span className="pm-discount">{discount}% OFF</span>
          </div>

          <p className="pm-desc">{product.desc}</p>

          <div className="pm-divider" />

          <ul className="pm-specs">
            {product.specs.map((spec, i) => (
              <li key={i} className="pm-spec-item">
                <span className="pm-spec-icon">✦</span>
                {spec}
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/918320287041"
            target="_blank"
            rel="noopener noreferrer"
            className="pm-whatsapp-btn"
          >
            <WhatsAppOutlined className="pm-wa-icon" />
            Enquire on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}

export default ProductModal;
