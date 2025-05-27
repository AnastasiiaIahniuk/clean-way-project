import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import useOrdersLogic from './pages/OrdersListPage/useOrdersListLogic';
import LoginPage from './pages/LoginPage/LoginPage';
import OrdersListPage from './pages/OrdersListPage/OrdersListPage';
import OrderPage from './pages/OrderPage/OrderPage';

import UserRoleContext from './wrappers/wrapperUserContext';
import OrderPageWrapperForNew from './wrappers/wrapperForNew';
import EditOrderPageWrapper from './wrappers/wrapperForEdit';

const App = () => {
  const role = localStorage.getItem('userRole') || 'guest';
  const ordersLogic = useOrdersLogic();

  return (
    <UserRoleContext.Provider value={role}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="client/:userId/orders"
            element={<PrivateRoute role={role} allowedRoles={['client']}><OrdersListPage /></PrivateRoute>} />
          <Route path="/client/:userId/orders/newOrder" element={<OrderPageWrapperForNew />} />
          <Route path="/client/:userId/orders/:orderId/order" element={<OrderPage />} />
          <Route path="/client/:userId/orders/:orderId/edit" element={<EditOrderPageWrapper getOrderById={ordersLogic.getOrderById} role={role} />}
          />
        </Routes>
      </Router>
    </UserRoleContext.Provider>
  );
};

export default App;