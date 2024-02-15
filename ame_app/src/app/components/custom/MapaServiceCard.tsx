import {
  Image,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, default_image} from '../../../constants/Constants';
import {GlobalStyle} from '../../styles/styles';
import {MyText} from './MyText';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const MapaServiceCard = ({data}: any) => {
  const navigation = useNavigation<any>();
  const translateY = React.useRef(new Animated.Value(100)).current;

  const hideAnimation = Animated.timing(translateY, {
    toValue: 145,
    duration: 400,
    useNativeDriver: true,
  });

  const showAnimation = Animated.timing(translateY, {
    toValue: 0,
    duration: 400,
    useNativeDriver: true,
  });

  const playAnimation = () => {
    hideAnimation.start(() => {
      showAnimation.start();
    });
  };

  const go = () => {
    navigation.navigate('GetServicePreview' , {data});
  };

  React.useEffect(() => {
    playAnimation();
  }, [data]);

  return (
    <TouchableOpacity onPress={go} activeOpacity={0.9} style={styles.container}>
      <Animated.View
        style={[styles.body, {transform: [{translateY: translateY}]}]}>
        <View style={styles.row}>
          <View style={styles.imgContend}>
            <Image style={GlobalStyle.img} source={{uri: default_image}} />
          </View>
          <View style={{gap: 5}}>
            <MyText
              fontWeight="500"
              color={colors.texto_bold}
              fontSize={20}>{`${data?.firstName} ${data?.lastName}`}</MyText>

            <MyText color={colors.texto_bold} fontSize={13}>
              {data?.address}
            </MyText>

            <MyText color={colors.texto_bold} fontSize={13}>
              {data?.age} Años
            </MyText>

            <MyText
              color={colors.texto_bold}
              fontSize={13}
              fontWeight="500"
              style={styles.text_type}>
              Recolección de medicamentos
            </MyText>
          </View>

          <View style={styles.lottieContainer}>
            <LottieView
              style={styles.lottie}
              loop
              autoPlay
              source={require('../../animation/lottie/active_indicator.json')}
            />
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default MapaServiceCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
  },
  body: {
    width: '94%',
    backgroundColor: colors.white,
    elevation: 10,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 15,
  },
  imgContend: {
    width: '30%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
    padding: 10,
  },
  text_type: {
    backgroundColor: colors.primary,
    padding: 3,
    borderRadius: 5,
    paddingHorizontal: 6,
  },

  lottie: {width: '100%', height: '100%'},
  lottieContainer: {width: 30, height: 30, overflow: 'hidden'},
});
