import {addService, deleteService} from '../../redux/ServiceSlider';
import {Service} from '../../types/types';
import {useDispatch} from 'react-redux';

function useServices() {
  const dispatch = useDispatch();

  const add = (service: Service) => {
    try {
      dispatch(addService(service));
      return true;
    } catch (error) {
      return false;
    }
  };

  const remove = (id: string) => {
    try {
      dispatch(deleteService(id));
      return true;
    } catch (error) {
      return false;
    }
  };

  return {add, remove};
}

export default useServices;
