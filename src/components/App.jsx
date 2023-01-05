import { Suspense, lazy, useEffect } from 'react';
import { Link, Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from 'redux/operationPhonebook';
import {
  useColorMode,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spacer,
  Spinner,
  Box,
} from '@chakra-ui/react';

import { UserIn } from './UserIn/UserIn';

const StartPageLazy = lazy(() => import('pages/StartPage/StartPage'));
const ContactsLazy = lazy(() => import('pages/Contacts/Contacts'));
const RegisterLazy = lazy(() => import('pages/Register/Register'));
const LoginLazy = lazy(() => import('pages/Login/Login'));

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </>
  );
}

const Loyout = () => {
  const userState = useSelector(state => state.phonebook.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Flex>
        <Breadcrumb
          spacing="20px"
          separator=""
          fontWeight="medium"
          fontSize="sm"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Start page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/contacts">
              Contacts
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Spacer />
        <ToggleTheme />
      </Flex>
      <>
        {userState && <UserIn />}
        <Suspense
          fallback={
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          }
        >
          <Outlet />
        </Suspense>
      </>
    </>
  );
};

const PrivateOutlet = ({ children, user }) => {
  return user !== '' ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children, user }) => {
  return user === '' ? children : <Navigate to="/" />;
};

export const App = () => {
  const userState = useSelector(state => state.phonebook.user);
  return (
    <Box
      w="100%"
      p={4}
      fontWeight="semibold"
      letterSpacing="wide"
      fontSize="xs"
      textAlign='center'
    >
      <Routes>
        <Route path="/" element={<Loyout />}>
          <Route index element={<StartPageLazy />} />
          <Route
            path="/login"
            element={
              <PublicRoute user={userState}>
                <LoginLazy />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute user={userState}>
                <RegisterLazy />
              </PublicRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateOutlet user={userState}>
                <ContactsLazy />
              </PrivateOutlet>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Box>
  );
};
