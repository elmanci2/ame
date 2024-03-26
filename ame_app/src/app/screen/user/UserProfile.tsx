import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {Title} from '../../components/custom/Title';
import {RoutListTypeProps, UserData} from '../../types/types';
import {GlobalStyle} from '../../styles/styles';
import {colors, default_image} from '../../../constants/Constants';
import {MyText} from '../../components/custom/MyText';
import {useSelector} from 'react-redux';
import {calcularEdad} from '../../util/ageColculator';

const UserProfile = ({route}: RoutListTypeProps) => {
  const {title} = route.params;
  const {
    name,
    document,
    documentType,
    photo,
    date,
    phoneNumber,
    email,
    address,
    state,
  }: UserData = useSelector((e: any) => e?.Info?.info);

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.title}>
        <Title {...{title}} />
      </View>

      <View>
        <View style={styles.info_1}>
          <View style={styles.imgContainer}>
            <Image
              style={GlobalStyle.img}
              source={{uri: photo ?? default_image}}
            />
          </View>
          <View style={styles.info_1_text}>
            <MyText fontSize={24} fontWeight="500" color={colors.texto_bold}>
              {name}
            </MyText>

            <View style={styles.info_1_text_2}>
              <MyText fontSize={16} fontWeight="500" color={colors.texto_ling}>
                Edad: {calcularEdad(date)}
              </MyText>
              <MyText fontSize={16} fontWeight="500" color={colors.texto_ling}>
                {documentType} : {document}
              </MyText>
            </View>
          </View>
        </View>

        <View style={styles.ColumContainer}>
          <View style={styles.Colum1}>
            <MyText fontSize={20}>Número: {phoneNumber}</MyText>
          </View>
          <View style={styles.Colum1}>
            <MyText fontSize={20}>Correo: {email}</MyText>
          </View>
          <View style={styles.Colum1}>
            <MyText fontSize={20}>Dirección: {address}</MyText>
          </View>
          <View style={styles.Colum1}>
            <MyText fontSize={20}>
              Estado: {state !== 1 ? 'Activo' : 'Inactivo'}
            </MyText>
          </View>
        </View>
      </View>
    </CustomScreen>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  imgContainer: {
    width: 130,
    height: 130,
    overflow: 'hidden',
    borderRadius: 15,
  },
  info_1: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 30,
  },

  info_1_text: {
    gap: 7,
  },
  info_1_text_2: {
    gap: 2,
  },

  title: {marginTop: 20, paddingHorizontal: 5},
  Colum1: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  ColumContainer: {marginHorizontal: 10, marginTop: 20, gap: 20},
});
