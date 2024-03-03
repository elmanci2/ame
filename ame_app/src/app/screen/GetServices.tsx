import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import MapView, {Marker} from 'react-native-maps';
import MapaServiceCard from '../components/custom/MapaServiceCard';
import {useFetch} from '../hook/http/useFetch';
import LoadScreen from './LoadScreen';
import Geolocation from '@react-native-community/geolocation';

const GetServices = () => {
  const {
    data,
    error,
    loading: dataLading,
    refetch,
  } = useFetch('get-active-services', 'get-active-services');

  const [selectedUser, setSelectedUser] = useState();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleMarkerPress = (point: any) => {
    setSelectedUser(point);
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
    handleMarkerPress(data[0]);
  }, [data, dataLading]);

  if (loading || dataLading) {
    return <LoadScreen />;
  }

  return (
    <CustomScreen>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...currentLocation,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}>
          {data.map((point: any, index) => {
            const location = JSON.parse(point?.user_location);

            return (
              <Marker
                onPress={() => handleMarkerPress(point)}
                key={index}
                coordinate={{
                  latitude: location[1],
                  longitude: location[0],
                }}
              />
            );
          })}
        </MapView>

        <View>
          {data?.length > 0 && <MapaServiceCard data={selectedUser} />}
        </View>
      </View>
    </CustomScreen>
  );
};

export default GetServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
