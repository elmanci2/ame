import {StyleSheet} from 'react-native';
import React, {memo} from 'react';
import ActionBottom from '../../custom/ActionBottom';
import {GlobalStyle, reminderStyle} from '../../../styles/styles';
import useCreateReminder from '../../../hook/useCreateReminder';
import {Reminder} from '../../../types/types';
import {useNavigation} from '@react-navigation/native';
import useScheduledNotification from '../../../hook/useScheduledNotification';

interface Props {
  reminder: Reminder;
  navigation?: any;
}

const CreateReminders = memo(({reminder}: Props) => {
  const navigation = useNavigation();
  const {scheduleNotification} = useScheduledNotification(reminder);
  const {addNewReminder} = useCreateReminder({...reminder});

  const action = () => {
    addNewReminder();
   // scheduleNotification();
    navigation.goBack();
  };
  return (
    <>
      <ActionBottom
        noStylesText
        textStyles={styles.textBtn}
        containerStyles={styles.actinBtn}
        text="Crear"
        action={() => action()}
      />
    </>
  );
});

export default CreateReminders;

const styles = StyleSheet.create({
  actinBtn: {justifyContent: 'center', width: '100%'},
  ...GlobalStyle,
  ...reminderStyle,
});
