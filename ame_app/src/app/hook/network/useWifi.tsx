import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useWifi = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state?.isConnected ?? true);
    });

    // Limpia el evento cuando el componente se desmonta
    return () => {
      unsubscribe();
    };
  }, []);

  return {isConnected};
};
