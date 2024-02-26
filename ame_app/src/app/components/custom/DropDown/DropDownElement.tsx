import {TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import MyInput from '../MyInput';
import {useNavigation} from '@react-navigation/native';

interface Props {
  data: {
    label: string;
    value: string;
  }[];

  value: string;
  screen: string;
  styles?: TextStyle;
  label?: string;
  placeholder?: string;
  conteContainerStyles?: ViewStyle;
  notStyles?: boolean;
  blocked?: boolean;
  select?: string;
}

const DropDownElement = ({
  data,
  value,
  screen,
  styles,
  notStyles = false,
  label,
  placeholder,
  conteContainerStyles,
  blocked = false,
}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <MyInput
        {...{
          label,
          showLabel: label,
          textInputProps: {
            value,
          },
          inputStyles: {...styles},
          style: !notStyles
            ? {width: '100%', marginTop: 10, ...conteContainerStyles}
            : {},
          placeholder,
          falseInput: true,
          blocked,
          falseAction() {
            navigation.navigate('DropDownPikerScreen', {
              data,
              screen,
            });
          },
        }}
      />
    </View>
  );
};

export default DropDownElement;
