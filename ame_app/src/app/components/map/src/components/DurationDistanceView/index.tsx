import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text} from 'react-native';
import Styles from './styles';
import CloseButton from '../CloseButton';
import DurationDistanceLabel from '../DurationDistanceLabel';

interface ManeuverViewProps {
  step: any;
  fontFamily?: string;
  fontFamilyBold?: string;
  fontSize?: number;
  arrowSize?: number;
  arrowColor?: string;
  withCloseButton?: boolean;
  onClose?: () => void;
  onPress?: () => void;
}

const ManeuverView: React.FC<ManeuverViewProps> = ({
  step,
  fontFamily,
  fontFamilyBold,
  fontSize = 20,
  arrowSize = 50,
  arrowColor = '#545455',
  withCloseButton = false,
  onClose,
  onPress,
}) => {
  const styles = Styles({fontFamily, fontSize});

  if (!step) return null;

  return (
    <TouchableOpacity style={styles.durationDistanceView} onPress={onPress}>
      <View style={styles.durationDistanceContent}>
        <DurationDistanceLabel
          distance={step.distance}
          duration={step.duration}
        />
      </View>
      {withCloseButton && (
        <View style={styles.durationDistanceClose}>
          <CloseButton onPress={onClose} />
        </View>
      )}
    </TouchableOpacity>
  );
};

ManeuverView.propTypes = {
  step: PropTypes.any.isRequired,
  fontFamily: PropTypes.string,
  fontFamilyBold: PropTypes.string,
  fontSize: PropTypes.number,
  arrowSize: PropTypes.number,
  arrowColor: PropTypes.string,
  withCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  onPress: PropTypes.func,
};

export default ManeuverView;
