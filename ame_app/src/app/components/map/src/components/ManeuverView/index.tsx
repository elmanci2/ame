import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Styles from './styles';
import ManeuverArrow from '../ManeuverArrow';
import ManeuverLabel from '../ManeuverLabel';
import CloseButton from '../CloseButton';

interface ManeuverViewProps {
  step: any;
  fontFamily?: string;
  fontFamilyBold?: string;
  fontSize?: number;
  arrowSize?: number;
  arrowColor?: string;
  backgroundColor?: string;
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
  backgroundColor = '#f7f7f4',
  withCloseButton = false,
  onClose,
  onPress,
}) => {
  const styles = Styles({fontFamily, fontFamilyBold, backgroundColor});

  if (!step) return null;

  const maneuver = step.maneuver;

  return (
    <TouchableOpacity style={styles.maneuverView} onPress={onPress}>
      <View style={styles.maneuverViewArrow}>
        <ManeuverArrow
          size={arrowSize}
          color={arrowColor}
          maneuver={maneuver}
        />
      </View>
      <View style={styles.maneuverViewDirection}>
        <ManeuverLabel
          instructions={step.instructions}
          fontFamily={fontFamily}
          fontFamilyBold={fontFamilyBold}
          fontSize={fontSize}
        />
      </View>
      {withCloseButton && (
        <View style={styles.maneuverClose}>
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
  backgroundColor: PropTypes.string,
  withCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  onPress: PropTypes.func,
};

export default ManeuverView;
