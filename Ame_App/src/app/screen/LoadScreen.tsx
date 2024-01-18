import {StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {MyText} from '../components/custom/MyText';
import {colors} from '../../constants/Constants';

const LoadScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={require('../animation/lottie/load.json')}
        autoPlay
        loop
      />
      <MyText fontWeight="500" fontSize={18}>
        Cargando...
      </MyText>
    </View>
  );
};

export default LoadScreen;

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 250,
    alignSelf: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});
