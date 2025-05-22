import { useEffect, useState } from 'react';

const useOrdersLogic = ({ location, navigate, clientId }) => {
  const [role, setRole] = useState('user'); // або 'admin'
  const [firstName, setFirstName] = useState('Іван');
  const [lastName, setLastName] = useState('Петренко');

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [newOrderName, setNewOrderName] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Імітація завантаження замовлень
    setTimeout(() => {
      setOrders([
        { id: 1, name: 'Прибирання "Все включено"', status: 'Нове', date: '12.05.2025' },
        { id: 2, name: 'Миття вікон', status: 'В обробці', date: '10.04.2025' },
        { id: 3, name: 'Просте прибирання', status: 'Завершено', date: '30.01.2023' },
      ]);
      setLoading(false);
    }, 1000);
  }, [clientId]);

  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreateNewOrder = (e) => {
    e.preventDefault();
    if (!newOrderName.trim()) return;

    const newOrder = {
      id: Date.now(),
      name: newOrderName,
      status: 'Новий',
      date: new Date().toLocaleDateString('uk-UA')
    };

    setOrders(prev => [...prev, newOrder]);
    setNewOrderName('');
    setShowNewOrderForm(false);
  };

  const handleSelectOrder = (id) => {
    setSelectedOrderId(id);
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити замовлення?')) {
      setOrders(prev => prev.filter(order => order.id !== id));
      if (selectedOrderId === id) setSelectedOrderId(null);
    }
  };

  const handleEditOrder = (id) => {
    navigate(`/orders/${id}/edit`);
  };

  return {
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
    handleEditOrder,
  };
};

export default useOrdersLogic;
