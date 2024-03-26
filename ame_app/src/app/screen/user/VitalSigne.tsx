/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
import {useFetch} from '../../hook/http/useFetch';
import {useWifi} from '../../hook/network/useWifi';
import LoadScreen from '../LoadScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NoSignes = ({go, title}: any) => {
  return (
    <CustomScreen>
      <Logo center style={{marginVertical: 20}} />
      <View style={styles.lottieContainer}>
        <Title {...{title}} />
        <LottieView
          source={require('../../animation/lottie/getSignes.json')}
          loop
          autoPlay
          style={styles.lottie}
        />
        <MyText textAlign="center" fontSize={20} fontWeight="400">
          Aún no tienes signos vitales
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
  const {data, loading} = useFetch('get-signes', 'get-signes');
  const wifi = useWifi();

  const go = () => {
    navigation.navigate('GenerateVitalSigns');
  };

  const goHistory = () => {
    navigation.navigate('HistorySignes');
  };

  const {blood_pressure, blood_sugar_level, heart_rate, weight}: any = data;

  const pressure = JSON.parse(blood_pressure ?? '{}');

  if (data?.length < 1 && Object.keys(signes).length === 0) {
    return <NoSignes go={go} title={title} />;
  } else if (wifi?.isConnected === false && Object.keys(signes).length === 0) {
    return <NoSignes go={go} title={title} />;
  }

  if (wifi && loading) {
    return <LoadScreen />;
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
                {heart_rate ?? signes?.Ritmo_cardiaco}
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
                {Object.keys(pressure).length !== 0
                  ? `${pressure?.en} / ${pressure?.sobre}`
                  : `${signes?.presion?.en} / ${signes?.presion?.sobre}`}
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
                {blood_sugar_level ?? signes?.azucar}
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
                {weight ?? signes?.peso}
              </MyText>
              <MyText fontSize={15}>PESO</MyText>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <ActionBottom
            action={go}
            text="Generar"
            noStylesText
            textStyles={styles.textBottom}
            containerStyles={styles.bottomStyes}
          />
          <TouchableOpacity style={styles.historialIcon} onPress={goHistory}>
            <MaterialCommunityIcons
              name="clipboard-text-clock-outline"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
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
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 100,
    marginTop: 50,
  },

  historialIcon: {
    backgroundColor: colors.tertiary,
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
