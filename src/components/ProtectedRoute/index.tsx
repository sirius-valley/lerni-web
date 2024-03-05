import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLSelector } from '../../redux/hooks';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token = useLSelector((state) => state.auth.token);
  console.log('token: ', token, !token);

  useEffect(() => {
    if (!token) navigate('/login');
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
