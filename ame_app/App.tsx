import 'react-native-gesture-handler';
import 'react-native-reanimated';
import Orientation from 'react-native-orientation-locker';
import React, {useEffect} from 'react';
import {Linking, StatusBar} from 'react-native';
import {colors} from './src/constants/Constants';
import Routes from './src/app/routes/Routes';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {store} from './src/app/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import messaging from '@react-native-firebase/messaging';
import {requestUserPermissionMessage} from './src/function/Permissions';
const flex = {flex: 1};

const NAVIGATION_IDS = ['home', 'post', 'settings'];

function buildDeepLinkFromNotificationData(data: any) {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (navigationId === 'home') {
    return 'ame_app://Home';
  }
  if (navigationId === 'settings') {
    return 'ame_app://Settings';
  }
  const postId = data?.postId;
  if (typeof postId === 'string') {
    return `ame_app://Post/${postId}`;
  }
  console.warn('Missing postId');
  return null;
}

const linking = {
  prefixes: ['ame_app://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: 'home',
      Post: 'post/:id',
      Settings: 'settings',
    },
  },
};

const queryClient = new QueryClient();
function App(): JSX.Element {
  useEffect(() => {
    requestUserPermissionMessage();
    Orientation.lockToPortrait();
    const onOrientationChange = (orientation: any) => {
      console.log(`Orientation changed to ${orientation}`);
    };
    Orientation.addOrientationListener(onOrientationChange);
    return () => {
      Orientation.unlockAllOrientations();
      Orientation.removeOrientationListener(onOrientationChange);
    };
  }, []);

  useEffect(() => {
    const unsubscribe2 = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        const {data} = remoteMessage;
        const deeplinkURL = buildDeepLinkFromNotificationData(data);
        if (deeplinkURL) {
          Linking.openURL(deeplinkURL);
        }
      },
    );

    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      const data = remoteMessage.data;
      if (data?.key === 6) {
        console.log('navegar a service preview');
      }
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log('message', remoteMessage);
    });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  const persistor = persistStore(store);

  return (
    <PersistGate {...{persistor}}>
      <Provider {...{store}}>
        <GestureHandlerRootView style={flex}>
          <QueryClientProvider client={queryClient}>
            <StatusBar
              backgroundColor={colors.primary}
              barStyle="dark-content"
            />
            <Routes linking={linking as any} />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </Provider>
    </PersistGate>
  );
}

export default App;
