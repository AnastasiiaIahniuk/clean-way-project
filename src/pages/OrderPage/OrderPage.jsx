import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './OrderPage.module.css';

const mockedOrders = [
  {
    orderId: 1,
    name: 'Прибирання "Все включено"',
    date: '12.05.2025',
    status: 'Нове',
    cost: 3200,
    city: 'Харків',
    address: 'вул. Миру, 23б кв. 105',
    details: 'Не використовувати алергенні засоби.',
  },
  {
    orderId: 2,
    name: 'Прибирання "Стандарт"',
    date: '10.07.2024',
    status: 'В обробці',
    cost: 2300,
    city: 'Харків',
    address: 'вул. Миру, 23б кв. 105',
    details: 'Зварити вегетаріанський борщ.',
  },
  {
    orderId: 3,
    name: 'Помити вікна',
    date: '01.03.2023',
    status: 'Виконано',
    cost: 1250,
    city: 'Пісочин',
    address: 'вул. Зелена, 3б, кв. 1',
    details: 'Балкон включно.',
  },
];

const OrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = mockedOrders.find(o => o.orderId === parseInt(orderId));

  if (!order) return <div>Замовлення не знайдено.</div>;

  return (
    <div className={styles.container}>
      <h2>Замовлення № {orderId}</h2>
      <div className={styles.orderDetailRow}>
        <span className={styles.orderDetailLabel}>Назва:</span> {order.name}
      </div>
      <div className={styles.orderDetailRow}>
        <span className={styles.orderDetailLabel}>Дата:</span> {order.date}
      </div>
      <div className={styles.orderDetailRow}>
        <span className={styles.orderDetailLabel}>Статус:</span> {order.status}
      </div>
      <div className={styles.orderDetailRow}>
        <span className={styles.orderDetailLabel}>Вартість:</span> {order.cost} грн.
      </div>
      <div className={styles.orderDetailRow}>
        <span className={styles.orderDetailLabel}>Місто:</span> {order.city}
      </div>
      <div className={styles.orderDetailRow}>
        <span className={styles.orderDetailLabel}>Вулиця:</span> {order.address}
      </div>
      <div className={styles.orderDetailRow}>
        <span className={styles.orderDetailLabel}>Деталі:</span> {order.details}
      </div>
      <button className={styles.button} onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default OrderPage;
