import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {colors, user_roles} from '../../constants/Constants';
import {CustomDrawerComponent} from './custom/drawer/CustomDrawerComponent';
import AnimatedScreen from '../animation/AnimatedScreen';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import BottomScreen from './custom/bottom/BottomScreen';
import {
  DeliveryRouteLIst,
  LoginRouteLIst,
  VisitorRouteLIst,
  userRouteLIst,
} from './list/RoutesList';
import AddAcudiente from '../screen/user/AddAcudiente';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from '../components/custom/Toas';
import {useSelector} from 'react-redux';
import {use_Get_users_info} from '../hook/info/use_Get_users_info';

// stack
const StackConfig: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
};

/* const modalScreeConfig: StackNavigationOptions = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
};
 */
const Stack = createStackNavigator();

const MyStack = () => {
  const {tk, type} = useSelector((state: any) => state.tk);

  use_Get_users_info();

  const renderList =
    !tk || !type
      ? LoginRouteLIst
      : tk && type === user_roles.user
      ? userRouteLIst
      : type === user_roles.visitor
      ? VisitorRouteLIst
      : type === user_roles.delivery
      ? DeliveryRouteLIst
      : LoginRouteLIst;

  return (
    <Stack.Navigator screenOptions={{...StackConfig}}>
      {tk && <Stack.Screen name="home" component={MyDrawer} />}
      {renderList.map((item, index) => (
        <Stack.Screen
          options={{...item.config}}
          key={index}
          name={item.name}
          component={item.components}
          initialParams={{title: item.config?.title || ''}}
        />
      ))}

      <Stack.Screen name="AddAcudiente" component={AddAcudiente} />
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

const Routes = ({
  linking,
}: {
  linking: LinkingOptions<ReactNavigation.RootParamList> | undefined;
}) => {
  return (
    <NavigationContainer linking={linking}>
      <MyStack />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Routes;
