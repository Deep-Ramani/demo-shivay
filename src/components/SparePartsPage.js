import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'antd';
import { PhoneOutlined, WhatsAppOutlined, LeftOutlined, RightOutlined, FilterOutlined } from '@ant-design/icons';
import './SparePartsPage.css';

function SparePartsPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(decodeURIComponent(categoryName || 'Sprayer Parts'));

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(decodeURIComponent(categoryName));
    }
  }, [categoryName]);

  const categories = [
    'Sprayer Parts',
    'Reaper Parts',
    'Brush Cutter Parts',
    'Water Pump Parts',
    'Car Washer Parts',
    'Engine Parts',
    'Accessories'
  ];

  const products = {
    'Sprayer Parts': [
      {
        id: 1,
        name: 'High Pressure Spray Pump - 12V DC Motor',
        image: 'https://picsum.photos/300/300?random=201',
        rating: 4.6,
        totalRatings: 156,
        originalPrice: 3500,
        discountedPrice: 2499,
        savings: 1001,
        discountPercent: 29
      },
      {
        id: 2,
        name: 'Sprayer Nozzle Set - Adjustable (Pack of 5)',
        image: 'https://picsum.photos/300/300?random=202',
        rating: 4.5,
        totalRatings: 234,
        originalPrice: 800,
        discountedPrice: 599,
        savings: 201,
        discountPercent: 25
      },
      {
        id: 3,
        name: 'Spray Lance Extension - 2 Meter',
        image: 'https://picsum.photos/300/300?random=203',
        rating: 4.3,
        totalRatings: 87,
        originalPrice: 1200,
        discountedPrice: 899,
        savings: 301,
        discountPercent: 25
      },
      {
        id: 4,
        name: 'Sprayer Battery 12V 8Ah - Rechargeable',
        image: 'https://picsum.photos/300/300?random=204',
        rating: 4.7,
        totalRatings: 312,
        originalPrice: 2500,
        discountedPrice: 1899,
        savings: 601,
        discountPercent: 24
      }
    ],
    'Reaper Parts': [
      {
        id: 5,
        name: 'Reaper Blade Set - Heavy Duty Steel',
        image: 'https://picsum.photos/300/300?random=205',
        rating: 4.8,
        totalRatings: 189,
        originalPrice: 8500,
        discountedPrice: 6499,
        savings: 2001,
        discountPercent: 24
      },
      {
        id: 6,
        name: 'Reaper Belt - V-Type Premium Quality',
        image: 'https://picsum.photos/300/300?random=206',
        rating: 4.4,
        totalRatings: 145,
        originalPrice: 1500,
        discountedPrice: 1099,
        savings: 401,
        discountPercent: 27
      },
      {
        id: 7,
        name: 'Reaper Chain & Sprocket Kit',
        image: 'https://picsum.photos/300/300?random=207',
        rating: 4.6,
        totalRatings: 98,
        originalPrice: 4500,
        discountedPrice: 3299,
        savings: 1201,
        discountPercent: 27
      }
    ],
    'Brush Cutter Parts': [
      {
        id: 8,
        name: 'Brush Cutter Blade - 40 Tooth Steel',
        image: 'https://picsum.photos/300/300?random=208',
        rating: 4.7,
        totalRatings: 267,
        originalPrice: 1200,
        discountedPrice: 799,
        savings: 401,
        discountPercent: 33
      },
      {
        id: 9,
        name: 'Brush Cutter Nylon Cord - 3mm x 100m',
        image: 'https://picsum.photos/300/300?random=209',
        rating: 4.3,
        totalRatings: 178,
        originalPrice: 600,
        discountedPrice: 449,
        savings: 151,
        discountPercent: 25
      },
      {
        id: 10,
        name: 'Brush Cutter Shoulder Harness - Padded',
        image: 'https://picsum.photos/300/300?random=210',
        rating: 4.5,
        totalRatings: 134,
        originalPrice: 1800,
        discountedPrice: 1299,
        savings: 501,
        discountPercent: 28
      }
    ],
    'Water Pump Parts': [
      {
        id: 11,
        name: 'Water Pump Impeller - Cast Iron',
        image: 'https://picsum.photos/300/300?random=211',
        rating: 4.6,
        totalRatings: 201,
        originalPrice: 2500,
        discountedPrice: 1799,
        savings: 701,
        discountPercent: 28
      },
      {
        id: 12,
        name: 'Pump Seal Kit - Complete Set',
        image: 'https://picsum.photos/300/300?random=212',
        rating: 4.4,
        totalRatings: 156,
        originalPrice: 800,
        discountedPrice: 599,
        savings: 201,
        discountPercent: 25
      },
      {
        id: 13,
        name: 'Water Pump Hose - 2 Inch x 10 Meter',
        image: 'https://picsum.photos/300/300?random=213',
        rating: 4.5,
        totalRatings: 189,
        originalPrice: 3500,
        discountedPrice: 2499,
        savings: 1001,
        discountPercent: 29
      }
    ],
    'Car Washer Parts': [
      {
        id: 14,
        name: 'High Pressure Hose - 10 Meter',
        image: 'https://picsum.photos/300/300?random=214',
        rating: 4.5,
        totalRatings: 234,
        originalPrice: 1500,
        discountedPrice: 999,
        savings: 501,
        discountPercent: 33
      },
      {
        id: 15,
        name: 'Foam Gun Attachment - Adjustable',
        image: 'https://picsum.photos/300/300?random=215',
        rating: 4.6,
        totalRatings: 312,
        originalPrice: 1200,
        discountedPrice: 799,
        savings: 401,
        discountPercent: 33
      }
    ],
    'Engine Parts': [
      {
        id: 16,
        name: 'Carburetor Kit - Universal (52cc)',
        image: 'https://picsum.photos/300/300?random=216',
        rating: 4.7,
        totalRatings: 289,
        originalPrice: 1800,
        discountedPrice: 1299,
        savings: 501,
        discountPercent: 28
      },
      {
        id: 17,
        name: 'Spark Plug - NGK Compatible (Pack of 5)',
        image: 'https://picsum.photos/300/300?random=217',
        rating: 4.5,
        totalRatings: 401,
        originalPrice: 500,
        discountedPrice: 349,
        savings: 151,
        discountPercent: 30
      },
      {
        id: 18,
        name: 'Air Filter - High Flow Performance',
        image: 'https://picsum.photos/300/300?random=218',
        rating: 4.4,
        totalRatings: 178,
        originalPrice: 600,
        discountedPrice: 449,
        savings: 151,
        discountPercent: 25
      }
    ],
    'Accessories': [
      {
        id: 19,
        name: 'Safety Goggles - Anti-Fog Professional',
        image: 'https://picsum.photos/300/300?random=219',
        rating: 4.6,
        totalRatings: 345,
        originalPrice: 400,
        discountedPrice: 249,
        savings: 151,
        discountPercent: 38
      },
      {
        id: 20,
        name: 'Work Gloves - Heavy Duty (Pack of 3)',
        image: 'https://picsum.photos/300/300?random=220',
        rating: 4.5,
        totalRatings: 267,
        originalPrice: 600,
        discountedPrice: 399,
        savings: 201,
        discountPercent: 33
      },
      {
        id: 21,
        name: 'Tool Kit - 21 Piece Professional Set',
        image: 'https://picsum.photos/300/300?random=221',
        rating: 4.8,
        totalRatings: 423,
        originalPrice: 3500,
        discountedPrice: 2499,
        savings: 1001,
        discountPercent: 29
      }
    ]
  };

  const scrollLeft = () => {
    document.querySelector('.spare-parts-pills-container')?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.querySelector('.spare-parts-pills-container')?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="spare-parts-page">
      <div className="spare-parts-page-content">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator"> &gt; </span>
          <span className="breadcrumb-current">Spare Parts & Accessories</span>
        </div>

        {/* Page Title */}
        <h1 className="page-title">Spare Parts & Accessories</h1>

        {/* Category Pills */}
        <div className="spare-parts-pills-section">
          <Button 
            className="scroll-arrow scroll-arrow-left" 
            icon={<LeftOutlined />}
            onClick={scrollLeft}
            shape="circle"
          />

          <div className="spare-parts-pills-container">
            {categories.map((category) => (
              <button
                key={category}
                className={`spare-parts-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <Button 
            className="scroll-arrow scroll-arrow-right" 
            icon={<RightOutlined />}
            onClick={scrollRight}
            shape="circle"
          />

          <Button 
            className="filter-btn"
            icon={<FilterOutlined />}
          >
            Filter products
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="spare-parts-progress-bar">
          <div 
            className="spare-parts-progress-fill" 
            style={{ width: `${((categories.indexOf(selectedCategory) + 1) / categories.length) * 100}%` }}
          ></div>
        </div>

        {/* Search Results Header */}
        <h2 className="search-results-title">Search Results : {selectedCategory}</h2>

        {/* Products Grid */}
        <Row gutter={[24, 24]} className="products-grid">
          {products[selectedCategory]?.map(product => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card 
                hoverable
                className="product-card"
                onClick={() => navigate(`/product/spare-part/${product.id}`)}
                cover={
                  <div className="product-image-wrapper">
                    <img alt={product.name} src={product.image} className="product-image" />
                  </div>
                }
              >
                <div className="product-card-content">
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-price">
                    <span className="discounted-price">₹{product.discountedPrice.toLocaleString('en-IN')}</span>
                    <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="product-actions">
                    <div className="contact-icons">
                      <Button 
                        type="default" 
                        shape="circle" 
                        icon={<PhoneOutlined />}
                        className="contact-icon-btn phone-btn"
                        title="Call Us"
                      />
                      <Button 
                        type="default" 
                        shape="circle" 
                        icon={<WhatsAppOutlined />}
                        className="contact-icon-btn whatsapp-btn"
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
  );
}

export default SparePartsPage;
