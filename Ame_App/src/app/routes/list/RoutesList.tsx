import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {MiniHeader} from '../../components/custom/MiniHeader';
import DropDownPikerScreen from '../../screen/DropDownPikerScreen';
import {MedicationsLists} from '../../screen/MedicationsLists';
import RequestService from '../../screen/user/ RequestService';
import AdherenciaMedica from '../../screen/user/AdherenciaMedica';
import BillPreview from '../../screen/user/BillPreview';
import MedicationCollection from '../../screen/user/MedicationCollection';
import PaymentsAndServices from '../../screen/user/PaymentsAndServices';
import {RoutListType} from '../../types/types';

const header = {
  header: MiniHeader,
  headerShown: true,
};

const modalScreeConfig: StackNavigationOptions = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
};

export const userRoutStackList: RoutListType[] = [
  {name: 'MedicationsLists', components: MedicationsLists},
  {
    name: 'PaymentsAndServices',
    components: PaymentsAndServices,
    config: {...header, title: 'Mis servicios y pagos'},
  },
  {
    name: 'AdherenciaMedica',
    components: AdherenciaMedica,
    config: {...header, title: 'Adherencia Medica'},
  },

  {
    name: 'BillPreview',
    components: BillPreview,
    config: {...header, title: 'Adherencia Medica'},
  },

  {
    name: 'RequestService',
    components: RequestService,
    config: {...header, title: 'Solicitar servicio'},
  },
  {
    name: 'MedicationCollection',
    components: MedicationCollection,
    config: {...header, title: 'recolección \n de medicamentos'},
  },

  {
    name: 'DropDownPikerScreen',
    components: DropDownPikerScreen,
    config: {...modalScreeConfig},
  },
];
