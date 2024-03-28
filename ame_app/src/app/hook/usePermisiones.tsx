import {PermissionsAndroid, Platform} from 'react-native';

type Permission = 'camera' | 'storage' | string; // Add more permission names here

const PERMISSIONS: Record<Permission, string> = {
  camera:
    Platform.OS === 'android'
      ? PermissionsAndroid.PERMISSIONS.CAMERA
      : 'camera',
  storage:
    Platform.OS === 'android'
      ? PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      : 'storage',
  // Add more permission constants here following the same format
};

const requestPermission = async (permission: Permission): Promise<boolean> => {
  const permissionConstant: any = PERMISSIONS[permission];
  if (!permissionConstant) {
    console.warn(`Permission '${permission}' not found`);
    return false;
  }

  try {
    const granted = await PermissionsAndroid.request(permissionConstant);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(`${permission} permission granted`);
      return true;
    } else {
      console.log(`${permission} permission denied`);
      return false;
    }
  } catch (err) {
    console.warn(`Error requesting ${permission} permission: `, err);
    return false;
  }
};

export default function usePermisiones() {
  return {requestPermission};
}
