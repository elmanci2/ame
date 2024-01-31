import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import Logo from '../../components/custom/Logo';
import {SafeAreaView} from 'react-native-safe-area-context';
//@ts-ignore
import {colors} from '../../../constants/Constants';
import MyInput from '../../components/custom/MyInput';
import {MyText} from '../../components/custom/MyText';
import {RoutListTypeProps} from '../../types/types';
import NextBottomRegister from './components/NextBottomRegister';
import {useDispatch} from 'react-redux';
import {addInfo, type as types} from '../../redux/RegisterSlider';
import LoadModalScreen from '../LoadModalScreen';
import {usePost} from '../../hook/http/usePost';
import Toast from '../../components/custom/Toas';
import PhoneInput from '../../components/custom/PhoneInput';
import {useFetch} from '../../hook/http/useFetch';
import LoadScreen from '../LoadScreen';
import ErrorScreen from '../ErrorScreen';
import {useWifi} from '../../hook/network/useWifi';
import ErrorWifi from '../ErrorWifi';

const RegisterHome = ({route, navigation}: RoutListTypeProps) => {
  const {type, select} = route?.params ?? {};
  const Dispatch = useDispatch();
  const toastRef = useRef();

  const {isConnected} = useWifi();

  const {
    data: countries,
    loading: load,
    error: errorCo,
    refetch,
  } = useFetch('get-countries', 'get-countries');

  const [info, setInfo] = useState<any>({
    email: null,
    lastName: null,
    name: null,
    phoneNumber: null,
  });

  const postData = {email: info.email, phoneNumber: info.phoneNumber};
  const {error, loading, postRequest, data} = usePost(
    'email_validate',
    postData,
  );
  const phoneNumber: any = Number(info.phoneNumber);

  const validateNumber = /^\d+$/.test(phoneNumber);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email);
  const active =
    (isValidEmail && validateNumber && info.name !== null) ||
    ('' && info.lastName !== null) ||
    '';

  useEffect(() => {
    Dispatch(types(type));
  }, []);

  const next = async () => {
    if (active) {
      try {
        await postRequest();
        if (data.success) {
          Dispatch(addInfo(info));
          navigation.navigate('otp_phone', {phone: info.phoneNumber});
        } else {
          //@ts-ignore
          toastRef.current.show({
            type: 'error',
            text: 'Error',
            message: data.error,
          });
        }
      } catch (error: any) {
        //@ts-ignore
        /*  toastRef.current.show({
          type: 'error',
          text: 'Error',
          message: error.message,
        }); */
      }
    }

    return;
  };

console.log(data);

  
  if (load) {
    return <LoadScreen />;
  } else if (errorCo) {
    return <ErrorScreen reload={refetch} />;
  } else if (!isConnected) {
    return <ErrorWifi />;
  }

  return (
    <CustomScreen>
      <SafeAreaView style={styles.body}>
        <Toast ref={toastRef} />
        <ScrollView>
          <Logo style={styles.logo} />
          <View style={styles.textContainer}>
            <MyText
              style={{alignSelf: 'center'}}
              fontSize={30}
              fontWeight="700"
              color={colors.icon}>
              REGISTRAR
            </MyText>
            <MyText
              style={{alignSelf: 'center'}}
              fontSize={20}
              fontWeight="500"
              color={colors.secundario}>
              {type}
            </MyText>
          </View>
          <View style={styles.inputContainer}>
            <MyInput
              inputStyles={styles.input}
              style={styles.inputStyle}
              label="Nombre"
              showLabel
              onChangeText={e => setInfo({...info, name: e})}
            />
            <MyInput
              inputStyles={styles.input}
              style={styles.inputStyle}
              label="Apellido"
              showLabel
              onChangeText={e => setInfo({...info, lasName: e})}
            />
            <MyInput
              error={!isValidEmail}
              inputStyles={styles.input}
              style={styles.inputStyle}
              label="Correo electrónico"
              onChangeText={e => setInfo({...info, email: e})}
              showLabel
              {...{
                textInputProps: {
                  keyboardType: 'email-address',
                },
              }}
            />

            <PhoneInput
              error={!validateNumber}
              data={countries?.countries as any}
              value={select && select}
              onChangeText={e => setInfo({...info, phoneNumber: e})}
            />
          </View>
          <NextBottomRegister
            {...{
              action: next,
              active,
            }}
          />
        </ScrollView>
      </SafeAreaView>

      {loading ? <LoadModalScreen /> : <></>}
    </CustomScreen>
  );
};

export default RegisterHome;

const styles = StyleSheet.create({
  body: {
    paddingBottom: 20,
  },
  logo: {
    alignSelf: 'center',
  },
  textContainer: {
    marginTop: 10,
    gap: 10,
  },
  inputContainer: {
    marginTop: 50,
    gap: 20,
  },
  input: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.texto_ling,
  },
  inputStyle: {
    width: '90%',
    gap: 5,
  },
  btnContainer: {
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
  },
});
