import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import NotFound from '../screens/NotFound404';
import CreateProgram from '../components/program/CreateProgram';

const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/create/program" element={<CreateProgram />} />
    </Routes>
  );
};

export default Router;
