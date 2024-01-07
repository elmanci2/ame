import {StyleSheet, View} from 'react-native';
import React from 'react';
import constants from '../../../constants/Constants';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CustomScreen = ({children}: Props) => {
  return <View style={styles.body}>{children}</View>;
};

export default CustomScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: constants.colors.primary,
  },
});
