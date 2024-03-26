import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {colors} from '../../../constants/Constants';
import {MyText} from '../../components/custom/MyText';
import NextBottomRegister from './components/NextBottomRegister';
import {RoutListTypeProps} from '../../types/types';
import {getOtpNumber} from '../../util/otp';
import {usePost} from '../../hook/http/usePost';
import useSecondCounter from '../../hook/useMinuteCounter';

const ValidatePhone = ({route, navigation}: RoutListTypeProps) => {
  const {phone} = route?.params ?? {};

  const firstInput = useRef<any>();
  const secondInput = useRef<any>();
  const thirdInput = useRef<any>();
  const fourthInput = useRef<any>();
  const [otp, setOtp] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
  });
  const {data, loading, postRequest} = usePost('otp', {phone: `+57${phone}`});
  const active = !loading && getOtpNumber(otp) === Number(data?.otp);
  /*   const {seconds, isFinished} = useSecondCounter(10, () => {
    console.log('Timer has ended');
  }); */

  useEffect(() => {
    postRequest();
  }, []);

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.container}>
        <View style={styles.texts}>
          <MyText
            fontSize={26}
            fontWeight="700"
            color={colors.texto_bold}
            textAlign="center">
            Verifica tú {'\n'} número telefónico
          </MyText>

          <View>
            <MyText textAlign="center" style={{marginTop: 20}} fontSize={17}>
              Hemos enviado un código al siguiente número telefónico:{' '}
              <MyText fontSize={14} fontWeight="900" color={colors.secundario}>
                {phone}
              </MyText>
            </MyText>
          </View>
        </View>
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              autoFocus
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={text => {
                setOtp({...otp, digit1: text});
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={text => {
                setOtp({...otp, digit2: text});
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={text => {
                setOtp({...otp, digit3: text});
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={text => {
                setOtp({...otp, digit4: text});
                !text && thirdInput.current.focus();
              }}
            />
          </View>
        </View>
        {/* 
        <View style={styles.getNewOtpText}>
          <MyText fontSize={17} fontWeight="500" color={colors.texto_bold}>
            Se reenviará en:
            <MyText color={colors.secundario} fontSize={17} fontWeight="500">
              {' '}
              {seconds}
            </MyText>{' '}
            segundos
          </MyText>
        </View> */}

        <NextBottomRegister
          active={active}
          action={() => navigation.replace('register_location')}
        />
      </View>
    </CustomScreen>
  );
};

export default ValidatePhone;

const styles = StyleSheet.create({
  container: {
    gap: 50,
    flex: 1,
  },
  otpContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: colors.icon,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  otpText: {
    fontSize: 25,
    color: colors.icon,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  texts: {
    marginVertical: 30,
  },

  getNewOtpText: {
    alignSelf: 'center',
  },
});
