import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import useOrdersLogic from './pages/OrdersListPage/useOrdersListLogic';
import LoginPage from './pages/LoginPage/LoginPage';
import OrdersListPage from './pages/OrdersListPage/OrdersListPage';
import OrderPage from './pages/OrderPage/OrderPage';

import OrderPageWrapperForNew from './wrappers/wrapperForNew';
import EditOrderPageWrapper from './wrappers/wrapperForEdit';

const App = () => {
  const ordersLogic = useOrdersLogic();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path=":role/:userId/orders" element={<PrivateRoute allowedRoles={['client', 'manager', 'cleaner']}><OrdersListPage /></PrivateRoute>} />
        <Route path="/:role/:userId/orders/newOrder" element={<PrivateRoute allowedRoles={['client', 'manager', 'cleaner']}><OrderPageWrapperForNew /></PrivateRoute>} />
        <Route path="/:role/:userId/orders/:orderId/order" element={<PrivateRoute allowedRoles={['client', 'manager', 'cleaner']}><OrderPage /></PrivateRoute>} />
        <Route path="/:role/:userId/orders/:orderId/edit" element={<PrivateRoute allowedRoles={['client', 'manager', 'cleaner']}><EditOrderPageWrapper getOrderById={ordersLogic.getOrderById} /></PrivateRoute>}
        />
      </Routes>
    </Router>

  );
};

export default App;