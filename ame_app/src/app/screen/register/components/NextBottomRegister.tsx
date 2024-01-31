import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ActionBottom from '../../../components/custom/ActionBottom';
import {colors} from '../../../../constants/Constants';

const NextBottomRegister = ({action, active = false ,text = "Continuar"}: any) => {
  const faction = active && action ? action : null;

  return (
    <View style={styles.btnContainer}>
      <ActionBottom
        noStylesText
        {...{
          action: faction,
          text: text,
          noStyles: true,
          containerStyles: {
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: active ? colors.tertiary : colors.icon,
          },
          textStyles: {
            padding: 15,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '500',
            color: colors.white,
          },
        }}
      />
    </View>
  );
};

export default NextBottomRegister;

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
  },
});
