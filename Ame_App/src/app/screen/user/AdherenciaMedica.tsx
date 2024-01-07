import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {Title} from '../../components/custom/Title';
import RowsItem from '../../components/custom/RowsItem';
import {useSelector} from 'react-redux';
import {FlatList, StyleSheet} from 'react-native';
import {View} from 'moti';
import LottieView from 'lottie-react-native';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import {RoutListTypeProps} from '../../types/types';

const AdherenciaMedica = ({route}: RoutListTypeProps) => {
  const {reminder} = useSelector((state: any) => state.reminder);
  const {title} = route.params;

  return (
    <CustomScreen>
      <Title {...{title}} />

      {reminder.length === 0 ? (
        <View style={styles.lottieContainer}>
          <LottieView
            style={styles.lottie}
            source={require('../../animation/lottie/adherencia.json')}
            autoPlay
            loop
          />
          <MyText fontSize={20} color={colors.icon} textAlign="center">
            No se ha agregado ningún medicamento
          </MyText>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.flatList}
          data={reminder}
          renderItem={({item, index}) => (
            <RowsItem key={index} {...{route: '', text: item.medicamento}} />
          )}
        />
      )}
    </CustomScreen>
  );
};

export default AdherenciaMedica;

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 10,
    marginTop: 30,
    flex: 1,
    gap: 20,
  },

  lottie: {
    width: 450,
    height: 400,
    alignSelf: 'center',
  },

  lottieContainer: {
    gap: -40,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
