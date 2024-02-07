import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BaseToastProps, ToastConfig} from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../constants/Constants';

const errorReplacePatterns = [
  'HTTP error! Status: 404, Message:',
  'HTTP error! Status: 400, Message:',
];

const error_border = 'rgb(255, 35, 64)';
const iconSiZe = 30;
export const toastConfig: ToastConfig = {
  error: ({text1, text2}: BaseToastProps) => {
    const modifiedText = text2
      ? errorReplacePatterns.reduce(
          (modified, pattern) => modified.replace(pattern, ''),
          text2,
        )
      : '';

    return (
      <View style={[style.body, style.error]}>
        <MaterialIcons name="error" size={iconSiZe} color={error_border} />
        <View style={style.textContainer}>
          <Text style={style.title}>{text1 ?? 'Error'}</Text>
          <Text style={style.text}>{modifiedText}</Text>
        </View>
      </View>
    );
  },
};

const style = StyleSheet.create({
  body: {
    width: '96%',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },

  error: {
    borderWidth: 1,
    borderColor: error_border,
    shadowColor: error_border,
    elevation: 9,
  },

  title: {
    color: colors.texto_bold,
    fontSize: 20,
    fontWeight: '700',
  },

  text: {
    color: colors.texto_ling,
    fontSize: 17,
    fontWeight: '500',
  },
  textContainer: {
    justifyContent: 'center',
    gap: 2,
  },
});
