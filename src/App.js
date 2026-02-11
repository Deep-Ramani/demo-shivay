import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import Categories from './components/Categories';
import CategoriesPage from './components/CategoriesPage';
import SparePartsPage from './components/SparePartsPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import SpecialDeals from './components/SpecialDeals';
import LiveStats from './components/LiveStats';
import NewLaunches from './components/NewLaunches';
import TrustedBanner from './components/TrustedBanner';
import BestSellingProducts from './components/BestSellingProducts';
import OurJourney from './components/OurJourney';
import Footer from './components/Footer';
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
    <Router>
      <div className="App">
        {showLoader && <Loader />}
        <Header onLogoClick={handleLogoClick} />
        <div className="main-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <>
                  <HeroBanner />
                  <Categories />
                  <SpecialDeals />
                  <LiveStats />
                  <NewLaunches />
                  <TrustedBanner />
                  <BestSellingProducts />
                  <OurJourney />
                </>
              } />
              <Route path="/categories/:categoryName" element={<CategoriesPage />} />
              <Route path="/spare-parts/:categoryName" element={<SparePartsPage />} />
              <Route path="/product/:type/:productId" element={<ProductDetailsPage />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
