import 'react-native-gesture-handler';

import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {colors} from './src/constants/Constants';
import Routes from './src/app/routes/Routes';

function App(): JSX.Element {
  return (
    <Fragment>
      <StatusBar backgroundColor={colors.primary} />
      <Routes />
    </Fragment>
  );
}

export default App;
