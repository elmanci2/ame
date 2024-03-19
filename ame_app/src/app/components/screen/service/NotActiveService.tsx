import {StyleSheet, Text} from 'react-native';
import React from 'react';
import CustomScreen from '../../custom/CustomScreen';
import {RenderLottie} from '../../custom/RenderLottie';
import {MyText} from '../../custom/MyText';
import {colors} from '../../../../constants/Constants';
import Logo from '../../custom/Logo';
import {Title} from '../../custom/Title';

export const NotActiveService = () => {
  return (
    <CustomScreen>
      <Logo center style={styles.logo} />

      <Title {...{title: 'Servicios activos'}} />
      <RenderLottie
        animate={require('../../../animation/lottie/noActiveService.json')}
      />

      <MyText
        fontSize={25}
        fontWeight="500"
        color={colors.texto_ling}
        textAlign="center">
        No tienes servicios activos.
      </MyText>
    </CustomScreen>
  );
};

const styles = StyleSheet.create({
  logo: {marginVertical: 16},
});
