import axios from 'axios';
import {config} from '../../../config/config';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';
import {useState} from 'react';

export const useUploadFile = (url: string, file: any, body?: any) => {
  const token = useSelector((state: any) => state.tk);
  const [loading, setLoading] = useState(true);
  const Upload_file = async () => {
    try {
      const formData = new FormData();

      formData.append('photo', {
        name: file.assets[0].fileName,
        type: file.assets[0].type,
        uri:
          Platform.OS === 'ios'
            ? file.assets[0].uri.replace('file://', '')
            : file.assets[0].uri,
      });

      // Agregar otros datos si es necesario
      Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
      });

      const response = await axios.post(
        config.http.requestUrl + url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            tk: JSON.stringify(token),
          },
        },
      );

      // Verificar si la respuesta es exitosa
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      // Manejar la respuesta
      console.log('Respuesta del servidor:', response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      // Manejar errores
      console.error('Error al subir el archivo:', error);
      throw error; // Propagar el error para que el llamador pueda manejarlo
    }
  };

  return {Upload_file, loading};
};
