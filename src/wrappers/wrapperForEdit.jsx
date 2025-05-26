import React from 'react';
import { useParams } from 'react-router-dom';
import EditOrderPage from '../pages/EditOrderPage/EditOrderPage';

const EditOrderPageWrapper = ({ getOrderById }) => {
  const { orderId } = useParams();

  const orderData = getOrderById(Number(orderId)); // якщо orderId - число

  if (!orderData) {
    return <div>Замовлення не знайдено</div>;
  }

  return <EditOrderPage mode="edit" initialData={orderData} />;
};

export default EditOrderPageWrapper;