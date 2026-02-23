import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, WhatsAppOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './BestSellingProducts.css';

function BestSellingProducts() {

  const products = [
    {
      id: 1,
      name: 'Balwaan BX-52 2 Stroke 52cc Side Pack Brush Cutter',
      image: 'https://picsum.photos/300/300?random=41',
      originalPrice: 15999,
      discountedPrice: 8999,
      savings: 7000,
      status: 'Best Seller',
      statusColor: '#ff9800'
    },
    {
      id: 2,
      name: 'Balwaan 22 No. HTP Sprayer with 6.5HP Engine & 50 Mtr',
      image: 'https://picsum.photos/300/300?random=42',
      originalPrice: 45000,
      discountedPrice: 32000,
      savings: 13000,
      status: 'Hot Deal',
      statusColor: '#ff5722'
    },
    {
      id: 3,
      name: 'Balwaan Double Motor Battery Sprayer BS-22D | 12 Volts',
      image: 'https://picsum.photos/300/300?random=43',
      originalPrice: 8999,
      discountedPrice: 6499,
      savings: 2500,
      status: 'Trending',
      statusColor: '#2196f3'
    },
    {
      id: 4,
      name: 'Balwaan BS-20 Single Motor Battery Sprayer | 12x8',
      image: 'https://picsum.photos/300/300?random=44',
      originalPrice: 6500,
      discountedPrice: 4999,
      savings: 1501,
      status: 'Featured',
      statusColor: '#9c27b0'
    },
    {
      id: 5,
      name: 'Balwaan Agricultural Sprayer Machine with Motor',
      image: 'https://picsum.photos/300/300?random=45',
      originalPrice: 12000,
      discountedPrice: 8500,
      savings: 3500,
      status: 'New',
      statusColor: '#4caf50'
    },
    {
      id: 6,
      name: 'Balwaan Heavy Duty Garden Shears Professional',
      image: 'https://picsum.photos/300/300?random=46',
      originalPrice: 2500,
      discountedPrice: 1799,
      savings: 701,
      status: 'Best Seller',
      statusColor: '#ff9800'
    },
    {
      id: 7,
      name: 'Balwaan Petrol Operated Water Pump 2 Inch',
      image: 'https://picsum.photos/300/300?random=47',
      originalPrice: 18500,
      discountedPrice: 14999,
      savings: 3501,
      status: 'Hot Deal',
      statusColor: '#ff5722'
    },
    {
      id: 8,
      name: 'Balwaan Electric Cultivator Tiller for Farming',
      image: 'https://picsum.photos/300/300?random=48',
      originalPrice: 25000,
      discountedPrice: 19999,
      savings: 5001,
      status: 'Trending',
      statusColor: '#2196f3'
    }
  ];

  const scrollLeft = () => {
    document.querySelector('.best-selling-scroll-container').scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.querySelector('.best-selling-scroll-container').scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section className="best-selling-section">
      <div className="best-selling-header">
        <h2 className="best-selling-title">Best Selling Products</h2>
        <div className="header-nav-arrows">
          <button className="nav-arrow-btn" onClick={scrollLeft}>
            <LeftOutlined />
          </button>
          <button className="nav-arrow-btn" onClick={scrollRight}>
            <RightOutlined />
          </button>
        </div>
      </div>

      <div className="best-selling-carousel-wrapper">

        <div className="best-selling-scroll-container">
          <Row gutter={[20, 20]} wrap={false} className="best-selling-row">
            {products.map(product => (
              <Col key={product.id} flex="0 0 280px">
                <Card
                  hoverable
                  className="best-selling-card"
                  cover={
                    <div className="best-selling-card-image-wrapper">
                      <div className="card-badges">
                        <span className="status-badge" style={{ backgroundColor: product.statusColor }}>
                          {product.status}
                        </span>

                      </div>
                      <img alt={product.name} src={product.image} className="best-selling-card-image" />
                    </div>
                  }
                >
                  <div className="best-selling-card-content">
                    <h3 className="best-selling-product-name">{product.name}</h3>

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

export default BestSellingProducts;
