import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LoadScreen from './LoadScreen';
import NextBottomRegister from './register/components/NextBottomRegister';
import MapViewDirections, {
  MapDirectionsResponse,
} from 'react-native-maps-directions';
import {config} from '../../config/config';
import {colors} from '../../constants/Constants';
import {getDistance} from 'geolib';
import {MyText} from '../components/custom/MyText';

const ServiceRutePreview = () => {
  const [ruteInfo, setRuteInfo] = useState<MapDirectionsResponse>();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const mapViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const initialRegin = {
    latitude: currentLocation ? currentLocation.latitude : 37.78825,
    longitude: currentLocation ? currentLocation.longitude : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    //@ts-ignore
    Geolocation.getCurrentPosition((info: any) => {
      const {longitude, latitude}: any = info.coords;
      setCurrentLocation({
        //@ts-ignore
        longitude,
        latitude,
      });
      setLoading(false);
    });
  }, []);

  const calculateAngle = (pointA, pointB) => {
    const deltaX = pointB.longitude - pointA.longitude;
    const deltaY = pointB.latitude - pointA.latitude;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    return angle >= 0 ? angle : angle + 360; // Asegura que el ángulo esté entre 0 y 360 grados
  };

  const handleZoomIn = () => {
    if (mapViewRef.current && currentLocation) {
      //@ts-ignore
      mapViewRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.001, // Ajusta según lo que desees (valores más pequeños para un zoom más cercano)
        longitudeDelta: 0.001, // Ajusta según lo que desees (valores más pequeños para un zoom más cercano)
      });
    }

    setTimeout(() => {
      const routeStart = {latitude: 3.2774479, longitude: -76.2276009}; // Punto inicial de la ruta
      const routeEnd = {latitude: 3.2605341, longitude: -76.2276009}; // Punto final de la ruta
      const routeAngle = calculateAngle(routeStart, routeEnd); // Ángulo de la ruta

      const northAngle = 68; // Ángulo hacia el norte
      const rotationAngle = routeAngle - northAngle; // Ángulo de rotación para que la ruta apunte hacia arriba

      rotateMap(rotationAngle);
    }, 1000);
  };

  const rotateMap = (rotate: number) => {
    if (mapViewRef.current) {
      mapViewRef.current.animateCamera(
        {
          pitch: 65, // Ángulo de inclinación
          heading: rotate, // Rotación del mapa (0 es el norte, 90 es el este, etc.)
          altitude: 1000, // Altitud de la cámara (ajusta según lo que desees)
          zoom: mapViewRef.current.getCamera().zoom, // Mantén el nivel de zoom actual
        },
        {duration: 1000},
      ); // Duración de la animación en milisegundos
    }
  };

  console.log(ruteInfo?.legs[0].steps);

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={initialRegin}>
        <Marker coordinate={initialRegin} />

        <MapViewDirections
          origin={initialRegin}
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
