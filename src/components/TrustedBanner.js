import React from 'react';
import {
  SafetyCertificateOutlined,
  CarOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './TrustedBanner.css';

const trustPoints = [
  {
    id: 1,
    icon: <SafetyCertificateOutlined />,
    title: '100% OEM Certified',
    desc: 'Genuine parts with quality assurance',
  },
  {
    id: 2,
    icon: <CarOutlined />,
    title: 'Free Delivery',
    desc: 'On all orders above ₹999',
  },
  {
    id: 3,
    icon: <CustomerServiceOutlined />,
    title: '365-Day Support',
    desc: 'Expert helpline, pre & post purchase',
  },
  {
    id: 4,
    icon: <TeamOutlined />,
    title: '10 Lakh+ Farmers',
    desc: 'Trusted across India',
  },
];

function TrustedBanner() {
  return (
    <section className="trusted-section">
      <div className="trusted-inner">
        {trustPoints.map(pt => (
          <div key={pt.id} className="trust-item">
            <div className="trust-icon-wrap">{pt.icon}</div>
            <div className="trust-text">
              <h4 className="trust-title">{pt.title}</h4>
              <p className="trust-desc">{pt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustedBanner;
