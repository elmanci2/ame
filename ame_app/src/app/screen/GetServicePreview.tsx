import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';
import {RoutListTypeProps} from '../types/types';
import {Title} from '../components/custom/Title';
import ImagePreviewContainer from '../components/custom/ImagePreviewContainer';
import {MyText} from '../components/custom/MyText';
import {colors} from '../../constants/Constants';
import NextBottomRegister from './register/components/NextBottomRegister';

const GetServicePreview = ({route, navigation}: RoutListTypeProps) => {
  const {data} = route?.params ?? {};
  const {firstName, lastName, photo} = data ?? {};

  const next = () => {
    navigation?.navigate(/* 'ServiceRutePreview' */ "Takin", {
      location: {latitude: data?.latitude, longitude: data?.longitude},
    });
  };

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={{marginTop: 15}}>
        <Title {...{title: `${firstName} ${lastName}`}} />
        <ImagePreviewContainer {...{photo}} />

        <View style={styles?.textContainer}>
          <View style={{gap: 10}}>
            <MyText color={colors?.texto_bold} fontWeight="500" fontSize={20}>
              Eps : {data?.eps}
            </MyText>
            <MyText color={colors?.texto_bold} fontWeight="500" fontSize={15}>
              Copago : {data?.copago}
            </MyText>
          </View>

          <View style={{gap: 10}}>
            <MyText color={colors?.texto_bold} fontWeight="500" fontSize={15}>
              {data?.time}
            </MyText>
            <MyText color="rgb(77, 160, 47)" fontWeight="500" fontSize={20}>
              activo
            </MyText>
          </View>
        </View>

        <View>
          <NextBottomRegister {...{action: next, active: true}} />
          <NextBottomRegister
            {...{
              text: 'Cerrar',
              action: () => navigation.goBack(),
              active: true,
              color: colors.secundario,
            }}
          />
        </View>
      </View>
    </CustomScreen>
  );
};

export default GetServicePreview;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    gap: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
