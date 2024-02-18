import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import Logo from '../components/custom/Logo';
import MapView, {Marker} from 'react-native-maps';
import MapaServiceCard from '../components/custom/MapaServiceCard';

const photo = 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4';
const GetServices = () => {
  const [users] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St, New York',
      latitude: 40.7128,
      longitude: -74.006,
      age: 25,
      photo,
      eps: 'sura',
      copago: '2,000',
      time: '45 min',
    },
    {
      id: 2,
      firstName: 'Alice',
      lastName: 'Smith',
      address: '456 Broadway, New York',
      latitude: 40.7128,
      longitude: -74.0055,
      age: 30,
      photo,
      eps: 'sura',
      copago: '2,000',
      time: '45 min',
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      address: '789 Park Ave, New York',
      latitude: 40.7127,
      longitude: -74.006,
      age: 22,
      eps: 'sura',
      copago: '2,000',
      time: '45 min',
      photo,
    },
    {
      id: 4,
      firstName: 'Emma',
      lastName: 'Brown',
      address: '321 5th Ave, New York',
      latitude: 40.7129,
      longitude: -74.006,
      age: 28,
      photo,
      eps: 'sura',
      copago: '2,000',
      time: '45 min',
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Williams',
      address: '678 Lexington Ave, New York',
      latitude: 40.713,
      longitude: -74.006,
      age: 35,
      photo,
      eps: 'sura',
      copago: '2,000',
      time: '45 min',
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);

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
          {users.map((point, index) => (
            <Marker
              onPress={() => handleMarkerPress(point)}
              key={index}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
            />
          ))}
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
