import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import { NavBar } from '../components/NavBar';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import Admin from '../pages/Admin';
import { isHashed } from '../../config/router';

export const AppRoutes = () => {
  const { isLogged } = useContext(AuthContext);
  const RouterFn = isHashed ? HashRouter : BrowserRouter;

  return (
    <RouterFn>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            !isLogged ? <Navigate to='/home' /> : <Navigate to='/admin' />
          }
        />
        <Route path='/home' element={<Home />} />
        {isLogged && <Route path='/admin' element={<Admin />} />}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </RouterFn>
  );
};
