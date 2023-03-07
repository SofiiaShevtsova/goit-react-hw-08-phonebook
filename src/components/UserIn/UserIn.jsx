import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from 'redux/operationPhonebook';
import { Button, Avatar } from '@chakra-ui/react';
import { useState } from 'react';
import Avatars from 'components/Avatar/Avatar';

export const UserIn = () => {
  const dispatch = useDispatch();
  const [modalAvatar, setModalAvatar] = useState(false);
  const onClick = () => {
    dispatch(logOutUser());
  };
  const changeAvatar = () => {
    setModalAvatar(prev => !prev);
  };
  const userAvatar = useSelector(state => state.phonebook.avatar);

  return (
    <>
      <Avatar
        size={{ base: 'xs', md: 'md', lg: 'md' }}
        mr="30px"
        name="avatar"
        href={userAvatar}
        onClick={changeAvatar}
      />
      {modalAvatar && <Avatars closeModal={changeAvatar} isOpen={ modalAvatar} />}
      <Button
        colorScheme="teal"
        size={{ base: 'xs', md: 'md', lg: 'md' }}
        _hover={{ bg: 'gray', color: 'white' }}
        type="button"
        onClick={onClick}
      >
        Log out...
      </Button>
    </>
  );
};
