import {useDispatch, useSelector} from 'react-redux';
import {addReminder} from '../redux/ReminderSlice';
import {Reminder, UserData} from '../types/types';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {usePost} from './http/usePost';
import {user_roles} from '../../constants/Constants';
const useCreateReminder = (reminder?: Reminder) => {
  const dispatch = useDispatch();
  const {
    util,
    tk: {type},
  } = useSelector((state: any) => state);

  const renderRute =
    type === user_roles.user
      ? 'user-add-reminder'
      : `visitor-add-reminder?id=${util.select_user_reminder}`;

  const {data, loading, error, postRequest} = usePost(renderRute, reminder);

  //console.log(select_user_reminder);

  const addNewReminder = async () => {
    try {
      if (reminder) {
        await postRequest();
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
