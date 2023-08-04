import { Suspense, lazy } from 'react';

import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from 'react-auth-kit';

import NotFound from '../pages/NotFound';
import { NavBar } from '../components/NavBar';

import { isHashed } from '../../config/router';
import { ProtectedRoute } from '../components/ProtectedRoute';

import Loading from '../pages/Loading';

const LazyAdmin = lazy(() => import('../pages/Admin'));

const LazyHome = lazy(() => import('../pages/Home'));

const RouterFn = isHashed ? HashRouter : BrowserRouter;

export const AppRoutes = () => {
  return (
    <RouterFn>
      <Suspense fallback={<Loading />}>
        <AuthProvider authName='_auth' authType='localstorage'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Navigate to='/admin' />} />
            <Route
              path='/admin'
              element={
                <ProtectedRoute>
                  <LazyAdmin />
                </ProtectedRoute>
              }
            />
            <Route path='/home' element={<LazyHome />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </RouterFn>
  );
};
