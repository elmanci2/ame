import 'react-native-gesture-handler';
import 'react-native-reanimated';
import Orientation from 'react-native-orientation-locker';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {colors} from './src/constants/Constants';
import Routes from './src/app/routes/Routes';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {store} from './src/app/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import { use_Get_users_info } from './src/app/hook/info/use_Get_users_info';



const queryClient = new QueryClient();
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
  const flex = {flex: 1};
  const persistor = persistStore(store);
  
  return (
    <PersistGate {...{persistor}}>
      <Provider {...{store}}>
        <GestureHandlerRootView style={flex}>
          <QueryClientProvider client={queryClient}>
            <StatusBar backgroundColor={colors.primary} />
            <Routes />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </Provider>
    </PersistGate>
  );
}

export default App;
