import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ShivamLogo } from './Logo';
import './Header.css';

const navLinks = [
  { key: 'categories', label: 'CATEGORIES', href: '#categories' },
  { key: 'products',   label: 'PRODUCTS',   href: '#products'   },
  { key: 'contact',    label: 'CONTACTS',   href: '#contact'    },
];

function Header({ onLogoClick }) {
  const [activeKey, setActiveKey]   = useState('');
  const [scrolled, setScrolled]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ── Scroll: header shadow + section-based active highlight ── */
  useEffect(() => {
    const HEADER_H = 80;

    const detect = () => {
      setScrolled(window.scrollY > 60);

      let current = '';
      for (const { key, href } of [...navLinks].reverse()) {
        const el = document.querySelector(href);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= HEADER_H + 40 && bottom > window.innerHeight * 0.2) {
          current = key;
          break;
        }
      }
      setActiveKey(current);
    };

    window.addEventListener('scroll', detect, { passive: true });
    detect();
    return () => window.removeEventListener('scroll', detect);
  }, []);

  const handleNavClick = (key, href) => {
    setDrawerOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">

        {/* Logo */}
        <button className="header-logo" onClick={onLogoClick} aria-label="Go to home">
          <ShivamLogo width={160} height={52} verticalAlign="middle" />
        </button>

        {/* Desktop navigation */}
        <nav className="header-nav" aria-label="Main navigation">
          {navLinks.map(link => (
            <button
              key={link.key}
              className={`nav-link ${activeKey === link.key ? 'nav-link-active' : ''}`}
              onClick={() => handleNavClick(link.key, link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="header-actions">
          <button
            className="header-cta"
            onClick={() => handleNavClick('contact', '#contact')}
          >
            <span className="header-cta-dot" />
            Enquire Now
          </button>

          {/* Hamburger — mobile only */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="mobile-menu-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          />
        </div>
      </div>

      {/* Mobile drawer */}
      <Drawer
        title={<ShivamLogo width={140} height={46} verticalAlign="middle" />}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        styles={{
          wrapper: { width: 280 },
          body:   { padding: '12px 0', background: '#ffffff' },
          header: { background: '#ffffff', borderBottom: '1px solid #eee' },
        }}
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <button
              key={link.key}
              className={`mobile-nav-link ${activeKey === link.key ? 'mobile-nav-link-active' : ''}`}
              onClick={() => handleNavClick(link.key, link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}

Header.propTypes = {
  onLogoClick: PropTypes.func,
};

export default Header;
