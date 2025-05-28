import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './OrderPage.module.css';
import { mockedOrdersList, mockedUsers } from '../../mocks/mockedData';

const OrderPage = () => {
  const { role, orderId } = useParams();
  const navigate = useNavigate();
  const order = mockedOrdersList.find(o => o.orderId === parseInt(orderId));
  const [approvalStatus, setApprovalStatus] = useState(null);

  if (!order) return <div>Замовлення не знайдено.</div>;

  const client = mockedUsers.find(u => u.userId === order.client);
  const cleaner = mockedUsers.find(u => u.userId === order.cleaner);

  const handleApprove = () => {
    const success = Math.random() > 0.3;
    setApprovalStatus(success ? 'success' : 'error');
  };

  const handleClosePopup = () => {
    setApprovalStatus(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.orderTitle}>Замовлення № {orderId}</h2>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Назва:</span> {order.name}</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Дата:</span> {order.date}</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Статус:</span> {order.status}</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Вартість:</span> {order.cost} грн.</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Місто:</span> {order.city}</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Адреса:</span> {order.address}</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Деталі:</span> {order.details}</div>

      {['manager', 'cleaner'].includes(role) && client && (
        <div className={styles.orderDetailRow}>
          <span className={styles.orderDetailLabel}>Клієнт:</span> {client.name} {client.surname}
        </div>
      )}

      {cleaner && (
        <div className={styles.orderDetailRow}>
          <span className={styles.orderDetailLabel}>Виконавець:</span> {cleaner.name} {cleaner.surname}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className={styles.button} onClick={() => navigate(-1)}>Назад</button>
        {role === 'manager' && (
          <button className={styles.button} onClick={handleApprove}>Затвердити</button>
        )}
      </div>

      {approvalStatus && (
        <>
          <div className={styles.popupOverlay} />
          <div className={styles.popupCenter}>
            <div className={styles.popupContentNeutral}>
              {approvalStatus === 'success'
                ? 'Замовлення успішно затверджено!'
                : 'Помилка при затвердженні замовлення. Спробуйте ще раз.'}
              <div style={{ marginTop: '20px' }}>
                <button className={styles.button} onClick={handleClosePopup}>OK</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;
