import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';
import {useFetch} from '../hook/http/useFetch';
import {RoutListTypeProps} from '../types/types';
import LoadScreen from './LoadScreen';
import {config} from '../../config/config';
import ImagePreviewContainer from '../components/custom/ImagePreviewContainer';
import {Title} from '../components/custom/Title';
import {MyText} from '../components/custom/MyText';
import {colors} from '../../constants/Constants';

const ActiveServicesPreview = ({route}: RoutListTypeProps) => {
  const {id} = route.params;

  const {data, loading} = useFetch(
    `get-service-info?id=${id}`,
    'get-service-info',
  );

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <CustomScreen>
      <DowIndicator />
      <View>
        <Title {...{title: data?.user_name, styles: {marginTop: 20}}} />
        <ImagePreviewContainer
          {...{photo: config.aws.publicUrl + data?.photo}}
        />
        <View style={styles.textContainer}>
          <MyText fontSize={15} fontWeight="500" color={colors.texto_ling}>
            Copago: {data?.Copago}
          </MyText>
          <MyText fontSize={15} fontWeight="500" color={colors.texto_ling}>
            EPS: {data?.eps}
          </MyText>
        </View>
      </View>
    </CustomScreen>
  );
};

export default ActiveServicesPreview;

const styles = StyleSheet.create({
  textContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
});
