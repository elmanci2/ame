/* import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LoadScreen from './LoadScreen';
import NextBottomRegister from './register/components/NextBottomRegister';
import MapViewDirections, {
  MapDirectionsResponse,
} from 'react-native-maps-directions';
import {config} from '../../config/config';
import {colors} from '../../constants/Constants';
import {MyText} from '../components/custom/MyText';

const ServiceRutePreview = () => {
  const [ruteInfo, setRuteInfo] = useState<MapDirectionsResponse>();
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const mapViewRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const initialRegion = {
    latitude: currentLocation ? currentLocation.latitude : 37.78825,
    longitude: currentLocation ? currentLocation.longitude : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

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

  useEffect(() => {
    if (ruteInfo) {
      const steps = ruteInfo?.legs[0].steps;
      const interval = setInterval(() => {
        if (currentLocationIndex < steps.length) {
          const nextStep = steps[currentLocationIndex];
          if (nextStep?.maneuver && nextStep?.maneuver.includes('turn')) {
            const rotationAngle = getRotationAngle(nextStep.maneuver);
            rotateMap(rotationAngle);
          }
          setCurrentLocationIndex(prevIndex => prevIndex + 1);
        } else {
          clearInterval(interval);
        }
      }, 1000); // Cambia la velocidad del avance aquí
      return () => clearInterval(interval);
    }
  }, [ruteInfo, currentLocationIndex]);

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

  const rotateMap = (rotate: number) => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });

      setTimeout(() => {
        mapViewRef.current.animateCamera(
          {
            pitch: 65,
            heading: rotate,
            altitude: 1000,
            zoom: mapViewRef.current.getCamera().zoom,
          },
          {duration: 1000},
        );
      }, 1000);
    }
  };

  const calculateAngle = (pointA: any, pointB: any) => {
    const deltaX = pointB.longitude - pointA.longitude;
    const deltaY = pointB.latitude - pointA.latitude;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  const getRotationAngle = (maneuver: string) => {
    switch (maneuver) {
      case 'turn-left':
        return -90; // Girar a la izquierda
      case 'turn-right':
        return 90; // Girar a la derecha
      default:
        return 0; // No hay giro
    }
  };

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={initialRegion}>
        <MapViewDirections
          origin={initialRegion}
          destination={{latitude: 3.2774479, longitude: -76.2276009}}
          apikey={config.GOOGLE_MAPS_APIKEY?.GOOGLE_MAPS_APIKEY}
          strokeWidth={10}
          strokeColor={colors.tertiary}
          onReady={e => setRuteInfo(e)}
        />
      </MapView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          paddingVertical: 20,
          backgroundColor: colors.white,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          elevation: 20,
          width: '100%',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <MyText fontWeight="700" fontSize={20} color={colors.texto_ling}>
            {ruteInfo?.distance}.km
          </MyText>
        </View>
        <NextBottomRegister active action={() => handleZoomIn()} />
      </View>
    </View>
  );
};

export default ServiceRutePreview;
 */

import React, {Fragment, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LoadScreen from './LoadScreen';
import NextBottomRegister from './register/components/NextBottomRegister';
import MapViewDirections, {
  MapDirectionsResponse,
} from 'react-native-maps-directions';
import {config} from '../../config/config';
import {colors} from '../../constants/Constants';
import {MyText} from '../components/custom/MyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RoutListTypeProps} from '../types/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {usePost} from '../hook/http/usePost';
import Toast from 'react-native-toast-message';

const ServiceRutePreview = ({navigation, route}: RoutListTypeProps) => {
  const {service} = route?.params;
  const [currentLocationIndex] = useState<number>(0);
  const [ruteInfo, setRuteInfo] = useState<MapDirectionsResponse>();
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const user_location = JSON?.parse(service?.user_location);

  const userLocation = {
    latitude: user_location.latitude,
    longitude: user_location.longitude,
  };

  const mapViewRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const initialRegion = {
    latitude: currentLocation ? currentLocation.latitude : 37.78825,
    longitude: currentLocation ? currentLocation.longitude : -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
    pitch: 65,
  };

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

  if (loading || loadingService) {
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
    <View style={styles.container}>
      <MapView
        customMapStyle={mapStyle}
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        showsUserLocation={true}
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
              <TouchableOpacity style={styles.btnOption} onPress={handleZoomIn}>
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
  );
};

export default ServiceRutePreview;

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
