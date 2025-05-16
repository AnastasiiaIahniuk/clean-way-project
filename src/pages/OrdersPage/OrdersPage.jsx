import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './OrdersPage.module.css';
import useOrdersLogic from './useOrdersLogic';
import { Pencil, Trash2 } from 'lucide-react';

const OrdersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientId } = useParams();

  const {
    role,
    firstName,
    lastName,
    loading,
    filter,
    filteredOrders,
    showNewOrderForm,
    newOrderName,
    selectedOrderId,
    setFilter,
    setShowNewOrderForm,
    setNewOrderName,
    handleCreateNewOrder,
    handleSelectOrder,
    handleDeleteOrder,
    handleEditOrder
  } = useOrdersLogic({ location, navigate, clientId });

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
          onClick={() => setShowNewOrderForm(!showNewOrderForm)}
          className={styles.button}
        >
          {showNewOrderForm ? 'Скасувати' : 'Створити нове замовлення'}
        </button>
      </div>

      {/* New Order Form */}
      {showNewOrderForm && (
        <form onSubmit={handleCreateNewOrder} className={styles.newOrderForm}>
          <input
            type="text"
            placeholder="Назва нового замовлення"
            value={newOrderName}
            onChange={(e) => setNewOrderName(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Додати</button>
        </form>
      )}

      {/* Orders List */}
      <div className={styles.orderList}>
        {filteredOrders.length === 0 && <p>Замовлень не знайдено.</p>}
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className={`${styles.orderCard} ${selectedOrderId === order.id ? styles.selected : ''}`}
            onClick={() => handleSelectOrder(order.id)}
          >
            <div>
              <strong>{order.name}</strong> — {order.status} — <em>{order.date}</em>
              <p className={styles.statusText}>Статус: {order.status}</p>
            </div>
            <div className={styles.iconGroup} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => handleEditOrder(order.id)} className={styles.iconButton}>
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDeleteOrder(order.id)} className={styles.iconButton}>
                <Trash2 size={18} color="red" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
