import React, {memo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MyPressable from '../../../../components/custom/MyPressable';
import {AppImages} from '../../../../../assets/app/appImage';
import {colors} from '../../../../../constants/Constants';
import LottieView from 'lottie-react-native';
import Logo from '../../../../components/custom/Logo';

interface Props {
  onNextClick: () => void;
  animationController: React.MutableRefObject<Animated.Value>;
}

const SplashView: React.FC<Props> = ({onNextClick, animationController}) => {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const splashTranslateY = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.8],
    outputRange: [0, -window.height, -window.height],
  });

  return (
    <Animated.View
      style={{flex: 1, transform: [{translateY: splashTranslateY}]}}>
      <ScrollView style={{flexGrow: 0}} alwaysBounceVertical={false}>
        <View style={{alignSelf: 'center', marginTop: 50}}>
          <Logo />
        </View>
        <View>
          <LottieView
            autoPlay
            loop
            source={AppImages.introduction_image}
            style={{width: window.width, height: window.height / 2.4}}
          />
          {/*  <Image
            style={{
              width: window.width,
              height: undefined,
              aspectRatio: introImageData
                ? introImageData.width / introImageData.height
                : 357 / 470,
            }}
            source={AppImages.introduction_image}
          /> */}
        </View>
        <Text style={styles.title}>Ame App</Text>
        <Text style={styles.subtitle}>
          Sumérgete en la excelencia de ame app la aplicación líder en salud,
          que destaca por sus funcionalidades innovadoras.
        </Text>
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: 8 + insets.bottom}]}>
        <View style={styles.buttonContainer}>
          <MyPressable
            style={styles.button}
            android_ripple={{color: 'powderblue'}}
            touchOpacity={0.6}
            onPress={() => onNextClick()}>
            <Text style={styles.buttonText}>Comenzar</Text>
          </MyPressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
    paddingVertical: 8,
  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 24,
  },
  footer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 8,
  },
  buttonContainer: {
    borderRadius: 38,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  button: {
    height: 58,
    backgroundColor: colors.tertiary,
    paddingVertical: 16,
    paddingHorizontal: 56,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    color: 'white',
    fontWeight: '700',
  },
});

export default memo(SplashView);
