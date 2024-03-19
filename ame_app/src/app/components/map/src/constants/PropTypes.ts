import {ValidationMap} from 'prop-types';

interface Coordinate {
  latitude: number;
  longitude: number;
}

/**
 * Coordinate PropType
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error | null}
 */
export const CoordinatePropType = (
  props: {[key: string]: any},
  propName: string,
  componentName: string,
): Error | null => {
  const target: Coordinate = props[propName];

  if (
    !target ||
    typeof target !== 'object' ||
    !('latitude' in target) ||
    !('longitude' in target)
  ) {
    return new Error(
      `${propName} in ${componentName} requires to be a coordinate object ({latitude, longitude})`,
    );
  }

  return null;
};
