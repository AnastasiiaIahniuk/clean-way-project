import React, { useState } from 'react';
import styles from './EditOrderPage.module.css';

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

const EditOrderPage = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Відправити нове замовлення:', formData);
    alert('Замовлення створено! (поки що тільки консоль)');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.roleTitle}>Створити нове замовлення</h2>

      <form className={styles.newOrderForm} onSubmit={handleSubmit} id="orderForm">
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
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button type="submit" form="orderForm" className={styles.button}>
          Зберегти замовлення
        </button>
      </div>
    </div>
  );
};

export default EditOrderPage;
