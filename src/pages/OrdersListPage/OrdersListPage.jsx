import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './OrdersListPage.module.css';
import useOrdersLogic from './useOrdersListLogic';

const OrdersListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    role,
    loading,
    filter,
    filteredOrders,
    selectedOrderId,
    cancelPopup,
    fullName,
    roleName,
    closeCancelPopup,
    handleConfirmCancel,
    handleRejectCancel,
    setFilter,
    handleEditOrder,
    openCancelPopup
  } = useOrdersLogic({ location, navigate, userId });

  if (loading) {
    return <div className={styles.container}>Завантаження...</div>;
  }

  return (
    <div className={styles.container}>
      {/* User Info */}
      <div className={styles.userInfo}>
        <h2 className={styles.roleTitle}>
          {roleName || 'Гість'}
        </h2>
        <p className={styles.userName}>{fullName}</p>
      </div>

      {/* Filter and Button */}
      <div className={styles.filterRow}>
        <input
          type="text"
          placeholder="Фільтр за назвою замовлення"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
        />
        {role !== 'cleaner' && role !== 'manager' && (
        <button
          className={styles.button}
          onClick={() => navigate(`/client/${userId}/orders/newOrder`)}
        >Створити нове замовлення</button>
        )}
      </div>

      {/* Orders List */}
      <div className={styles.orderList}>
        {filteredOrders.length === 0 && <p>Замовлень не знайдено.</p>}
        {filteredOrders.map(order => (
          <div
            key={order.orderId}
            className={`${styles.orderCard} ${selectedOrderId === order.orderId ? styles.selected : ''}`}
            onClick={() => navigate(`/client/${userId}/orders/${order.orderId}/order`)}
          >
            <div>
              <strong>{order.name}</strong> — <em>{order.date}</em>
              <p className={styles.statusText}>Статус: {order.status}</p>
            </div>
            <div className={styles.iconGroup} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => handleEditOrder(order.orderId)} className={styles.editButton}>
                <span>Редагувати ✎</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); openCancelPopup(order.orderId); }}
                className={styles.orangeBorderButton}
              >
                <span>Скасувати ×</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Попап скасування */}
      {cancelPopup.visible && (
        <>
          <div className={styles.popupBackground} onClick={closeCancelPopup} />
          <div className={styles.popup} onClick={closeCancelPopup}>
            <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
              {!cancelPopup.message && (
                <>
                  <h3>Ви впевнені, що хочете надіслати заявку на скасування замовлення?</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                    <button className={styles.orangeBorderButton} onClick={handleConfirmCancel}>Так</button>
                    <button className={styles.orangeBorderButton} onClick={handleRejectCancel}>Ні</button>
                  </div>
                </>
              )}
              {cancelPopup.message === 'success' && (
                <>
                  <h3>Заявка успішно надіслана!</h3>
                  <button className={styles.button} onClick={closeCancelPopup}>ОК</button>
                </>
              )}
              {cancelPopup.message === 'error' && (
                <>
                  <h3>Сталась помилка при відміні замовлення. Спробуйте, будь ласка, ще раз.</h3>
                  <button className={styles.button} onClick={closeCancelPopup}>ОК</button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersListPage;
