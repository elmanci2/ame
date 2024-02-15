import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {config} from '../../../config/config';

export const useFetch = (
  url: string,
  id: string,
  activeUrl: boolean = true,
) => {
  const [data, setData] = useState([]);

  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useQuery(['fetchData', url], async () => {
    const response = await fetch(
      activeUrl ? config.http.requestUrl + url : url,
    );
    console.log(config.http.requestUrl + url);

    if (!response.ok) {
      throw new Error(
        `Error al cargar los datos. Código de estado ${id}: ${response.status}`,
      );
    }
    return response.json();
  });

  // Actualiza el estado local de data cuando queryData cambia
  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  return {data, loading: isLoading, error, refetch};
};
