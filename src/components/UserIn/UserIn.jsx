import { useDispatch } from 'react-redux';
import { logOutUser } from 'redux/operationPhonebook';

export const UserIn = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <button type="button" onClick={onClick}>
        Log out...
      </button>
    </>
  );
};
