import {StyleSheet, Text} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import Mapa from '../../components/custom/Mapa';
import MapaCollection from './MapaCollection';

const ClaimMedication = ({navigation}) => {
  return (
    <CustomScreen>
      <MapaCollection title={'organizar medicamento'} navigation={navigation} />
    </CustomScreen>
  );
};

export default ClaimMedication;

const styles = StyleSheet.create({});
