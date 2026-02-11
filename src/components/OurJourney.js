import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import './OurJourney.css';

function OurJourney() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Sample YouTube video ID - replace with your actual video ID
  const youtubeVideoId = 'dQw4w9WgXcQ';
  
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  
  return (
    <section className="our-journey-section">
      <div className="our-journey-content">
        <h2 className="our-journey-main-title">Our Journey</h2>
        
        <Row gutter={[40, 40]} align="middle" className="journey-row">
          <Col xs={24} md={12} lg={10}>
            <div className="video-wrapper">
              {!isPlaying ? (
                <div className="video-thumbnail" onClick={handlePlayVideo}>
                  <img 
                    src="https://picsum.photos/800/450?random=50" 
                    alt="Our Journey Video"
                    className="video-image"
                  />
                  <div className="play-button-overlay">
                    <PlayCircleOutlined className="play-icon" />
                  </div>
                  <div className="video-label">
                    <span className="event-name">Balwaan at KIMA AGRIMACH 2025</span>
                  </div>
                </div>
              ) : (
                <div className="video-iframe-wrapper">
                  <iframe
                    className="youtube-iframe"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                    title="Our Journey Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </Col>
          
          <Col xs={24} md={12} lg={14}>
            <div className="journey-text-content">
              <p className="journey-paragraph">
                The agricultural industry in India has been growing for eras being a unique part of culture across all the different states.
              </p>
              
              <p className="journey-paragraph">
                Our respected founders Mr Rohit Bajaj & Mr Shubham Bajaj started the corporation under the name of "Modish TractorAurKisan Pvt. Ltd." in the year 2016 with support from our proud investors.
              </p>
              
              <Button className="read-story-btn" size="large">
                Read our story
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default OurJourney;
