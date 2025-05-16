import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const role = localStorage.getItem('userRole') || 'guest';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Динамічний шлях з параметром clientId */}
        <Route
          path="/:clientId/orders"
          element={
            <PrivateRoute role={role} allowedRoles={['client']}>
              <OrdersPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;