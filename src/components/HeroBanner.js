import React from 'react';
import { Button, Carousel } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './HeroBanner.css';

function HeroBanner() {
  const slides = [
    {
      id: 1,
      title: 'GET THE',
      highlight: 'FASTEST',
      subtitle: 'FREE HOME DELIVERY*',
      image: 'https://picsum.photos/800/400?random=1',
      color: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #0ea5e9 100%)'
    },
    {
      id: 2,
      title: 'PREMIUM',
      highlight: 'QUALITY',
      subtitle: 'PRODUCTS FOR YOU',
      image: 'https://picsum.photos/800/400?random=2',
      color: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #38bdf8 100%)'
    },
    {
      id: 3,
      title: 'AMAZING',
      highlight: 'OFFERS',
      subtitle: 'UPTO 60% OFF*',
      image: 'https://picsum.photos/800/400?random=3',
      color: 'linear-gradient(135deg, #0f172a 0%, #0891b2 55%, #22d3ee 100%)'
    },
    {
      id: 4,
      title: 'NEW',
      highlight: 'ARRIVALS',
      subtitle: 'CHECK OUT NOW',
      image: 'https://picsum.photos/800/400?random=4',
      color: 'linear-gradient(135deg, #1e293b 0%, #334155 40%, #0ea5e9 100%)'
    },
    {
      id: 5,
      title: 'BEST',
      highlight: 'SELLERS',
      subtitle: 'TRENDING PRODUCTS',
      image: 'https://picsum.photos/800/400?random=5',
      color: 'linear-gradient(135deg, #0f172a 0%, #1e40af 55%, #60a5fa 100%)'
    },
    {
      id: 6,
      title: 'EXCLUSIVE',
      highlight: 'DEALS',
      subtitle: 'LIMITED TIME ONLY',
      image: 'https://picsum.photos/800/400?random=6',
      color: 'linear-gradient(135deg, #0f172a 0%, #155e75 55%, #0e7490 100%)'
    },
    {
      id: 7,
      title: 'SHOP',
      highlight: 'SMART',
      subtitle: 'SAVE MORE TODAY',
      image: 'https://picsum.photos/800/400?random=7',
      color: 'linear-gradient(135deg, #1e293b 0%, #1e3a5f 50%, #3b82f6 100%)'
    },
    {
      id: 8,
      title: 'CUSTOMER',
      highlight: 'FAVORITE',
      subtitle: 'TOP RATED ITEMS',
      image: 'https://picsum.photos/800/400?random=8',
      color: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 55%, #0ea5e9 100%)'
    }
  ];

  return (
    <div className="hero-banner-container">
      <Carousel 
        autoplay={true}
        autoplaySpeed={3000}
        infinite={true}
        pauseOnHover={false}
        dots={true}
        dotPosition="bottom" 
        className="hero-carousel"
      >
        {slides.map(slide => (
          <div key={slide.id}>
            <div className="hero-banner" style={{ background: slide.color }}>
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="hero-title">
                    {slide.title}<br />
                    <span className="hero-title-outline">{slide.highlight}</span><br />
                    <span className="hero-title-bold">{slide.subtitle}</span>
                  </h1>
                  <Button 
                    type="primary" 
                    size="large" 
                    className="shop-now-btn"
                    icon={<div className="arrow-circle"><ArrowRightOutlined /></div>}
                    iconPlacement="end"
                  >
                    SHOP NOW
                  </Button>
                </div>
                
                <div className="hero-image">
                  <img src={slide.image} alt={`Slide ${slide.id}`} />
                </div>
              </div>
              
              <div className="hero-footer">
                <span className="terms">*T&C APPLY</span>
              </div>
              
              <div className="snow-effect">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={`flake-${slide.id}-${i}`} className="snowflake" style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 10}s`
                  }}>❄</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default HeroBanner;
