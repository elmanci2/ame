import {StyleSheet} from 'react-native';
import {IconFont} from '../../constants/NavigationIcons';

interface StylesProps {
  fontFamily?: string;
  fontFamilyBold?: string;
  fontSize?: number;
  color?: string;
}

const Styles = (props: StylesProps) => {
  return StyleSheet.create({
    maneuverLabel: {
      flexDirection: 'row',
    },
    bold: {
      fontWeight: 'bold',
      fontFamily: props.fontFamilyBold || props.fontFamily,
      fontSize: props.fontSize,
      flexWrap: 'wrap',
      color: props.color,
    },
    regular: {
      fontFamily: props.fontFamily,
      fontSize: props.fontSize,
      flexWrap: 'wrap',
      color: props.color,
    },
    extra: {
      fontFamily: props.fontFamily,
      fontSize: props.fontSize ? props.fontSize * 0.8 : undefined,
      flexWrap: 'wrap',
      color: '#387bc1',
      marginTop: 4,
    },
    durationDistance: {
      fontFamily: props.fontFamily,
      fontSize: props.fontSize ? props.fontSize * 0.8 : undefined,
      opacity: 0.8,
      flexWrap: 'wrap',
    },
  });
};

export default Styles;
