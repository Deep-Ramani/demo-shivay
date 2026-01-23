import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import './Header.css';

function Header({ onLogoClick }) {
  return (
    <>
      <div className="flash-sale-banner">
        ⚡ FLASH SALE ⚡ - Enjoy upto 60% off on all balwaan products
      </div>
      <header className="header">
        <div className="header-container">
          <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="BALWAAN" />
            <span className="logo-text">BALWAAN</span>
          </div>
          
          <Input 
            placeholder="Search products and categories"
            prefix={<SearchOutlined />}
            size="large"
            className="search-input-antd"
          />

          <div className="header-icons">
            <Button 
              type="primary" 
              shape="circle" 
              icon={<PhoneOutlined />} 
              size="large"
              className="phone-btn"
              title="Call Us"
            />
            <Button 
              type="primary" 
              shape="circle" 
              icon={<WhatsAppOutlined />} 
              size="large"
              className="whatsapp-btn"
              title="WhatsApp Us"
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
