import React , { useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditOrderPage from '../pages/EditOrderPage/EditOrderPage';
import UserRoleContext from './wrapperUserContext';

const EditOrderPageWrapper = ({ getOrderById }) => {
  const { orderId } = useParams();
  const role = useContext(UserRoleContext);

  const orderData = getOrderById(Number(orderId));

  if (!orderData) {
    return <div>Замовлення не знайдено</div>;
  }

  return <EditOrderPage mode="edit" initialData={orderData} role={role} />;
};

export default EditOrderPageWrapper;