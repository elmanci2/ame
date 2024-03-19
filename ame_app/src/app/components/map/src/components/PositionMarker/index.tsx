import React from 'react';
import {Text, View} from 'react-native';
import {Marker} from 'react-native-maps';
import connectTheme from '../../themes';
import Styles from './styles';
import PropTypes from 'prop-types';
import {POSITION_DOT, POSITION_ARROW} from '../../constants/MarkerTypes';

interface PositionMarkerProps {
  coordinate: {latitude: number, longitude: number} | undefined;
  size?: number;
  fontSize?: number;
  type?: string;
  color?: string;
  angle?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

const PositionMarker: React.FC<PositionMarkerProps> = ({
  coordinate,
  size = 40,
  fontSize = 30,
  type = POSITION_DOT,
  color = '#252525',
  angle = 60,
  borderWidth = 0,
  borderColor,
  backgroundColor = '#252525',
}) => {
  if (!coordinate) return null;

  const theme = connectTheme(theme).Markers[type];

  const styles = Styles({...props, ...theme});

  const renderArrow = () => {
    return (
      <Marker coordinate={coordinate} flat={false}>
        <View style={styles.positionMarkerArrow}>
          <Text style={styles.positionMarkerText}>{theme.icon}</Text>
        </View>
      </Marker>
    );
  };

  const renderDot = () => {
    return (
      <Marker coordinate={coordinate} flat={false}>
        <Text style={styles.positionMarkerText}>{theme.icon}</Text>
      </Marker>
    );
  };

  return type === POSITION_ARROW ? renderArrow() : renderDot();
};

PositionMarker.propTypes = {
  coordinate: PropTypes.object,
  size: PropTypes.number,
  fontSize: PropTypes.number,
  type: PropTypes.any,
  color: PropTypes.string,
  angle: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
};

export default PositionMarker;
