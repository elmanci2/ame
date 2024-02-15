import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import Logo from '../../components/custom/Logo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import LottieView from 'lottie-react-native';
import NextBottomRegister from '../register/components/NextBottomRegister';
/* import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher' */
const ErrorWifi = () => {
 /*  IntentLauncher.startActivity({
    action: 'android.settings.SETTINGS',
  }); */

  return (
    <CustomScreen>
      <Logo style={styles.logo} />
      <SafeAreaView style={styles.body}>
        <MyText
          fontSize={18}
          fontWeight="700"
          textAlign="center"
          color={colors.texto_ling}>
          Se produjo un error en la conexión a Internet.{'\n'}
          conéctese a la red y vuelva a intentarlo.
        </MyText>
        <LottieView
          autoPlay
          style={styles.lottie}
          source={require('../../animation/lottie/erro_net.json')}
        />
        {/* <NextBottomRegister
          {...{
            text: 'Conectar',
            action: null,
            active: true,
          }}
        /> */}
      </SafeAreaView>
    </CustomScreen>
  );
};

export default ErrorWifi;

const styles = StyleSheet.create({
  body: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '85%',
  },
  lottie: {
    width: 300,
    height: 500,
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
  },
});
