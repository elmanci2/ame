/**
 * @imports
 */
import {useEffect, useState} from 'react';
import {toQueryParams} from './Tools';

interface GeocoderProps {
  apiKey: string;
  options?: any;
}

interface AddressComponentMapping {
  street_number: string;
  route: string;
  postal_code: string;
  country: string;
  locality: string;
  administrative_area_level_1: string;
  administrative_area_level_2: string;
}

const Geocoder: React.FC<GeocoderProps> = ({apiKey, options = false}) => {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const getFromLocation = async (...params: any[]) => {
      let queryParams =
        params.length === 1 && typeof params[0] === 'string'
          ? {address: params[0]}
          : params;

      if (!params) return Promise.reject('Not enough parameters');

      queryParams.key = apiKey;

      if (options.language) queryParams.language = options.language;

      // build url
      const url = `https://maps.google.com/maps/api/geocode/json?${toQueryParams(
        queryParams,
      )}`;

      let response, data;

      // fetch
      try {
        response = await fetch(url);
      } catch (error) {
        return Promise.reject(error);
      }

      // parse
      try {
        data = await response.json();
      } catch (error) {
        return Promise.reject(error);
      }

      // check response's data
      if (data.status !== 'OK') {
        return Promise.reject(data);
      }

      return data.results;
    };

    const getFromLatLng = (lat: number, lng: number) => {
      return getFromLocation({latlng: `${lat},${lng}`});
    };

    const minimizeResults = (results: any[]) => {
      if (!Array.isArray(results)) return [];

      return results.map(result => {
        let {lat, lng} = result.geometry.location;

        return {
          components: minimizeAddressComponents(result.address_components),
          address: result.formatted_address,
          coordinate: {
            latitude: lat,
            longitude: lng,
          },
        };
      });
    };

    const minimizeAddressComponents = (components: any[]) => {
      let results: any = {};

      const ids: string[] = Object.keys(AddressComponentMapping);

      components.forEach(component => {
        let index = ids.indexOf(component.types[0]);
        if (index !== -1) {
          results[AddressComponentMapping[ids[index]]] = {
            short: component.short_name,
            long: component.long_name,
          };
        }
      });

      return results;
    };

    // Call getFromLocation or getFromLatLng here with desired parameters
    // getFromLocation(params);
    // getFromLatLng(lat, lng);

    // Clean-up function
    return () => {
      // Clean-up tasks, if any
    };
  }, [apiKey, options]);

  return null; // replace with your desired JSX content
};

export default Geocoder;
