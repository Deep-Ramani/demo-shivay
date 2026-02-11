import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import './Categories.css';

function Categories() {
  const navigate = useNavigate();
  
  const categories = [
    { id: 1, name: 'OEM Products', image: '⚙️', color: '#e3f2fd' },
    { id: 2, name: 'Battery Sprayers', image: '🔋', color: '#ffebee' },
    { id: 3, name: 'Power Sprayers', image: '💨', color: '#fff3e0' },
    { id: 4, name: 'Brush Cutter', image: '✂️', color: '#e8f5e9' },
    { id: 5, name: 'Water Pump', image: '💧', color: '#f3e5f5' },
    { id: 6, name: 'Car Washer', image: '🚗', color: '#fce4ec' }
  ];

  const handleCategoryClick = (categoryName) => {
    console.log('Category clicked:', categoryName);
    navigate(`/categories/${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="categories-section">
      <h2 className="categories-title">Categories</h2>
      <Row gutter={[20, 20]}>
        {categories.map(category => (
          <Col key={category.id} xs={12} sm={8} md={6} lg={6} xl={3}>
            <Card 
              hoverable
              className="category-card"
              style={{ background: category.color }}
              styles={{ body: { padding: '25px 15px', textAlign: 'center' } }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-icon">
                <span className="category-image">{category.image}</span>
              </div>
              <h3 className="category-name">{category.name}</h3>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default Categories;
