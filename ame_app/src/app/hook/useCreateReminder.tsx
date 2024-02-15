import {useDispatch} from 'react-redux';
import {addReminder} from '../redux/ReminderSlice';
import {Reminder} from '../types/types';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const useCreateReminder = (reminder: Reminder) => {
  const dispatch = useDispatch();

  const addNewReminder = async () => {
    try {
      if (reminder) {
        dispatch(addReminder(reminder));
        Toast.show({
          type: 'success',
          text2: 'Recordatorio agregado',
        });
        return true;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'Recordatorio no agregado',
      });
    }
  };

  return {addNewReminder};
};

export default useCreateReminder;
