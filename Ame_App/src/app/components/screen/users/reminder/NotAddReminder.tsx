import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import LottieView from 'lottie-react-native';
import {GlobalStyle} from '../../../../styles/styles';
import {MyText} from '../../../custom/MyText';
import {colors} from '../../../../../constants/Constants';

export const NotAddReminder = memo(() => {
  return (
    <View style={[GlobalStyle.full]}>
      <LottieView
        style={styles.lottie}
        source={require('../../../../animation/lottie/clock.json')}
        autoPlay
        loop
      />
      <MyText
        fontSize={20}
        color={colors.icon}
        style={styles.text}
        textAlign="center">
        No se ha agregado nada para esa fecha.
      </MyText>
    </View>
  );
});

const styles = StyleSheet.create({
  lottie: {
    width: 350,
    height: 300,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
