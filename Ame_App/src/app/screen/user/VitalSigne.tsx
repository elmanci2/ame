import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {Title} from '../../components/custom/Title';
import Logo from '../../components/custom/Logo';
import {RoutListTypeProps} from '../../types/types';
import LottieView from 'lottie-react-native';
import {MyText} from '../../components/custom/MyText';
import ActionBottom from '../../components/custom/ActionBottom';
import {useSelector} from 'react-redux';
import {colors} from '../../../constants/Constants';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Image} from 'moti';

const NoSignes = ({go, title}: any) => {
  return (
    <CustomScreen>
      <View style={styles.lottieContainer}>
        <Title {...{title}} />
        <LottieView
          source={require('../../animation/lottie/getSignes.json')}
          loop
          autoPlay
          style={styles.lottie}
        />
        <MyText textAlign="center" fontSize={20} fontWeight="400">
          Aún No tienes signos vitales
        </MyText>

        <ActionBottom
          action={go}
          text="Generar"
          noStylesText
          textStyles={styles.textBottom}
          containerStyles={styles.bottomStyes}
        />
      </View>
    </CustomScreen>
  );
};

const VitalSigne = ({route, navigation}: RoutListTypeProps) => {
  const {title} = route.params;
  const signes = useSelector((state: any) => state.signe.signe);

  const go = () => {
    navigation.navigate('GenerateVitalSigns');
  };

  const isSignes = Boolean(
    Object.keys(signes).length === 0 && signes.constructor === Object,
  );

  if (isSignes) {
    return <NoSignes go={go} title={title} />;
  }

  return (
    <CustomScreen>
      <View style={styles.logo}>
        <Logo />
      </View>
      <Title {...{title}} />
      <View>
        <View>
          <LottieView
            style={styles.lottie2}
            loop
            autoPlay
            source={require('../../animation/lottie/bonberSigne22.json')}
          />
        </View>

        <View style={styles.itenContainer}>
          <View style={styles.item}>
            <LottieView
              style={styles.lottie3}
              loop
              autoPlay
              source={require('../../animation/lottie/signe.json')}
            />
            <View>
              <MyText color={colors.tertiary} fontWeight="600" fontSize={20}>
                {signes.Ritmo_cardiaco}
              </MyText>
              <MyText fontSize={15}>RITMO CARDIACO</MyText>
            </View>
          </View>

          <View style={styles.item}>
            <View style={{width: '50%', height: 30}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../../../assets/img/global/vital.png')}
              />
            </View>
            <View>
              <MyText color={colors.tertiary} fontWeight="600" fontSize={20}>
                {`${signes.presion.en} / ${signes.presion.sobre}`}
              </MyText>
              <MyText fontSize={15}>PRESIÓN ARTERIAL</MyText>
            </View>
          </View>

          <View style={styles.item}>
            <View style={{width: '50%', height: 30}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../../../assets/img/global/vital.png')}
              />
            </View>
            <View>
              <MyText color={colors.tertiary} fontWeight="600" fontSize={20}>
                {signes.azucar}
              </MyText>
              <MyText fontSize={15}>NIVEL DE AZÚCAR</MyText>
            </View>
          </View>

          <View style={styles.item}>
            <View>
              <FontAwesome6
                name="weight-scale"
                size={40}
                color={colors.tertiary}
              />
            </View>
            <View>
              <MyText color={colors.tertiary} fontWeight="600" fontSize={20}>
                {signes.peso}
              </MyText>
              <MyText fontSize={15}>PESO</MyText>
            </View>
          </View>
        </View>
        <ActionBottom
          action={go}
          text="Generar"
          noStylesText
          textStyles={styles.textBottom}
          containerStyles={styles.bottomStyes}
        />
      </View>
    </CustomScreen>
  );
};

export default VitalSigne;

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  lottie2: {
    width: 500,
    height: 200,
    alignSelf: 'center',
  },
  lottie3: {
    width: 200,
    height: 120,
    alignSelf: 'center',
  },
  lottie: {
    width: 400,
    height: 250,
  },
  bottomStyes: {
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
    marginTop: 50,
  },

  textBottom: {fontSize: 20, fontWeight: '500', color: 'white'},
  lottieContainer: {
    gap: 30,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },

  itenContainer: {
    gap: 24,
  },
});
