import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children }) => {
  const location = useLocation();

  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
      <Header />
      <main style={{ padding: '20px 40px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
