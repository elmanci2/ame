import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import Styles from './styles';
import {MODE_MAPPING} from '../../constants/TravelModes';

interface DurationDistanceLabelProps {
  style?: any;
  instructions?: string;
  fontFamily?: string;
  fontSize?: number;
  distance?: any;
  duration?: any;
  opacity?: number;
  withTravelModeIcon?: boolean;
  mode?: string; // Agrega el tipo para mode
}

const DurationDistanceLabel: React.FC<DurationDistanceLabelProps> = ({
  style = {},
  instructions = '',
  fontFamily,
  fontSize = 16,
  distance,
  duration,
  opacity = 0.8,
  withTravelModeIcon = false,
  mode, // Añade mode como prop
}) => {
  const styles = Styles({fontFamily});

  const travelMode = MODE_MAPPING[mode]; // Usa mode en lugar de this.props.mode

  return (
    <Text style={[styles.durationDistanceText, style]}>
      {!withTravelModeIcon || !travelMode ? null : (
        <Text style={styles.durationDistanceTravelModeIcon}>
          {travelMode.icon}{' '}
        </Text>
      )}
      {distance ? distance.text : ''}
      {duration ? `  (${duration.text})` : ''}
    </Text>
  );
};

DurationDistanceLabel.propTypes = {
  style: PropTypes.any,
  instructions: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  distance: PropTypes.object,
  duration: PropTypes.object,
  opacity: PropTypes.number,
  withTravelModeIcon: PropTypes.bool,
  mode: PropTypes.string, // Añade la definición de tipo para mode
};

export default DurationDistanceLabel;
