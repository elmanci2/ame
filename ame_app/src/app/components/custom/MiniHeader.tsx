import {StyleSheet, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors, dimensions} from '../../../constants/Constants';
import Logo from './Logo';
import {StackHeaderProps} from '@react-navigation/stack';

export const MiniHeader = ({navigation}: StackHeaderProps) => {
  return (
    <View style={styles.contain}>
      <Entypo
        onPress={() => navigation.goBack()}
        name="chevron-left"
        color={colors.tertiary}
        size={49}
      />
      <Logo />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: dimensions.width / 5,
  },
});
