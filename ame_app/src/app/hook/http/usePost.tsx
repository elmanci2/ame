import {useState} from 'react';
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
