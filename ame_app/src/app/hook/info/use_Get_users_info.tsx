/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState} from 'react';
import {useFetch} from '../http/useFetch';
import {useDispatch} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {addInfoUser} from '../../redux/InfoSlice';
import NetInfo from '@react-native-community/netinfo';

export const use_Get_users_info = async () => {
  const [isConnected, setIsConnected] = useState(false);
  const dispatcher = useDispatch();

  const {data, loading} = useFetch('user-info', 'user-info');

  const getUserDate = async () => {
    try {
      if (data && isConnected && !loading) {
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
  }, [loading, data, isConnected]);

  return {data};
};
