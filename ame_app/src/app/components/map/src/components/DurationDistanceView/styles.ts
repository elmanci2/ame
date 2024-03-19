import {StyleSheet} from 'react-native';
import {IconFont} from '../../constants/NavigationIcons';

interface StylesProps {
  // Define los tipos de las props aquí si es necesario
}

const Styles = (props: StylesProps) => {
  return StyleSheet.create({
    durationDistanceView: {
      padding: 15,
      backgroundColor: '#f7f7f4',
      flexDirection: 'row',
      minHeight: 120,
      alignItems: 'center',
    },
    durationDistanceContent: {
      flex: 1,
    },
    durationDistanceClose: {
      flex: 0,
      width: 30,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  });
};

export default Styles;
