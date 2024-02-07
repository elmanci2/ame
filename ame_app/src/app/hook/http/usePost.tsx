/* import {useState} from 'react';
import axios from 'axios';
import { config } from '../../../config/config';

export const usePost = (url:string , requestData:any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const postRequest = async () => {
    console.log(config.http.requestUrl +  url);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(config.http.requestUrl +  url, requestData);

      
      // Handle the response data as needed
      console.log('Post request successful:', response.data);
      setData(response.data);
      return response.data;
    } catch (error:any) {
      // Handle errors
      console.error('Error making post request:', error);
      setError(error.message || 'An error occurred');
      throw error; // You can choose to handle errors differently based on your use case
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
 */

import {useState} from 'react';
import {config} from '../../../config/config';

export const usePost = (url: string, requestData: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const postRequest = async () => {
    console.log(config.http.requestUrl + url);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(config.http.requestUrl + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de ajustar el tipo de contenido según tus necesidades
        },
        body: JSON.stringify(requestData),
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
    } catch (error) {
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
