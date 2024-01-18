import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';
import {Title} from '../components/custom/Title';
import LottieView from 'lottie-react-native';
import {MyText} from '../components/custom/MyText';
import {colors} from '../../constants/Constants';

const NotificationScream = () => {
  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.container}>
        <Title {...{title: 'Notificaciones'}} />
        <View style={styles.lottieContainer}>
          <LottieView
            autoPlay
            loop
            style={styles.lottie}
            source={require('../animation/lottie/notification.json')}
          />

          <MyText color={colors.icon} fontSize={20} fontWeight="500">
            No hay nada que mostrar
          </MyText>
        </View>
      </View>
    </CustomScreen>
  );
};

export default NotificationScream;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  lottieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 700,
    height: 400,
    alignSelf: 'center',
  },
});
