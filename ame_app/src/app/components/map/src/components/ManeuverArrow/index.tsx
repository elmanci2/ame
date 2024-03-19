import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import Styles from './styles';
import NavigationIcons from '../../constants/NavigationIcons';
import {DEFAULT_DIRECTION_TYPE} from '../../constants/DirectionTypes';

interface ManeuverArrowProps {
  maneuver?: any;
  size?: number;
  opacity?: number;
  color?: string;
}

const ManeuverArrow: React.FC<ManeuverArrowProps> = ({
  maneuver,
  size = 25,
  opacity = 1,
  color = '#000000',
}) => {
  const styles = Styles({size, opacity, color});

  const icon = maneuver && (maneuver.name || DEFAULT_DIRECTION_TYPE);

  return <Text style={styles.maneuverArrow}>{NavigationIcons[icon]}</Text>;
};

ManeuverArrow.propTypes = {
  maneuver: PropTypes.object,
  size: PropTypes.number,
  opacity: PropTypes.number,
  color: PropTypes.any,
};

export default ManeuverArrow;
