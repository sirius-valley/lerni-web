import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useIsAdmin } from '../../hooks/useIsAdmin';

const AdminRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, setAdminStatus } = useIsAdmin();

  useEffect(() => {
    // Verificar si hay parámetro isAdmin en la URL
    const urlParams = new URLSearchParams(location.search);
    const isAdminParam = urlParams.get('isAdmin');

    if (isAdminParam === 'true') {
      // Setear usando el hook
      setAdminStatus(true);

      // Remover el parámetro de la URL
      urlParams.delete('isAdmin');
      const newSearch = urlParams.toString();
      const newUrl = location.pathname + (newSearch ? '?' + newSearch : '');

      // Reemplazar la URL sin el parámetro
      window.history.replaceState({}, '', newUrl);
    }
  }, [location, setAdminStatus]);

  useEffect(() => {
    // Verificar si el usuario es admin y redirigir si no lo es
    if (!isAdmin && isAdmin !== undefined) {
      console.log('isAdmin', isAdmin);
      navigate('/limited-view');
    }
  }, [isAdmin, navigate]);

  return <Outlet />;
};

export default AdminRoute;
