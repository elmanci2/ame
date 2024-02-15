import React from 'react';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CustomBottomComponent} from './CustomBottomComponent';
import {
  MedicalStack,
  UserBottomRouteList,
} from '../../list/BottomTabsRouteList';
import {useSelector} from 'react-redux';
import {user_roles} from '../../../../constants/Constants';

const Bottom = createBottomTabNavigator();

const bottomConfig: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
};

const CustomBottom = (props: BottomTabBarProps) => {
  return <CustomBottomComponent {...props} />;
};

const MyBottom = () => {
  const {tk, type} = useSelector((state: any) => state.tk);

  const renderList =
    tk && type !== user_roles.user ? UserBottomRouteList : MedicalStack;

  return (
    <Bottom.Navigator screenOptions={{...bottomConfig}} tabBar={CustomBottom}>
      {renderList.map(item => (
        <Bottom.Screen
          key={item?.name}
          component={item.components}
          name={item?.name}
          initialParams={{title: item.config?.title}}
        />
      ))}
    </Bottom.Navigator>
  );
};

export default MyBottom;
