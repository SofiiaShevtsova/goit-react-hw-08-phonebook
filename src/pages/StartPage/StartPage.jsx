import { Link as ReachLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { List, ListItem, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Section from 'components/Section/Section';

const StartPage = () => {
  const userState = useSelector(state => state.phonebook.user);

  return (
    <>
      {userState ? (
        <Section title={`Hello ${userState.charAt(0).toUpperCase()}${userState.slice(1)}!`}></Section>
      ) : (
        <Section title={'Welcome to website!'}>
          <List spacing={3}>
              <ListItem>
                <Text fontSize='2xl'>If you are registered,
              <Link as={ReachLink} to="/login" color='teal.500'>
                Log in
                <ExternalLinkIcon mx="5px" />
              </Link></Text>
              
            </ListItem>
              <ListItem>
                <Text fontSize='2xl'>If you are not registered, you need to{' '}
              <Link as={ReachLink} to="/register" color='teal.500'>
                Register
                <ExternalLinkIcon mx="5px" />
              </Link></Text>
              
            </ListItem>
          </List>
        </Section>
      )}
    </>
  );
};
export default StartPage;
