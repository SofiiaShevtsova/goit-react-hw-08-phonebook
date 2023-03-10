import { Link as ReachLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { List, ListItem, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Section from 'components/Section/Section';

const StartPage = () => {
  const userToken = useSelector(state => state.phonebook.token);
  const userName = useSelector(state => state.phonebook.user);

  return (
    <>
      {userToken ? (
        <Section
          title={`Hello ${userName.charAt(0).toUpperCase()}${userName.slice(
            1
          )}!`}
        ></Section>
      ) : (
        <Section title={'Welcome to website!'}>
          <List spacing={3} marginTop="50px">
            <ListItem>
              <Text fontSize={{ base: '16px', sm: '24px', lg: '28px' }}>
                If you are registered,
                <Link as={ReachLink} to="/login" color="teal.500">
                  Log in
                  <ExternalLinkIcon mx="5px" />
                </Link>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={{ base: '16px', sm: '24px', lg: '32px' }}>
                If you are not registered, you need to{' '}
                <Link as={ReachLink} to="/register" color="teal.500">
                  Register
                  <ExternalLinkIcon mx="5px" />
                </Link>
              </Text>
            </ListItem>
          </List>
        </Section>
      )}
    </>
  );
};
export default StartPage;
