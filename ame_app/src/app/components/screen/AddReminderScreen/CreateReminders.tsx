import {StyleSheet} from 'react-native';
import React, {memo, useState} from 'react';
import ActionBottom from '../../custom/ActionBottom';
import {GlobalStyle, reminderStyle} from '../../../styles/styles';
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
  const finalDate = '2024-02-23T08:00:00.000Z';

  // Definir el número de intervalos
  const intervals = '4h';

  const {calculateIntervals} = useMultipleReminder(
    {addNewReminder, notification: displayTriggerNotification},
    {
      initialDateTime: new Date(initialDate)?.toISOString() ?? '',
      finalDate,
    },
    intervals,
    reminder,
  );

  const action = async () => {
    try {
      cancelAllNotifications();
      calculateIntervals();
      /*  addNewReminder();
      navigation.goBack(); */
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

const styles = StyleSheet.create({
  actinBtn: {justifyContent: 'center', width: '100%'},
  ...GlobalStyle,
  ...reminderStyle,
});
