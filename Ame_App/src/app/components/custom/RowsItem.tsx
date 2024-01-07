import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MyText} from './MyText';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';

export interface Params {
  [key: string]: any;
}
interface Props<T extends Params = {}> {
  route: string;
  params?: T;
  text: string;
}

const RowsItem = ({route, params = {}, text}: Props) => {
  const navigation = useNavigation<any>();
  function action() {
    navigation.navigate(route, params);
    return;
  }
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.6}
      style={styles.container}>
      <MyText
        numberOfLines={1}
        color={colors.icon}
        fontSize={16}
        fontWeight="500"
        style={styles.text}>
        {text}
      </MyText>
      <View style={styles.arrow}>
        <Entypo name="chevron-right" color={colors.tertiary} size={30} />
      </View>
    </TouchableOpacity>
  );
};

export default RowsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    borderRadius: 13,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingVertical: 5,
  },
  arrow: {
    borderRadius: 15,
    backgroundColor: colors.primary,
    padding: 7,
  },

  text: {
    width: '80%',
  },
});
