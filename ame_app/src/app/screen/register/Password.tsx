import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {ScrollView} from 'react-native-gesture-handler';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import Logo from '../../components/custom/Logo';
import MyInput from '../../components/custom/MyInput';
import NextBottomRegister from './components/NextBottomRegister';
import {RoutListTypeProps} from '../../types/types';
import {DowIndicator} from '../../components/custom/DowIndicator';
import LoadModalScreen from '../LoadModalScreen';
import {addInfo} from '../../redux/RegisterSlider';
import {useDispatch, useSelector} from 'react-redux';
import {usePost} from '../../hook/http/usePost';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {addTk, addType} from '../../redux/tokenSlice';

const Password = ({}: RoutListTypeProps) => {
  const [password, setPassword] = useState<any>({
    p1: null,
    p2: null,
  });
  const {type, info} = useSelector((state: any) => state.register);
  const Dispatch = useDispatch();

  const next =
    password.p1 &&
    password.p2 &&
    password.p1.length >= 8 &&
    password.p2.length >= 8 &&
    password.p1 === password.p2;

  const {data, loading, postRequest} = usePost('create-user', info);

  const add_data = () => {
    if (data?.tk) {
      Dispatch(addTk(data?.tk));
      Dispatch(addType(data?.type));
    }
  };

  const register = async () => {
    try {
      Dispatch(
        addInfo({
          password: password.p1,
          type,
        }),
      );
      await postRequest();

      add_data();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: error.message,
      });
    }
  };

  React.useEffect(() => {
    add_data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  return (
    <CustomScreen>
      <SafeAreaView>
        <DowIndicator />
        <ScrollView>
          <View style={styles.texts}>
            <Logo style={{alignSelf: 'center', marginVertical: 10}} />
            <MyText
              fontSize={26}
              fontWeight="700"
              color={colors.texto_bold}
              textAlign="center">
              Contraseña
            </MyText>

            <View>
              <MyText textAlign="center" style={{marginTop: 20}} fontSize={17}>
                Elige una contraseña{' '}
                <MyText
                  textAlign="center"
                  style={{marginTop: 20}}
                  fontSize={17}
                  fontWeight="700"
                  color={colors.secundario}>
                  segura
                </MyText>{' '}
                para tu cuenta {'\n'} como Mínimo 8 caracteres
              </MyText>
            </View>
          </View>
          <View style={{gap: 20}}>
            <MyInput
              placeholder="Contraseña"
              onChangeText={text =>
                setPassword({
                  ...password,
                  p1: text,
                })
              }
              inputStyles={styles.input}
              style={styles.inputStyle}
              label="Contraseña"
              showLabel
            />

            <MyInput
              onChangeText={text =>
                setPassword({
                  ...password,
                  p2: text,
                })
              }
              placeholder="Contraseña"
              inputStyles={styles.input}
              style={styles.inputStyle}
              label="Repetir contraseña"
              showLabel
            />
          </View>

          <NextBottomRegister
            {...{
              active: next,
              action: register,
            }}
          />
        </ScrollView>
      </SafeAreaView>
      {loading ? <LoadModalScreen /> : <></>}
    </CustomScreen>
  );
};

export default Password;

const styles = StyleSheet.create({
  texts: {
    marginVertical: 30,
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
});
