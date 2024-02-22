import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import NotFound from '../screens/NotFound404';
import CreateProgram from '../components/program/CreateProgram';
import NavigationLayout from '../screens/NavigationLayout';

const Router = () => {
  return (
    <Routes>
      <Route element={<NavigationLayout />}>
        <Route index element={<Home />} />
        <Route path="/create/program" element={<CreateProgram />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
