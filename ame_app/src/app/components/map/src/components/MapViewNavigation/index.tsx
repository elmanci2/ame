import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {CoordinatePropType} from '../../constants/PropTypes';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Geolocation,
} from 'react-native';
import connectTheme from '../../themes';
import Geocoder from '../../modules/Geocoder';
import Directions from '../../modules/Directions';
import TravelModes from '../../constants/TravelModes';
import NavigationModes from '../../constants/NavigationModes';
import * as Tools from '../../modules/Tools';
import Simulator from '../../modules/Simulator';
import Traps from '../../modules/Traps';
import RouteMarker from '../RouteMarker';
import RoutePolyline from '../RoutePolyline';
import PositionMarker from '../PositionMarker';
import {POSITION_ARROW} from '../../constants/MarkerTypes';
import {Circle, Polyline} from 'react-native-maps';

interface Props {
  origin: string | CoordinatePropType | boolean;
  destination: string | CoordinatePropType | boolean;
  apiKey: string;
  language?: string;
  map?: () => void;
  navigationMode: string;
  travelMode: string;
  maxZoom: number;
  minZoom: number;
  animationDuration: number;
  navigationViewingAngle: number;
  navigationZoomLevel: number;
  directionZoomQuantifier: number;
  onRouteChange?: () => void;
  onStepChange?: () => void;
  onNavigationStarted?: () => void;
  onNavigationCompleted?: () => void;
  routeStepDistance: number;
  routeStepInnerTolerance: number;
  routeStepCenterTolerance: number;
  routeStepCourseTolerance: number;
  displayDebugMarkers: boolean;
  simulate: boolean;
  options: object;
  theme: any;
}

const MapViewNavigation: React.FC<Props> = ({
  origin = false,
  destination = false,
  apiKey,
  language,
  map,
  navigationMode,
  travelMode,
  maxZoom,
  minZoom,
  animationDuration,
  navigationViewingAngle,
  navigationZoomLevel,
  directionZoomQuantifier,
  onRouteChange,
  onStepChange,
  onNavigationStarted,
  onNavigationCompleted,
  routeStepDistance,
  routeStepInnerTolerance,
  routeStepCenterTolerance,
  routeStepCourseTolerance,
  displayDebugMarkers,
  simulate,
  options,
  theme,
}) => {
  const [route, setRoute] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState({});
  const [stepIndex, setStepIndex] = useState(false);
  const [navigationModeState, setNavigationModeState] = useState(
    NavigationModes.IDLE,
  );

  const geoCoder = new Geocoder(apiKey, {
    language: language,
  });

  const directionsCoder = new Directions(apiKey, {
    language: language,
  });

  const traps = new Traps({} as any);

  const {width, height} = Dimensions.get('window');
  const aspectRatio = width / height;

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(position => {
      setPosition(position.coords);
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (origin && destination) {
      if (
        navigationMode !== navigationModeState ||
        travelMode !== travelMode ||
        origin !== origin ||
        destination !== destination
      ) {
        updateRoute();
      }
    }
  }, [origin, destination, navigationMode, travelMode]);

  const updateRoute = (
    originParam: string | CoordinatePropType | boolean = origin,
    destinationParam: string | CoordinatePropType | boolean = destination,
    navigationModeParam: string = navigationMode,
    optionsParam: object | null = options,
  ) => {
    originParam = originParam || origin;
    destinationParam = destinationParam || destination;
    navigationModeParam = navigationModeParam || navigationMode;
    optionsParam = optionsParam || options;

    switch (navigationModeParam) {
      case NavigationModes.ROUTE:
        displayRoute(originParam, destinationParam, optionsParam);
        break;

      case NavigationModes.NAVIGATION:
        navigateRoute(originParam, destinationParam, optionsParam);
        break;
    }
  };

  const prepareRoute = (
    originParam: string | CoordinatePropType | boolean,
    destinationParam: string | CoordinatePropType | boolean,
    optionsParam: object | false,
    testForRoute: boolean,
  ) => {
    if (testForRoute && route) {
      return Promise.resolve(route);
    }
    optionsParam = Object.assign(
      {},
      {mode: travelMode},
      {mode: travelMode},
      optionsParam.constructor == Object ? optionsParam : {},
    );

    return directionsCoder
      .fetch(originParam, destinationParam, optionsParam)
      .then(routes => {
        if (routes.length) {
          const route = routes[0];
          onRouteChange && onRouteChange(route);
          onStepChange && onStepChange(false);
          setRoute(route);
          return Promise.resolve(route);
        }
        return Promise.reject();
      });
  };

  const displayRoute = (
    originParam: string | CoordinatePropType | boolean,
    destinationParam: string | CoordinatePropType | boolean,
    optionsParam: object | false,
  ) => {
    prepareRoute(originParam, destinationParam, optionsParam)
      .then(route => {
        const region = {
          ...route.bounds.center,
          ...getBoundingBoxZoomValue(
            route.bounds.boundingBox,
            directionZoomQuantifier,
          ),
        };
        map().animateToRegion(region, animationDuration);
        if (!navigationModeState == NavigationModes.ROUTE) {
          setNavigationModeState(NavigationModes.ROUTE);
        }
        return Promise.resolve(route);
      })
      .catch(err => console.log(err));
  };

  const navigateRoute = (
    originParam: string | CoordinatePropType | boolean,
    destinationParam: string | CoordinatePropType | boolean,
    optionsParam: object | false,
  ) => {
    prepareRoute(originParam, destinationParam, optionsParam, true).then(
      route => {
        const region = {
          ...route.origin.coordinate,
          ...getZoomValue(navigationZoomLevel),
        };
        map().animateToRegion(region, animationDuration);
        map().animateToViewingAngle(navigationViewingAngle, animationDuration);
        setNavigationModeState(NavigationModes.NAVIGATION);
        updateStep(0);
        onNavigationStarted && onNavigationStarted();
        if (simulate) {
          console.log('SIMULATING ROUTE');
          const simulator = new Simulator({} as any);
          setTimeout(() => simulator.start(route), animationDuration * 1.5);
        } else {
          console.log('NOT SIMULATING');
        }
        return Promise.resolve(route);
      },
    );
  };

  const getBoundingBoxZoomValue = (b: any[], quantifier = 1) => {
    if (b.length != 2) return {};

    const latitudeDelta =
      (b[0].latitude > b[1].latitude
        ? b[0].latitude - b[1].latitude
        : b[1].latitude - b[0].latitude) * quantifier;

    return {
      latitudeDelta,
      longitudeDelta: latitudeDelta * aspectRatio,
    };
  };

  const getZoomValue = (level: number) => {
    const value = 0.00001 * (maxZoom - (level < minZoom ? minZoom : level));

    return {
      latitudeDelta: value,
      longitudeDelta: value * aspectRatio,
    };
  };

  const updatePosition = (coordinate: any, duration = 0) => {
    map().animateToCoordinate(coordinate, duration);
  };

  const updateBearing = (bearing: number, duration = false) => {
    map().animateToBearing(bearing, duration || animationDuration);
  };

  const updateStep = (stepIndexParam: number = 0) => {
    const step = route.steps[stepIndexParam < 0 ? 0 : stepIndexParam];
    const nextStep = route.steps[stepIndexParam + 1];

    onStepChange && onStepChange(step, nextStep);

    traps.watchStep(
      step,
      nextStep,
      {
        distance: routeStepDistance,
        innerRadiusTolerance: routeStepInnerTolerance,
        centerRadiusTolerance: routeStepCenterTolerance,
        courseTolerance: routeStepCourseTolerance,
      },
      (trap, event, state) => {
        if (!nextStep && trap.isCenter()) {
          onNavigationCompleted && onNavigationCompleted();
          return setNavigationModeState(NavigationModes.IDLE);
        }
        if (trap.isLeaving()) {
          updateStep(stepIndex);
        }
      },
    );

    setStepIndex(stepIndexParam + 1);
  };

  const getRouteMarkers = (routeParam: any) => {
    if (!routeParam || routeParam.markers.constructor !== Array) return null;
    return routeParam.markers.map((params: any, index: number) => {
      return <RouteMarker key={index} theme={theme} {...params} />;
    });
  };

  const getPositionMarker = (
    positionParam: any,
    navigationModeParam: string,
  ) => {
    const type =
      navigationModeParam == NavigationModes.NAVIGATION
        ? POSITION_ARROW
        : undefined;
    return (
      <PositionMarker
        key={'position'}
        theme={theme}
        type={type}
        {...positionParam}
      />
    );
  };

  const getRoutePolylines = (routeParam: any) => {
    if (!routeParam || routeParam.polylines.constructor !== Array) return null;
    return routeParam.polylines.map((params: any, index: number) => {
      return params ? (
        <RoutePolyline key={index} theme={theme} {...params} />
      ) : null;
    });
  };

  const getDebugShapes = (routeParam: any) => {
    let result: JSX.Element[] = [];
    if (!routeParam || !displayDebugMarkers) return result;

    const steps = route.steps;
    let c = 0;

    steps.forEach((step: any, index: number) => {
      const coordinate = step.start;
      [
        {radius: routeStepDistance, color: 'blue'},
        {radius: routeStepDistance * routeStepInnerTolerance, color: 'red'},
        {radius: routeStepDistance * routeStepCenterTolerance, color: 'green'},
      ].forEach(d => {
        result.push(
          <Circle
            key={c}
            strokeColor={d.color}
            strokeWidth={2}
            center={step.start}
            radius={d.radius}
          />,
        );
        c++;
      });

      [{radius: routeStepDistance, color: 'blue'}].forEach(d => {
        let bearing = step.bearing;
        let coords = Tools.toArcPolygon(
          coordinate,
          bearing - routeStepCourseTolerance,
          bearing + routeStepCourseTolerance,
          routeStepDistance,
        );
        result.push(
          <Polyline
            key={c}
            strokeColor={d.color}
            strokeWidth={8}
            coordinates={coords}
          />,
        );
        c++;
      });
    });

    return result;
  };

  return (
    <>
      {getRouteMarkers(route)}
      {getRoutePolylines(route)}
      {getPositionMarker(position, navigationModeState)}
      {getDebugShapes(route)}
    </>
  );
};

MapViewNavigation.propTypes = {
  origin: PropTypes.oneOfType([
    PropTypes.string,
    CoordinatePropType,
    PropTypes.bool,
  ]),
  destination: PropTypes.oneOfType([
    PropTypes.string,
    CoordinatePropType,
    PropTypes.bool,
  ]),
  apiKey: PropTypes.string.isRequired,
  language: PropTypes.string,
  map: PropTypes.func,
  navigationMode: PropTypes.string,
  travelMode: PropTypes.string,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  animationDuration: PropTypes.number,
  navigationViewingAngle: PropTypes.number,
  navigationZoomLevel: PropTypes.number,
  directionZoomQuantifier: PropTypes.number,
  onRouteChange: PropTypes.func,
  onStepChange: PropTypes.func,
  onNavigationStarted: PropTypes.func,
  onNavigationCompleted: PropTypes.func,
  routeStepDistance: PropTypes.number,
  routeStepInnerTolerance: PropTypes.number,
  routeStepCenterTolerance: PropTypes.number,
  routeStepCourseTolerance: PropTypes.number,
  displayDebugMarkers: PropTypes.bool,
  simulate: PropTypes.bool,
  options: PropTypes.object,
};

MapViewNavigation.defaultProps = {
  origin: false,
  destination: false,
  language: undefined,
  map: undefined,
  navigationMode: NavigationModes.IDLE,
  travelMode: TravelModes.DRIVING,
  maxZoom: 21,
  minZoom: 5,
  animationDuration: 750,
  navigationViewingAngle: 60,
  navigationZoomLevel: 14,
  directionZoomQuantifier: 1.5,
  routeStepDistance: 15,
  routeStepInnerTolerance: 0.75,
  routeStepCenterTolerance: 0.1,
  routeStepCourseTolerance: 30,
  displayDebugMarkers: false,
  simulate: false,
  options: {},
};

export default MapViewNavigation;
