import {Linking, Platform} from 'react-native';

const PLATFORM = Platform.OS;

const isValidCoordinates = (latitude: number, longitude: number): boolean => {
  const lat = parseFloat(String(latitude));
  const lon = parseFloat(String(longitude));

  if (isNaN(lat) || isNaN(lon)) {
    return false;
  }

  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return false;
  }

  return true;
};

const useOpenMapDirections = () => {
  const openApp = (url: string) => {
    return new Promise((resolve, reject) => {
      Linking.canOpenURL(url)
        .then(() => {
          Linking.openURL(url)
            .then(() => {
              resolve('opening app....');
            })
            .catch(() => {
              reject('Cannot link app!!!');
            });
        })
        .catch(() => {
          reject('Cannot open app!!!');
        });
    });
  };

  const checkParameters = (
    param: {latitude: number; longitude: number} | null,
  ): string | null => {
    if (!param || !isValidCoordinates(param.latitude, param.longitude)) {
      return null;
    }

    return `${param.latitude},${param.longitude}`;
  };

  const checkTransportParameter = (param: string | undefined): string => {
    const _transportType = param ? param.toLowerCase() : '';
    if (
      _transportType === 'd' ||
      _transportType === 'w' ||
      _transportType === 'r' ||
      _transportType === 'b'
    ) {
      return _transportType;
    }

    return 'w';
  };

  const openMapDirections = (
    frmCoord: {latitude: number; longitude: number} | null,
    toCoord: {latitude: number; longitude: number},
    transportType?: string,
  ) => {
    return new Promise((resolve, reject) => {
      let _toCoord;
      const _frmCoord =
        checkParameters(frmCoord) !== null
          ? `?saddr=${checkParameters(frmCoord)}`
          : '';
      if (checkParameters(toCoord) !== null) {
        _toCoord =
          (_frmCoord.length === 0 ? '?' : '&') +
          `daddr=${checkParameters(toCoord)}`;
      } else {
        reject(new Error('You need to pass a valid endpoint(number)'));
      }
      const _transportType =
        checkTransportParameter(transportType) !== null
          ? `&dirflg=${checkTransportParameter(transportType)}`
          : '';
      const url = `${
        PLATFORM === 'ios'
          ? `https://maps.apple.com/`
          : 'https://maps.google.com/'
      }${_frmCoord}${_toCoord}${_transportType}`;
      openApp(url).then(result => {
        resolve(result);
      });
    });
  };

  return {openMapDirections};
};

export default useOpenMapDirections;
