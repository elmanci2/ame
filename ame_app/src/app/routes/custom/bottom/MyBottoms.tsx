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
  DeliveryRouteLIst,
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
  console.log(type);

  const renderList =
    tk && type === user_roles.user
      ? UserBottomRouteList
      : type === user_roles.visitor
      ? MedicalStack
      : DeliveryRouteLIst;

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
