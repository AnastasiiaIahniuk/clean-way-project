import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import OrdersListPage from './pages/OrdersListPage/OrdersListPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const role = localStorage.getItem('userRole') || 'guest';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Динамічний шлях з параметром userId */}
        <Route
          path="client/:userId/orders"
          element={
            <PrivateRoute role={role} allowedRoles={['client']}>
              <OrdersListPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;