import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import FormAddContact from 'components/FormAddContact/FormAddContact';

export const AddContact = () => {
  return (
    <Accordion defaultIndex={[1]} allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="center"
              fontSize="24px"
              bgGradient="linear(to-l, #4FD1C5, #234E52)"
              bgClip="text"
            >
              Add contact
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <FormAddContact />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
