import React from 'react';
import { Row, Col, Badge } from 'antd';
import './LiveStats.css';

function LiveStats() {
  const stats = [
    {
      id: 1,
      count: '1,500+',
      label: 'Active Dealers',
      image: 'https://picsum.photos/500/400?random=21',
      color: 'rgba(198, 40, 40, 0.75)'
    },
    {
      id: 2,
      count: '192,852',
      label: 'Products sold',
      image: 'https://picsum.photos/500/400?random=22',
      color: 'rgba(42, 42, 42, 0.75)'
    },
    {
      id: 3,
      count: '10 Lakhs+',
      label: 'Farmers Registered',
      image: 'https://picsum.photos/500/400?random=23',
      color: 'rgba(76, 175, 80, 0.75)'
    }
  ];

  return (
    <section className="live-stats-section">
      <div className="live-badge">
        <Badge status="error" />
        <span className="live-text">LIVE</span>
      </div>
      
      <Row gutter={[0, 0]} className="stats-row">
        {stats.map(stat => (
          <Col key={stat.id} xs={24} sm={24} md={8}>
            <div 
              className="stat-card" 
              style={{ 
                backgroundImage: `url(${stat.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="stat-overlay" style={{ background: stat.color }}></div>
              <div className="stat-content">
                <h2 className="stat-count">{stat.count}</h2>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default LiveStats;
