import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../custom/CustomScreen';
import Logo from '../../custom/Logo';
import {Title} from '../../custom/Title';
import NextBottomRegister from '../../../screen/register/components/NextBottomRegister';
import {useNavigation} from '@react-navigation/native';
import {RenderLottie} from '../../custom/RenderLottie';

const NoAssignService = () => {
  const navigation = useNavigation();
  return (
    <CustomScreen>
      <View style={{marginTop: 30}}>
        <Logo center />
        <Title title=" Solicitud en espera" />
        <RenderLottie
          style={styles.lottie}
          animate={require('../../../animation/lottie/noAsignate.json')}
        />

        <NextBottomRegister
          text="Cerrar"
          active
          action={() => navigation.goBack()}
        />
      </View>
    </CustomScreen>
  );
};

export default NoAssignService;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexGrow: 1,
    position: 'relative',
  },
  lottie: {width: 450, height: 400},
});
