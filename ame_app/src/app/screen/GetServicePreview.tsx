import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';
import {RoutListTypeProps} from '../types/types';
import {Title} from '../components/custom/Title';
import ImagePreviewContainer from '../components/custom/ImagePreviewContainer';

const GetServicePreview = ({route}: RoutListTypeProps) => {
  const {data} = route?.params ?? {};
  const {firstName, lastName , photo} = data ?? {};
  return (
    <CustomScreen>
      <DowIndicator />
      <View style={{marginTop: 15}}>
        <Title {...{title: `${firstName} ${lastName}`}} />
        <ImagePreviewContainer {...{photo}} />
      </View>
    </CustomScreen>
  );
};

export default GetServicePreview;

const styles = StyleSheet.create({});
