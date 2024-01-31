import {StyleSheet, Animated} from 'react-native';
import React from 'react';
import MyBottom from './MyBottoms';
import {colors} from '../../../../constants/Constants';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useAnimatedDrawer} from '../../../hook/useAnimatedDrawer';

const BottomScreen = () => {
  const state = useDrawerStatus();
  const animatedStyle = useAnimatedDrawer(state);
  return (
    <Animated.View style={[Styles.container, animatedStyle]}>
      <MyBottom />
    </Animated.View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default BottomScreen;
