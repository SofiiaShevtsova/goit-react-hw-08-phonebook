import PropTypes from 'prop-types';
import { Heading, Box } from '@chakra-ui/react';

const Section = props => {
  const { title, children } = props;
  return (
    <Box w={[320, 420, 800]} p="20px">
      <Heading
        as="h2"
        bgGradient="linear(to-l, #4FD1C5, #234E52)"
        bgClip="text"
        fontSize={{ base: '24px', md: '28px', lg: '36px' }}
      >
        {title}
      </Heading>
      {children}
    </Box>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Section;
