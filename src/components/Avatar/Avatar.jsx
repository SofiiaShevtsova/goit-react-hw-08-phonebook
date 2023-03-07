import { changeAvatar } from 'redux/operationPhonebook';
import { useDispatch } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
    ModalCloseButton,
    Button,
    Input,
  VStack
} from '@chakra-ui/react';

const Avatars = props => {
const dispatch = useDispatch();

  const onClick = () => {
    props.closeModal();
  };

  const onSubmit = e => {
      e.preventDefault();
            const avatar = new FormData(e.target)
     dispatch(changeAvatar(avatar)) 
      props.closeModal();
  };

  return (
    <>
      <Modal isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <form id="formElem" encType="multipart/form-data" onSubmit={onSubmit}>
            <VStack spacing={6} align="flex-start" p="70px">
              <Input
                type="file"
                name="avatar"
                accept="image/*"
                variant="unstyled"
                focusBorderColor="teal.400"
              />
              <Button
                type="submit"
                colorScheme="teal"
                marginTop="30px"
                _hover={{ bg: 'gray', color: 'white' }}
              >
                Change avatar
              </Button>
            </VStack>
          </form>
          <ModalCloseButton onClick={onClick} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Avatars;
