import {FlatList} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
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
import {useFetch} from '../../../../hook/http/useFetch';
import {useWifi} from '../../../../hook/network/useWifi';
import {usePost} from '../../../../hook/http/usePost';

interface Props {
  day?: number;
  month?: number;
  reminders?: Reminder[];
  userId?: string;
  onLoad?: (load: boolean) => void;
}

const ReminderList = ({day, month, reminders = [], userId, onLoad}: Props) => {
  //const {reminder} = useSelector((state: any) => state);

  const dispatcher = useDispatch();
  const [selectReminder, setSelectReminder] = useState(0);
  const [filteredReminders, setFilteredReminders] = useState<Reminder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [initialDay, setDay] = useState<number>(getCurrentDay());
  const [initialMonth, setMonth] = useState<number>(getCurrentMonth());

  const getRoute = userId
    ? `visitor-reminder-list?id=${userId}`
    : 'user-reminder-ist';

  const wifi = useWifi().isConnected;
  const {data, loading, error, refetch} = useFetch(
    getRoute,
    getRoute,
    true,
    true,
  );

  const {postRequest , data:deleteData} = usePost(`user-delete-reminder`, {id: selectReminder});

  const deleteReminders = async () => {
    await postRequest();
    console.log(deleteData);
    dispatcher(deleteReminder(selectReminder));
    setShowModal(false);
    return null;
  };

  useEffect(() => {
    onLoad && onLoad(loading);
    const result: Reminder[] = data
      ? data.filter((item: Reminder) => {
          const {day: reminderDay, month: reminderMonth} =
            getDayAndMonth(item.date) || {};
          return reminderDay === day && reminderMonth === month;
        })
      : [];
    setFilteredReminders(result);
  }, [day, month, data, loading]);

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

function getCurrentDay(): number {
  const currentDate = new Date();
  return currentDate.getUTCDate();
}

function getCurrentMonth(): number {
  const currentDate = new Date();
  return currentDate.getUTCMonth() + 1;
}

export default ReminderList;
