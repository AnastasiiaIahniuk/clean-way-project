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
    fullName,
    roleName,
    setFilter,
  } = useOrdersLogic({ location, navigate, userId });

  if (loading) {
    return <div className={styles.container}>Завантаження...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <h2 className={styles.roleTitle}>{roleName || 'Гість'}</h2>
        <p className={styles.userName}>{fullName}</p>
      </div>

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
            onClick={() => navigate(`/${role}/${userId}/orders/newOrder`)}
          >
            Створити нове замовлення
          </button>
        )}
      </div>

      <div className={styles.orderList}>
        {filteredOrders.length === 0 && <p>Замовлень не знайдено.</p>}
        {filteredOrders.map(order => (
          <div
            key={order.orderId}
            className={styles.orderCard}
            onClick={() => navigate(`/${role}/${userId}/orders/${order.orderId}/order`)}
          >
            <div>
              <strong>{order.name}</strong> — <em>{order.date}</em>
              <p className={styles.statusText}>Статус: {order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersListPage;
