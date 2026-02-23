import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, WhatsAppOutlined, HeartOutlined, HeartFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './SpecialDeals.css';

function SpecialDeals() {
  const [favorites, setFavorites] = useState({});

  const products = [
    {
      id: 1,
      name: 'Balwaan BX-52 2 Stroke 52cc Side Pack Brush Cutter',
      image: 'https://picsum.photos/300/300?random=11',
      status: 'New',
      statusColor: '#4caf50'
    },
    {
      id: 2,
      name: 'Balwaan 50cc Back pack crop cum Grass cutter BX-50B',
      image: 'https://picsum.photos/300/300?random=12',
      status: 'Hot Deal',
      statusColor: '#ff5722'
    },
    {
      id: 3,
      name: 'Balwaan 22 No. HTP Sprayer with 6.5HP Engine & 50 Mtr',
      image: 'https://picsum.photos/300/300?random=13',
      status: 'Trending',
      statusColor: '#2196f3'
    },
    {
      id: 4,
      name: 'Balwaan Double Motor Battery Sprayer BS-22D | 12 Volts x 12',
      image: 'https://picsum.photos/300/300?random=14',
      status: 'Featured',
      statusColor: '#9c27b0'
    },
    {
      id: 5,
      name: 'Balwaan BS-20 Single Motor Battery Sprayer| 12x8',
      image: 'https://picsum.photos/300/300?random=15',
      status: 'New',
      statusColor: '#4caf50'
    },
    {
      id: 6,
      name: 'Balwaan Agricultural Sprayer Machine',
      image: 'https://picsum.photos/300/300?random=16',
      status: 'Best Seller',
      statusColor: '#ff9800'
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
        <div className="header-nav-arrows">
          <button className="nav-arrow-btn" onClick={scrollLeft}>
            <LeftOutlined />
          </button>
          <button className="nav-arrow-btn" onClick={scrollRight}>
            <RightOutlined />
          </button>
        </div>
      </div>

      <div className="deals-carousel-wrapper">

        <div className="deals-scroll-container">
          <Row gutter={[20, 20]} wrap={false} className="deals-row">
            {products.map(product => (
              <Col key={product.id} flex="0 0 280px">
                <Card 
                  hoverable
                  className="deal-card"
                  cover={
                    <div className="deal-card-image-wrapper">
                      <div className="card-badges">
                        <span className="status-badge" style={{ backgroundColor: product.statusColor }}>
                          {product.status}
                        </span>
                        <button 
                          className="favorite-btn"
                          onClick={() => toggleFavorite(product.id)}
                        >
                          {favorites[product.id] ? 
                            <HeartFilled style={{ color: '#ff4d4f' }} /> : 
                            <HeartOutlined />
                          }
                        </button>
                      </div>
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
      </div>
    </section>
  );
}

export default SpecialDeals;
