import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import NotFound from '../screens/NotFound404';
import Login from '../screens/Login';
import Register from '../screens/Register';
import CreateProgram from '../screens/CreateProgram';
import NavigationLayout from '../screens/NavigationLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';
import { useLDispatch } from '../redux/hooks';
import { setToken } from '../redux/slices/auth.slice';
import { getTokenFromLocalStorage } from '../utils/utils';
import ProgramDetails from '../screens/ProgramDetails';
import CreateCollection from '../screens/CreateCollection';
import CollectionDetails from '../screens/CollectionDetails';
import ProfileDetails from '../screens/ProfileDetails';
import { usePermissions } from '../utils/permissions';

const Router = () => {
  const dispatch = useLDispatch();

  const { canCreateCollection, canCreateProgram, canReadProgram, canReadCollection } =
    usePermissions();
  const viewPrograms = canReadProgram();
  const viewCollections = canReadCollection();
  const createProgram = canCreateProgram();
  const createCollection = canCreateCollection();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) dispatch(setToken(token));
  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<NavigationLayout />}>
          <Route index element={<Home />} />
          {createProgram && <Route path="/create/program" element={<CreateProgram />} />}
          {createCollection && <Route path="/create/collection" element={<CreateCollection />} />}
          {(viewPrograms || viewCollections) && (
            <Route path="/details/program/:id" element={<ProgramDetails />} />
          )}
          {viewCollections && (
            <Route path="/details/collection/:id" element={<CollectionDetails />} />
          )}
          <Route path="/profile/:id" element={<ProfileDetails />} />
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
