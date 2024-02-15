import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import HederComponent from '../../components/custom/HederComponent';
import GridMenu from '../../components/custom/global/GridMenu';
import {VisitorGritMenu as items} from './config/gridLayaut';
import {colors} from '../../../constants/Constants';
import {GlobalStyle} from '../../styles/styles';
import {MyText} from '../../components/custom/MyText';

const HomeVisitorScreen = (props: any) => {
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
            <TouchableOpacity style={styles.dialogoContend}>
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
            <TouchableOpacity style={styles.dialogoContend}>
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
});
