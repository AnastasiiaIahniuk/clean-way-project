import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './OrdersListPage.module.css';
import useOrdersLogic from './useOrdersListLogic';
import { Pencil, Trash2 } from 'lucide-react';

const OrdersListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  const roleNames = {
  admin: 'Адміністратор',
  client: 'Клієнт',
  manager: 'Менеджер',
  cleaner: 'Клінер',
};

  const {
    role,
    firstName,
    lastName,
    loading,
    filter,
    filteredOrders,
    selectedOrderId,
    setFilter,
    handleSelectOrder,
    handleDeleteOrder,
    handleEditOrder
  } = useOrdersLogic({ location, navigate, userId });

  if (loading) {
    return <div className={styles.container}>Завантаження...</div>;
  }

  return (
    <div className={styles.container}>
      {/* User Info */}
      <div className={styles.userInfo}>
        <h2 className={styles.roleTitle}>
          {role === 'admin' ? 'Адміністратор' : 'Клієнт'}
        </h2>
        <p className={styles.userName}>{firstName} {lastName}</p>
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
        <button
          className={styles.button}
          onClick={() => navigate(`/client/${userId}/orders/newOrder`)}
        >Створити нове замовлення</button>
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
              <button onClick={() => handleEditOrder(order.orderId)} className={styles.iconButton}>
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDeleteOrder(order.orderId)} className={styles.iconButton}>
                <Trash2 size={18} color="red" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersListPage;
