import React, {memo} from 'react';
import useCreateReminder from '../../../hook/useCreateReminder';
import {Reminder} from '../../../types/types';
import {useNavigation} from '@react-navigation/native';
import useScheduledNotification from '../../../hook/useScheduledNotification';
import NextBottomRegister from '../../../screen/register/components/NextBottomRegister';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import useMultipleReminder from '../../../hook/useMultipleReminder';
import {changeDate} from '../../../util/Tiem';

interface Props {
  reminder: Reminder;
  navigation?: any;
}

const CreateReminders = memo(({reminder}: Props) => {
  const navigation = useNavigation();
  const {displayTriggerNotification, cancelAllNotifications} =
    useScheduledNotification(reminder);

  const {addNewReminder} = useCreateReminder({...reminder});

  const initialDate = changeDate(reminder.date, reminder.originalTime.time);
  const intervals = `${reminder.repeat}h`;

  const {calculateIntervals} = useMultipleReminder(
    {addNewReminder, notification: displayTriggerNotification},
    {
      initialDateTime: new Date(initialDate)?.toISOString() ?? '',
    },
    intervals,
    reminder,
  );

  const action = async () => {
    try {
      cancelAllNotifications();
      calculateIntervals();
      addNewReminder();
      navigation.goBack();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: error?.message,
      });
    }
  };

  return (
    <>
      <NextBottomRegister active text="Crear" action={() => action()} />
    </>
  );
});

export default CreateReminders;
