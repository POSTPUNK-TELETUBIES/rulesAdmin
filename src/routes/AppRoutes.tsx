import { Suspense, lazy } from 'react';
import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { NavBar } from '../components/NavBar';
import { isHashed } from '../../config/router';
import Loading from '../pages/Loading';
import { ProtectedRoute } from '../components/ProtectedRoute';
import NotFound from '../pages/NotFound';

const LazyHome = lazy(() => import('../pages/Home'));
const LazyAdmin = lazy(() => import('../pages/Admin'));
const LazyIssues = lazy(() => import('../pages/Issues'));

const RouterFn = isHashed ? HashRouter : BrowserRouter;

export const AppRoutes = () => {
  return (
    <RouterFn>
      <Suspense fallback={<Loading />}>
        <AuthProvider authName='_auth' authType='localstorage'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<LazyHome />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/admin' element={<LazyAdmin />} />
              <Route path='/issues' element={<LazyIssues />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </RouterFn>
  );
};
