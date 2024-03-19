import {StyleSheet} from 'react-native';

interface StylesProps {
  fontFamily?: string;
  fontFamilyBold?: string;
}

const Styles = ({fontFamily, fontFamilyBold}: StylesProps) => {
  return StyleSheet.create({
    directionDetailHeader: {
      padding: 25,
      paddingBottom: 10,
      backgroundColor: '#f7f7f4',
      flexDirection: 'column',
    },

    directionDetailHeaderSection: {
      marginBottom: 15,
      flexDirection: 'column',
    },

    directionDetailHeaderAddressText: {
      fontSize: 16,
      fontFamily: fontFamily,
    },

    directionDetailHeaderAddressLabel: {
      fontSize: 13,
      opacity: 0.7,
      fontWeight: 'bold',
      fontFamily: fontFamily,
    },

    directionDetailTravel: {
      margin: 25,
    },

    directionDetailTravelDuration: {
      fontSize: 32,
      fontFamily: fontFamily,
      color: '#387bc1',
    },

    directionDetailTravelDistance: {
      fontSize: 22,
      fontFamily: fontFamily,
      opacity: 0.8,
    },

    bold: {
      fontWeight: 'bold',
      fontFamily: fontFamilyBold || fontFamily,
      fontSize: 16,
      flexWrap: 'wrap',
    },

    regular: {
      fontFamily: fontFamily,
      fontSize: 16,
      flexWrap: 'wrap',
    },

    extra: {
      fontFamily: fontFamily,
      fontSize: 13,
      flexWrap: 'wrap',
      color: '#387bc1',
    },

    durationDistance: {
      fontFamily: fontFamily,
      fontSize: 14,
      opacity: 0.8,
      flexWrap: 'wrap',
    },

    directionDetailSectionContainer: {
      margin: 25,
      marginTop: 0,
      flex: 1,
    },

    directionDetailSection: {
      borderColor: '#e6e6e6',
      borderTopWidth: 1,
      paddingTop: 20,
      marginBottom: 20,
      flexDirection: 'row',
      flex: 1,
    },

    directionDetailIconContainer: {
      width: 50,
      flex: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    directionDetailContent: {
      flexDirection: 'column',
      flex: 1,
    },
  });
};

export default Styles;
