import {StyleSheet} from 'react-native';
import {NavigationIconsFont} from '../../constants/NavigationIcons';

interface MarkerTextStylesProps {
  fontSize?: number;
  color?: string;
}

const MarkerTextStyles = ({
  fontSize = 30,
  color = '#000000',
}: MarkerTextStylesProps) => {
  return StyleSheet.create({
    markerText: {
      ...NavigationIconsFont,
      fontSize: fontSize,
      color: color,
    },
  });
};

export default MarkerTextStyles;
