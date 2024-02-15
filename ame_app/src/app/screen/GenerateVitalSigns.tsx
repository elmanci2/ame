import {ScrollView, StyleSheet, View} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {RoutListTypeProps} from '../types/types';
import {Title} from '../components/custom/Title';
import {DowIndicator} from '../components/custom/DowIndicator';
import {MyText} from '../components/custom/MyText';
import {colors, user_roles} from '../../constants/Constants';
import MyInput from '../components/custom/MyInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionBottom from '../components/custom/ActionBottom';
import {useDispatch, useSelector} from 'react-redux';
import {addSigne} from '../redux/VitalsigneSlice';
import NextBottomRegister from './register/components/NextBottomRegister';
import {useFetch} from '../hook/http/useFetch';
import {usePost} from '../hook/http/usePost';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import LoadModalScreen from './LoadModalScreen';

const GenerateVitalSigns = ({route, navigation}: RoutListTypeProps) => {
  const {title, id} = route?.params ?? {};

  const {type} = useSelector((state: any) => state.tk);

  const [signos, setSignos] = useState({
    presion: {en: '', sobre: ''},
    Ritmo_cardiaco: '',
    azucar: '',
    peso: '',
  });

  const dispatch = useDispatch();

  const postData = {
    heart_rate: signos.Ritmo_cardiaco,
    blood_pressure: JSON.stringify(signos.presion),
    blood_sugar_level: signos.azucar,
    weight: signos.peso,
  };
  const {data, loading, postRequest} = usePost(
    /*  type !== user_roles.user
      ? 'user-generate-vital-sing' */
    /*  : */ `visitor-generate-vital-sing?id=${id}`,
    postData,
  );

  useEffect(() => {
    if (data?.success) {
      Toast.show({
        type: 'success',
        text1: 'correcto',
        text2: 'Signos agregados correctamente',
      });
    }

    // /
  }, [data, loading]);

  const go = async () => {
    try {
      await postRequest();

      dispatch(addSigne(signos));
      navigation.goBack();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: error?.message,
      });
    }
  };

  const activeBottom =
    signos.azucar !== '' &&
    signos.peso !== '' &&
    signos.Ritmo_cardiaco !== '' &&
    signos.presion.en !== '' &&
    signos.presion.sobre !== '';

  return (
    <CustomScreen>
      {title && (
        <Fragment>
          <DowIndicator />
          <Title {...{title, styles: styles.title}} />
        </Fragment>
      )}

      <ScrollView style={styles.container}>
        <View style={styles.item}>
          <MyText fontSize={18} color={colors.icon} fontWeight="600">
            Ritmo cardíaco
          </MyText>
          <MyInput
            style={styles.input}
            {...{
              onChangeText(e) {
                setSignos({
                  ...signos,
                  Ritmo_cardiaco: e,
                });
              },
              placeholder: 'Ritmo cardíaco',
              textInputProps: {
                keyboardType: 'numeric',
              },
            }}
          />
        </View>
        <View style={styles.item}>
          <MyText fontSize={18} color={colors.icon} fontWeight="600">
            Presión arterial
          </MyText>
          <View style={styles.grid}>
            <MyInput
              {...{
                onChangeText(e) {
                  setSignos({
                    ...signos,
                    presion: {
                      ...signos.presion,
                      sobre: e,
                    },
                  });
                },
                placeholder: 'sobre',
                textInputProps: {
                  keyboardType: 'numeric',
                },
              }}
            />
            <MaterialCommunityIcons
              name="math-integral"
              size={25}
              color={colors.icon}
            />
            <MyInput
              {...{
                onChangeText(e) {
                  setSignos({
                    ...signos,
                    presion: {
                      ...signos.presion,
                      en: e,
                    },
                  });
                },
                placeholder: 'en',
                textInputProps: {
                  keyboardType: 'numeric',
                },
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 30}}>
          <View style={styles.item}>
            <MyText fontSize={18} color={colors.icon} fontWeight="600">
              Nivel de azúcar
            </MyText>
            <MyInput
              {...{
                onChangeText(e) {
                  setSignos({
                    ...signos,
                    azucar: e,
                  });
                },
                placeholder: 'Nivel de azúcar',
                textInputProps: {
                  keyboardType: 'numeric',
                },
              }}
            />
          </View>
          <View style={styles.item}>
            <MyText fontSize={18} color={colors.icon} fontWeight="600">
              Peso
            </MyText>
            <MyInput
              {...{
                onChangeText(e) {
                  setSignos({
                    ...signos,
                    peso: e,
                  });
                },
                placeholder: 'Peso en kg',
                textInputProps: {
                  keyboardType: 'numeric',
                },
              }}
            />
          </View>
        </View>

        <NextBottomRegister
          {...{
            action: go,
            text: 'Generar',
            active: activeBottom,
          }}
        />
      </ScrollView>
      <Fragment>{loading && <LoadModalScreen />}</Fragment>
    </CustomScreen>
  );
};

export default GenerateVitalSigns;
const styles = StyleSheet.create({
  title: {
    marginVertical: 13,
  },

  container: {
    paddingHorizontal: 10,
    flex: 1,
  },

  item: {
    gap: 10,
    marginTop: 30,
  },

  input: {
    width: '100%',
  },

  grid: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
