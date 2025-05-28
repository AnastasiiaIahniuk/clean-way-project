import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './OrderPage.module.css';
import { mockedOrdersList } from '../../mocks/mockedData';

const OrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = mockedOrdersList.find(o => o.orderId === parseInt(orderId));

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
