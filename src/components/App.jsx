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
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { UserIn } from './UserIn/UserIn';

const StartPageLazy = lazy(() => import('pages/StartPage/StartPage'));
const ContactsLazy = lazy(() => import('pages/Contacts/Contacts'));
const RegisterLazy = lazy(() => import('pages/Register/Register'));
const LoginLazy = lazy(() => import('pages/Login/Login'));

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button
        colorScheme="teal"
        onClick={toggleColorMode}
        pos="fixed"
        top={'25%'}
        right={'30px'}
        zIndex={2}
      >
        {colorMode === 'light' ? (
          <MoonIcon boxSize={6} />
        ) : (
          <SunIcon boxSize={6} />
        )}
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
      <Flex w={[320, 420, 800]} justifyContent="center" mx="auto" py="20px">
        <Breadcrumb
          spacing="20px"
          separator=""
          fontWeight="medium"
          fontSize={{ base: '16px', md: '24px', lg: '24px' }}
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{ color: 'teal' }}
              _focus={{ color: 'teal' }}
            >
              Start page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/contacts"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{ color: 'teal' }}
              _focus={{ color: 'teal' }}
            >
              Contacts
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Spacer />
        {userState && <UserIn />}
      </Flex>
      <Center>
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
      </Center>
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
  const errorMessage = useSelector(state => state.phonebook.error);

  return (
    <Box
      w="100%"
      p="30px"
      fontWeight="semibold"
      letterSpacing="wide"
      fontSize="xs"
      textAlign="center"
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
      <ToggleTheme />
      {errorMessage && (
        <Alert status="error" backgroundColor="red.500" pos="fixed" top={'5%'} right="30%" w="400px" zIndex={2}>
          <AlertIcon />
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}
    </Box>
  );
};
