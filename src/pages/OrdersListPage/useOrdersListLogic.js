import { useEffect, useState } from 'react';

const mockedUsers = [{
  userId: 1,
  name: "Леся",
  surname: "Українка",
  role: "client",
  email: "client@example.com"
}];

const mockedOrdersList = [
  {
    orderId: 1,
    date: '12.05.2025',
    client: 1,
    cleaner: 11,
    city: "Харків",
    address: "вул. Миру, 23б кв. 105",
    name: 'Прибирання "Все включено"',
    status: 'Нове',
    cost: 3200,
    details: "Не використовувати алергенні засоби."
  },
  {
    orderId: 2,
    date: '10.07.2024',
    client: 1,
    cleaner: 11,
    city: "Харків",
    address: "вул. Миру, 23б кв. 105",
    name: 'Прибирання "Стандарт"',
    status: 'В обробці',
    cost: 2300,
    details: "Зварити вегетаріанський борщ."
  },
  {
    orderId: 3,
    date: '01.03.2023',
    client: 1,
    cleaner: 12,
    city: "Пісочин",
    address: "вул. Зелена, 3б, кв. 1",
    name: 'Помити вікна',
    status: 'Виконано',
    cost: 1250,
    details: "Балкон включно."
  },
];

const useOrdersLogic = ({ location, navigate, userId, orderId } = {}) => {
  const [role, setRole] = useState('client'); // або 'admin'
  const [firstName, setFirstName] = useState(mockedUsers[0].name);
  const [lastName, setLastName] = useState(mockedUsers[0].surname);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [newOrderName, setNewOrderName] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Ви впевнені, що хочете видалити замовлення?')) {
      setOrders(prev => prev.filter(order => order.orderId !== orderId));
      if (selectedOrderId === orderId) setSelectedOrderId(null);
    }
  };

  const handleEditOrder = (orderId) => {
    navigate(`/client/${userId}/orders/${orderId}/edit`);
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.orderId === orderId);
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
    getOrderById
  };
};

export default useOrdersLogic;
