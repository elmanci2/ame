import {colors} from '../../../../../constants/Constants';
import {GridItemType} from '../../../../types/types';

export const UserHomeGridArray: GridItemType[] = [
  {
    label: 'Mis servicios \n y pagos',
    route: 'PaymentsAndServices',
    icon: require('../../../../../assets/img/icon/user/home/grid1.png'),
    params: {
      name: 'lola',
    },

    color: colors.tertiary,
  },
  {
    label: 'Solicitar servicio',
    route: 'RequestService',
    icon: require('../../../../../assets/img/icon/user/home/grid2.png'),
    color: colors.tertiary,
  },
  {
    label: 'Adherencia \n  Medica',
    route: 'AdherenciaMedica',
    icon: require('../../../../../assets/img/icon/user/home/grid3.png'),
    color: colors.tertiary,
  },
  {
    label: 'Mis signos \n vitales',
    route: 'home',
    icon: require('../../../../../assets/img/icon/user/home/grid4.png'),
    color: colors.tertiary,
  },
];
