/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Linking, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LoadScreen from '../LoadScreen';
import MapViewDirections from 'react-native-maps-directions';
import {config} from '../../../config/config';
import ValidateService from './ValidateService';
import {getDistance} from 'geolib';

const ServicePreview = ({route, navigation}: RoutListTypeProps) => {
  const {service}: {service: Service} = route?.params;
  const get_icon = require('../../../assets/img/icon/map/delivery_map_icon.png');
  const home_icon = require('../../../assets/img/icon/map/home_map_icon.png');
  const {
    type,
    location,
    date,
    id,
    createdAt,
    status,
    photo,
    incurred,
    get_name,
    gte_phone,
    completed,
  } = service;
  const title =
    type === 1 ? 'Recolección de medicamentos' : 'Organización Medicamentos';

  const Preview = () => {
    navigation.navigate('ServiceActivePreview', {service});
  };

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${gte_phone}`);
  };

  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [DestinationReached, setDestinationReached] = useState(false);

  const getLocation = JSON.parse(location);

  const initialRegin = {
    latitude: getLocation?.location.latitude ?? 0,
    longitude: getLocation?.location?.longitude ?? 0,
  };

  const handleUserLocationChange = async () => {
    if (getLocation) {
      const distanceToDestination = getDistance(currentLocation, initialRegin);
      console.log(distanceToDestination);

      const threshold = 50;
      if (distanceToDestination < threshold) {
        setDestinationReached(true);
        console.log('¡El usuario ha llegado al destino!');
      }
    }
  };

  useEffect(() => {
    handleUserLocationChange();
  }, [currentLocation]);

  useEffect(() => {
    //@ts-ignore
    Geolocation.getCurrentPosition((info: any) => {
      const {longitude, latitude}: any = info.coords;
      //@ts-ignore
      setCurrentLocation({
        longitude,
        latitude,
      });
      //@ts-ignore
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadScreen />;
  }

  if (!incurred) {
    return <NoAssignService />;
  }
  if (DestinationReached && !incurred) {
    return <ValidateService {...service} />;
  }

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
              color={!incurred ? colors.secundario : 'rgba(1, 175, 12, 0.65)'}>
              {!incurred ? 'No asignado' : 'Asignado'}
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
              <MapView
                style={styles.mapa}
                initialRegion={{
                  ...initialRegin,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}>
                <Marker
                  coordinate={{...currentLocation}}
                  image={home_icon}
                  style={{
                    width: 1,
                    height: 1,
                  }}
                />
                <Marker coordinate={{...initialRegin}} image={get_icon} />
                <MapViewDirections
                  apikey={config.GOOGLE_MAPS_APIKEY.GOOGLE_MAPS_APIKEY}
                  destination={{...currentLocation}}
                  origin={{...initialRegin}}
                  strokeWidth={4}
                  strokeColor={colors.tertiary}
                />
              </MapView>
            </View>
          )}
        </View>
        {incurred && (
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
                    {get_name}
                  </MyText>
                </View>
              </View>
              <TouchableOpacity
                onPress={type === 1 ? handlePhoneCall : () => null}>
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
  mapa: {
    width: '100%',
    height: '100%',
  },
});
