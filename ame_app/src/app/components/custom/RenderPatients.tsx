import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useEffect} from 'react';
import {Image} from 'moti';
import {MyText} from './MyText';
import {colors, default_image} from '../../../constants/Constants';
import {GlobalStyle} from '../../styles/styles';
import Feather from 'react-native-vector-icons/Feather';
import {patientsType} from '../../types/types';
import {useNavigation} from '@react-navigation/native';

export const RenderPatients = memo(
  ({data, modal, onSelect, screen, Action, not = false, onName}: any) => {
    const navigation = useNavigation<any>();
    const action = (item: any) => {
      modal(true);
      onSelect && onSelect(item?.id);
      onName && onName(item?.name);
    };

    const Preview = (item: patientsType) => {
      if (!not) {
        navigation.navigate(screen, {item: item});
      } else {
        Action && Action();
      }
    };

    return (
      <FlatList
        contentContainerStyle={styles.flatList}
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => Preview(item)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.imgContend}>
                  <Image
                    style={GlobalStyle.img}
                    source={{uri: item?.photo ?? default_image}}
                  />
                </View>

                <View style={styles.textContend}>
                  <MyText
                    {...{
                      fontSize: 16,
                      fontWeight: '500',
                      color: colors.texto_bold,
                    }}>
                    {item.name} {item.lastName}
                  </MyText>

                  <MyText
                    {...{
                      fontSize: 14,
                      fontWeight: '500',
                      color: colors.texto_bold,
                    }}>
                    {item.documentType} {item?.document}
                  </MyText>
                  <MyText
                    {...{
                      fontSize: 12,
                      fontWeight: '500',
                      color: colors.texto_bold,
                    }}>
                    Edad : {item?.edad}
                  </MyText>
                </View>
              </View>

              <TouchableOpacity
                style={{width: 30}}
                onPress={() => action(item)}>
                <Feather name="more-vertical" size={20} color={'black'} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    );
  },
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.4,
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  imgContend: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textContend: {
    gap: 5,
  },

  flatList: {
    gap: 20,
  },
});
