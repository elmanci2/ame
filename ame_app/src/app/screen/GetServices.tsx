/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import MapView, {Marker} from 'react-native-maps';
import MapaServiceCard from '../components/custom/MapaServiceCard';
import {useFetch} from '../hook/http/useFetch';
import LoadScreen from './LoadScreen';
import Geolocation from '@react-native-community/geolocation';
import {colors} from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ErrorScreen from './error/ErrorScreen';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

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

  console.log(data);

  useFocusEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await refetch();
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text2: error.message ?? 'Error al realizar la petición',
        });
      }
    }, 15000); // Intervalo de 15 segundos en milisegundos

    return () => {
      // Limpiar el intervalo cuando el componente se desmonte o el efecto se limpie
      clearInterval(intervalId);
    };
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

  useEffect(() => {
    handleMarkerPress(data[0]);
  }, [data, dataLading]);

  if (loading || dataLading) {
    return <LoadScreen />;
  } else if (error) {
    return <ErrorScreen reload={refetch} />;
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
          {data.map((point: any, index: number) => {
            const location = JSON.parse(point?.user_location);

            return (
              <Fragment>
                {location && (
                  <Marker
                    onPress={() => handleMarkerPress(point)}
                    key={index}
                    coordinate={{
                      latitude: location?.latitude,
                      longitude: location?.longitude,
                    }}
                  />
                )}
              </Fragment>
            );
          })}
        </MapView>

        <View style={styles.refetchContainer}>
          <TouchableOpacity
            onPress={async () => await refetch()}
            style={[styles.refetchBtn]}>
            <Ionicons name="reload" color={colors.tertiary} size={30} />
          </TouchableOpacity>
        </View>
        <View>
          {data?.length > 0 && (
            <MapaServiceCard
              data={selectedUser}
              key={Math.floor(Math.random() * 1000)}
            />
          )}
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

  refetchBtn: {
    marginTop: 10,
    borderRadius: 50,
    padding: 8,
    backgroundColor: colors.white,
    elevation: 5,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },

  refetchContainer: {
    top: 0,
    position: 'absolute',
  },
});
