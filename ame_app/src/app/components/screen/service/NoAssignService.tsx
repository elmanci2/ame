import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RenderLottie} from '../../custom/RenderLottie';
import {MyText} from '../../custom/MyText';
import {colors} from '../../../../constants/Constants';

const NoAssignService = () => {
  return (
    <View style={styles.container}>
      <MyText
        textAlign="center"
        fontWeight="500"
        color={colors.texto_ling}
        fontSize={30}>
        Solicitud en espera
      </MyText>
      <RenderLottie
        style={styles.lottie}
        animate={require('../../../animation/lottie/noAsignate.json')}
      />
    </View>
  );
};

export default NoAssignService;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexGrow: 1,
    position: 'relative',
  },
  lottie: {width: 350, height: 300},
});
