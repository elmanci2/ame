import {StyleSheet} from 'react-native';
import React from 'react';
import {DowIndicator} from '../components/custom/DowIndicator';
import CustomScreen from '../components/custom/CustomScreen';
import {View} from 'moti';
import {Title} from '../components/custom/Title';
import {RoutListTypeProps} from '../types/types';

const AboutTheApp = ({route}: RoutListTypeProps) => {
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

export default AboutTheApp;

const styles = StyleSheet.create({});
