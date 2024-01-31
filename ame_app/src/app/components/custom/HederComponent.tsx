import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Logo from './Logo';
import {colors} from '../../../constants/Constants';
import UserIcon from './UserIcon';
import {useDrawerStatus} from '@react-navigation/drawer';

export default function HederComponent({navigation}: any) {
  const state = useDrawerStatus();
  const isClosed = state === 'closed';
  const open = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={open}>
        <Ionicons
          name={isClosed ? 'menu-outline' : 'close'}
          size={30}
          color={isClosed ? colors.icon : colors.secundario}
        />
      </TouchableOpacity>
      <Logo />
      <Pressable>
        <UserIcon height={35} width={35} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: colors.primary,
  },
});
