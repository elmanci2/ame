import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

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
};

export default constants;
