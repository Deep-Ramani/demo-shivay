import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, WhatsAppOutlined, LeftOutlined, RightOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import './NewLaunches.css';

function NewLaunches() {
  const [favorites, setFavorites] = useState({});

  const products = [
    {
      id: 1,
      name: 'Balwaan 3 in 1 Manual Sprayer SP-22 | 2 LTR...',
      image: 'https://picsum.photos/300/300?random=31',
      originalPrice: 2249,
      discountedPrice: 1490,
      savings: 759,
      discountPercent: '33% OFF',
      status: 'New',
      statusColor: '#4caf50'
    },
    {
      id: 2,
      name: 'Balwaan BT-65 2-in-1 Emergency Torch & Lantern...',
      image: 'https://picsum.photos/300/300?random=32',
      originalPrice: 2459,
      discountedPrice: 1490,
      savings: 969,
      discountPercent: '39% OFF',
      status: 'Hot Deal',
      statusColor: '#ff5722'
    },
    {
      id: 3,
      name: 'Balwaan BT-60 Rechargeable 2-in-1 Torch ...',
      image: 'https://picsum.photos/300/300?random=33',
      originalPrice: 1999,
      discountedPrice: 1190,
      savings: 809,
      discountPercent: '40% OFF',
      status: 'Trending',
      statusColor: '#2196f3'
    },
    {
      id: 4,
      name: 'Balwaan Rechargeable BT-20 LED Search Light Torch |...',
      image: 'https://picsum.photos/300/300?random=34',
      originalPrice: 900,
      discountedPrice: 690,
      savings: 300,
      discountPercent: '30% OFF',
      status: 'Featured',
      statusColor: '#9c27b0'
    },
    {
      id: 5,
      name: 'Balwaan Rechargeable BT-12 LED Search Light Torch |...',
      image: 'https://picsum.photos/300/300?random=35',
      originalPrice: 490,
      discountedPrice: 350,
      savings: 140,
      discountPercent: '28% OFF',
      status: 'New',
      statusColor: '#4caf50'
    },
    {
      id: 6,
      name: 'Balwaan Power Reaper PR-900 | 5HP Greaves Diesel...',
      image: 'https://picsum.photos/300/300?random=36',
      originalPrice: 160000,
      discountedPrice: 120000,
      savings: 40000,
      discountPercent: '25% OFF',
      rating: 4.9,
      totalRatings: 115,
      status: 'Best Seller',
      statusColor: '#ff9800'
    },
    {
      id: 7,
      name: 'Balwaan Heavy Duty Brush Cutter BX-75',
      image: 'https://picsum.photos/300/300?random=37',
      originalPrice: 8999,
      discountedPrice: 5999,
      savings: 3000,
      discountPercent: '33% OFF',
      status: 'Hot Deal',
      statusColor: '#ff5722'
    },
    {
      id: 8,
      name: 'Balwaan Professional Chainsaw CS-18',
      image: 'https://picsum.photos/300/300?random=38',
      originalPrice: 12500,
      discountedPrice: 8750,
      savings: 3750,
      discountPercent: '30% OFF',
      status: 'Trending',
      statusColor: '#2196f3'
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const scrollLeft = () => {
    document.querySelector('.new-launches-scroll-container').scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.querySelector('.new-launches-scroll-container').scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section className="new-launches-section">
      <div className="new-launches-header">
        <h2 className="new-launches-title">New Launches</h2>
        <div className="header-nav-arrows">
          <button className="nav-arrow-btn" onClick={scrollLeft}>
            <LeftOutlined />
          </button>
          <button className="nav-arrow-btn" onClick={scrollRight}>
            <RightOutlined />
          </button>
        </div>
      </div>

      <div className="new-launches-carousel-wrapper">

        <div className="new-launches-scroll-container">
          <Row gutter={[20, 20]} wrap={false} className="new-launches-row">
            {products.map(product => (
              <Col key={product.id} flex="0 0 280px">
                <Card
                  hoverable
                  className="new-launch-card"
                  cover={
                    <div className="new-launch-card-image-wrapper">
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
                      <img alt={product.name} src={product.image} className="new-launch-card-image" />
                    </div>
                  }
                >
                  <div className="new-launch-card-content">
                    <h3 className="new-launch-product-name">{product.name}</h3>

                    <div className="savings-info">
                      <span className="savings-amount">You save ₹{product.savings.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="card-footer">
                      <div className="contact-icons">
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
                    </div>
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

export default NewLaunches;
