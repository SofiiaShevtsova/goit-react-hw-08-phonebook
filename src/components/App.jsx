import { Suspense, lazy } from 'react';
import { Link, Outlet, Route, Routes, Navigate } from 'react-router-dom';

import Contacts from 'pages/Contacts/Contacts';
import StartPage from 'pages/StartPage/StartPage';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';

const Loyout = () => {
  return (
    <>
      <nav>
        <Link to="/">Start page</Link>
        <Link to="/contacts">Contacts</Link>
      </nav>
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
          <Route index element={<StartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};
