import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditOrderPage from '../pages/EditOrderPage/EditOrderPage';
import UserRoleContext from '../context/UserRoleContext';

const messageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: '1.5rem',
  textAlign: 'center',
};

const EditOrderWrapper = ({ getOrderById }) => {
  const { orderId } = useParams();
  const role = useContext(UserRoleContext);

  const orderData = getOrderById(Number(orderId));

  if (!orderData) {
    return (
      <div style={messageStyle}>
        Замовлення №{orderId} не знайдено.
      </div>
    );
  }

  return <EditOrderPage mode="edit" initialData={orderData} role={role} />;
};

export default EditOrderWrapper;
