import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {Title} from '../../components/custom/Title';
import {RoutListTypeProps} from '../../types/types';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../components/custom/Logo';

const SignesPreview = ({route}: RoutListTypeProps) => {
  const {
    item: {
      creation_date,
      heart_rate,
      blood_pressure,
      blood_sugar_level,
      weight,
    },
  } = route?.params ?? {};

  const pressure = JSON.parse(blood_pressure);

  console.log(pressure);

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.canten}>
        <Logo center style={{marginTop: 20}} />
        <Title {...{title: creation_date, styles: {marginTop: 20}}} />
        <View style={styles.cantenItem}>
          <MyText fontSize={20} fontWeight="500" color={colors.texto_bold}>
            Ritmo cardiaco
          </MyText>
          <MyText fontSize={15} fontWeight="500">
            {heart_rate}
          </MyText>
        </View>
        <View style={styles.row}>
          <View style={styles.cantenItem}>
            <MyText fontSize={20} fontWeight="500" color={colors.texto_bold}>
              Nivel de azúcar
            </MyText>
            <MyText fontSize={15} fontWeight="500">
              {blood_sugar_level}
            </MyText>
          </View>
          <View style={styles.cantenItem}>
            <MyText fontSize={20} fontWeight="500" color={colors.texto_bold}>
              Peso
            </MyText>
            <MyText fontSize={15} fontWeight="500">
              {weight}
            </MyText>
          </View>

          <View style={styles.cantenItem}>
            <MyText fontSize={20} fontWeight="500" color={colors.texto_bold}>
              Presión
            </MyText>
            <View style={{flexDirection: 'row', gap: 10}}>
              <MyText fontSize={15} fontWeight="500">
                {pressure.sobre}
              </MyText>
              <MaterialCommunityIcons
                name="math-integral"
                size={25}
                color={colors.icon}
              />
              <MyText fontSize={15} fontWeight="500">
                {pressure.en}
              </MyText>
            </View>
          </View>
        </View>
      </View>
    </CustomScreen>
  );
};

export default SignesPreview;

const styles = StyleSheet.create({
  canten: {
    gap: 10,
  },
  cantenItem: {
    paddingHorizontal: 15,
    marginTop: 20,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
  },
});
