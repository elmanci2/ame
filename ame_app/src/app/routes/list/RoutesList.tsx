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
import RegisterHome from '../../screen/register/RegisterHome';
import IntroductionAnimationScreen from '../../screen/onbording/introduction_animation/IntroductionAnimationScreen';
import PreRegister from '../../screen/register/PreRegister';
import ValidatePhone from '../../screen/register/ValidatePhone';
import Location from '../../screen/register/Location';
import Document from '../../screen/register/Document';
import Password from '../../screen/register/Password';
import UserHomeScreen from '../../screen/user/UserHomeScreen';
import AddReminderScreen from '../../screen/AddReminderScreen';

const header = {
  header: MiniHeader,
  headerShown: true,
};

const modalScreeConfig: StackNavigationOptions = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
};

const modalHorizontalScreeConfig: StackNavigationOptions = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const userRouteLIst: RoutListType[] = [
  {name: 'onboarding', components: IntroductionAnimationScreen},

  {
    name: 'home_register',
    components: RegisterHome,
    config: {...modalHorizontalScreeConfig},
  },

  {
    name: 'PaymentsAndServices',
    components: PaymentsAndServices,
    config: {...header, title: 'Mis servicios y pagos'},
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
    name: 'AcudientesList',
    components: AcudientesList,
    config: {...modalScreeConfig, title: 'Mis Acudientes'},
  },
];
/* export const VisitorRouteLIst: RoutListType[] = [];
export const DeliveryRouteLIst: RoutListType[] = []; */

export const LoginRouteLIst: RoutListType[] = [
  
  {
    name: 'preRegister',
    components: PreRegister,
    config: {
      ...modalScreeConfig,
    },
  },

  {
    name: 'otp_phone',
    components: ValidatePhone,
    config: {
      ...modalScreeConfig,
    },
  },

  {
    name: 'register_location',
    components: Location,
    config: {
      ...modalHorizontalScreeConfig,
    },
  },

  {
    name: 'Document',
    components: Document,
    config: {
      ...modalHorizontalScreeConfig,
    },
  },
  {
    name: 'Password',
    components: Password,
    config: {
      ...modalScreeConfig,
    },
  },

  /*  {
    name: 'DropDownPikerScreen',
    components: DropDownPikerScreen,
    config: {
      ...modalScreeConfig,
    },
  }, */
];

export const userRoutStackList: RoutListType[] = [
  ...userRouteLIst,
  ...LoginRouteLIst,
  {
    name: 'addReminder',
    components: AddReminderScreen,
    config: {
      ...modalScreeConfig,
    },
  },
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
    name: 'AdherenciaMedica',
    components: AdherenciaMedica,
    config: {...header, title: 'Adherencia Medica'},
  },

  {
    name: 'BillPreview',
    components: BillPreview,
    config: {...header},
  },

  {
    name: 'DropDownPikerScreen',
    components: DropDownPikerScreen,
    config: {...modalScreeConfig},
  },

  {
    name: 'UserProfile',
    components: UserProfile,
    config: {...modalScreeConfig, title: 'Mi cuenta'},
  },
];
