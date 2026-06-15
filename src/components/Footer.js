import { InstagramOutlined, FacebookOutlined, WhatsAppOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Footer.css';

const quickLinks = [
  { name: 'Home',       to: '/'            },
  { name: 'Categories', to: '/#categories' },
  { name: 'About Us',   to: '#'            },
  { name: 'Contact Us', to: '#'            },
  { name: 'Locate Us',  to: '#'            },
];

const categories = [
  { name: 'OEM Products',     to: '/#categories' },
  { name: 'Battery Sprayers', to: '/#categories' },
  { name: 'Brush Cutters',    to: '/#categories' },
  { name: 'Water Pumps',      to: '/#categories' },
  { name: 'Chainsaws',        to: '/#categories' },
  { name: 'Tillers',          to: '/#categories' },
];

function Footer() {
  return (
    <footer className="footer">

      {/* ── Decorative blobs ────────────────────────────────────── */}
      <div className="footer-blob footer-blob-1" aria-hidden="true" />
      <div className="footer-blob footer-blob-2" aria-hidden="true" />

      {/* ── Top tagline band ────────────────────────────────────── */}
      <div className="footer-band">
        <span className="footer-band-line" aria-hidden="true" />
        <span className="footer-band-text">Where The Quality Speaks</span>
        <span className="footer-band-line" aria-hidden="true" />
      </div>

      {/* ── Main columns ────────────────────────────────────────── */}
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo-text">
            <span className="footer-logo-shivam">Shivam</span>
            <span className="footer-logo-agrotech"> Agrotech</span>
          </div>
          <p className="footer-tagline">
            One of India's trusted Agri machines &amp; tools brands — delivering
            reliable tillers, sprayers, brush cutters &amp; more to farmers across
            the country.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" className="footer-social-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined />
            </a>
            <a href="https://facebook.com" className="footer-social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined />
            </a>
            <a href="https://wa.me/918320287041" className="footer-social-btn" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <WhatsAppOutlined />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">
            <span>Quick Links</span>
          </h4>
          <ul className="footer-col-list">
            {quickLinks.map(link => (
              <li key={link.name}>
                <Link to={link.to}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-col-title">
            <span>Categories</span>
          </h4>
          <ul className="footer-col-list">
            {categories.map(cat => (
              <li key={cat.name}>
                <Link to={cat.to}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">
            <span>Contact Us</span>
          </h4>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-contact-icon-wrap"><EnvironmentOutlined /></span>
              <div>
                <p className="footer-contact-label">Our Location</p>
                <span>Rajkot, Gujarat, India</span>
              </div>
            </li>
            <li>
              <span className="footer-contact-icon-wrap"><PhoneOutlined /></span>
              <div>
                <p className="footer-contact-label">Call Us</p>
                <a href="tel:+918320287041">+91 83202 87041</a>
              </div>
            </li>
            <li>
              <span className="footer-contact-icon-wrap"><MailOutlined /></span>
              <div>
                <p className="footer-contact-label">Email Us</p>
                <a href="mailto:info@shivamagrotech.com">info@shivamagrotech.com</a>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div className="footer-bottom">
        <span>© 2026 Shivam Agrotech. All rights reserved.</span>
        <span>Made in India ✦ Trusted by Farmers</span>
      </div>
    </footer>
  );
}

export default Footer;
