/**
 * @imports
 */
import * as geolib from 'geolib';

/**
 * toQueryParams
 * @param object
 * @returns {string}
 */
export const toQueryParams = (object: {[key: string]: any}): string => {
  return Object.keys(object)
    .filter(key => !!object[key])
    .map(key => key + '=' + encodeURIComponent(object[key]))
    .join('&');
};

/**
 * toLatLng
 * @param value
 * @returns {string}
 */
export const toLatLng = (value: any): string => {
  if (typeof value === 'string') return value;

  return value && value.latitude && value.longitude
    ? `${value.latitude},${value.longitude}`
    : value;
};

/**
 * toCoordinate
 * @param latlng
 * @returns {{latitude: *, longitude: *}}
 */
export const toCoordinate = (latlng: {
  lat: number;
  lng: number;
}): {latitude: number; longitude: number} => {
  const {lat, lng} = latlng;

  return {latitude: lat, longitude: lng};
};

/**
 * toArcPolygon
 * @param coordinate
 * @param initialBearing
 * @param finalBearing
 * @param radius
 * @returns {any[]}
 */
export const toArcPolygon = (
  coordinate: {latitude: number; longitude: number},
  initialBearing: number,
  finalBearing: number,
  radius: number,
): {latitude: number; longitude: number}[] => {
  const d2r = Math.PI / 180; // degrees to radians
  const r2d = 180 / Math.PI; // radians to degrees
  const points = 32;
  let result: {latitude: number; longitude: number}[] = [];

  if (initialBearing > finalBearing) finalBearing += 360;
  let deltaBearing = finalBearing - initialBearing;
  deltaBearing = deltaBearing / points;

  for (let i = 0; i < points + 1; i++) {
    result.push(
      geolib.computeDestinationPoint(
        coordinate,
        radius,
        initialBearing + i * deltaBearing,
      ),
    );
  }

  return result;
};

/**
 * toNameId
 * @param str
 * @param prepend
 * @param append
 * @returns {*}
 */
export const toNameId = (
  str: string,
  prepend?: string | boolean,
  append?: string | boolean,
): string => {
  str = str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b[a-z]/g, letter => letter.toUpperCase())
    .replace(/\s/g, '');

  return (prepend ? prepend : '') + str + (append ? append : '');
};
