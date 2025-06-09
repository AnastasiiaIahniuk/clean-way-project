// wrapperForNew.jsx
import React, { useContext } from 'react';
import EditOrderPage from '../pages/EditOrderPage/EditOrderPage';
import UserRoleContext from '../context/UserRoleContext';

const NewOrderPageWrapper = () => {
  const newOrder = {
    date: '',
    city: '',
    clientFirstName: '',
    clientLastName: '',
    executorFirstName: '',
    executorLastName: '',
    address: '',
    status: 'Нове',
    price: 0,
    details: ''
  };

  const role = useContext(UserRoleContext);

  return <EditOrderPage order={newOrder} role={role} />;
};

export default NewOrderPageWrapper;
