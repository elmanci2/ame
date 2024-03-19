import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text} from 'react-native';
import Styles from './styles';
import DirectionListViewItem from './item';

interface DirectionsListViewProps {
  route: any;
  fontFamily?: string;
  fontFamilyBold?: string;
  showOriginDestinationHeader?: boolean;
  displayTravelMode?: boolean;
}

const DirectionsListView: React.FC<DirectionsListViewProps> = ({
  route,
  fontFamily,
  fontFamilyBold,
  showOriginDestinationHeader = true,
  displayTravelMode = false,
}) => {
  const styles = Styles({fontFamily, fontFamilyBold});

  if (!route || !route.steps || !Array.isArray(route.steps)) return null;

  return (
    <ScrollView>
      {showOriginDestinationHeader && (
        <View style={styles.directionDetailHeader}>
          <View style={styles.directionDetailHeaderSection}>
            <Text style={styles.directionDetailHeaderAddressLabel}>FROM</Text>
            <Text style={styles.directionDetailHeaderAddressText}>
              {route.origin.address}
            </Text>
          </View>
          <View style={styles.directionDetailHeaderSection}>
            <Text style={styles.directionDetailHeaderAddressLabel}>TO</Text>
            <Text style={styles.directionDetailHeaderAddressText}>
              {route.destination.address}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.directionDetailTravel}>
        <Text style={styles.directionDetailTravelDuration}>
          {route.duration.text}
        </Text>
        <Text style={styles.directionDetailTravelDistance}>
          {route.distance.text}
        </Text>
      </View>

      <View style={styles.directionDetailSectionContainer}>
        {route.steps.map((step: any, index: number) => (
          <DirectionListViewItem {...step} key={index} />
        ))}
      </View>
    </ScrollView>
  );
};

DirectionsListView.propTypes = {
  route: PropTypes.any.isRequired,
  fontFamily: PropTypes.string,
  fontFamilyBold: PropTypes.string,
  showOriginDestinationHeader: PropTypes.bool,
  displayTravelMode: PropTypes.bool,
};

export default DirectionsListView;
