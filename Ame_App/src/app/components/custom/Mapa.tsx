import {StyleSheet, View, PermissionsAndroid, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

interface Props {
  onCurrenLocation?: (location: any) => void;
}

const Mapa = ({onCurrenLocation}: Props) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 35.0116,
    longitude: 135.7681,
  });

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permiso denegado',
          'La aplicación necesita permisos de ubicación.',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      await requestLocationPermission();
      Geolocation.getCurrentPosition(info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({
          latitude,
          longitude,
        });

        onCurrenLocation && onCurrenLocation(userLocation);
      });
    };

    fetchUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      {userLocation.latitude !== 35.0116 && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {userLocation && <Marker coordinate={userLocation} />}
        </MapView>
      )}
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
