import {StyleSheet} from 'react-native';
import {NavigationIconsFont} from '../../constants/NavigationIcons';

interface StylesProps {
  fontFamily?: string;
  fontSize?: number;
  opacity?: number;
}

const Styles = ({fontFamily, fontSize = 16, opacity = 0.8}: StylesProps) => {
  return StyleSheet.create({
    durationDistanceText: {
      fontFamily: fontFamily,
      fontSize: fontSize * 0.8,
      opacity: opacity,
      flexWrap: 'wrap',
    },
    durationDistanceTravelModeIcon: {
      ...NavigationIconsFont,
      fontSize: fontSize * 0.8,
      opacity: opacity,
      marginRight: 8,
    },
  });
};

export default Styles;
