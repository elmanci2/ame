import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {MyText} from '../MyText';
import {colors} from '../../../../constants/Constants';

const RenderItemDropDown = ({item, navigation, screen}: any) => {
  const go = () => {
    navigation.navigate(screen, {select: item});
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={go}>
      <MyText
        numberOfLines={2}
        {...{style: {width: '90%'}}}
        fontWeight="700"
        fontSize={15}
        color={colors.texto_ling}>
        {item?.label}
      </MyText>
    </TouchableOpacity>
  );
};

export default RenderItemDropDown;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
});
