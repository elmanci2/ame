import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import HederComponent from '../../components/custom/HederComponent';
import GridMenu from '../../components/custom/global/GridMenu';
import {VisitorGritMenu as items} from './config/gridLayaut';
import {colors} from '../../../constants/Constants';
import {GlobalStyle} from '../../styles/styles';
import {MyText} from '../../components/custom/MyText';
import {use_Get_users_info} from '../../hook/info/use_Get_users_info';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadScreen from '../LoadScreen';
import {useFetch} from '../../hook/http/useFetch';
import {useFocusEffect} from '@react-navigation/native';
import {onShare} from '../../../function/share';
const HomeVisitorScreen = (props: any) => {
  use_Get_users_info();

  const action = () => {
    props.navigation.navigate('activo');
  };

  const {data, loading, refetch} = useFetch(
    'get_active_service_delivery_and_medical',
    'get_active_service_delivery_and_medical',
  );

  useFocusEffect(
    useCallback(() => {
      const observer = async () => {
        await refetch();
      };

      observer();
    }, [refetch]),
  );

  if (loading) {
    return <LoadScreen />;
  }

  console.log(data);

  return (
    <CustomScreen>
      <HederComponent {...props} />
      <View style={styles.body}>
        <GridMenu {...{items, color: colors.tertiary}} />

        <View style={styles.bottomContend}>
          <View style={styles.imgContend}>
            <Image
              style={GlobalStyle.img}
              source={require('./assets/img/Doctor.png')}
            />
          </View>

          <View style={styles.dialogoContainer}>
            <TouchableOpacity style={styles.dialogoContend} onPress={onShare}>
              <MyText
                color={colors.white}
                fontSize={16}
                fontWeight="500"
                textAlign="center"
                style={styles.dialogoText}>
                {'Compartir\napp'}
              </MyText>
              <Image
                style={GlobalStyle.img}
                source={require('./assets/img/dialogoBlue.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dialogoContend} onPress={onShare}>
              <MyText
                textAlign="center"
                color={colors.white}
                fontSize={16}
                fontWeight="500"
                style={styles.dialogoText}>
                {'Compartir \n app'}
              </MyText>
              <Image
                style={GlobalStyle.img}
                source={require('./assets/img/dialogoRed.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        {data?.length < 1 && (
          <View style={styles.activeBottomContainer}>
            <TouchableOpacity onPress={action} style={styles.activeBottom}>
              <MaterialCommunityIcons
                name="clipboard-text-clock-outline"
                color={colors.white}
                size={35}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </CustomScreen>
  );
};

export default HomeVisitorScreen;

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
    justifyContent: 'space-between',
    height: '95%',
  },

  imgContend: {
    height: 300,
    width: '55%',
  },
  bottomContend: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dialogoContend: {
    height: 72,
    width: 125,
    position: 'relative',
    alignItems: 'center',
  },

  dialogoContainer: {
    gap: 20,
    marginTop: 20,
  },

  dialogoText: {
    position: 'absolute',
    zIndex: 2,
    marginTop: 7,
  },

  activeBottomContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    zIndex: 100,
  },

  activeBottom: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: colors.tertiary,
    marginBottom: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
