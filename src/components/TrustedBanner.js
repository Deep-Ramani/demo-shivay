import React from 'react';
import { Row, Col, Card } from 'antd';
import { FileTextOutlined, InboxOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import './TrustedBanner.css';

function TrustedBanner() {
  const features = [
    {
      id: 1,
      icon: <FileTextOutlined />,
      title: 'OEM Products',
      description: 'Genuine OEM products with quality assurance.'
    },
    {
      id: 2,
      icon: <InboxOutlined />,
      title: 'Spare Parts and Accessories',
      description: 'Check out our spares and accessories section.'
    },
    {
      id: 3,
      icon: <CustomerServiceOutlined />,
      title: '365 Days Call Support',
      description: 'Pre or post purchase assistance from Balwaan experts.'
    }
  ];

  return (
    <section className="trusted-banner-section">
      <div className="trusted-banner-content">
        <div className="trusted-header">
          <h2 className="trusted-title">
            <span className="farmer-emoji">👨‍🌾</span>
            <span className="heart-emoji">❤️</span>
            Trusted by 10+ lakhs of farmers
          </h2>
          <p className="trusted-subtitle">
            The best services and features to ensure a seamless buying experience for you.
          </p>
        </div>

        <Row gutter={[24, 24]} className="features-row">
          {features.map(feature => (
            <Col key={feature.id} xs={24} sm={12} md={8}>
              <Card className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default TrustedBanner;
