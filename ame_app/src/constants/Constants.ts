import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export const default_image =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg';

export const user_roles = {
  user: 'Usuario',
  delivery: 'Repartidor',
  visitor: 'Visitante',
};

export const colors = {
  primary: '#f5fbff',
  white: 'white',
  secundario: '#e01f3c',
  tertiary: '#76B0E1',
  icon: 'rgba(30, 30, 30, 0.68)',
  texto_ling: '#848484',
  texto_bold: '#585A66',
};

export const dimensions = {
  height,
  width,
};

const constants = {
  colors,
  dimensions,
  user_roles,
  default_image,
};

export default constants;
