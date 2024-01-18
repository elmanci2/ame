import 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import React, {Fragment, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {colors} from './src/constants/Constants';
import Routes from './src/app/routes/Routes';

function App(): JSX.Element {
  useEffect(() => {
    // Lock the orientation to portrait
    Orientation.lockToPortrait();

    // Optionally, you can listen for orientation changes
    const onOrientationChange = (orientation: any) => {
      console.log(`Orientation changed to ${orientation}`);
    };

    Orientation.addOrientationListener(onOrientationChange);

    // Clean up the listener when the component is unmounted
    return () => {
      Orientation.unlockAllOrientations();
      Orientation.removeOrientationListener(onOrientationChange);
    };
  }, []);

  return (
    <Fragment>
      <StatusBar backgroundColor={colors.primary} />
      <Routes />
    </Fragment>
  );
}

export default App;
