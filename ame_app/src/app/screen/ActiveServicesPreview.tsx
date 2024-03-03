import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';
import {useFetch} from '../hook/http/useFetch';
import {RoutListTypeProps} from '../types/types';
import LoadScreen from './LoadScreen';
import {config} from '../../config/config';
import ImagePreviewContainer from '../components/custom/ImagePreviewContainer';

const ActiveServicesPreview = ({route}: RoutListTypeProps) => {
  const {id} = route.params;

  const {data, loading} = useFetch(
    `get-service-info?id=${id}`,
    'get-service-info',
  );

  console.log(data);

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <CustomScreen>
      <DowIndicator />
      <View>
        <ImagePreviewContainer
          {...{photo: config.aws.publicUrl + data?.photo}}
        />
      </View>
    </CustomScreen>
  );
};

export default ActiveServicesPreview;

const styles = StyleSheet.create({});
