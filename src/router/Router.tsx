import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import NotFound from '../screens/NotFound404';

const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
