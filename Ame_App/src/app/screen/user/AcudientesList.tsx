import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {RoutListTypeProps} from '../../types/types';
import {Title} from '../../components/custom/Title';

const AcudientesList = ({route}: RoutListTypeProps) => {
  const {title} = route.params;

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={{marginTop: 20, paddingHorizontal: 5}}>
        <Title {...{title}} />
      </View>
    </CustomScreen>
  );
};

export default AcudientesList;

const styles = StyleSheet.create({});
