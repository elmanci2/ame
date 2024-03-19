import {useState} from 'react';
import {config} from '../../../config/config';
import {useSelector} from 'react-redux';

export const usePost = (url: string, requestData: any) => {
  const token = useSelector((state: any) => state.tk);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const postRequest = async (datos?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(config.http.requestUrl + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          tk: JSON.stringify(token),
        },
        body: JSON.stringify(datos ? datos : requestData),
      });

      if (!response.ok) {
        // Manejar errores para respuestas no exitosas
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
        );
      }

      // Manejar la respuesta como sea necesario
      const responseData = await response.json();
      //  console.log('Post request successful:', responseData);
      setData(responseData);
      return responseData;
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error: any) {
      // Manejar errores
      console.error('Error making post request:', error);
      setError(error.message || 'An error occurred');
      throw error; // Puedes elegir manejar los errores de manera diferente según tu caso de uso
    } finally {
      setLoading(false);
    }
  };

  return {
    postRequest,
    loading,
    error,
    data,
  };
};
