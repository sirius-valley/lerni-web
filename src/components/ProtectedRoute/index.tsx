import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLSelector } from '../../redux/hooks';
import { Outlet } from 'react-router-dom';
import { withModal } from '../../hoc/withModal';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token = useLSelector((state) => state.auth.token);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!token) navigate('/login');
    }, 150);
    return () => clearTimeout(timeout);
  }, [token]);

  return <Outlet />;
};

export default withModal(ProtectedRoute);
