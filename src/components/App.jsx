import { Suspense, lazy, useEffect } from 'react';
import { Link, Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from 'redux/operationPhonebook';

import { UserIn } from './UserIn/UserIn';

const StartPageLazy = lazy(() => import('pages/StartPage/StartPage'));
const ContactsLazy = lazy(() => import('pages/Contacts/Contacts'));
const RegisterLazy = lazy(() => import('pages/Register/Register'));
const LoginLazy = lazy(() => import('pages/Login/Login'));

const Loyout = () => {
  const userState = useSelector(state => state.phonebook.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const PrivateOutlet = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

  return (
    <>
      <nav>
        <Link to="/">Start page</Link>
        <Link to="/contacts">Contacts</Link>
      </nav>
      {userState && <UserIn />}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export const App = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: `column`,
        alignItems: `center`,
        color: '#010101',
      }}
    >
      <Routes>
        <Route path="/" element={<Loyout />}>
          <Route index element={<StartPageLazy />} />
          <Route path="/login" element={<LoginLazy />} />
          <Route path="/register" element={<RegisterLazy />} />
          <Route path="/contacts" element={<PrivateOutlet/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};
