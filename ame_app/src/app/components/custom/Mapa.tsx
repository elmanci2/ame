import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LoadScreen from '../../screen/LoadScreen';

interface Props {
  onCurrenLocation?: (location: any) => void;
}

const Mapa = ({onCurrenLocation}: Props) => {
  const [coords, setCoords] = useState({longitude: 0, latitude: 0});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    //@ts-ignore
    Geolocation.getCurrentPosition((info: any) => {
      const {longitude, latitude} = info.coords;
      setCoords({longitude, latitude});

      onCurrenLocation && onCurrenLocation({longitude, latitude});
      setLoad(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];

  if (load) {
    return <LoadScreen />;
  }

  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{...coords, latitudeDelta: 0.01, longitudeDelta: 0.01}}
      />
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
