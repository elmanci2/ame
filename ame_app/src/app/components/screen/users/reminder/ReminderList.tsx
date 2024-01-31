import {FlatList} from 'react-native';
import React, {Fragment, useState} from 'react';
import RenderReminder from './RenderReminder';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalStyle} from '../../../../styles/styles';
import {Reminder} from '../../../../types/types';
import {NotAddReminder} from './NotAddReminder';
import BottomModal from '../../../custom/BottomModal';
import {View} from 'moti';
import DeleteModal from '../../../custom/modal/DeleteModal';
import {deleteReminder} from '../../../../redux/ReminderSlice';
import {getDayAndMonth} from '../../../../../function/function';

interface Props {
  day: number;
  month: number;
}

function getCurrentDay(): number {
  const currentDate = new Date();
  return currentDate.getUTCDate();
}

function getCurrentMonth(): number {
  const currentDate = new Date();
  return currentDate.getUTCMonth() + 1; // Months in JavaScript are zero-based
}

const ReminderList = ({
  day = getCurrentDay(),
  month = getCurrentMonth(),
}: Props) => {
  const selector = useSelector((state: any) => state.reminder.reminder);

  const dispatcher = useDispatch();

  const [selectReminder, setSelectReminder] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const deleteReminders = () => {
    dispatcher(deleteReminder(selectReminder));
    setShowModal(false);
    return null;
  };
  const filteredReminders: Array<Reminder> = selector.filter(
    (item: Reminder) => {
      const {day: reminderDay, month: reminderMonth} =
        getDayAndMonth(item.date) || {};
      return reminderDay === day && reminderMonth === month;
    },
  );

  const onClose = () => {
    setShowModal(false);
  };

  if (filteredReminders.length < 1) {
    return <NotAddReminder />;
  }
  return (
    <Fragment>
      <FlatList
        contentContainerStyle={[GlobalStyle.gap]}
        data={filteredReminders}
        renderItem={({item}) => (
          <RenderReminder {...{item, setSelectReminder, setShowModal}} />
        )}
      />

      <BottomModal {...{setShowModal, showModal, onClose}}>
        <View>
          <DeleteModal
            title="Confirmar Eliminación"
            message="¿Estás seguro de que deseas eliminar este elemento?"
            remove={deleteReminders}
            cancel={() => setShowModal(false)}
          />
        </View>
      </BottomModal>
    </Fragment>
  );
};

export default ReminderList;
