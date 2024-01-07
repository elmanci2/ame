import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';

export const useFetch = (url: string, id: string) => {
  const [data, setData] = useState([]);

  const {data: queryData, isLoading} = useQuery(
    ['fetchData', url],
    async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Error al cargar los datos. Código de estado ${id}: ${response.status}`,
        );
      }
      return response.json();
    },
  );

  // Actualiza el estado local de data cuando queryData cambia
  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  return {data, loading: isLoading};
};
