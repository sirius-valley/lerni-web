import { useState, useEffect } from 'react';

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Verificar el valor inicial
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdmin');
      setIsAdmin(adminStatus === 'true');
    };

    // Verificar al cargar
    checkAdminStatus();

    // Escuchar cambios en localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isAdmin') {
        setIsAdmin(e.newValue === 'true');
      }
    };

    // Escuchar cambios personalizados (para cuando se cambia desde la misma pestaña)
    const handleCustomStorageChange = () => {
      checkAdminStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('adminStatusChanged', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminStatusChanged', handleCustomStorageChange);
    };
  }, []);

  // Función para cambiar el estado de admin y notificar
  const setAdminStatus = (status: boolean) => {
    localStorage.setItem('isAdmin', status.toString());
    setIsAdmin(status);
    // Disparar evento personalizado para sincronizar en la misma pestaña
    window.dispatchEvent(new CustomEvent('adminStatusChanged'));
  };

  // Función para remover el estado de admin
  const removeAdminStatus = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.dispatchEvent(new CustomEvent('adminStatusChanged'));
  };

  return {
    isAdmin,
    setAdminStatus,
    removeAdminStatus,
  };
};
