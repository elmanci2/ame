import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {Title} from '../../components/custom/Title';
import {RoutListTypeProps} from '../../types/types';
import {View} from 'moti';
import {MyText} from '../../components/custom/MyText';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../constants/Constants';

export default function RequestService({route, navigation}: RoutListTypeProps) {
  const {title} = route.params;

  const go = (route: any) => {
    navigation.navigate(route);
  };

  return (
    <CustomScreen>
      <Title {...{title}} />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            go(/* 'MedicationCollection' */ 'DropDownPikerScreen')
          }>
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../../assets/img/global/reclamacion.png')}
            />
          </View>

          <MyText fontWeight="700" fontSize={18} color={colors.icon}>
            {'Recolección \nMedicamentos'}
          </MyText>

          <Entypo name="chevron-right" color={colors.tertiary} size={50} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.imgContainer1}>
            <View style={styles.img1}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../../assets/img/global/medicine1.png')}
              />
            </View>
            <View style={styles.img1}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../../assets/img/global/medicine2.png')}
              />
            </View>
          </View>

          <MyText fontWeight="700" fontSize={18} color={colors.icon}>
            {'Recolección \nMedicamentos'}
          </MyText>

          <Entypo name="chevron-right" color={colors.tertiary} size={50} />
        </TouchableOpacity>
      </View>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 40,
    gap: 40,
  },
  imgContainer: {
    width: 50,
    height: 80,
  },

  img: {
    width: '100%',
    height: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: 10,
  },

  img1: {
    width: 40,
    height: 80,
  },
  imgContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
