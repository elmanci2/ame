import GetService from '../../screen/GetService';
import GetServices from '../../screen/GetServices';
import GenerateSignesVisitorScreen from '../../screen/medical/GenerateSignesVisitorScreen';
import HomeVisitorScreen from '../../screen/medical/HomeVisitorScreen';
import RecordatorioVisitorScreen from '../../screen/medical/RecordatorioVisitorScreen';
import RequestService from '../../screen/user/ RequestService';
import UserHomeScreen from '../../screen/user/UserHomeScreen';
import UserRemindersScreen from '../../screen/user/UserRemindersScreen';
import VitalSigne from '../../screen/user/VitalSigne';
import {RoutListType} from '../../types/types';

export const MedicalStack: RoutListType[] = [
  {components: HomeVisitorScreen, name: 'Inicio'},
  {
    components: GenerateSignesVisitorScreen,
    name: 'Signos',
    config: {
      title: 'Generar signos vitales',
    },
  },

  {components: GetServices, name: 'Servicios'},
  {
    components: RecordatorioVisitorScreen,
    name: 'Recordatorio',
    config: {
      title: 'Recordatorios',
    },
  },
];

export const UserBottomRouteList: RoutListType[] = [
  {components: UserHomeScreen, name: 'Inicio'},
  {
    components: UserRemindersScreen,
    name: 'Medicamentos',
    config: {
      title: 'Mis medicamentos',
    },
  },
  {
    components: RequestService,
    name: 'Servicios',
    config: {
      title: 'Solicitar servicio',
    },
  },
  {
    components: VitalSigne,
    name: 'Signos',
    config: {
      title: 'Signos vitales',
    },
  },
];
