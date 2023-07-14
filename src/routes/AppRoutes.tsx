import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import { NavBar } from '../components/NavBar';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import Admin from '../pages/Admin';

export const AppRoutes = () => {
  const { isLogged } = useContext(AuthContext);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};