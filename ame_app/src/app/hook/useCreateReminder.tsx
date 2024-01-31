import {useDispatch} from 'react-redux';
import {addReminder} from '../redux/ReminderSlice';
import {Reminder} from '../types/types';
const useCreateReminder = (reminder: Reminder) => {
  const dispatch = useDispatch();

  const addNewReminder = async () => {
    try {
      if (reminder) {
        dispatch(addReminder(reminder));
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  return {addNewReminder};
};

export default useCreateReminder;
