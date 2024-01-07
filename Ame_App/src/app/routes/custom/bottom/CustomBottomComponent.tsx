import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {colors} from '../../../../constants/Constants';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MotiView} from 'moti';

// Objeto para mapear los íconos directamente
const iconMap = {
  Inicio: {component: Feather, name: 'home'},
  Medicamentos: {component: Fontisto, name: 'pills'},
  Servicios: {component: Ionicons, name: 'notifications-outline'},
  default: {component: MaterialIcons, name: 'timeline'},
};

// CustomIcon component para manejar íconos personalizados con colores dinámicos
const CustomIcon = memo(({IconComponent, name, size = 22, color}: any) => {
  const Icon = IconComponent || AntDesign; // Usa AntDesign como predeterminado si no se proporciona un componente específico
  return <Icon name={name} size={size} color={color} />;
});

export const CustomBottomComponent = memo(
  ({state, navigation}: BottomTabBarProps) => {
    return (
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const itemColor = focused ? colors.white : colors.tertiary;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const {component: IconComponent, name} =
            //@ts-ignore
            iconMap[route.name] || iconMap.default;

          return (
            <TouchableOpacity
              onPress={onPress}
              style={styles.tabItem}
              key={route.name}>
              {focused && (
                <MotiView
                  from={{scale: 0.5}}
                  animate={{scale: 1}}
                  transition={{type: 'timing', duration: 300}}
                  style={styles.animation}
                />
              )}
              {/* Utiliza el componente CustomIcon y pasa el color como prop */}
              <CustomIcon
                IconComponent={IconComponent}
                name={name}
                size={22}
                color={itemColor}
              />

              {focused && (
                <Text style={[{color: itemColor}, styles.tabBarText]}>
                  {route.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tabBarText: {
    fontSize: 13,
    letterSpacing: 1,
    fontWeight: '700',
  },

  animation: {
    height: '100%',
    width: '140%',
    backgroundColor: colors.tertiary,
    position: 'absolute',
    paddingVertical: 10,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: '-20%', // Adjust the marginLeft to center the animation
  },
});
