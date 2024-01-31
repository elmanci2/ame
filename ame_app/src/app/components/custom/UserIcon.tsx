import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

interface Props {
  width?: number;
  height?: number;
}

const UserIcon = ({height, width}: Props) => {
  const containerStyle = height || width ? {width, height} : styles.contend;

  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => navigation.navigate('UserProfile')}>
      <Image
        source={require('../../../assets/usuario.png')}
        style={styles.img}
      />
    </TouchableOpacity>
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
