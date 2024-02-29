import {Image, StyleSheet, Linking, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {RoutListTypeProps, Service} from '../../types/types';
import {Title} from '../../components/custom/Title';
import {MyText} from '../../components/custom/MyText';
import {colors, default_image, dimensions} from '../../../constants/Constants';
import {convertirHora12h, obtenerFecha} from '../../util/Tiem';
import NoAssignService from '../../components/screen/service/NoAssignService';
import {GlobalStyle} from '../../styles/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Mapa from '../../components/custom/Mapa';
const ServicePreview = ({route, navigation}: RoutListTypeProps) => {
  const {service}: {service: Service} = route?.params;
  const {type, location, date, id, createdAt, status, photo} = service;
  const title =
    type === 1 ? 'Recolección de medicamentos' : 'Organización Medicamentos';

  const Preview = () => {
    navigation.navigate('ServiceActivePreview', {service});
  };
  const phoneNumber = '123456789';
  const handlePhoneCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.container}>
        <Title
          {...{
            styles: {
              marginVertical: 20,
            },
            title,
          }}
        />

        <View style={styles.containerItem}>
          <View style={styles.View_1}>
            <MyText
              fontSize={15}
              fontWeight="500"
              color={
                status === 0 ? colors.secundario : 'rgba(0, 255, 17, 0.43)'
              }>
              {status === 0 ? 'No asignado' : 'Asignado'}
            </MyText>
            <MyText fontSize={15} fontWeight="300">
              {convertirHora12h(createdAt ?? '')}
            </MyText>
            <MyText fontSize={15} fontWeight="300">
              {obtenerFecha(createdAt ?? '')}
            </MyText>
          </View>
          {status !== 0 ? (
            <NoAssignService />
          ) : (
            <View
              style={{
                width: dimensions.width,
                height: dimensions.height / 1.3,
                alignSelf: 'center',
                flexGrow: 1,
              }}>
              <Mapa />
            </View>
          )}
        </View>
        {status === 0 && (
          <TouchableOpacity onPress={Preview} style={styles.detail}>
            <View style={styles.previewItem}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View style={styles.userImage}>
                  <Image
                    source={{uri: default_image}}
                    style={GlobalStyle.img}
                  />
                </View>
                <View style={{gap: 7}}>
                  <MyText
                    color={colors.texto_ling}
                    fontSize={17}
                    fontWeight="500">
                    Andres Felipe
                  </MyText>
                  <MyText
                    color={colors.texto_ling}
                    fontSize={15}
                    fontWeight="400">
                    edad : 24
                  </MyText>
                </View>
              </View>
              <TouchableOpacity onPress={handlePhoneCall}>
                <AntDesign name="phone" size={30} color={colors.tertiary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </CustomScreen>
  );
};

export default ServicePreview;

const styles = StyleSheet.create({
  View_1: {flexDirection: 'row', justifyContent: 'space-between'},
  containerItem: {
    gap: 20,
    paddingHorizontal: 15,
  },
  container: {
    position: 'relative',
    flex: 1,
  },

  detail: {
    position: 'absolute',
    paddingVertical: 15,
    backgroundColor: colors.white,
    bottom: 0,
    width: dimensions.width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
  userImage: {
    width: 70,
    height: 70,
  },
  previewItem: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
