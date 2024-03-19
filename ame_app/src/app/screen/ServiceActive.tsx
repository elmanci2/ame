import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import LoadScreen from './LoadScreen';
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import {usePost} from '../hook/http/usePost';
import MapViewDirections, {
  MapDirectionsResponse,
} from 'react-native-maps-directions';
import NextBottomRegister from './register/components/NextBottomRegister';
import {MyText} from '../components/custom/MyText';
import {colors} from '../../constants/Constants';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  UserLocationChangeEvent,
} from 'react-native-maps';
import {View} from 'moti';
import {config} from '../../config/config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFetch} from '../hook/http/useFetch';
import {NotActiveService} from '../components/screen/service/NotActiveService';
import {useFocusEffect} from '@react-navigation/native';
import {getDistance} from 'geolib';
import CompleteServiceDelivery from './CompleteServiceDelivery';

const ServiceActive = ({navigation}: any) => {
  const {
    data: service,
    loading: loadingData,
    refetch,
  } = useFetch(
    'get_active_service_delivery_and_medical',
    'get_active_service_delivery_and_medical',
  );

  const {postRequest: realTimeRequest} = usePost('real-time-services', {});

  const [currentLocationIndex] = useState<number>(0);
  const [ruteInfo, setRuteInfo] = useState<MapDirectionsResponse>();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [destinationReached, setDestinationReached] = useState(false);

  let user_Location = {latitude: 0, longitude: 0}; // Valor predeterminado

  if (service?.user_location) {
    try {
      const user_location = JSON.parse(service.user_location);
      user_Location = {
        latitude: user_location.latitude,
        longitude: user_location.longitude,
      };
    } catch (error) {
      console.error('Error al analizar user_location:', error);
    }
  }

  const userLocation = {
    latitude: user_Location.latitude,
    longitude: user_Location.longitude,
  };

  const handleUserLocationChange = async (event: UserLocationChangeEvent) => {
    const {coordinate} = event.nativeEvent;
    console.log(coordinate);

    if (coordinate) {
      const distanceToDestination = getDistance(coordinate, userLocation);
      console.log(distanceToDestination);

      const threshold = 50;
      if (distanceToDestination < threshold) {
        setDestinationReached(true);
        console.log('¡El usuario ha llegado al destino!');
      }

      await realTimeRequest({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        id: service?.id,
      });
    }
  };
  const mapViewRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);
  const initialRegion = {
    latitude: currentLocation ? currentLocation.latitude : 37.78825,
    longitude: currentLocation ? currentLocation.longitude : -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
    pitch: 65,
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const {postRequest, loading: loadingService} = usePost('get-service', {
    id: service?.id,
    location: currentLocation,
  });

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

  const start = async () => {
    try {
      const result = await postRequest();
      if (result?.service?.incurred) {
        setActive(result?.service?.incurred);
      }
      Toast.show({
        type: 'success',
        text2: 'Servicio Activo',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleZoomIn = () => {
    if (mapViewRef.current && currentLocation && ruteInfo) {
      const routeStart = {
        latitude: ruteInfo?.coordinates[currentLocationIndex].latitude,
        longitude: ruteInfo?.coordinates[currentLocationIndex].longitude,
      };
      const routeEnd = {
        latitude: ruteInfo?.coordinates[currentLocationIndex + 1].latitude,
        longitude: ruteInfo?.coordinates[currentLocationIndex + 1].longitude,
      };
      const routeAngle = calculateAngle(routeStart, routeEnd);

      const northAngle = 0; // Uso del norte estándar del teléfono
      const rotationAngle = routeAngle - northAngle;

      rotateMap(rotationAngle);
    }
  };

  const calculateAngle = (pointA: any, pointB: any) => {
    const deltaX = pointB.longitude - pointA.longitude;
    const deltaY = pointB.latitude - pointA.latitude;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  const rotateMap = (rotate: number) => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      });

      setTimeout(() => {
        mapViewRef.current.animateCamera(
          {
            pitch: 20,
            heading: rotate,
            altitude: 1000,
            zoom: mapViewRef.current.getCamera().zoom,
          },
          {duration: 1000},
        );
      }, 1000);
    }
  };


  if (destinationReached && service?.incurred) {
    return <CompleteServiceDelivery {...{service, reloading: refetch}} />;
  }

  if (service?.length < 1) {
    return <NotActiveService />;
  }

  if (loading || loadingService || loadingData) {
    return <LoadScreen />;
  }

  const mapStyle = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];

  return (
    <CustomScreen>
      <View style={styles.container}>
        <MapView
          customMapStyle={mapStyle}
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
          style={styles.mapView}
          showsUserLocation={true}
          onUserLocationChange={handleUserLocationChange}
          followsUserLocation={true}
          initialRegion={initialRegion}>
          <MapViewDirections
            precision="high"
            timePrecision="now"
            mode="DRIVING"
            origin={initialRegion}
            destination={userLocation}
            apikey={config.GOOGLE_MAPS_APIKEY?.GOOGLE_MAPS_APIKEY}
            strokeWidth={7}
            strokeColor={colors.tertiary}
            onReady={e => setRuteInfo(e)}
          />

          <Marker coordinate={userLocation} />
        </MapView>

        <View style={styles.bottomBar}>
          <View style={styles.bottomBarContent}>
            {!active && (
              <Fragment>
                <MyText
                  fontSize={18}
                  fontWeight="700"
                  textAlign="center"
                  color={colors.texto_ling}
                  style={styles.distanceText}>
                  {ruteInfo?.legs[0].duration.text}
                </MyText>

                <MyText
                  fontSize={18}
                  fontWeight="700"
                  textAlign="center"
                  color={colors.texto_ling}
                  style={styles.distanceText}>
                  {ruteInfo?.legs[0].distance.text}
                </MyText>
              </Fragment>
            )}

            {active && (
              <Fragment>
                <TouchableOpacity
                  style={styles.btnOption}
                  onPress={handleZoomIn}>
                  <MaterialIcons
                    name="alt-route"
                    size={20}
                    color={colors.texto_ling}
                  />
                </TouchableOpacity>

                <MyText
                  fontSize={26}
                  fontWeight="700"
                  textAlign="center"
                  color={colors.tertiary}
                  style={styles.distanceText}>
                  {ruteInfo?.legs[0].distance?.text}
                </MyText>
              </Fragment>
            )}

            <TouchableOpacity
              style={styles.btnOption}
              onPress={() =>
                navigation.navigate('ActiveServicesPreview', {id: service?.id})
              }>
              <Ionicons name="menu" size={20} color={colors.texto_ling} />
            </TouchableOpacity>
          </View>
          {active ? (
            <MyText
              fontSize={26}
              fontWeight="700"
              textAlign="center"
              color={colors.tertiary}
              style={styles.distanceText}>
              {ruteInfo?.legs[0].duration.text}
            </MyText>
          ) : (
            <NextBottomRegister active action={start} />
          )}
        </View>
      </View>
    </CustomScreen>
  );
};

export default ServiceActive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    zIndex: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.tertiary,
    width: '90%',
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  directionContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distanceDurationContainer: {
    justifyContent: 'space-between',
  },
  mapView: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 20,
    width: '100%',
  },
  bottomBarContent: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  distanceText: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.texto_ling,
  },

  btnOption: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 8,
    borderColor: colors.texto_ling,
  },
});
