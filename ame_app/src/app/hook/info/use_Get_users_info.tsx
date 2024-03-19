/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-catch-shadow */
import {useEffect, useState} from 'react';
import {useFetch} from '../http/useFetch';
import {useDispatch} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {addInfoUser} from '../../redux/InfoSlice';
import NetInfo from '@react-native-community/netinfo';

export const use_Get_users_info = () => {
  const [isConnected, setIsConnected] = useState(false);
  const dispatcher = useDispatch();

  const {data, loading} = useFetch('user-info', 'user-info');

  console.log(data);

  const getUserDate = async () => {
    try {
      if (data && isConnected) {
        dispatcher(addInfoUser(data));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'Error al obtener tu información',
      });
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state?.isConnected ?? true);
    });
    getUserDate();
    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {data};
};
