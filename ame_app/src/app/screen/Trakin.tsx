import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapboxGL, {
  PointAnnotation,
  UserLocation,
  ShapeSource,
  LineLayer,
} from '@rnmapbox/maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import LoadScreen from './LoadScreen';
//import MapboxNavigation from '../components/mapBox';

const metersToLongitudeDegrees = (meters, latitude) => {
  const earthEquatorialRadius = 6378137; // in meters
  const degreesPerPixel = 360 / (2 * Math.PI * earthEquatorialRadius);
  return meters * degreesPerPixel * Math.cos((latitude * Math.PI) / 180);
};

const metersToLatitudeDegrees = meters => {
  const metersPerDegreeLat =
    111132.92 - 559.82 * Math.cos(2 * meters) + 1.175 * Math.cos(4 * meters);
  return meters / metersPerDegreeLat;
};

const APIKEY =
  'pk.eyJ1IjoiZWxtYW5jaTIiLCJhIjoiY2xzcXdkNDN5MTZndDJpbnl2ODV3bG5qZiJ9.LS9W-35dTB5koz7wVcjD2g';
MapboxGL.setAccessToken(APIKEY);

MapboxGL.setTelemetryEnabled(false);
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
});

const Takin = () => {
  const [routeDirections, setRouteDirections] = useState(null);
  const [coords, setCoords] = useState([12.48839, 50.72724]);
  const [destinationCoords, setDestinationCoords] = useState([0, 0]);
  const [routeCorners, setRouteCorners] = useState([]);
  const userLocationRef = useRef(null);

  function calculateRouteCorners(routeCoordinates: any) {
    const corners = [];
    for (let i = 1; i < routeCoordinates.length - 1; i++) {
      const prevCoord = routeCoordinates[i - 1];
      const currCoord = routeCoordinates[i];
      const nextCoord = routeCoordinates[i + 1];

      // Calcular el ángulo entre los segmentos de la ruta
      const anglePrev = Math.atan2(
        currCoord[1] - prevCoord[1],
        currCoord[0] - prevCoord[0],
      );
      const angleNext = Math.atan2(
        nextCoord[1] - currCoord[1],
        nextCoord[0] - currCoord[0],
      );
      const angleDiff = Math.abs(angleNext - anglePrev);

      // Si el ángulo entre los segmentos es significativo, consideramos que es una esquina
      if (angleDiff > 0.5) {
        corners.push(currCoord);
      }
    }
    return corners;
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const {longitude, latitude} = info.coords;
      setCoords([longitude, latitude]);

      // Calculate destination coordinates 200 meters away
      const deltaLongitude = metersToLongitudeDegrees(200, latitude);
      const deltaLatitude = metersToLatitudeDegrees(200);
      const newDestinationCoords = [
        longitude + deltaLongitude,
        latitude + deltaLatitude,
      ];
      setDestinationCoords(newDestinationCoords);
    });
  }, []);

  useEffect(() => {
    if (userLocationRef.current) {
      const {longitude, latitude} = userLocationRef.current;
      const index = routeCorners.findIndex(
        corner => corner[0] === longitude && corner[1] === latitude,
      );
      if (index !== -1 && index < routeCorners.length - 1) {
        // Rotar el mapa hacia la siguiente esquina
        const nextCorner = routeCorners[index + 1];
        MapboxGL.Camera.setCamera({
          centerCoordinate: nextCorner,
          animationDuration: 1000,
          animationMode: 'flyTo',
          followUserMode: 'normal',
        });
      }
    }
  }, [userLocationRef.current, routeCorners]);

  function onUserLocationUpdate(location) {
    userLocationRef.current = location.coords;
  }

  const [loading, setLoading] = useState(true);
  const [selectedRouteProfile, setselectedRouteProfile] = useState('walking');

  async function getPermissionLocation() {
    try {
      const geo = await Geolocation.getCurrentPosition(
        location =>
          setCoords([location.coords.longitude, location.coords.latitude]),
        err => console.log(err),
        {enableHighAccuracy: true},
      );
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  useEffect(() => {
    getPermissionLocation();
    if (selectedRouteProfile !== null) {
      createRouterLine(coords, selectedRouteProfile);
    }
  }, [selectedRouteProfile]);

  function makeRouterFeature(coordinates: any) {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
  }

  if (loading) {
    return <LoadScreen />;
  }

  async function createRouterLine(coords, routeProfile) {
    const startCoords = `${coords[0]},${coords[1]}`;
    const endCoords = `${[destinationCoords, destinationCoords]}`;
    const geometries = 'geojson';
    const url = `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${APIKEY}`;

    try {
      let response = await fetch(url);
      let json = await response.json();

      let coordinates = json['routes'][0]['geometry']['coordinates'];
      let destinationCoordinates =
        json['routes'][0]['geometry']['coordinates'].slice(-1)[0];

      // Calcular las esquinas de la ruta
      const corners = calculateRouteCorners(coordinates);
      setRouteCorners(corners);

      setDestinationCoords(destinationCoordinates);
      if (coordinates.length) {
        const routerFeature = makeRouterFeature(coordinates);
        setRouteDirections(routerFeature);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            zoomLevel={18}
            centerCoordinate={coords}
            animationMode={'flyTo'}
            animationDuration={1000}
          />
          {routeDirections && (
            <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
              <MapboxGL.LineLayer
                id="routerLine01"
                style={{
                  lineColor: '#FA9E14',
                  lineWidth: 4,
                }}
              />
            </MapboxGL.ShapeSource>
          )}
          {destinationCoords && (
            <MapboxGL.PointAnnotation
              id="destinationPoint"
              coordinate={destinationCoords}>
              <View style={styles.destinationIcon}>
                <Ionicons name="storefront" size={24} color="#E1710A" />
              </View>
            </MapboxGL.PointAnnotation>
          )}

          <MapboxGL.UserLocation
            animated={true}
            androidRenderMode={'gps'}
            showsUserHeadingIndicator={true}
            onUpdate={onUserLocationUpdate}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0 ,0 , 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
  },
  cardContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  destinationIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeProfileList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  flatList: {
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 2 - 40,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  routeProfileButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 8,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  selectedRouteProfileButton: {
    backgroundColor: '#FA9E14',
    borderColor: '#FA9E14',
  },
  routeProfileButtonText: {
    color: '#fff',
    marginTop: 5,
  },
  selectedRouteProfileButtonText: {
    color: 'white',
  },

  cornerIcon: {
    width: 120,
    height: 120,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default Takin;
