import React, {memo, useRef} from 'react';
import {StyleSheet, Text, Animated, useWindowDimensions} from 'react-native';
import {AppImages} from '../../../../../assets/app/appImage';
import {useAnimationRelaxView} from './hook/useAnimationRelaxView';
import LottieView from 'lottie-react-native';

interface Props {
  animationController: any;
}

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 250;

const RelaxView: React.FC<Props> = ({animationController}) => {
  const {imageAnim, relaxAnimation, relaxRef, slideAnim, textAnim} =
    useAnimationRelaxView(animationController);
  return (
    <Animated.View
      style={[styles.container, {transform: [{translateX: slideAnim}]}]}>
      <Animated.Text
        style={[styles.title, {transform: [{translateY: relaxAnimation}]}]}
        ref={relaxRef as any}>
        Medicamentos
      </Animated.Text>
      <Animated.Text
        style={[styles.subtitle, {transform: [{translateX: textAnim}]}]}>
        Optimiza tu salud con recordatorios de medicamentos. Solicita a tiempo
        para un cuidado proactivo y garantiza tu bienestar
      </Animated.Text>

      <LottieView
        autoPlay
        loop
        source={AppImages.relax_image}
        style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default memo(RelaxView);
