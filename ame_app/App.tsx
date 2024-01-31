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
import {SafeAreaView} from 'react-native-safe-area-context';

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
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={flex}>
        <QueryClientProvider client={queryClient}>
          {/* @ts-ignore */}
          <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={colors.primary} />
            <Routes />
          </SafeAreaView>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
