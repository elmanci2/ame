import {StyleSheet, View} from 'react-native';
import React from 'react';
import MyInput from '../components/custom/MyInput';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';
import {CloseBottom} from '../components/custom/CloseBottom';
import {MyText} from '../components/custom/MyText';
import {colors} from '../../constants/Constants';

interface Props {}

const DropDownPikerScreen = ({route}: Props) => {
  const {data} = route.params;
  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.itemContainer}>
        <View>
          <MyInput
            {...{
              placeholder: '¿Qué buscas?',
              style: {
                width: '100%',
              },
            }}
          />
        </View>
        <MyText
          fontSize={16}
          fontWeight="600"
          color={colors.texto_ling}
          {...{
            style: {
              marginVertical: 10,
            },
          }}>
          Elige un elemento
        </MyText>
        <View></View>
      </View>
    </CustomScreen>
  );
};

export default DropDownPikerScreen;

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 30,
    marginHorizontal: 4,
  },
});
