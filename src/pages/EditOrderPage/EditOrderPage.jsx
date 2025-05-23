import React, { useState } from 'react';
import styles from './EditOrderPage.module.css';

const EditOrderPage = () => {
  const [formData, setFormData] = useState({
    date: '',
    city: '',
    clientFirstName: '',
    clientLastName: '',
    executorFirstName: '',
    executorLastName: '',
    address: '',
    status: 'Новий',
    price: '',
    details: '',
    name: '',
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

          <div className={styles.doubleInputWrapper}>
            <label className={styles.fieldLabel}>
              Клієнт Ім'я:
              <input
                name="clientFirstName"
                placeholder="Ім'я"
                value={formData.clientFirstName}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </label>
            <label className={styles.fieldLabel}>
              Клієнт Прізвище:
              <input
                name="clientLastName"
                placeholder="Прізвище"
                value={formData.clientLastName}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </label>
          </div>
        </div>

        <div className={styles.formColumn}>
          <div className={styles.doubleInputWrapper}>
            <label className={styles.fieldLabel}>
              Виконавець Ім'я:
              <input
                name="executorFirstName"
                placeholder="Ім'я"
                value={formData.executorFirstName}
                onChange={handleChange}
                className={styles.inputField}
              />
            </label>
            <label className={styles.fieldLabel}>
              Виконавець Прізвище:
              <input
                name="executorLastName"
                placeholder="Прізвище"
                value={formData.executorLastName}
                onChange={handleChange}
                className={styles.inputField}
              />
            </label>
          </div>

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
      <button type="submit" className={styles.button}>
            Зберегти замовлення
          </button>
    </div>
  );
};

export default EditOrderPage;
