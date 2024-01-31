import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import MyInput from '../components/custom/MyInput';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';
import {MyText} from '../components/custom/MyText';
import {colors} from '../../constants/Constants';
import RenderItemDropDown from '../components/custom/DropDown/RenderItemDropDown';
import {FlatList} from 'react-native-gesture-handler';
import {RoutListTypeProps} from '../types/types';

const DropDownPikerScreen = ({route, navigation}: RoutListTypeProps) => {
  const [onFilter, setOnFilter] = useState('');
  const {data, screen ,select} = route.params;

  const result = data?.filter((item: {label: string}) => {
    return item.label.toLowerCase().includes(onFilter.toLowerCase());
  });

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.itemContainer}>
        <View>
          <MyInput
            {...{
              textInputProps: {
                autoFocus: true,
              },
              placeholder: '¿Qué buscas?',
              style: {
                width: '100%',
              },
              onChangeText(e) {
                setOnFilter(e);
                return;
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
        <View {...{style: {flex: 1}}}>
          <FlatList
            contentContainerStyle={styles.flatListContainer}
            style={styles.flatList}
            data={result}
            renderItem={({item}) => (
              <RenderItemDropDown {...{item, navigation, screen ,select}} />
            )}
          />
        </View>
      </View>
    </CustomScreen>
  );
};

export default DropDownPikerScreen;

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 30,
    marginHorizontal: 4,
    flex: 1,
  },

  flatListContainer: {
    gap: 10,
    paddingBottom: 30,
    marginHorizontal: 3,
  },

  flatList: {
    flex: 1,
  },
});
