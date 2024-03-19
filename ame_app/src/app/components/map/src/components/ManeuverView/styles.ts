import {StyleSheet, ViewStyle} from 'react-native';

interface StylesProps {
  backgroundColor?: string;
}

const styles = ({backgroundColor}: StylesProps) =>
  StyleSheet.create({
    maneuverView: {
      padding: 15,
      backgroundColor: backgroundColor || '#f7f7f4',
      flexDirection: 'row',
      minHeight: 120,
      alignItems: 'center',
    },
    maneuverViewArrow: {
      flex: 0,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    maneuverViewDirection: {
      flex: 1,
    },
    maneuverClose: {
      flex: 0,
      width: 30,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  });

export default styles;
