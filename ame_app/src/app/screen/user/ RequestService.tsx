import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {Title} from '../../components/custom/Title';
import {RoutListTypeProps} from '../../types/types';
import {View} from 'moti';
import {MyText} from '../../components/custom/MyText';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../constants/Constants';
import Logo from '../../components/custom/Logo';

export default function RequestService({route, navigation}: RoutListTypeProps) {
  const {title} = route.params;

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //@ts-ignore
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
     
    }
  }

  React.useEffect(() => {
    requestLocationPermission()
  }, []);

  const go = (route: any) => {
    navigation.navigate(route);
  };

  return (
    <CustomScreen>
      <View style={styles.logo}>
        <Logo />
      </View>
      <Title {...{title}} />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => go('MedicationCollection')}>
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../../assets/img/global/reclamacion.png')}
            />
          </View>

          <MyText fontWeight="700" fontSize={18} color={colors.icon}>
            {'Recolección \nMedicamentos'}
          </MyText>

          <Entypo name="chevron-right" color={colors.tertiary} size={50} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => go('ClaimMedication')}>
          <View style={styles.imgContainer1}>
            <View style={styles.img1}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../../assets/img/global/medicine1.png')}
              />
            </View>
            <View style={styles.img1}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../../assets/img/global/medicine2.png')}
              />
            </View>
          </View>

          <MyText fontWeight="700" fontSize={18} color={colors.icon}>
            {'Organización \nMedicamentos'}
          </MyText>

          <Entypo name="chevron-right" color={colors.tertiary} size={50} />
        </TouchableOpacity>
      </View>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  container: {
    paddingHorizontal: 10,
    marginTop: 40,
    gap: 40,
  },
  imgContainer: {
    width: 50,
    height: 80,
  },

  img: {
    width: '100%',
    height: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: 10,
  },

  img1: {
    width: 40,
    height: 80,
  },
  imgContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
