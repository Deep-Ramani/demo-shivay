import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button,} from 'antd';
import { PhoneOutlined, WhatsAppOutlined, LeftOutlined, RightOutlined, FilterOutlined } from '@ant-design/icons';
import './CategoriesPage.css';

function CategoriesPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(decodeURIComponent(categoryName || 'OEM Products'));

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(decodeURIComponent(categoryName));
    }
  }, [categoryName]);

  const categories = [
    'OEM Products',
    'Battery Sprayers',
    'Power Sprayers',
    'Brush Cutter',
    'Water Pump',
    'Car Washer'
  ];

  const products = {
    'OEM Products': [
      {
        id: 1,
        name: 'Balwaan Thunder Power Reaper PR-120F | Heavy-duty',
        image: 'https://picsum.photos/300/300?random=101',
        rating: 4.5,
        totalRatings: 89,
        originalPrice: 170000,
        discountedPrice: 135000,
        savings: 35000,
        discountPercent: 20
      },
      {
        id: 2,
        name: 'Balwaan Thunderbolt Power Reaper (PR-120E) | 212cc 4-stroke',
        image: 'https://picsum.photos/300/300?random=102',
        rating: 4.7,
        totalRatings: 124,
        originalPrice: 185000,
        discountedPrice: 130000,
        savings: 55000,
        discountPercent: 29
      },
      {
        id: 3,
        name: 'Balwaan Power Reaper PR-900 | 5HP Greaves Diesel',
        image: 'https://picsum.photos/300/300?random=103',
        rating: 4.9,
        totalRatings: 115,
        originalPrice: 160000,
        discountedPrice: 120000,
        savings: 40000,
        discountPercent: 25
      }
    ],
    'Battery Sprayers': [
      {
        id: 4,
        name: 'Balwaan Double Motor Battery Sprayer BS-22D | 12 Volts',
        image: 'https://picsum.photos/300/300?random=104',
        rating: 4.6,
        totalRatings: 234,
        originalPrice: 8999,
        discountedPrice: 6499,
        savings: 2500,
        discountPercent: 28
      },
      {
        id: 5,
        name: 'Balwaan BS-20 Single Motor Battery Sprayer | 12x8',
        image: 'https://picsum.photos/300/300?random=105',
        rating: 4.4,
        totalRatings: 189,
        originalPrice: 6500,
        discountedPrice: 4999,
        savings: 1501,
        discountPercent: 23
      }
    ],
    'Power Sprayers': [
      {
        id: 6,
        name: 'Balwaan 22 No. HTP Sprayer with 6.5HP Engine & 50 Mtr',
        image: 'https://picsum.photos/300/300?random=106',
        rating: 4.8,
        totalRatings: 167,
        originalPrice: 45000,
        discountedPrice: 32000,
        savings: 13000,
        discountPercent: 29
      },
      {
        id: 7,
        name: 'Balwaan Agricultural Power Sprayer Machine 5HP',
        image: 'https://picsum.photos/300/300?random=107',
        rating: 4.5,
        totalRatings: 98,
        originalPrice: 38000,
        discountedPrice: 28500,
        savings: 9500,
        discountPercent: 25
      }
    ],
    'Brush Cutter': [
      {
        id: 8,
        name: 'Balwaan BX-52 2 Stroke 52cc Side Pack Brush Cutter',
        image: 'https://picsum.photos/300/300?random=108',
        rating: 4.7,
        totalRatings: 312,
        originalPrice: 15999,
        discountedPrice: 8999,
        savings: 7000,
        discountPercent: 44
      },
      {
        id: 9,
        name: 'Balwaan Heavy Duty Brush Cutter BX-75',
        image: 'https://picsum.photos/300/300?random=109',
        rating: 4.6,
        totalRatings: 245,
        originalPrice: 18999,
        discountedPrice: 12999,
        savings: 6000,
        discountPercent: 32
      }
    ],
    'Water Pump': [
      {
        id: 10,
        name: 'Balwaan Petrol Operated Water Pump 2 Inch',
        image: 'https://picsum.photos/300/300?random=110',
        rating: 4.5,
        totalRatings: 156,
        originalPrice: 18500,
        discountedPrice: 14999,
        savings: 3501,
        discountPercent: 19
      },
      {
        id: 11,
        name: 'Balwaan 3 Inch Water Pump Diesel Engine',
        image: 'https://picsum.photos/300/300?random=111',
        rating: 4.7,
        totalRatings: 134,
        originalPrice: 25000,
        discountedPrice: 19999,
        savings: 5001,
        discountPercent: 20
      }
    ],
    'Car Washer': [
      {
        id: 12,
        name: 'Balwaan High Pressure Car Washer 1800W',
        image: 'https://picsum.photos/300/300?random=112',
        rating: 4.4,
        totalRatings: 201,
        originalPrice: 9999,
        discountedPrice: 6999,
        savings: 3000,
        discountPercent: 30
      },
      {
        id: 13,
        name: 'Balwaan Portable Car Washer with Foam Gun',
        image: 'https://picsum.photos/300/300?random=113',
        rating: 4.3,
        totalRatings: 178,
        originalPrice: 7500,
        discountedPrice: 5499,
        savings: 2001,
        discountPercent: 27
      }
    ]
  };

  const scrollLeft = () => {
    document.querySelector('.category-pills-container').scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.querySelector('.category-pills-container').scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="categories-page">
      <div className="categories-page-content">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator"> &gt; </span>
          <span className="breadcrumb-current">Browse products</span>
        </div>

        {/* Page Title */}
        <h1 className="page-title">Shop by Category</h1>

        {/* Category Pills */}
        <div className="category-pills-section">
          <Button 
            className="scroll-arrow scroll-arrow-left" 
            icon={<LeftOutlined />}
            onClick={scrollLeft}
            shape="circle"
          />

          <div className="category-pills-container">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
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
        <div className="category-progress-bar">
          <div 
            className="category-progress-fill" 
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
                onClick={() => navigate(`/product/category/${product.id}`)}
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

export default CategoriesPage;
