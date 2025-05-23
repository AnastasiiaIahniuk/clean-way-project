import React from 'react';
import EditOrderPage from '../pages/EditOrderPage/EditOrderPage';

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

  return <EditOrderPage order={newOrder} />;
};

export default OrderPageWrapperForNew;
