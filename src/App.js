// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import UserRoleContext from './context/UserRoleContext';

// імпорти твоїх компонентів...
import useOrdersLogic from './pages/OrdersListPage/useOrdersListLogic';
import LoginPage from './pages/LoginPage/LoginPage';
import OrdersListPage from './pages/OrdersListPage/OrdersListPage';
import OrderPage from './pages/OrderPage/OrderPage';
import NewOrderWrapper from './wrappers/NewOrderWrapper';
import EditOrderWrapper from './wrappers/EditOrderWrapper';
import PrivateRoute from './components/PrivateRoute';

// Обгортка для передачі ролі через контекст
const RoleProviderWrapper = ({ children }) => {
  const { role } = useParams();
  return (
    <UserRoleContext.Provider value={role || 'client'}>
      {children}
    </UserRoleContext.Provider>
  );
};

const App = () => {
  const ordersLogic = useOrdersLogic();
  const roles = ['client', 'manager', 'cleaner', 'admin'];

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Для маршрутів із :role/:userId */}
        <Route path="/:role/:userId/orders" element={
          <RoleProviderWrapper>
            <PrivateRoute allowedRoles={roles}>
              <OrdersListPage />
            </PrivateRoute>
          </RoleProviderWrapper>
        } />
        <Route path="/:role/:userId/orders/newOrder" element={
          <RoleProviderWrapper>
            <PrivateRoute allowedRoles={[roles[0]]}>
              <NewOrderWrapper />
            </PrivateRoute>
          </RoleProviderWrapper>
        } />
        <Route path="/:role/:userId/orders/:orderId/order" element={
          <RoleProviderWrapper>
            <PrivateRoute allowedRoles={[roles[0], roles[1], roles[2]]}>
              <OrderPage />
            </PrivateRoute>
          </RoleProviderWrapper>
        } />
        <Route path="/:role/:userId/orders/:orderId/edit" element={
          <RoleProviderWrapper>
            <PrivateRoute allowedRoles={[roles[0], roles[1]]}>
              <EditOrderWrapper getOrderById={ordersLogic.getOrderById} />
            </PrivateRoute>
          </RoleProviderWrapper>
        } />
      </Routes>
    </Router>
  );
};

export default App;
