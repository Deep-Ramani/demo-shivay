import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import Categories from './components/Categories';
import SpecialDeals from './components/SpecialDeals';
import LiveStats from './components/LiveStats';
import Loader from './components/Loader';

function App() {
  const [showLoader, setShowLoader] = useState(false);

  const handleLogoClick = () => {
    setShowLoader(true);
    
    // Hide loader after animation completes
    setTimeout(() => {
      setShowLoader(false);
    }, 4000);
  };

  useEffect(() => {
    // Removed animation class logic since new loader doesn't need it
  }, [showLoader]);

  return (
    <div className="App">
      {showLoader && <Loader />}
      <Header onLogoClick={handleLogoClick} />
      <div className="main-container">
        <Sidebar />
        <main className="main-content">
          <HeroBanner />
          <Categories />
          <SpecialDeals />
          <LiveStats />
        </main>
      </div>
    </div>
  );
}

export default App;
