import {StyleSheet, View, PermissionsAndroid, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL, {
  PointAnnotation,
  UserLocation,
  ShapeSource,
  LineLayer,
} from '@rnmapbox/maps';

interface Props {
  onCurrenLocation?: (location: any) => void;
}

const APIKEY =
  'pk.eyJ1IjoiZWxtYW5jaTIiLCJhIjoiY2xzcXdkNDN5MTZndDJpbnl2ODV3bG5qZiJ9.LS9W-35dTB5koz7wVcjD2g';
MapboxGL.setAccessToken(APIKEY);

MapboxGL.setTelemetryEnabled(false);
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
});

const Mapa = ({onCurrenLocation}: Props) => {
  const [coords, setCoords] = useState([3.4516, -76.5320]);


  Geolocation.getCurrentPosition(info => {
    const {longitude, latitude} = info.coords;
    setCoords([longitude, latitude]);
  });


  
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={22}
          centerCoordinate={coords}
          animationMode={'flyTo'}
          animationDuration={1000}
        />

        <MapboxGL.UserLocation animated={true} androidRenderMode={'gps'} />
      </MapboxGL.MapView>
    </View>
  );
};

export default Mapa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
