import {StyleSheet} from 'react-native';
import {NavigationIconsFont} from '../../constants/NavigationIcons';

interface StylesProps {
  fontSize: number;
  color: string;
  backgroundColor: string;
  size: number;
  angle: number;
}

const styles = (props: StylesProps) =>
  StyleSheet.create({
    positionMarkerText: {
      ...NavigationIconsFont,
      fontSize: props.fontSize,
      color: props.color,
    },
    positionMarkerArrow: {
      backgroundColor: props.backgroundColor,
      width: props.size,
      height: props.size,
      borderRadius: props.size,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{rotateX: props.angle + 'deg'}],
    },
  });

export default styles;
