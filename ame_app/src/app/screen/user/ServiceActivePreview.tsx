import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {RoutListTypeProps, Service} from '../../types/types';

const ServiceActivePreview = ({route}: RoutListTypeProps) => {
  const {service}: {service: Service} = route?.params;
  const {type, location, date, id, createdAt, status, photo} = service;

  return (
    <CustomScreen>
      <DowIndicator />
      <View>
        <Text>hola</Text>
      </View>
    </CustomScreen>
  );
};

export default ServiceActivePreview;

const styles = StyleSheet.create({});
