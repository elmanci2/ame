import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../constants/Constants';

type Props = {
  onPress: () => void;
  style?: ViewStyle;
};

export const CloseBottom = memo(({onPress, style}: Props) => {
  return (
    <TouchableOpacity style={[styles.closeBottom, style]} onPress={onPress}>
      <Ionicons name="close" size={30} color={'red'} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  closeBottom: {
    backgroundColor: colors.primary,
    height: 40,
    width: 40,
    borderRadius: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});
