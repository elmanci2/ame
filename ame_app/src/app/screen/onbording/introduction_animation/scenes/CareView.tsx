import React, {memo, useMemo, useRef} from 'react';
import {StyleSheet, Text, Animated, useWindowDimensions} from 'react-native';
import {AppImages} from '../../../../../assets/app/appImage';
import LottieView from 'lottie-react-native';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 250;

const CareView: React.FC<Props> = ({animationController}) => {
  const window = useWindowDimensions();

  const careRef = useRef<Text | null>(null);

  const slideAnim = useMemo(
    () =>
      animationController.current.interpolate({
        inputRange: [0, 0.2, 0.4, 0.6, 0.8],
        outputRange: [
          window.width,
          window.width,
          0,
          -window.width,
          -window.width,
        ],
      }),
    [],
  );

  const careEndVal = 26 * 2; // 26 being text's height (font size)
  const careAnim = useMemo(
    () =>
      animationController.current.interpolate({
        inputRange: [0, 0.2, 0.4, 0.6, 0.8],
        outputRange: [careEndVal, careEndVal, 0, -careEndVal, -careEndVal],
      }),
    [],
  );

  const imageEndVal = IMAGE_WIDTH * 4;
  const imageAnim = useMemo(
    () =>
      animationController.current.interpolate({
        inputRange: [0, 0.2, 0.4, 0.6, 0.8],
        outputRange: [imageEndVal, imageEndVal, 0, -imageEndVal, -imageEndVal],
      }),
    [],
  );

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateX: slideAnim}]}]}>
      <LottieView
        autoPlay
        loop
        source={AppImages.care_image}
        style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
      />
      <Animated.Text
        style={[styles.title, {transform: [{translateX: careAnim}]}]}
        ref={careRef}>
        Visitas
      </Animated.Text>
      <Text style={styles.subtitle}>
        Recibe atención profesional para mantener tu salud al día y asegurar tu
        bienestar.
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 100,
  },
  image: {
    maxWidth: IMAGE_WIDTH,
    maxHeight: IMAGE_HEIGHT,
  },
  title: {
    color: 'black',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
});

export default memo(CareView);
