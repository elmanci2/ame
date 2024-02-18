import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import MapView, {Marker} from 'react-native-maps';
import {RoutListTypeProps} from '../types/types';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import {config} from '../../config/config';
const ServiceRutePreview = ({route}: RoutListTypeProps) => {
  const {location} = route?.params ?? {};
  console.log(location);
  const [origin, setOrigin] = React.useState({
    latitude: 3.2606300000000004,
    longitude: -76.22762666666667,
  });

  const [activeLocation, setActiveLocation] = useState(false);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //@ts-ignore
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        setActiveLocation(true);
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  function onUserLocationChange(event:any) {
    /*  const { coordinate } = event.nativeEvent;
    setUserLocation(coordinate); */
  }

  React.useEffect(() => {
    if (activeLocation) {
      Geolocation.getCurrentPosition(
        position => {
          setOrigin({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          console.log(position);
        },
        error => console.log(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }
  }, [activeLocation]);

  React.useEffect(() => {
    requestLocationPermission();
  }, [activeLocation]);

  return (
    <CustomScreen>
      <View style={styles.mapContainer}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 3.2606300000000004,
            longitude: -76.22762666666667,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          onUserLocationChange={onUserLocationChange}>
          <MapViewDirections
            origin={origin}
            destination={{
              latitude: 3.2605783333333336,
              longitude: -76.217645,
            }}
            apikey={config?.GOOGLE_MAPS_APIKEY?.GOOGLE_MAPS_APIKEY}
            strokeColor="black"
            strokeWidth={5}
            mode='TRANSIT'
          />

          <Marker coordinate={origin} title="Origen" />
          <Marker
            coordinate={location}
            title="Destino"
          />
        </MapView>
      </View>
    </CustomScreen>
  );
};

export default ServiceRutePreview;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
