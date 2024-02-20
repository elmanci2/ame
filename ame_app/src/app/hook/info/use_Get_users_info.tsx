import React from 'react';
import {useFetch} from '../http/useFetch';
import {useDispatch} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import { addInfoUser } from '../../redux/InfoSlice';

export const use_Get_users_info = () => {
  const {data, error, loading} = useFetch('user-info', 'user-info');
  const dispatcher = useDispatch();
  React.useEffect(() => {
    try {
      if (!loading && data) {
        dispatcher(addInfoUser(data));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'Error al obtener tu información',
      });
    }
  }, [loading, data]);

  return {data};
};
