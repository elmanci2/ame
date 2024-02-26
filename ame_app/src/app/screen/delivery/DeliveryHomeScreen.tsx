import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import HederComponent from '../../components/custom/HederComponent';
import GridMenu from '../../components/custom/global/GridMenu';
import {colors} from '../../../constants/Constants';
import {GlobalStyle} from '../../styles/styles';
import {MyText} from '../../components/custom/MyText';
import {use_Get_users_info} from '../../hook/info/use_Get_users_info';
import {DeliveryGritMenu as items} from '../medical/config/gridLayaut';
import {onShare} from '../../../function/share';

const DeliveryHomeScreen = (props: any) => {
  use_Get_users_info('');

  return (
    <CustomScreen>
      <HederComponent {...props} />
      <View style={styles.body}>
        <GridMenu {...{items, color: colors.tertiary}} />

        <View style={styles.bottomContend}>
          <View style={styles.dialogoContainer}>
            <TouchableOpacity
              style={[styles.dialogoContend, styles.dialogo1]}
              onPress={onShare}>
              <MyText
                color={colors.white}
                fontSize={12}
                fontWeight="500"
                textAlign="center"
                style={styles.dialogoText}>
                {'Invitar \n amigos'}
              </MyText>
              <Image
                style={GlobalStyle.img}
                source={require('../../../assets/img/global/burbujaDialogo1.png')}
              />
            </TouchableOpacity>
            <View style={styles.imgContend}>
              <Image
                style={GlobalStyle.img}
                source={require('../../../assets/img/global/DelyveriPeople.png')}
              />
            </View>

            <TouchableOpacity style={styles.dialogoContend} onPress={onShare}>
              <MyText
                textAlign="center"
                color={colors.white}
                fontSize={12}
                fontWeight="500"
                style={styles.dialogoText}>
                {'Compartir \n app'}
              </MyText>
              <Image
                style={GlobalStyle.img}
                source={require('../../../assets/img/global/burbujaDialogo2.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomScreen>
  );
};

export default DeliveryHomeScreen;
const styles = StyleSheet.create({
  body: {
    marginTop: 20,
    justifyContent: 'space-between',
    height: '95%',
  },

  imgContend: {
    height: 289,
    width: '50%',
    marginLeft: -30,
  },
  bottomContend: {},
  dialogoContend: {
    height: 58,
    width: 100,
    position: 'relative',
    alignItems: 'center',
  },

  dialogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },

  dialogoText: {
    position: 'absolute',
    zIndex: 2,
    marginTop: 7,
  },

  dialogo1: {
    marginTop: 60,
  },
});
