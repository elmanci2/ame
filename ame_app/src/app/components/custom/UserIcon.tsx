import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {UserData} from '../../types/types';
import {config} from '../../../config/config';

interface Props {
  width?: number;
  height?: number;
}

const UserIcon = ({height, width}: Props) => {
  const containerStyle = height || width ? {width, height} : styles.contend;
  const {photo}: UserData = useSelector((e: any) => e?.Info?.info);

  const navigation = useNavigation<any>();

  const renderPhoto = photo
    ? {uri: config.aws.publicUrl + photo}
    : require('../../../assets/usuario.png');

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => navigation.navigate('UserProfile')}>
      <Image source={renderPhoto} style={styles.img} />
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
    borderRadius: 50,
  },
});
