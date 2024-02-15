import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import CustomScreen from '../../components/custom/CustomScreen';
import LottieView from 'lottie-react-native';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import NextBottomRegister from '../register/components/NextBottomRegister';
import Logo from '../../components/custom/Logo';

const ErrorScreen = ({reload}: {reload: () => void}) => {
  return (
    <CustomScreen>
      <Logo style={styles.logo} />
      <SafeAreaView style={styles.body}>
        <MyText
          fontSize={20}
          fontWeight="700"
          textAlign="center"
          color={colors.texto_ling}>
          ¡Oops! Se produjo un error.{'\n'}
          inténtelo de nuevo en unos minutos.
        </MyText>
        <LottieView
          autoPlay
          loop
          style={styles.lottie}
          source={require('../../animation/lottie/erro.json')}
        />
        <NextBottomRegister
          {...{
            text: 'Reintentar',
            action: reload,
            active: true,
          }}
        />
      </SafeAreaView>
    </CustomScreen>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  body: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '85%',
  },
  lottie: {
    width: 500,
    height: 500,
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
  },
});
