import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {colors} from '../../constants/Constants';
import {CustomDrawerComponent} from './custom/drawer/CustomDrawerComponent';
import AnimatedScreen from '../animation/AnimatedScreen';

import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

import BottomScreen from './custom/bottom/BottomScreen';
import AddReminderScreen from '../screen/AddReminderScreen';
import {userRoutStackList} from './list/RoutesList';

// stack

const StackConfig: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
};

const modalScreeConfig: StackNavigationOptions = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
};

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{...StackConfig}}>
      <Stack.Screen name="home" component={MyDrawer} />
      <Stack.Screen
        options={{...modalScreeConfig}}
        name="addReminder"
        component={AddReminderScreen}
      />

      {userRoutStackList.map((item, index) => (
        <Stack.Screen
          options={{...item.config}}
          key={index}
          name={item.name}
          component={item.components}
          initialParams={{title: item.config?.title || ''}}
        />
      ))}
    </Stack.Navigator>
  );
};

//  drawer
const Drawer = createDrawerNavigator();
const drawerConfig = {
  headerShown: false,
  initialRouteName: 'Home',
  drawerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    paddinRight: 20,
    width: '50%',
  },

  sceneContainerStyle: {
    backgroundColor: colors.primary,
  },
  overlayColor: 'transparent',
};

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return <CustomDrawerComponent {...props} />;
};

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{drawerType: 'slide', ...drawerConfig} as any}
      drawerContent={CustomDrawer}>
      <Drawer.Screen name="Home" component={BottomScreen} />
      <Drawer.Screen name="animated">{() => <AnimatedScreen />}</Drawer.Screen>
    </Drawer.Navigator>
  );
};

const Routes = () => {
  const flex = {flex: 1};
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={flex}>
        <MyStack />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Routes;
