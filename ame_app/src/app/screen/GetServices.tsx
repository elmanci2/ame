import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import MapView, {Marker} from 'react-native-maps';
import MapaServiceCard from '../components/custom/MapaServiceCard';
import {useFetch} from '../hook/http/useFetch';

const GetServices = () => {
  const {data, error, loading, refetch} = useFetch(
    'get-active-services',
    'get-active-services',
  );

  const [selectedUser, setSelectedUser] = useState();

  const handleMarkerPress = (point: any) => {
    setSelectedUser(point);
  };

  return (
    <CustomScreen>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.7128,
            longitude: -74.006,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          {data.map((point, index) => {
            const location = JSON.parse(point?.user_location);

            console.log(location);

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
          <MapaServiceCard data={selectedUser} />
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
