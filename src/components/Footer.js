import React from 'react';
import { Row, Col } from 'antd';
import { 
  LinkedinOutlined, 
  FacebookOutlined, 
  InstagramOutlined, 
  TwitterOutlined, 
  YoutubeOutlined, 
  WhatsAppOutlined 
} from '@ant-design/icons';
import './Footer.css';

function Footer() {
  const companyLinks = [
    { name: 'About Shivam Agrotech', url: '#' },
    { name: 'Careers', url: '#' },
    { name: 'Privacy Policy', url: '#' },
    { name: 'Return Policy', url: '#' },
    { name: 'Terms and Conditions', url: '#' },
    { name: 'Submit your complaint', url: '#' }
  ];

  const helpLinks = [
    { name: 'Track your order', url: '#' },
    { name: 'Contact us', url: '#' },
    { name: 'Sitemap', url: '#' },
    { name: 'Join our WhatsApp Channel', url: '#' }
  ];

  const socialLinks = [
    { icon: <LinkedinOutlined />, url: '#', name: 'LinkedIn' },
    { icon: <FacebookOutlined />, url: '#', name: 'Facebook' },
    { icon: <InstagramOutlined />, url: '#', name: 'Instagram' },
    { icon: <TwitterOutlined />, url: '#', name: 'Twitter' },
    { icon: <YoutubeOutlined />, url: '#', name: 'YouTube' },
    { icon: <WhatsAppOutlined />, url: '#', name: 'WhatsApp' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <Row gutter={[40, 40]} className="footer-main">
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="footer-brand">
              <img 
                src="https://via.placeholder.com/180x60/c62828/ffffff?text=Shivam+Agrotech" 
                alt="Shivam Agrotech Logo" 
                className="footer-logo"
              />
              <p className="footer-description">
                One of India's fastest-growing Agri machines & tools brands. You will find the best selection of tillers, brush cutters, augers, sprayers, and other outdoor power tools here. From rural to urban areas, Shivam Agrotech will help you manage your outdoor work quickly, efficiently and easily!
              </p>
            </div>
          </Col>

          <Col xs={12} sm={8} md={6} lg={5}>
            <div className="footer-column">
              <h3 className="footer-column-title">Company</h3>
              <ul className="footer-links">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col xs={12} sm={8} md={6} lg={5}>
            <div className="footer-column">
              <h3 className="footer-column-title">Help</h3>
              <ul className="footer-links">
                {helpLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col xs={24} sm={8} md={24} lg={6}>
            <div className="footer-column">
              <h3 className="footer-column-title">Grievance Redressal</h3>
              <div className="grievance-info">
                <p className="grievance-name">Jatin Basantani</p>
                <p className="grievance-detail">
                  <a href="mailto:Grievance@shivamagrotech.com">Grievance@shivamagrotech.com</a>
                </p>
                <p className="grievance-detail">
                  Contact: <a href="tel:+919240011124">+91-9240011124</a>
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>Copyright © 2026 Modish TractorAurKisan Pvt. Ltd. All rights reserved.</p>
          </div>
          <div className="footer-social">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                className="social-icon"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
