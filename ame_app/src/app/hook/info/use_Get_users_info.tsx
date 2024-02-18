import React from 'react';
import {useFetch} from '../http/useFetch';

export const use_Get_users_info = () => {
  const {data} = useFetch('user-info', 'user-info');

  console.log(data);

  return {data};
};
