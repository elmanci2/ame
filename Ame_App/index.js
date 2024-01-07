/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import {store} from './src/app/redux/store';
import {Provider} from 'react-redux';

import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const RenderApp = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RenderApp);
