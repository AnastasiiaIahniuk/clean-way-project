import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'test@example.com' && password === '123456') {
      navigate('/orders');
    } else {
      setError('Неправильний email або пароль');
    }
  };

  return (
    <div style={styles.container}>
      {/* Логотип */}
      <img
        src="/logo.png"  // розмістіть свій логотип у public/logo.png
        alt="Чистий шлях"
        style={styles.logo}
        onError={e => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150?text=Чистий+шлях"; }}
      />
      <h2 style={styles.title}>Вхід в систему</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button}>Увійти</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '80px auto',
    padding: 20,
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    borderRadius: 12,
    textAlign: 'center',
    backgroundColor: '#f0f4f8',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  logo: {
    width: 120,
    marginBottom: 20,
    borderRadius: '50%',
    boxShadow: '0 0 10px #007BFF',
  },
  title: {
    marginBottom: 25,
    color: '#007BFF',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: 14,
    backgroundColor: '#007BFF',
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    marginBottom: 15,
  }
};

export default LoginPage;