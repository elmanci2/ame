import {StyleSheet} from 'react-native';
import IconFont from '../../constants/NavigationIcons';

interface StylesProps {
  size?: number;
  color?: string;
  opacity?: number;
}

const Styles = (props: StylesProps) => {
  return StyleSheet.create({
    maneuverArrow: {
      fontFamily: 'Navigation',
      fontSize: props.size,
      color: props.color,
      opacity: props.opacity,
      textAlign: 'center',
    },
  });
};

export default Styles;
