import { Link } from 'react-router-dom';
import Section from 'components/Section/Section';

const StartPage = () => {
  return (
    <Section title={"Welcome to website!"}>
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
  );
};
export default StartPage;
