import {Animated, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {useDrawerStatus} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAnimatedDrawer} from '../hook/useAnimatedDrawer';
import {colors} from '../../constants/Constants';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const AnimatedScreen = memo(({children}: Props) => {
  const state = useDrawerStatus();
  const animatedStyle = useAnimatedDrawer(state);

  return (
    <Animated.View style={[Styles.container, animatedStyle]}>
      <SafeAreaView>{children}</SafeAreaView>
    </Animated.View>
  );
});

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    overflow: 'hidden',
    shadowColor: '#0000004f',
    shadowOffset: {
      width: 10,
      height: 0,
    },
    elevation: 40,
  },
});
export default AnimatedScreen;
