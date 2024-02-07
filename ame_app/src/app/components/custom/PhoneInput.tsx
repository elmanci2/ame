import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyInput from './MyInput';
import {colors} from '../../../constants/Constants';
import DropDownElement from './DropDown/DropDownElement';
import {useFetch} from '../../hook/http/useFetch';
import {MyText} from './MyText';

type Props = {
  data: {
    label: string;
    value: string;
  }[];
  onChangeText?: (text: string) => void;

  value: any;
  error?: boolean;
};

const PhoneInput = ({data, value, onChangeText, error}: Props) => {
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        alignItems: 'flex-start',
        gap: 5,
      }}>
      <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
        Numero telefónico
      </MyText>
      <View style={styles.inputContainer}>
        <DropDownElement
          value={value && String(value?.code)}
          data={data}
          screen="home_register"
          styles={styles.input}
          notStyles
          placeholder="+57"
        />
        <MyInput
          error={error}
          onChangeText={onChangeText}
          placeholder="numero"
          inputStyles={styles.input}
          style={styles.inputStyle}
          {...{
            textInputProps: {
              keyboardType: 'numeric',
            },
          }}
        />
      </View>
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.texto_ling,
  },
  inputStyle: {
    flexGrow: 1,
  },
});
