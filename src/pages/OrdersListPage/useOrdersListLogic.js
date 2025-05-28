import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockedOrdersList, mockedUsers, roleNames } from '../../mocks/mockedData';

const useOrdersLogic = ({ location, navigate, orderId } = {}) => {
  const { role, userId } = useParams();
  const numericUserId = Number(userId);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');

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

  return {
    role,
    loading,
    filter,
    filteredOrders,
    roleName,
    fullName,
    setFilter,
  };
};

export default useOrdersLogic;
