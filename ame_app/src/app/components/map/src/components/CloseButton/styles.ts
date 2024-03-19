import {StyleSheet} from 'react-native';

interface StylesProps {
  size: number;
  opacity: number;
  color: string;
}

const Styles = ({size, opacity, color}: StylesProps) => {
  return StyleSheet.create({
    closeButtonText: {
      fontFamily: 'Navigation',
      fontSize: size,
      color: color,
      opacity: opacity,
      textAlign: 'center',
    },
  });
};

export default Styles;
