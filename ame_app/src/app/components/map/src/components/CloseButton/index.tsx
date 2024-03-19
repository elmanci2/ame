import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import NavigationIcons from '../../constants/NavigationIcons';
import Styles from './styles';

interface CloseButtonProps {
  maneuver?: any;
  size?: number;
  opacity?: number;
  color?: string;
  onPress?: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  maneuver,
  size = 25,
  opacity = 1,
  color = '#000000',
  onPress,
}) => {
  const styles = Styles({size, opacity, color});

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.closeButtonText}>{NavigationIcons.close}</Text>
    </TouchableOpacity>
  );
};

export default CloseButton;
