import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, WhatsAppOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './SpecialDeals.css';

function SpecialDeals() {
  const products = [
    {
      id: 1,
      name: 'Balwaan BX-52 2 Stroke 52cc Side Pack Brush Cutter',
      image: 'https://picsum.photos/300/300?random=11',
      discount: 'FLAT 44% OFF'
    },
    {
      id: 2,
      name: 'Balwaan 50cc Back pack crop cum Grass cutter BX-50B',
      image: 'https://picsum.photos/300/300?random=12',
      discount: 'FLAT 40% OFF'
    },
    {
      id: 3,
      name: 'Balwaan 22 No. HTP Sprayer with 6.5HP Engine & 50 Mtr',
      image: 'https://picsum.photos/300/300?random=13',
      discount: 'FLAT 53% OFF'
    },
    {
      id: 4,
      name: 'Balwaan Double Motor Battery Sprayer BS-22D | 12 Volts x 12',
      image: 'https://picsum.photos/300/300?random=14',
      discount: 'FLAT 15% OFF'
    },
    {
      id: 5,
      name: 'Balwaan BS-20 Single Motor Battery Sprayer| 12x8',
      image: 'https://picsum.photos/300/300?random=15',
      discount: 'FLAT 40% OFF'
    },
    {
      id: 6,
      name: 'Balwaan Agricultural Sprayer Machine',
      image: 'https://picsum.photos/300/300?random=16',
      discount: 'FLAT 35% OFF'
    }
  ];

  const scrollLeft = () => {
    document.querySelector('.deals-scroll-container').scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.querySelector('.deals-scroll-container').scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="special-deals-section">
      <div className="deals-header">
        <h2 className="deals-title">Special Deals on Agri Equipment</h2>
        <div className="deals-timer">
          <span className="timer-icon">🕐</span>
          <span className="timer-text">Ending in 23h :39m :9s</span>
        </div>
      </div>

      <div className="deals-carousel-wrapper">
        <Button 
          className="scroll-btn scroll-btn-left" 
          icon={<LeftOutlined />}
          onClick={scrollLeft}
          shape="circle"
          size="large"
        />

        <div className="deals-scroll-container">
          <Row gutter={[20, 20]} wrap={false} className="deals-row">
            {products.map(product => (
              <Col key={product.id} flex="0 0 280px">
                <Card 
                  hoverable
                  className="deal-card"
                  cover={
                    <div className="deal-card-image-wrapper">
                      <div className="discount-badge">{product.discount}</div>
                      <img alt={product.name} src={product.image} className="deal-card-image" />
                    </div>
                  }
                >
                  <h3 className="deal-product-name">{product.name}</h3>
                  <div className="deal-actions">
                    <Button 
                      type="primary" 
                      shape="circle" 
                      icon={<PhoneOutlined />}
                      size="large"
                      className="deal-phone-btn"
                      title="Call Us"
                    />
                    <Button 
                      type="primary" 
                      shape="circle" 
                      icon={<WhatsAppOutlined />}
                      size="large"
                      className="deal-whatsapp-btn"
                      title="WhatsApp Us"
                    />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <Button 
          className="scroll-btn scroll-btn-right" 
          icon={<RightOutlined />}
          onClick={scrollRight}
          shape="circle"
          size="large"
        />
      </div>
    </section>
  );
}

export default SpecialDeals;
