import React from 'react';
import './OrderPage.css'; // сюди вставляй уніфіковані стилі, які я зробив для сторінки замовлень

const OrderPage = ({ order }) => {
  return (
    <div className="container">
      <h2 className="roleTitle">Деталі замовлення</h2>

      <div className="orderCard">
        <div>
          <p><strong>Дата:</strong> {order.date}</p>
          <p><strong>Місто:</strong> {order.city}</p>
          <p><strong>Клієнт:</strong> {order.clientFirstName} {order.clientLastName}</p>
          <p><strong>Виконавець:</strong> {order.executorFirstName} {order.executorLastName}</p>
          <p><strong>Адреса:</strong> {order.address}</p>
          <p><strong>Статус:</strong> {order.status}</p>
          <p><strong>Вартість:</strong> {order.price} грн</p>
        </div>

        <div style={{ maxWidth: '200px', marginLeft: '20px', textAlign: 'left' }}>
          <p><strong>Деталі:</strong></p>
          <p>{order.details}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;