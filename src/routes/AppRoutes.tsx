import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from 'react-auth-kit';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import { NavBar } from '../components/NavBar';

import Admin from '../pages/Admin';
import { isHashed } from '../../config/router';
import { ProtectedRoute } from '../components/ProtectedRoute';

const RouterFn = isHashed ? HashRouter : BrowserRouter;

export const AppRoutes = () => {
  return (
    <RouterFn>
      <AuthProvider authName='_auth' authType='localstorage'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Navigate to='/admin' />} />
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </RouterFn>
  );
};
