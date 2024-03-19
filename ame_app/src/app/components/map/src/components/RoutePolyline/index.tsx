import React from 'react';
import {Text} from 'react-native';
import {Polyline} from 'react-native-maps';
import connectTheme from '../../themes';

interface RoutePolylineProps {
  coordinates: any[];
  theme: any;
  type: string;
}

const RoutePolyline: React.FC<RoutePolylineProps> = ({
  coordinates,
  theme,
  type,
}) => {
  const themeData = connectTheme(theme).Polylines[type];

  if (!coordinates) return null;

  if (!themeData) {
    throw new Error(`RoutePolyline does not support type ${type}.`);
  }

  const components = [
    <Polyline
      key={0}
      strokeWidth={themeData.strokeWidth}
      strokeColor={themeData.strokeColor}
      coordinates={coordinates}
      lineCap={'round'}
    />,
  ];

  if (themeData.fillColor) {
    const borderWidth = themeData.strokeWidth - (themeData.borderWidth || 3);

    components.push(
      <Polyline
        key={1}
        strokeWidth={borderWidth}
        strokeColor={themeData.fillColor}
        coordinates={coordinates}
        lineCap={'round'}
      />,
    );
  }

  return components;
};

export default RoutePolyline;
