import PropTypes from 'prop-types';
import { Heading, Box  } from '@chakra-ui/react';


const Section = props => {
  const { title, children } = props;
  return (
    <Box>
      <Heading as='h2' size='2xl'>{title}</Heading >
      {children}
    </Box>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Section;
