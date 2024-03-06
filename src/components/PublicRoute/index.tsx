import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLSelector } from '../../redux/hooks';
import { Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const navigate = useNavigate();
  const token = useLSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return <Outlet />;
};

export default PublicRoute;
