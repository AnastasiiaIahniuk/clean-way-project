import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import useLoginLogic from './useLoginLogic';

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginLogic(navigate);

  return (
    <div className={styles.container}>
      <img
        src="/logo.png"
        alt="Чистий шлях"
        className={styles.logo}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/150?text=Чистий+шлях";
        }}
      />
      <h2 className={styles.title}>Вхід в систему</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.button}>Увійти</button>
      </form>
    </div>
  );
};

export default LoginPage;