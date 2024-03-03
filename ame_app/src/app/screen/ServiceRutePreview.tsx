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
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LoadScreen from './LoadScreen';
import NextBottomRegister from './register/components/NextBottomRegister';
import MapViewDirections, {
  MapDirectionsLegs,
  MapDirectionsResponse,
} from 'react-native-maps-directions';
import {config} from '../../config/config';
import {colors} from '../../constants/Constants';
import {MyText} from '../components/custom/MyText';
import axios from 'axios';
import {getDistance} from 'geolib';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RoutListTypeProps} from '../types/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {usePost} from '../hook/http/usePost';

const ServiceRutePreview = ({navigation, route}: RoutListTypeProps) => {
  const {service} = route?.params;

  const [ruteInfo, setRuteInfo] = useState<MapDirectionsResponse>();
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [nextManeuver, setNextManeuver] = useState<MapDirectionsLegs>('');
  const mapViewRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const initialRegion = {
    latitude: currentLocation ? currentLocation.latitude : 37.78825,
    longitude: currentLocation ? currentLocation.longitude : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const {} = usePost('get-service-info');

  useEffect(() => {
    Geolocation.watchPosition(
      (info: any) => {
        const {longitude, latitude}: any = info.coords;
        setCurrentLocation({
          longitude,
          latitude,
        });
        setLoading(false);
      },
      (error: any) => console.error('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    return () => {
      setLoading(true);
    };
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
            setNextManeuver(nextStep);
          }
          setCurrentLocationIndex(prevIndex => prevIndex + 1);
        } else {
          clearInterval(interval);
        }
      }, 1000); // Cambia la velocidad del avance aquí
      return () => clearInterval(interval);
    }
  }, [ruteInfo, currentLocationIndex]);

  useEffect(() => {
    // Recalcular ruta si la ubicación del usuario cambia significativamente
    if (ruteInfo && currentLocation) {
      // Comparar la ubicación actual del usuario con el destino original
      const destination =
        ruteInfo?.coordinates[ruteInfo?.coordinates.length - 1];
      const distanceToDestination = getDistance(currentLocation, destination);

      if (distanceToDestination > 100) {
        // Por ejemplo, si el usuario se desvía más de 100 metros de la ruta original
        recalculateRoute(currentLocation, destination);
      }
    }
  }, [currentLocation]);

  const recalculateRoute = async (startLocation: any, destination: any) => {
    try {
      const response = await axios.get(
        config.GOOGLE_MAPS_APIKEY.GOOGLE_MAPS_APIKEY,
        {
          params: {
            origin: `${startLocation.latitude},${startLocation.longitude}`,
            destination: `${destination.latitude},${destination.longitude}`,
            key: config.GOOGLE_MAPS_APIKEY.GOOGLE_MAPS_APIKEY,
          },
        },
      );

      const newRoute = response.data;

      // Actualizar ruteInfo con la nueva ruta
      setRuteInfo(newRoute);
    } catch (error) {
      console.error('Error recalculating route:', error);
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

  const getStepDirection = (step: any) => {
    switch (step.maneuver) {
      case 'turn-left':
        return 'izquierda';
      case 'turn-right':
        return 'derecha';
      default:
        return 'seguir derecho';
    }
  };

  const start = async () => {
    setActive(true);
    handleZoomIn();
  };

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.directionContainer}>
          {getStepDirection(nextManeuver) === 'izquierda' ? (
            <FontAwesome6
              name="arrow-turn-up"
              size={30}
              style={{transform: [{rotate: '-90deg'}]}}
              color={colors.secundario}
            />
          ) : getStepDirection(nextManeuver) === 'derecha' ? (
            <FontAwesome6
              name="arrow-turn-down"
              size={30}
              style={{transform: [{rotate: '-90deg'}]}}
              color={colors.secundario}
            />
          ) : (
            <FontAwesome6
              name="arrow-turn-up"
              size={30}
              color={colors.secundario}
            />
          )}

          <MyText color={colors.white} fontSize={17} fontWeight="500">
            {getStepDirection(nextManeuver)}
          </MyText>
        </View>

        <View style={styles.distanceDurationContainer}>
          <MyText color={colors.white} fontSize={17} fontWeight="500">
            {nextManeuver?.distance?.text}
          </MyText>
          <MyText color={colors.white} fontSize={17} fontWeight="500">
            {nextManeuver?.duration?.text}
          </MyText>
        </View>
      </View>

      <MapView
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
          destination={{latitude: 3.2774479, longitude: -76.2276009}}
          apikey={config.GOOGLE_MAPS_APIKEY?.GOOGLE_MAPS_APIKEY}
          strokeWidth={10}
          strokeColor={colors.tertiary}
          onReady={e => setRuteInfo(e)}
        />
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
            <TouchableOpacity style={styles.btnOption} onPress={handleZoomIn}>
              <MaterialIcons
                name="alt-route"
                size={20}
                color={colors.texto_ling}
              />
            </TouchableOpacity>
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
