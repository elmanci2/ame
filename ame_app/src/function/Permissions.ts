import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {create_object_storage} from './saveStorage';

export const requestUserPermissionMessage = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      // Obtener el token de registro
      const token = await messaging().getToken();
      await create_object_storage('fcm:tk', {token});
    }
  } catch (error) {
    console.error('Error al solicitar permiso:', error);
  }
};
