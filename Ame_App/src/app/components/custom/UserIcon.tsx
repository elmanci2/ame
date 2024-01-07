import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const UserIcon = ({height, width}: Props) => {
  const containerStyle = height || width ? {width, height} : styles.contend;
  return (
    <View style={containerStyle}>
      <Image
        source={require('../../../assets/usuario.png')}
        style={styles.img}
      />
    </View>
  );
};

export default UserIcon;

const styles = StyleSheet.create({
  contend: {
    width: 130,
    height: 40,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
