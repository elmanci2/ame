import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';

const MedicationsPreview = ({route}: any) => {
  const {medication} = route.params;

  console.log(medication?.medicamento);

  return (
    <CustomScreen>
      <DowIndicator />
      <View>{}</View>
    </CustomScreen>
  );
};

export default MedicationsPreview;

const styles = StyleSheet.create({});
