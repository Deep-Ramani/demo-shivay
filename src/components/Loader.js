import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-gif-container">
        <img 
          src="/spraying.gif" 
          alt="Spraying Animation" 
          className="loader-gif"
        />
      </div>
    </div>
  );
}

export default Loader;
