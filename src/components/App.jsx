import { Suspense, lazy, useEffect } from 'react';
import { Link, Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from 'redux/operationPhonebook';

import Contacts from 'pages/Contacts/Contacts';
// import StartPage from 'pages/StartPage/StartPage';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';
import { UserIn } from './UserIn/UserIn';

const StartPageLazy = lazy(() => import('pages/StartPage/StartPage'));

const Loyout = () => {
  const userState = useSelector(state => state.phonebook.user);
  const dispatch = useDispatch()

  useEffect(() => {
  dispatch(getCurrentUser())
}, [dispatch])

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};
