import React , { useContext } from 'react';
import EditOrderPage from '../pages/EditOrderPage/EditOrderPage';
import UserRoleContext from '../context/UserRoleContext';

const OrderPageWrapperForNew = () => {
  const newOrder = {
    date: '',
    city: '',
    clientFirstName: '',
    clientLastName: '',
    executorFirstName: '',
    executorLastName: '',
    address: '',
    status: 'Новий',
    price: 0,
    details: ''
  };

  const role = useContext(UserRoleContext);

  return <EditOrderPage order={newOrder} role={role} />;
};

export default OrderPageWrapperForNew;
