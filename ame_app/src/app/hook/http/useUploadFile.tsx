import {config} from '../../../config/config';
import {useSelector} from 'react-redux';
import base64 from 'react-native-base64';

export const useUploadFile = (url: string, file: any, datos?: any) => {
  const token = useSelector((state: any) => state.tk);
  console.log(datos);

  const Upload_file = async () => {
    try {
      // Codificar la imagen como Base64
      const base64Image = await encodeImageToBase64(file?.assets[0].uri);

      // Construir el cuerpo de la solicitud
      const body = {
        image: base64Image,
        fileName: file?.assets[0].fileName,
        fileSize: file?.assets[0].fileSize,
        // Agrega otros datos si es necesario
        ...(datos && datos),
      };

      const response = await fetch(config.http.requestUrl + url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          tk: JSON.stringify(token),
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      // Aquí puedes manejar la respuesta según tus necesidades
      console.log('Respuesta del servidor:', responseData);
      return responseData;
    } catch (error) {
      // Aquí puedes manejar el error si ocurre alguno
      console.error('Error al subir el archivo:', error);
    }
  };

  return {Upload_file};
};

// Función para codificar una imagen a Base64
const encodeImageToBase64 = async (uri: string) => {
  const response = await fetch(uri);
  console.log(response);

  const blob = await response.blob();
  const base64String = base64.encode(await blobToBase64(blob));
  return base64String;
};

// Función para convertir un Blob a Base64
const blobToBase64 = async (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
