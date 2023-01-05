import { Link as ReachLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { List, ListItem, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Section from 'components/Section/Section';

const StartPage = () => {
  const userState = useSelector(state => state.phonebook.user);

  return (
    <>
      {userState ? (
        <Section title={`Hello ${userState}`}></Section>
      ) : (
        <Section title={'Welcome to website!'}>
          <List spacing={3}>
            <ListItem>
              If you are registered,{' '}
              <Link as={ReachLink} to="/login">
                Log in
                <ExternalLinkIcon mx="5px" />
              </Link>
            </ListItem>
            <ListItem>
              If you are not registered, you need to{' '}
              <Link as={ReachLink} to="/register">
                Register
                <ExternalLinkIcon mx="5px" />
              </Link>
            </ListItem>
          </List>
        </Section>
      )}
    </>
  );
};
export default StartPage;
