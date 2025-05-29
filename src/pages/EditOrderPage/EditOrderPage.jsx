import React, { useState, useEffect } from 'react';
import styles from './EditOrderPage.module.css';
import { useNavigate } from 'react-router-dom';
import { clientsList, cleanersList } from '../../mocks/mockedData';

const EditOrderPage = ({ mode = 'new', initialData = null, role }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    city: '',
    clientId: '',
    cleanerId: '',
    address: '',
    status: 'Новий',
    price: '',
    details: '',
  });

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        name: initialData.name || '',
        date: initialData.date || '',
        city: initialData.city || '',
        clientId: initialData.clientId ?? '',
        cleanerId: initialData.cleanerId ?? '',
        address: initialData.address || '',
        status: initialData.status || 'Новий',
        price: initialData.price !== undefined && initialData.price !== null ? initialData.price : '',
        details: initialData.details || '',
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.roleTitle}>
        {mode === 'new'
          ? 'Створити нове замовлення'
          : `Редагувати замовлення №${initialData?.orderId || ''}`}
      </h2>

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

          {role !== 'client' && (
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
                  <option key={client.userId} value={client.userId}>
                    {client.fullName}
                  </option>
                ))}
              </select>
            </label>
          )}

          {role !== 'client' && (
            <label className={styles.fieldLabel}>
              Виконавець (Клінер):
              <select
                name="cleanerId"
                value={formData.cleanerId}
                onChange={handleChange}
                required
                className={styles.inputField}
              >
                <option value="" disabled>Оберіть виконавця</option>
                {cleanersList.map(cleaner => (
                  <option key={cleaner.userId} value={cleaner.userId}>
                    {cleaner.fullName}
                  </option>
                ))}
              </select>
            </label>
          )}
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

          {role !== 'client' && (
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
          )}

          {role !== 'client' && (
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
          )}

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

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => navigate(-1)}>Назад</button>
          <button type="submit" className={styles.button}>
            {mode === 'new' ? 'Зберегти нове замовлення' : 'Оновити замовлення'}
          </button>
        </div>
      </form>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>{mode === 'new' ? 'Нове замовлення створене!' : 'Замовлення відредаговано!'}</h3>
            <button onClick={handleClosePopup} className={styles.button}>ОК</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditOrderPage;
