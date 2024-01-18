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
import MapaCollection from '../../screen/user/MapaCollection';
import ClaimMedication from '../../screen/user/ClaimMedication';
import ServicePreview from '../../screen/user/ServicePreview';
import NotificationScream from '../../screen/Notificationcreen';
import UserProfile from '../../screen/user/UserProfile';
import Settings from '../../screen/settings';
import AcudientesList from '../../screen/user/AcudientesList';
import AboutTheApp from '../../screen/AboutTheApp';
import GenerateVitalSigns from '../../screen/GenerateVitalSigns';

const header = {
  header: MiniHeader,
  headerShown: true,
};

const modalScreeConfig: StackNavigationOptions = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
};

export const userRoutStackList: RoutListType[] = [
  {
    name: 'GenerateVitalSigns',
    components: GenerateVitalSigns,
    config: {...modalScreeConfig, title: 'Generar signos vitales'},
  },

  {
    name: 'AboutTheApp',
    components: AboutTheApp,
    config: {...modalScreeConfig, title: 'Ame App'},
  },

  {
    name: 'Settings',
    components: Settings,
    config: {...modalScreeConfig, title: 'Ajustes'},
  },
  {
    name: 'NotificationScream',
    components: NotificationScream,
    config: {...modalScreeConfig},
  },

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

  {
    name: 'MapaCollection',
    components: MapaCollection,
    config: {...modalScreeConfig},
  },

  {
    name: 'ClaimMedication',
    components: ClaimMedication,
    config: {...header},
  },
  {
    name: 'ServicePreview',
    components: ServicePreview,
    config: {...modalScreeConfig},
  },

  {
    name: 'UserProfile',
    components: UserProfile,
    config: {...modalScreeConfig, title: 'Mi cuenta'},
  },

  {
    name: 'AcudientesList',
    components: AcudientesList,
    config: {...modalScreeConfig, title: 'Mis Acudientes'},
  },
];
