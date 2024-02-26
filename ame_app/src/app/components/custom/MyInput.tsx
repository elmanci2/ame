import {colors} from '../../../constants/Constants';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {MyText} from './MyText';

interface Props {
  placeholder?: string;
  textInputProps?: TextInputProps;
  showAutoComplete?: boolean;
  autoCompleteData?: [string] | [];
  showLabel?: boolean;
  label?: string;
  isMini?: boolean; // Nueva propiedad
  style?: ViewStyle;
  blocked?: boolean;
  onChangeText?: (e: string) => void;
  falseInput?: boolean;
  falseAction?: () => void;
  value?: string;
  inputStyles?: TextStyle;
  error?: boolean;
}

const MyInput: React.FC<Props> = ({
  placeholder = 'Placeholder',
  textInputProps,
  showLabel = false,
  label,
  isMini = false,
  style,
  blocked = false,
  onChangeText,
  falseAction,
  inputStyles,
  value,
  error,
}: Props) => {
  const blockedStyles = !blocked
    ? {backgroundColor: colors.white}
    : {backgroundColor: 'rgba(255, 255, 255, 0.43)'};

  return (
    <View style={[styles.container, style, isMini && styles.miniContainer]}>
      {showLabel && (
        <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
          {label}
        </MyText>
      )}

      <TextInput
        value={value}
        {...textInputProps}
        focusable={true}
        onFocus={!blocked ? falseAction && falseAction : () => null}
        placeholder={placeholder}
        style={[
          styles.input,
          isMini && styles.miniInput,
          blockedStyles,
          inputStyles,
          error && styles.error,
        ]} // Aplica el nuevo estilo miniInput si isMini es true
        placeholderTextColor="#aaa"
        onChangeText={text => {
          onChangeText && onChangeText(text);
        }}
      />
    </View>
  );
};

export default MyInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    alignSelf: 'center',
    borderColor: 'rgba(225, 242, 253, 0.46)',
    borderRadius: 10,
    borderWidth: 1,
    elevation: 10,
    shadowColor: 'rgba(202, 223, 255, 0.53)',
    paddingHorizontal: 15,
    color: colors.icon,
    fontWeight: '600',
  },

  miniInput: {
    textAlign: 'center',
    alignSelf: 'flex-start',
  },

  autoComplete: {
    backgroundColor: colors.white,
    width: '100%',
    alignSelf: 'center',
    padding: 5,
    borderColor: 'rgba(225, 242, 253, 0.46)',
    borderRadius: 10,
    borderWidth: 1,
    elevation: 10,
    shadowColor: 'rgba(202, 223, 255, 0.53)',
  },

  autocompleteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
  },

  container: {
    alignSelf: 'center',
    gap: 5,
  },

  miniContainer: {
    alignSelf: 'center',
    flexWrap: 'nowrap',
  },

  error: {
    borderColor: colors.secundario,
  },
});
