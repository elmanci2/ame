import AsyncStorage from '@react-native-async-storage/async-storage';

export const create_object_storage = async (
  key: string,
  data: any,
): Promise<boolean> => {
  try {
    const datos = JSON.stringify(data);
    await AsyncStorage.setItem(key, datos);
    return true;
  } catch (error) {
    console.error('Error al crear objeto en AsyncStorage:', error);
    return false;
  }
};

export const get_object_storage = async (key: string): Promise<any | null> => {
  try {
    const datos = await AsyncStorage.getItem(key);
    if (datos) {
      return JSON.parse(datos);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener objeto en AsyncStorage:', error);
    return null;
  }
};
