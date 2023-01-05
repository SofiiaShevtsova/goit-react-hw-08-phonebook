import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Section from 'components/Section/Section';

const StartPage = () => {
  const userState = useSelector(state => state.phonebook.user);

  return (
    <>
      {userState ? (
        <>Hello {userState}</>
      ) : (
        <Section title={'Welcome to website!'}>
          <ul>
            <li>
              If you are registered, log in.
              <Link to="/login">Log in</Link>
            </li>
            <li>
              If you are not registered, you need to register.
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </Section>
      )}
    </>
  );
};
export default StartPage;
