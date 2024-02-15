import {colors} from '../../../../constants/Constants';
import {GridItemType} from '../../../types/types';

const color = colors.white;

export const VisitorGritMenu: GridItemType[] = [
  {
    label: 'Generar Recordatorio',
    route: 'Recordatorio',
    icon: require('../assets/img/grid1.png'),
    params: {
      name: 'lola',
    },

    color,
  },
  {
    label: 'Mis servicios y pagos',
    route: 'Servicios',
    icon: require('../assets/img/grid2.png'),
    color,
  },
  {
    label: 'Adherencia \n  Medica',
    route: 'AdherenciaMedica',
    icon: require('../assets/img/grid3.png'),
    color,
  },
  {
    label: 'Generar Signos Vitales',
    route: 'Signos',
    icon: require('../assets/img/grid4.png'),
    color,
  },
];
