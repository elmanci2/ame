import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Reminder} from '../types/types';

export const useReminderList = () => {
  const selector = useSelector((state: any) => state.reminder.reminder);
  const [list] = useState<Array<Reminder>>(selector);

  return {list};
};
