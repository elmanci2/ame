import {StyleSheet} from 'react-native';
import {NavigationIconsFont} from '../../constants/NavigationIcons';

interface StylesProps {
  size?: number;
  opacity?: number;
  fontFamily?: string;
  fontSize?: number;
}

const Styles = ({size, opacity, fontFamily, fontSize}: StylesProps) =>
  StyleSheet.create({
    travelModeLabelContainer: {
      flexDirection: 'row',
    },

    travelModeLabelIcon: {
      ...NavigationIconsFont,
      fontSize: size,
      opacity: opacity,
    },

    travelModeLabelText: {
      fontFamily: fontFamily,
      fontSize: fontSize,
      opacity: opacity,
      flexWrap: 'wrap',
    },
  });

export default Styles;
