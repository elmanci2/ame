import {View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import Logo from '../../components/custom/Logo';
import {Title} from '../../components/custom/Title';
import {RoutListTypeProps} from '../../types/types';
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {colors} from '../../../constants/Constants';
import GenerateVitalSigns from '../GenerateVitalSigns';
import PatientHistorySignes from './PatientHistorySignes';

const Tab = createMaterialTopTabNavigator();

const tabOption: MaterialTopTabNavigationOptions = {
  tabBarPressColor: colors.tertiary,
  tabBarIndicatorContainerStyle: {
    backgroundColor: colors.secundario,
    paddingBottom: 10,
  },
  tabBarIndicatorStyle: {backgroundColor: colors.tertiary},
  tabBarContentContainerStyle: {backgroundColor: colors.primary},
};

function MyTabs({id}: {id: string}) {
  return (
    <Tab.Navigator screenOptions={tabOption}>
      <Tab.Screen
        name="Generar"
        component={GenerateVitalSigns}
        initialParams={{id}}
      />
      <Tab.Screen
        name="Historial"
        component={PatientHistorySignes}
        initialParams={{id}}
      />
    </Tab.Navigator>
  );
}

const PatientSignesPreview = ({route}: RoutListTypeProps) => {
  const {item} = route.params ?? {};

  const {name, id} = item ?? {};

  return (
    <CustomScreen>
      <Logo center />
      <Title title={name} styles={{marginTop: 10}} />
      <View style={{flex: 1, marginTop: 10}}>
        <MyTabs {...{id}} />
      </View>
    </CustomScreen>
  );
};

export default PatientSignesPreview;
