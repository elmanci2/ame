import React, {memo, useMemo, useRef} from 'react';
import {StyleSheet, Text, Animated, useWindowDimensions} from 'react-native';
import {AppImages} from '../../../../../assets/app/appImage';
import LottieView from 'lottie-react-native';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 250;

const MoodDiaryView: React.FC<Props> = ({animationController}) => {
  const window = useWindowDimensions();

  const careRef = useRef<Text | null>(null);

  const slideAnim = useMemo(() => {
    return animationController.current.interpolate({
      inputRange: [0, 0.4, 0.6, 0.8],
      outputRange: [window.width, window.width, 0, -window.width],
    });
  }, []);

  const textEndVal = window.width * 2; // 26 being text's height (font size)
  const textAnim = useMemo(() => {
    return animationController.current.interpolate({
      inputRange: [0, 0.4, 0.6, 0.8],
      outputRange: [textEndVal, textEndVal, 0, -textEndVal],
    });
  }, []);

  const imageEndVal = IMAGE_WIDTH * 4;
  const imageAnim = useMemo(() => {
    return animationController.current.interpolate({
      inputRange: [0, 0.4, 0.6, 0.8],
      outputRange: [imageEndVal, imageEndVal, 0, -imageEndVal],
    });
  }, []);

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateX: slideAnim}]}]}>
      <Text style={styles.title} ref={careRef}>
        Domicilio
      </Text>
      <Text style={[styles.subtitle]}>
        Garantizamos entrega rápida y segura de tus medicamentos, directamente
        en tu puerta, en tiempo récord.
      </Text>
      <LottieView
        autoPlay
        loop
        source={AppImages.mood_dairy_image}
        style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
      />
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
  image: {
    maxWidth: IMAGE_WIDTH,
    maxHeight: IMAGE_HEIGHT,
  },
});

export default memo(MoodDiaryView);
