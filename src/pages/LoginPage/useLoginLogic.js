import { useState } from 'react';

const useLoginLogic = (navigate) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'client@example.com' && password === '123456') {
      localStorage.setItem('userRole', 'client');
      navigate('/client/1/orders', { state: { role: 'client' } });
    } if (email === 'manager@example.com' && password === '123456') {
      localStorage.setItem('userRole', 'manager');
      navigate('/manager/1/orders', { state: { role: 'manager' } });
    } if (email === 'cleaner@example.com' && password === '123456') {
      localStorage.setItem('userRole', 'cleaner');
      navigate('/cleaner/1/orders', { state: { role: 'cleaner' } });
    } else {
      setError('Неправильний email або пароль');
    }
  };

  return { email, password, error, setEmail, setPassword, handleSubmit };
};

export default useLoginLogic;