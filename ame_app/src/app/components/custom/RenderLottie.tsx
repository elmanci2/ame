import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export const RenderLottie = ({
  animate,
  style,
  center = true,
}: {
  animate: string;
  style?: ViewStyle;
  center?: boolean;
}) => {
  return (
    <View>
      <LottieView
        autoPlay
        style={[styles.lottie, style, center && {alignSelf: 'center'}]}
        source={animate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '85%',
  },
  lottie: {
    width: 300,
    height: 500,
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
  },
});
