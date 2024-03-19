import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {config} from '../../../config/config';
import {useSelector} from 'react-redux';

export const useFetch = (
  url: string,
  id: string,
  activeUrl: boolean = true,
  updateDate: boolean = false,
) => {
  const [data, setData] = useState<any>([]);

  const token = useSelector((state: any) => state.tk);

  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useQuery(['fetchData', url], async () => {
    const headers = {
      tk: JSON.stringify(token), // Pasar el token como encabezado de autorización
      'Content-Type': 'application/json', // Otras cabeceras opcionales
    };

    const response = await fetch(
      activeUrl ? config.http.requestUrl + url : url,
      {
        headers: headers,
      },
    );

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

  // Temporizador para refrescar los datos cada dos segundos si updateDate está activo
  useEffect(() => {
    if (updateDate) {
      const interval = setInterval(() => {
        refetch();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [updateDate, refetch]);

  return {data, loading: isLoading, error, refetch};
};
