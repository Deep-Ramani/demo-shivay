import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, ToolOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('home');

  const handleMenuClick = (e) => {
    setCurrent(e.key);
    
    switch(e.key) {
      case 'home':
        navigate('/');
        break;
      case 'categories':
        navigate('/categories/OEM%20Products');
        break;
      case 'spare-parts':
        navigate('/spare-parts/Sprayer%20Parts');
        break;
      case 'about':
        // Add route when ready
        console.log('About clicked');
        break;
      default:
        break;
    }
  };

  const items = [
    { key: 'home', icon: <HomeOutlined />, label: 'Home' },
    { key: 'categories', icon: <AppstoreOutlined />, label: 'Categories' },
    { key: 'spare-parts', icon: <ToolOutlined />, label: 'Spare Parts & Accessories' },
    { key: 'about', icon: <InfoCircleOutlined />, label: 'About us' }
  ];

  return (
    <aside className="sidebar">
      <Menu
        mode="inline"
        selectedKeys={[current]}
        onClick={handleMenuClick}
        items={items}
        className="sidebar-menu"
      />
    </aside>
  );
}

export default Sidebar;
