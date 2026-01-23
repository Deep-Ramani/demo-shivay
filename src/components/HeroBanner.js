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
      color: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #90EE90 100%)'
    },
    {
      id: 2,
      title: 'PREMIUM',
      highlight: 'QUALITY',
      subtitle: 'PRODUCTS FOR YOU',
      image: 'https://picsum.photos/800/400?random=2',
      color: 'linear-gradient(180deg, #FFE5B4 0%, #FFDAB9 50%, #FFB6C1 100%)'
    },
    {
      id: 3,
      title: 'AMAZING',
      highlight: 'OFFERS',
      subtitle: 'UPTO 60% OFF*',
      image: 'https://picsum.photos/800/400?random=3',
      color: 'linear-gradient(180deg, #E6E6FA 0%, #DDA0DD 50%, #DA70D6 100%)'
    },
    {
      id: 4,
      title: 'NEW',
      highlight: 'ARRIVALS',
      subtitle: 'CHECK OUT NOW',
      image: 'https://picsum.photos/800/400?random=4',
      color: 'linear-gradient(180deg, #FFDAB9 0%, #FFB6C1 50%, #FFA07A 100%)'
    },
    {
      id: 5,
      title: 'BEST',
      highlight: 'SELLERS',
      subtitle: 'TRENDING PRODUCTS',
      image: 'https://picsum.photos/800/400?random=5',
      color: 'linear-gradient(180deg, #B0E0E6 0%, #87CEEB 50%, #4682B4 100%)'
    },
    {
      id: 6,
      title: 'EXCLUSIVE',
      highlight: 'DEALS',
      subtitle: 'LIMITED TIME ONLY',
      image: 'https://picsum.photos/800/400?random=6',
      color: 'linear-gradient(180deg, #98FB98 0%, #90EE90 50%, #3CB371 100%)'
    },
    {
      id: 7,
      title: 'SHOP',
      highlight: 'SMART',
      subtitle: 'SAVE MORE TODAY',
      image: 'https://picsum.photos/800/400?random=7',
      color: 'linear-gradient(180deg, #FFFFE0 0%, #FFFACD 50%, #FFD700 100%)'
    },
    {
      id: 8,
      title: 'CUSTOMER',
      highlight: 'FAVORITE',
      subtitle: 'TOP RATED ITEMS',
      image: 'https://picsum.photos/800/400?random=8',
      color: 'linear-gradient(180deg, #FFC0CB 0%, #FFB6C1 50%, #FF69B4 100%)'
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
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="snowflake" style={{
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
