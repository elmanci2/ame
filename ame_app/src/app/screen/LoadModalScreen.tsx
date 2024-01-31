import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {MyText} from '../components/custom/MyText';
import {colors, dimensions} from '../../constants/Constants';

const LoadModalScreen = () => {
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

export default LoadModalScreen;

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 250,
    alignSelf: 'center',
  },

  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.91)',
  },
});
