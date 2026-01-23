import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, ToolOutlined, FileTextOutlined, WalletOutlined, CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './Sidebar.css';

function Sidebar() {
  const [current, setCurrent] = useState('home');

  const items = [
    { key: 'home', icon: <HomeOutlined />, label: 'Home' },
    { key: 'categories', icon: <AppstoreOutlined />, label: 'Categories' },
    { key: 'spare-parts', icon: <ToolOutlined />, label: 'Spare Parts & Accessories' },
    { key: 'complaint', icon: <FileTextOutlined />, label: 'Submit your complaint' },
    { key: 'wallet', icon: <WalletOutlined />, label: 'Wallet' },
    { key: 'prebook', icon: <CalendarOutlined />, label: 'Prebook' },
    { key: 'about', icon: <InfoCircleOutlined />, label: 'About us' }
  ];

  return (
    <aside className="sidebar">
      <Menu
        mode="inline"
        selectedKeys={[current]}
        onClick={(e) => setCurrent(e.key)}
        items={items}
        className="sidebar-menu"
      />
    </aside>
  );
}

export default Sidebar;
