import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockedOrdersList, mockedUsers, roleNames } from '../../mocks/mockedData';

const useOrdersLogic = ({ location, navigate, orderId } = {}) => {
  const { role, userId } = useParams();
  const numericUserId = Number(userId);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [newOrderName, setNewOrderName] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const user = mockedUsers.find(u => u.role === role && u.userId === numericUserId);

  const [fullName, setFullName] = useState('');
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(`${user.name} ${user.surname}`);
      setRoleName(roleNames[role]);
    } else {
      setFullName('');
      setRoleName('');
    }
  }, [user, role]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOrders(mockedOrdersList);
      setLoading(false);
    }, 1000);
  }, [userId]);

  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreateNewOrder = (e) => {
    e.preventDefault();
    if (!newOrderName.trim()) return;

    const newOrder = {
      orderId: Date.now(),
      name: newOrderName,
      status: 'Новий',
      date: new Date().toLocaleDateString('uk-UA')
    };

    setOrders(prev => [...prev, newOrder]);
    setNewOrderName('');
    setShowNewOrderForm(false);
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleEditOrder = (orderId) => {
    navigate(`/${role}/${userId}/orders/${orderId}/edit`);
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.orderId === orderId);
  };

  return {
    role,
    loading,
    filter,
    filteredOrders,
    showNewOrderForm,
    newOrderName,
    selectedOrderId,
    roleName,
    fullName,
    handleCreateNewOrder,
    handleEditOrder,
    handleSelectOrder,
    setFilter,
    setShowNewOrderForm,
    setNewOrderName,
    getOrderById,
  };
};

export default useOrdersLogic;
