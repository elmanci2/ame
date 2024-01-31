import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {MotiAnimationProp, MotiView} from 'moti';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../constants/Constants';

const motiVieProps: MotiAnimationProp<any> = {
  from: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    type: 'timing',
    duration: 200,
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      type: 'timing',
      duration: 10, // Duración de la transición de salida
    },
  },
};

const NotificationIcon = () => {
  const navigate = useNavigation<any>();

  const handlePress = () => {
    navigate.navigate('NotificationScream');
    return;
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MotiView {...motiVieProps} style={styles.badget}>
        <Ionicons name="notifications-outline" size={26} color="black" />
        <Text style={styles.badgetText}>2</Text>
      </MotiView>
    </TouchableOpacity>
  );
};

export default NotificationIcon;

const styles = StyleSheet.create({
  badget: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  badgetText: {
    backgroundColor: colors.tertiary,
    color: colors.primary,
    position: 'absolute',
    fontWeight: 'bold',
    width: 20,
    height: 20,
    textAlign: 'center',
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 12,
    top: -5,
    right: -5,
  },
});
