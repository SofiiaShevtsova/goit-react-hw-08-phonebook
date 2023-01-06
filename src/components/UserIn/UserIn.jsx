import { useDispatch } from 'react-redux';
import { logOutUser } from 'redux/operationPhonebook';
import { Button } from '@chakra-ui/react';

export const UserIn = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <Button colorScheme='teal' _hover={{ bg: 'gray', color: "white" }} type="button" onClick={onClick}>
        Log out...
      </Button>
    </>
  );
};
