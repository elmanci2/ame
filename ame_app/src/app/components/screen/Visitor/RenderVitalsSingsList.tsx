import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MyText} from '../../custom/MyText';
import {colors} from '../../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';

export const RenderVitalsSingsList = ({item}: any) => {
  const navigation = useNavigation<any>();
  const onPress = () => {
    navigation.navigate('SignesPreview', {item});
  };
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <MyText fontSize={20} fontWeight="500" color={colors.texto_bold}>
        {item?.creation_date}
      </MyText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
});
