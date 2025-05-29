import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './OrdersListPage.module.css';
import useOrdersLogic from './useOrdersListLogic';

const OrdersListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    role,
    loading,
    filter,
    filteredOrders,
    fullName,
    roleName,
    setFilter,
  } = useOrdersLogic({ location, navigate, userId });

  // Для чекбоксів вибраних замовлень (тільки для адміна)
  const [selectedOrders, setSelectedOrders] = useState([]);
  // Стан попапу
  const [popupVisible, setPopupVisible] = useState(false);
  const [reportDetails, setReportDetails] = useState('');
  const [reportState, setReportState] = useState('form'); // form | success | error

  if (loading) {
    return <div className={styles.container}>Завантаження...</div>;
  }

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const openReportPopup = () => {
    setReportDetails('');
    setReportState('form');
    setPopupVisible(true);
  };

  const closeReportPopup = () => {
    setPopupVisible(false);
    setReportDetails('');
    setReportState('form');
  };

  const generateReport = () => {
    // Імітуємо формування звіту з випадковим успіхом
    const success = Math.random() > 0.3;

    if (success) {
      // Створюємо текстовий файл з деякими даними
      const reportContent = `
Звіт по замовленнях: ${selectedOrders.join(', ')}

Деталі:
${reportDetails}
      `;
      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setReportState('success');
    } else {
      setReportState('error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <h2 className={styles.roleTitle}>{roleName || 'Гість'}</h2>
        <p className={styles.userName}>{fullName}</p>
      </div>

      <div className={styles.filterRow}>
        <input
          type="text"
          placeholder="Фільтр за назвою замовлення"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
        />

        {role === 'client' && (
          <button
            className={styles.button}
            onClick={() => navigate(`/${role}/${userId}/orders/newOrder`)}
          >
            Створити нове замовлення
          </button>
        )}

        {role === 'admin' && (
          <>
            <button
              className={`${styles.button} ${styles.greenButton}`}
              disabled={selectedOrders.length === 0}
              onClick={openReportPopup}
              style={{ minWidth: '180px' }}
              title={selectedOrders.length === 0 ? 'Виберіть замовлення для формування звіту' : ''}
            >
              Сформувати звіт
            </button>
          </>
        )}
      </div>

      <div className={styles.orderList}>
        {filteredOrders.length === 0 && <p>Замовлень не знайдено.</p>}
        {filteredOrders.map(order => (
          <div
            key={order.orderId}
            className={styles.orderCard}
            onClick={() => {
              if (role !== 'admin') {
                navigate(`/${role}/${userId}/orders/${order.orderId}/order`);
              }
            }}
            style={{ cursor: role === 'admin' ? 'default' : 'pointer' }}
          >
            {role === 'admin' && (
              <input
                type="checkbox"
                checked={selectedOrders.includes(order.orderId)}
                onChange={() => toggleOrderSelection(order.orderId)}
                onClick={e => e.stopPropagation()}
                style={{ marginRight: 15, transform: 'scale(1.3)' }}
                title="Вибрати замовлення"
              />
            )}

            <div style={{ flexGrow: 1 }}>
              <strong>{order.name}</strong> — <em>{order.date}</em>
              <p className={styles.statusText}>Статус: {order.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Попап для звіту */}
      {popupVisible && (
        <>
          <div
            className={styles.popupOverlay}
            onClick={closeReportPopup}
          />
          <div className={styles.popup} onClick={e => e.stopPropagation()}>
            <div className={styles.popupContent} style={{ textAlign: 'left' }}>
              {reportState === 'form' && (
                <>
                  <h3>Сформувати звіт по замовленнях</h3>
                  <p><strong>Вибрано замовлень:</strong> {selectedOrders.length}</p>
                  <textarea
                    rows={6}
                    placeholder="Додаткові деталі для звіту..."
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    style={{
                      width: '100%',
                      resize: 'vertical',
                      padding: '8px',
                      fontSize: '1rem',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                      marginBottom: '15px',
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <button className={styles.button} onClick={generateReport}>
                      Згенерувати звіт
                    </button>
                    <button className={styles.button} onClick={closeReportPopup}>
                      Назад
                    </button>
                  </div>
                </>
              )}
              {reportState === 'success' && (
                <>
                  <h3>Звіт успішно сформовано ✔</h3>
                  <div style={{ textAlign: 'center', marginTop: '25px' }}>
                    <button className={styles.button} onClick={closeReportPopup}>
                      ОК
                    </button>
                  </div>
                </>
              )}
              {reportState === 'error' && (
                <>
                  <h3>Не вдалося сформувати звіт ✖</h3>
                  <p>Спробуйте ще раз.</p>
                  <div style={{ textAlign: 'center', marginTop: '25px' }}>
                    <button className={styles.button} onClick={closeReportPopup}>
                      Назад
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersListPage;
