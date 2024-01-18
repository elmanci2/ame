import {View} from 'react-native';
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
}

const DropDownElement = ({data, value, screen}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <MyInput
        {...{
          textInputProps: {
            value,
          },
          style: {width: '100%', marginTop: 10},
          placeholder: 'Selecciona una EPS ',
          falseInput: true,
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
