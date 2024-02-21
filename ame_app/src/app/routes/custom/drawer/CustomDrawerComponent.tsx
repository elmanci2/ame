import React from 'react';
import {View, StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DrawerContentScrollView,
  DrawerItem,
  useDrawerStatus,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, dimensions, user_roles} from '../../../../constants/Constants';
import UserIcon from '../../../components/custom/UserIcon';
import NotificationIcon from '../../../components/custom/NotificatinIcon';
import {Text} from 'moti';
import {useDispatch, useSelector} from 'react-redux';
import {
  deliveryDrawerLIst,
  userDrawerLIst,
  visitorDrawerLIst,
} from '../../list/DrawerRoutelist';
import {addTk} from '../../../redux/tokenSlice';
import { UserData } from '../../../types/types';

type iconProps = {
  color: string;
  size: number;
  item?: (typeof userDrawerLIst)[0];
};

const IconsItemDrawer = ({color, size, item}: iconProps) => {
  return (
    <Ionicons
      name={item?.icon ?? 'log-out-outline'}
      size={size}
      color={color}
    />
  );
};

const CustomDrawerItem = (props: DrawerContentComponentProps) => {
  // active item
  const {type} = useSelector((state: any) => state.tk);

  const dispatcher = useDispatch();

  const activeItem = props.state.routes[props.state.index].name;

  const renderDrawerList =
    type === user_roles.user
      ? userDrawerLIst
      : user_roles.visitor
      ? visitorDrawerLIst
      : deliveryDrawerLIst;

  return (
    <View style={styles.itemListContainer}>
      {renderDrawerList.map((item, index) => (
        <View style={styles.itemListContend} key={index}>
          {activeItem === item.action && <View style={styles.activeDrawer} />}
          <DrawerItem
            pressColor={colors.primary}
            activeTintColor={colors.tertiary}
            activeBackgroundColor={colors.primary}
            inactiveBackgroundColor={colors.primary}
            focused={activeItem === item.action}
            key={index}
            label={item.label}
            icon={({color, size}) => IconsItemDrawer({color, size, item})}
            onPress={() => {
              props.navigation.navigate(item.action);
              setTimeout(() => {
                props.navigation.closeDrawer();
              }, 700);
            }}
          />
        </View>
      ))}

      <DrawerItem
        label="Salir"
        icon={({color, size}) => IconsItemDrawer({color, size})}
        onPress={() => dispatcher(addTk(undefined as any))}
      />
    </View>
  );
};

export const CustomDrawerComponent = (
  props: DrawerContentComponentProps,
  {user_type}: {user_type: string},
) => {
  const stateDrawer = useDrawerStatus();
  const isOpen = stateDrawer === 'open';
  const  {name }:UserData = useSelector((state:any) => state?.Info?.info)
  const stylesOpe = {width: isOpen ? dimensions.width - 30 : dimensions.width};
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, stylesOpe]}>
        <View style={styles.userContainer}>
          <UserIcon width={40} height={40} />
          <View>
            <Text style={[styles.text, styles.hola]}>Hola</Text>
            <Text style={[styles.text, styles.name]}>{name}</Text>
          </View>
        </View>
        {isOpen && <NotificationIcon />}
      </View>

      <DrawerContentScrollView
        {...props}
        style={styles.DrawerItemContad}
        showsVerticalScrollIndicator={false}>
        <CustomDrawerItem {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingLeft: 10,
    paddingVertical: 10,
  },

  header: {
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // drawer styles
  DrawerItemContad: {
    flex: 1,
    height: '100%',
    paddingTop: 50,
  },

  itemListContainer: {
    gap: 20,
  },

  //  active drawer indicator

  activeDrawer: {
    width: 5,
    height: 16,
    alignSelf: 'flex-start',
    backgroundColor: colors.tertiary,
    borderRadius: 8,
    position: 'absolute',
    marginTop: 18,
  },

  itemListContend: {
    position: 'relative',
    width: '100%',
    justifyContent: 'space-between',
  },

  // user

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    color: colors.texto_ling,
  },

  hola: {
    color: colors.texto_bold,
    fontWeight: '700',
  },
  name: {
    fontWeight: '500',
  },
});
