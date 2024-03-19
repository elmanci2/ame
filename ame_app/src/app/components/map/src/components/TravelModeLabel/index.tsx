import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {MODE_MAPPING} from '../../constants/TravelModes';
import Styles from './styles';

interface TravelModeLabelProps {
  size?: number;
  opacity?: number;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  useIcon?: boolean;
  useLabel?: boolean;
  mode?: string;
}

const TravelModeLabel: React.FC<TravelModeLabelProps> = ({
  size,
  opacity = 0.8,
  color,
  fontFamily,
  fontSize = 25,
  useIcon = true,
  useLabel = true,
  mode,
}) => {
  const styles = Styles({size, opacity, color, fontFamily, fontSize});

  const travelMode = MODE_MAPPING[mode];

  if (!travelMode) return null;

  return (
    <View style={styles.travelModeLabelContainer}>
      {useIcon && (
        <Text style={styles.travelModeLabelIcon}>{travelMode.icon}</Text>
      )}

      {useLabel && (
        <Text style={styles.travelModeLabelText}>{travelMode.name}</Text>
      )}
    </View>
  );
};

TravelModeLabel.propTypes = {
  size: PropTypes.number,
  opacity: PropTypes.number,
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  useIcon: PropTypes.bool,
  useLabel: PropTypes.bool,
  mode: PropTypes.string,
};

export default TravelModeLabel;
