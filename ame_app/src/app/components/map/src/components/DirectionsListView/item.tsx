import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Styles from './styles';
import ManeuverArrow from '../ManeuverArrow';
import ManeuverLabel from '../ManeuverLabel';
import DurationDistanceLabel from '../DurationDistanceLabel';

interface DirectionListViewItemProps {
  instructions?: string;
  distance?: any;
  duration?: any;
  maneuver?: any;
  fontFamily?: string;
  fontFamilyBold?: string;
  fontSize?: number;
  displayTravelMode?: boolean;
}

const DirectionListViewItem: React.FC<DirectionListViewItemProps> = ({
  instructions = '',
  distance,
  duration,
  maneuver,
  fontFamily,
  fontFamilyBold,
  fontSize,
  displayTravelMode = false,
}) => {
  const styles = Styles({fontFamily, fontFamilyBold});

  return (
    <View style={styles.directionDetailSection}>
      <View style={styles.directionDetailIconContainer}>
        <ManeuverArrow {...maneuver} size={24} />
      </View>
      <View style={styles.directionDetailContent}>
        <ManeuverLabel {...maneuver} />
        <DurationDistanceLabel
          distance={distance}
          duration={duration}
          style={{marginTop: 4}}
          withTravelModeIcon={displayTravelMode}
        />
      </View>
    </View>
  );
};

DirectionListViewItem.propTypes = {
  instructions: PropTypes.string,
  distance: PropTypes.object,
  duration: PropTypes.object,
  maneuver: PropTypes.object,
  fontFamily: PropTypes.string,
  fontFamilyBold: PropTypes.string,
  fontSize: PropTypes.number,
  displayTravelMode: PropTypes.bool,
};

export default DirectionListViewItem;
