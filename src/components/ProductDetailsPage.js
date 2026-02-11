import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Tabs, Card, Rate } from 'antd';
import { ShareAltOutlined, PhoneOutlined, WhatsAppOutlined, ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './ProductDetailsPage.css';

function ProductDetailsPage() {
  const { productId, type } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data - in real app, fetch based on productId
  const product = {
    id: productId,
    name: 'Balwaan Shakti BT-60s 2in1 Flashlight with Lantern and Solar | 5W LED Front Beam with Type-C Charging',
    category: 'Solar Torches',
    sku: 'MTAK-SO-TO-7012',
    modelNo: 'BT-60S',
    unitsSold: 244,
    rating: 4.5,
    totalRatings: 89,
    originalPrice: 2500,
    discountedPrice: 1899,
    savings: 601,
    discountPercent: 24,
    images: [
      'https://picsum.photos/600/600?random=301',
      'https://picsum.photos/600/600?random=302',
      'https://picsum.photos/600/600?random=303',
      'https://picsum.photos/600/600?random=304',
      'https://picsum.photos/600/600?random=305'
    ],
    features: [
      '2-in-1 Torch + Lantern — front spotlight + side lantern for focused & area lighting',
      'Multiple Light Modes — High / Low / Flashing for emergency and normal use',
      '5W High-Efficiency LED for bright reliable illumination',
      'Type-C Rechargeable input for fast and modern charging convenience',
      'Long Runtime — extended runtimes across front and lantern modes for outages and field use',
      'Rugged Design — portable sturdy build suited for home | farm | camping and roadside emergencies',
      'Ideal Uses: Power cuts | camping | roadside assistance | night farming | security patrols | workshops'
    ],
    description: `Balwaan BT-60S — Reliable 2-in-1 Rechargeable Torch & Lantern for Home, Farm & Outdoors. Bring dependable light wherever you go with the Balwaan BT-60S, a compact 2-in-1 rechargeable torch and lantern built for real-world use. The powerful 5W LED front beam cuts through darkness for focused inspection, while the integrated lantern spreads soft, wide light to illuminate tents, workspaces, or rooms during power outages. Multiple modes — High, Low, and Flashing — let you adapt to any situation, from routine tasks to emergency signals.

Equipped with modern Type-C charging for fast, convenient recharges and a durable design that withstands bumps and knocks, this torch-lantern combo is ready for farms, construction sites, roadside repairs, or camping trips. Its long runtime ensures you stay lit through extended outages or overnight shifts, while the lightweight build makes it easy to carry or hang wherever needed.

Whether you're a farmer checking fields after dark, a security guard on patrol, or a family preparing for power cuts, the Balwaan BT-60S delivers reliable, versatile lighting you can count on — season after season.`,
    specifications: [
      { label: 'LED Power', value: '5W High-Efficiency LED' },
      { label: 'Light Modes', value: 'High / Low / Flashing' },
      { label: 'Charging', value: 'Type-C Rechargeable' },
      { label: 'Battery Type', value: 'Lithium-ion Rechargeable' },
      { label: 'Runtime', value: '8-12 hours (varies by mode)' },
      { label: 'Dimensions', value: '210mm x 95mm x 120mm' },
      { label: 'Weight', value: '450g' },
      { label: 'Water Resistance', value: 'IPX4 (Splash Resistant)' }
    ],
    relatedProducts: [
      {
        id: 101,
        name: 'Balwaan Solar LED Torch with Power Bank',
        image: 'https://picsum.photos/300/300?random=401',
        rating: 4.6,
        totalRatings: 156,
        originalPrice: 1800,
        discountedPrice: 1299,
        discountPercent: 28
      },
      {
        id: 102,
        name: 'Balwaan Rechargeable LED Searchlight',
        image: 'https://picsum.photos/300/300?random=402',
        rating: 4.4,
        totalRatings: 123,
        originalPrice: 2200,
        discountedPrice: 1599,
        discountPercent: 27
      },
      {
        id: 103,
        name: 'Balwaan Emergency LED Lantern',
        image: 'https://picsum.photos/300/300?random=403',
        rating: 4.5,
        totalRatings: 189,
        originalPrice: 1500,
        discountedPrice: 999,
        discountPercent: 33
      }
    ]
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name}`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const tabItems = [
    {
      key: 'description',
      label: 'Description',
      children: (
        <div className="tab-content">
          <p className="description-text">{product.description}</p>
        </div>
      )
    },
    {
      key: 'specifications',
      label: 'Specifications',
      children: (
        <div className="tab-content">
          <div className="specifications-table">
            {product.specifications.map((spec, index) => (
              <div key={index} className="spec-row">
                <div className="spec-label">{spec.label}</div>
                <div className="spec-value">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="product-details-page">
      <div className="product-details-content">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator"> &gt; </span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        {/* Product Details Section */}
        <Row gutter={[40, 40]} className="product-main-section">
          {/* Left: Image Gallery */}
          <Col xs={24} md={12}>
            <div className="product-gallery">
              <div className="main-image-container">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="main-product-image"
                />
                <Button 
                  className="share-btn"
                  icon={<ShareAltOutlined />}
                  onClick={handleShare}
                >
                  Share
                </Button>
              </div>
              <div className="thumbnail-gallery">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`Product ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Right: Product Info */}
          <Col xs={24} md={12}>
            <div className="product-info">
              <div className="product-header">
                <span className="category-badge">In {product.category}</span>
                <div className="rating-badge">
                  <span className="rating-score">{product.rating}</span>
                  <span className="rating-total">/{product.totalRatings}</span>
                </div>
              </div>

              <h1 className="product-title">{product.name}</h1>

              <div className="product-meta">
                <div className="meta-item">
                  <span className="meta-label">SKU:-</span>
                  <span className="meta-value">{product.sku}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Model No.:-</span>
                  <span className="meta-value">{product.modelNo}</span>
                </div>
              </div>

              <div className="units-sold">
                <span className="sold-icon">📊</span>
                <span className="sold-text">{product.unitsSold} Units Sold</span>
              </div>

              <div className="product-features">
                {product.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <CheckCircleOutlined className="feature-icon" />
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="product-pricing">
                <div className="price-section">
                  <span className="current-price">₹{product.discountedPrice.toLocaleString('en-IN')}</span>
                  <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="discount-badge">{product.discountPercent}% OFF</span>
                </div>
                <div className="savings-text">
                  You save ₹{product.savings.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="product-actions">
                <Button className="bulk-quote-btn" size="large" block>
                  Get bulk quote now
                </Button>
                <div className="action-buttons-row">
                  <Button 
                    className="add-to-cart-btn" 
                    size="large"
                    icon={<ShoppingCartOutlined />}
                  >
                    Add to cart
                  </Button>
                  <Button 
                    className="buy-now-btn" 
                    type="primary" 
                    size="large"
                  >
                    Buy now
                  </Button>
                </div>
                <div className="contact-buttons-row">
                  <Button 
                    className="phone-btn"
                    icon={<PhoneOutlined />}
                    size="large"
                  >
                    Call Now
                  </Button>
                  <Button 
                    className="whatsapp-btn"
                    icon={<WhatsAppOutlined />}
                    size="large"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>

              <div className="secure-badge">
                🔒 All transactions are secure and encrypted
              </div>
            </div>
          </Col>
        </Row>

        {/* Description & Specifications Tabs */}
        <div className="product-tabs-section">
          <Tabs 
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="product-tabs"
          />
        </div>

        {/* Customer Questions */}
        <div className="customer-questions-section">
          <h2 className="section-title">Customer questions</h2>
          <div className="questions-actions">
            <Button className="ask-question-btn" type="primary">
              Ask a question
            </Button>
            <Button className="see-all-btn">
              See all 0 question
            </Button>
          </div>
          <div className="help-banner">
            <span className="help-text">
              👥 Need more help? <span className="help-link">Talk to our experts</span>
            </span>
            <Button className="call-now-btn" icon={<PhoneOutlined />}>
              Call Now
            </Button>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products-section">
          <h2 className="section-title">Explore more {product.category}</h2>
          <Row gutter={[24, 24]}>
            {product.relatedProducts.map((relatedProduct) => (
              <Col key={relatedProduct.id} xs={24} sm={12} md={8} lg={6}>
                <Card 
                  hoverable
                  className="related-product-card"
                  cover={
                    <div className="related-product-image-wrapper">
                      <img alt={relatedProduct.name} src={relatedProduct.image} />
                    </div>
                  }
                  onClick={() => navigate(`/product/${type}/${relatedProduct.id}`)}
                >
                  <div className="related-product-content">
                    <Rate disabled defaultValue={relatedProduct.rating} allowHalf className="product-rating" />
                    <h3 className="related-product-name">{relatedProduct.name}</h3>
                    <div className="related-product-price">
                      <span className="price">₹{relatedProduct.discountedPrice.toLocaleString('en-IN')}</span>
                      <span className="original-price">₹{relatedProduct.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="discount-badge">{relatedProduct.discountPercent}% OFF</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
