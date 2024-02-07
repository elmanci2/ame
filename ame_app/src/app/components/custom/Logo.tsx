import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
  style?: ViewStyle;
  center?: boolean;
}

const Logo = ({height, width, style, center = false}: Props) => {
  const containerStyle = height || width ? {width, height} : styles.contend;
  return (
    <View style={[containerStyle, style, center && {alignSelf: 'center'}]}>
      <Image
        source={require('../../../assets/logo/ame_logo.png')}
        style={styles.img}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  contend: {
    width: 120,
    height: 38,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
