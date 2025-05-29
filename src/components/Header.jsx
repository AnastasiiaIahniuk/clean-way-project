import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login');
  };

  return (
    <header style={{
      backgroundColor: '#007BFF',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontWeight: '600',
      fontSize: '1.1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      userSelect: 'none'
    }}>
      <div><span role="img" aria-label="Блиск">✨</span> Чистий шлях </div>
      <div>
        <span style={{ marginRight: '20px' }}>Особистий кабінет</span>
        <button
          onClick={handleLogout}
          style={{
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Вихід
        </button>
      </div>
    </header>
  );
};

export default Header;
