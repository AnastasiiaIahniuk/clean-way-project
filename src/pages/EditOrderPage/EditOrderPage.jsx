import React, { useState, useEffect } from 'react';
import styles from './EditOrderPage.module.css';
import { useNavigate } from 'react-router-dom';

const clientsList = [
  { id: 1, fullName: 'Іван Іваненко' },
  { id: 2, fullName: 'Марія Петренко' },
  { id: 3, fullName: 'Олег Коваленко' },
];

const executorsList = [
  { id: 1, fullName: 'Анна Сидоренко' },
  { id: 2, fullName: 'Петро Мельник' },
  { id: 3, fullName: 'Оксана Кравченко' },
];

const EditOrderPage = ({ mode = 'new', initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    city: '',
    clientId: '',
    executorId: '',
    address: '',
    status: 'Новий',
    price: '',
    details: '',
  });

  const [showPopup, setShowPopup] = useState(false);  // Стан для попапу
  const navigate = useNavigate();  // Хук для перенаправлення

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логіка для створення або редагування
    console.log('Замовлення:', formData);

    // Показуємо попап після успішного сабміту
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    // Закриваємо попап і перенаправляємо назад
    setShowPopup(false);
    navigate(-1);  // Перенаправлення на попередню сторінку
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.roleTitle}>{mode === 'new' ? 'Створити нове замовлення' : 'Редагувати замовлення'}</h2>

      <form className={styles.newOrderForm} onSubmit={handleSubmit}>
        <div className={styles.formColumn}>
          <label className={styles.fieldLabel}>
            Назва замовлення:
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Назва замовлення"
              required
              className={styles.inputField}
            />
          </label>

          <label className={styles.fieldLabel}>
            Дата:
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>

          <label className={styles.fieldLabel}>
            Місто:
            <input
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>

          <label className={styles.fieldLabel}>
            Клієнт:
            <select
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
              className={styles.inputField}
            >
              <option value="" disabled>Оберіть клієнта</option>
              {clientsList.map(client => (
                <option key={client.id} value={client.id}>
                  {client.fullName}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.fieldLabel}>
            Виконавець (Клінер):
            <select
              name="executorId"
              value={formData.executorId}
              onChange={handleChange}
              required
              className={styles.inputField}
            >
              <option value="" disabled>Оберіть виконавця</option>
              {executorsList.map(executor => (
                <option key={executor.id} value={executor.id}>
                  {executor.fullName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.formColumn}>
          <label className={styles.fieldLabel}>
            Адреса:
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={styles.inputField}
            />
          </label>

          <label className={styles.fieldLabel}>
            Статус:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={styles.inputField}
            >
              <option>Новий</option>
              <option>В процесі</option>
              <option>Завершено</option>
            </select>
          </label>

          <label className={styles.fieldLabel}>
            Вартість:
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className={styles.inputField}
            />
          </label>

          <label className={styles.fieldLabel}>
            Деталі:
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={4}
              className={styles.textAreaField}
            />
          </label>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" className={styles.button}>
            {mode === 'new' ? 'Зберегти нове замовлення' : 'Оновити замовлення'}
          </button>
        </div>
      </form>

      {/* Попап після створення нового замовлення */}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Нове замовлення створене!</h3>
            <button onClick={handleClosePopup} className={styles.button}>ОК</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditOrderPage;
