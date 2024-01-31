import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {MyText} from '../../custom/MyText';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../../constants/Constants';

interface Props {
  item: any;
}

export const RenderMedicine = memo(({item}: Props) => {
  const navigate = useNavigation<any>();
  const handlePress = (medicine: string) => {
    navigate.navigate('addReminder', {medicine});
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.itemPress}
        onPress={() => handlePress(item.producto)}>
        <MyText fontSize={14}>{item.producto}</MyText>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  itemPress: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
});
