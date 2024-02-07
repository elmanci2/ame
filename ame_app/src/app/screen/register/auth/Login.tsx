import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../../components/custom/CustomScreen';
import {DowIndicator} from '../../../components/custom/DowIndicator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyText} from '../../../components/custom/MyText';
import {colors} from '../../../../constants/Constants';
import Logo from '../../../components/custom/Logo';
import MyInput from '../../../components/custom/MyInput';
import NextBottomRegister from '../components/NextBottomRegister';
import {usePost} from '../../../hook/http/usePost';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import LoadModalScreen from '../../LoadModalScreen';
import {useDispatch} from 'react-redux';
import {addTk, addType} from '../../../redux/tokenSlice';

const text_props: any = {
  textAlign: 'center',
  fontSize: 17,
  fontWeight: '500',
};

const Login = () => {
  const Dispatcher = useDispatch();

  const [info, setInfo] = useState<any>({
    email: null,
    Password: null,
  });

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email);
  const active = info.Password !== null && info.Password !== '' && isValidEmail;

  const postData = {
    email: info.email,
    password: info.Password,
  };

  const {data, loading, postRequest} = usePost('login', postData);

  const next = async () => {
    try {
      await postRequest();
      Dispatcher(addTk(data?.tk));
      Dispatcher(addType(data?.type));
      return null;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: error?.message,
      });
    }
  };
  return (
    <CustomScreen>
      <DowIndicator />
      <SafeAreaView>
        <View style={styles.body}>
          <Logo center />
          <MyText
            color={colors.texto_bold}
            fontSize={30}
            fontWeight="500"
            textAlign="center">
            Inicia sección
          </MyText>
        </View>
        <View style={styles.inputContainer}>
          <MyInput
            error={!isValidEmail}
            inputStyles={styles.input}
            style={styles.inputStyle}
            label="Correo electrónico"
            placeholder="Correo electrónico"
            onChangeText={e => setInfo({...info, email: e})}
            showLabel
            {...{
              textInputProps: {
                keyboardType: 'email-address',
              },
            }}
          />

          <MyInput
            inputStyles={styles.input}
            style={styles.inputStyle}
            label="Contraseña"
            placeholder="Contraseña"
            onChangeText={e => setInfo({...info, Password: e})}
            showLabel
            {...{
              textInputProps: {
                keyboardType: 'email-address',
              },
            }}
          />
        </View>

        <NextBottomRegister
          {...{
            action: next,
            active,
          }}
        />

        <View style={styles.recoveryContainer}>
          <MyText {...text_props} color={colors.texto_bold}>
            ¿Olvidaste tu contraseña?
          </MyText>

          <TouchableOpacity>
            <MyText {...text_props} color={colors.secundario}>
              Recupérala aquí.
            </MyText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? <LoadModalScreen /> : <></>}
    </CustomScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    gap: 10,
  },

  inputContainer: {
    marginTop: 30,
    gap: 30,
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

  recoveryContainer: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
  },
});
