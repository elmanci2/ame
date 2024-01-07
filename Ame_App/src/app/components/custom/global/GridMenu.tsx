import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {memo} from 'react';
import {MyText} from '../MyText';
import {GridItemType} from '../../../types/types';
import {useNavigation} from '@react-navigation/native';

type RenderItemProp = {
  item: GridItemType;
};

const RenderItem = memo(({item}: RenderItemProp) => {
  const navigate = useNavigation<any>();
  return (
    <TouchableOpacity
      style={[styles.item, {backgroundColor: item.color}]}
      onPress={() => navigate.navigate(item.route)}>
      <View style={styles.imgContainer}>
        <Image source={item.icon as any} style={styles.img} />
      </View>
      <MyText
        textAlign="center"
        color="white"
        fontSize={16}
        fontWeight="600"
        key={item.route}>
        {item.label}
      </MyText>
    </TouchableOpacity>
  );
});

const GridMenu = ({items}: {items: GridItemType[]}) => {
  return (
    <View style={styles.body}>
      <FlatList
        contentContainerStyle={styles.FlatList}
        columnWrapperStyle={styles.Wrapper}
        keyExtractor={item => item?.label}
        numColumns={2}
        data={items}
        renderItem={({item}) => <RenderItem {...{item}} />}
      />
    </View>
  );
};

export default GridMenu;

const styles = StyleSheet.create({
  body: {
    width: '100%',
    marginTop: 10,
  },

  FlatList: {
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Wrapper: {
    gap: 39,
  },

  //  item styles

  item: {
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    width: 145,
    height: 145,
    shadowColor: 'rgba(6, 71, 117, 0.63)',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  imgContainer: {
    width: 75,
    height: 75,
  },

  img: {
    width: '100%',
    height: '100%',
  },
});
