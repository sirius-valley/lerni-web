import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import NotFound from '../screens/NotFound404';
import Login from '../screens/Login';
import Register from '../screens/Register';
import CreateProgram from '../components/program/CreateProgram';
import NavigationLayout from '../screens/NavigationLayout';
import ProtectedRoute from '../components/ProtectedRoute';

const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<NavigationLayout />}>
          <Route index element={<Home />} />
          <Route path="/create/program" element={<CreateProgram />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
