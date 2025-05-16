import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './OrdersPage.module.css';
import useOrdersLogic from './useOrdersLogic';

const OrdersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientId } = useParams();

  const {
    // eslint-disable-next-line no-unused-vars
    role,
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
  } = useOrdersLogic({ location, navigate, clientId });

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список замовлень</h1>

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

      <ul className={styles.orderList}>
        {filteredOrders.length === 0 && <li>Замовлень не знайдено.</li>}
        {filteredOrders.map(order => (
          <li
            key={order.id}
            onClick={() => handleSelectOrder(order.id)}
            className={`${styles.orderItem} ${selectedOrderId === order.id ? styles.selected : ''}`}
          >
            <strong>{order.name}</strong> — {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
