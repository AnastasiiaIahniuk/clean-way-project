import { useEffect, useState } from 'react';

const useOrdersLogic = ({ location, navigate, clientId }) => {
  const role = location.state?.role || 'guest';

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [newOrderName, setNewOrderName] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (role !== 'client') {
      alert('Доступ заборонено. Ви не Клієнт.');
      navigate('/');
      return;
    }

    setTimeout(() => {
      const mockOrders = [
        { id: 1, name: 'Замовлення 1', status: 'В обробці' },
        { id: 2, name: 'Замовлення 2', status: 'Доставлено' },
      ];
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, [role, navigate, clientId]);

  useEffect(() => {
    if (!filter) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [filter, orders]);

  const handleCreateNewOrder = (e) => {
    e.preventDefault();
    if (!newOrderName.trim()) return;
    const newOrder = {
      id: Date.now(),
      name: newOrderName,
      status: 'Новий',
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    setNewOrderName('');
    setShowNewOrderForm(false);
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  return {
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
  };
};

export default useOrdersLogic;