import React from 'react';
import * as GeoLib from 'geolib';

interface Point {
  latitude: number;
  longitude: number;
  bearing: number;
}

interface Step {
  polyline: {
    coordinates: Point[];
  };
}

interface Route {
  steps: Step[];
}

interface Props {
  instance: any; // Tipo de instancia no especificado
}

const Simulator: React.FC<Props> = ({instance}) => {
  const speed = 30;
  const turnSpeed = 700;
  let pointIndex = 0;
  let points: Point[] = [];
  let lastBearing: number | null = null;

  const start = (route: Route) => {
    pointIndex = 0;

    const steps = route.steps;

    steps.forEach(step => {
      step.polyline.coordinates.forEach(coordinate => {
        points.push({...coordinate});
      });
    });

    const result: Point[] = [];

    points.forEach((point, index) => {
      const nextPoint = points[index + 1];

      if (nextPoint && !nextPoint.final) {
        const distance = Math.round(GeoLib.getDistance(point, nextPoint));
        const bearing = GeoLib.getGreatCircleBearing(point, nextPoint);

        if (bearing !== 0) {
          if (distance > 1) {
            for (let x = 1; x < distance; x++) {
              result.push({
                ...GeoLib.computeDestinationPoint(point, x, bearing),
                bearing,
              });
            }
          } else {
            result.push({...point, bearing});
          }
        }
      }
    });

    pointIndex = 0;
    points = result;
    lastBearing = null;

    drive();
  };

  const drive = () => {
    const point = points[pointIndex];

    let speedValue = speed;

    if (point && point.bearing !== undefined) {
      let allowPositionUpdate = true;

      if (lastBearing !== null && lastBearing !== point.bearing) {
        if (
          point.bearing > lastBearing - 10 &&
          point.bearing < lastBearing + 10
        ) {
          instance.updateBearing(point.bearing, turnSpeed);
        } else {
          allowPositionUpdate = false;
          speedValue = turnSpeed;
          instance.updateBearing(point.bearing, turnSpeed);
        }

        lastBearing = point.bearing;
      }

      if (allowPositionUpdate) {
        instance.setPosition({
          ...point,
          heading: point.bearing,
        });

        pointIndex++;
      }

      setTimeout(drive, speedValue);
    }
  };

  return null; // No se ha definido el comportamiento de renderizado
};

export default Simulator;
