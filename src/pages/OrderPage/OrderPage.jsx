import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './OrderPage.module.css';
import { mockedOrdersList, mockedUsers } from '../../mocks/mockedData';
import useOrderPageLogic from './useOrderPageLogic';
import UserRoleContext from '../../context/UserRoleContext';

const Popup = ({ visible, message, children, onClose }) => {
  if (!visible) return null;

  return (
    <>
      <div className={styles.popupOverlay} onClick={onClose} />
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        <div className={styles.popupContent}>
          {message ? <h3>{message}</h3> : children}
          {!children && (
            <div className={styles.popupOkButtonWrapper}>
              <button className={styles.button} onClick={onClose}>OK</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const OrderPage = () => {
  const { orderId, userId } = useParams();
  const role = useContext(UserRoleContext);
  const navigate = useNavigate();

  const { popupState, openPopup, closePopup } = useOrderPageLogic();

  const order = mockedOrdersList.find(o => o.orderId === parseInt(orderId));
  if (!order) return <div>Замовлення не знайдено.</div>;

  const client = mockedUsers.find(u => u.userId === order.clientId);
  const cleaner = mockedUsers.find(u => u.userId === order.cleanerId);

  const openCancelConfirm = () => openPopup({ type: 'cancelConfirm', orderId: order.orderId });
  const handleCancelConfirm = () => {
    const success = Math.random() > 0.3;
    openPopup({
      type: 'cancelResult',
      message: success
        ? (role === 'client' ? 'Заявка успішно надіслана!' : 'Замовлення успішно скасовано!')
        : (role === 'client' ? 'Сталася помилка при поданні заявки. Спробуйте ще раз.' : 'Сталася помилка при скасуванні замовлення. Спробуйте ще раз.'),
      orderId: order.orderId,
    });
  };

  const handleApprove = () => {
    const success = Math.random() > 0.3;
    openPopup({
      type: 'approve',
      message: success ? 'Замовлення успішно затверджено!' : 'Помилка при затвердженні замовлення. Спробуйте ще раз.',
      orderId: order.orderId,
    });
  };

  const handleEditOrder = () => {
    navigate(`/${role}/${userId}/orders/${orderId}/edit`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.orderTitle}>Замовлення № {orderId}</h2>

      {['manager', 'cleaner', 'client'].includes(role) && client && (
        <div className={styles.orderDetailRow}>
          <span className={styles.orderDetailLabel}>Клієнт:</span> {client.name} {client.surname}
        </div>
      )}

      <div className={styles.orderDetailRow}>
        <span className={styles.orderDetailLabel}>Виконавець:</span> {cleaner.name} {cleaner.surname}
      </div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Назва:</span> {order.name}</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Дата:</span> {order.date}</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Статус:</span> {order.status}</div>
      {order.status !== 'Нове' && (
        <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Вартість:</span> {order.cost} грн.</div>
      )}
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Місто:</span> {order.city}</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Адреса:</span> {order.address}</div>
      <div className={styles.orderDetailRow}><span className={styles.orderDetailLabel}>Деталі:</span> {order.details}</div>

      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={() => navigate(-1)}>Назад</button>
        {(role === 'manager' || role === 'client' || role === 'cleaner') && (
          <>
            {(role === 'manager' || role === 'cleaner') && (
              <button className={styles.button} onClick={handleApprove}>Затвердити</button>
            )}
            {(role === 'manager' || role === 'client') && (
            <button className={styles.button} onClick={handleEditOrder}>Редагувати ✎</button>
            )}
            <button className={styles.orangeBorderButton} onClick={openCancelConfirm}>Скасувати ×</button>
          </>
        )}
      </div>

      {/* Попапи */}
      <Popup visible={popupState.visible && popupState.type === 'cancelConfirm'} message={popupState.message} onClose={closePopup}>
        <h3>{role === 'manager' ? 'Ви впевнені, що бажаєте скасувати замовлення?': 'Ви впевнені, що хочете подати заявку на скасування замовлення?' }</h3>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={handleCancelConfirm}>Так</button>
          <button className={styles.button} onClick={closePopup}>Ні</button>
        </div>
      </Popup>

      <Popup visible={popupState.visible && (popupState.type === 'cancelResult' || popupState.type === 'approve')} message={popupState.message} onClose={closePopup} />
    </div>
  );
};

export default OrderPage;
