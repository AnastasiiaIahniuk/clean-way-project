// wrapperForEdit.jsx
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditOrderPage from '../pages/EditOrderPage/EditOrderPage';
import UserRoleContext from '../context/UserRoleContext';

const EditOrderWrapper = ({ getOrderById }) => {
  const { orderId } = useParams();
  const role = useContext(UserRoleContext); // роль тепер береться з контексту

  const orderData = getOrderById(Number(orderId));

  if (!orderData) {
    return <div>Замовлення не знайдено</div>;
  }

  return <EditOrderPage mode="edit" initialData={orderData} role={role} />;
};

export default EditOrderWrapper;
