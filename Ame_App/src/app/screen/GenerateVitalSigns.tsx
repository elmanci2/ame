import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {RoutListTypeProps} from '../types/types';
import {Title} from '../components/custom/Title';
import {DowIndicator} from '../components/custom/DowIndicator';
import {MyText} from '../components/custom/MyText';
import {colors} from '../../constants/Constants';
import MyInput from '../components/custom/MyInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionBottom from '../components/custom/ActionBottom';
import {useDispatch} from 'react-redux';
import {addSigne} from '../redux/VitalsigneSlice';

const GenerateVitalSigns = ({route, navigation}: RoutListTypeProps) => {
  const [setsignos, setSetsignos] = useState({
    presion: {en: '', sobre: ''},
    Ritmo_cardiaco: '',
    azucar: '',
    peso: '',
  });

  const dispatch = useDispatch();

  const {title} = route?.params;

  const go = () => {
    dispatch(addSigne(setsignos));
    navigation.goBack();
  };

  const activeBottom =
    setsignos.azucar !== '' &&
    setsignos.peso !== '' &&
    setsignos.Ritmo_cardiaco !== '' &&
    setsignos.presion.en !== '' &&
    setsignos.presion.sobre !== '';

  return (
    <CustomScreen>
      <DowIndicator />
      <Title {...{title, styles: styles.title}} />
      <ScrollView style={styles.container}>
        <View style={styles.item}>
          <MyText fontSize={18} color={colors.icon} fontWeight="600">
            Ritmo cardíaco
          </MyText>
          <MyInput
            style={styles.input}
            {...{
              onChangeText(e) {
                setSetsignos({
                  ...setsignos,
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
                  setSetsignos({
                    ...setsignos,
                    presion: {
                      ...setsignos.presion,
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
                  setSetsignos({
                    ...setsignos,
                    presion: {
                      ...setsignos.presion,
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
                  setSetsignos({
                    ...setsignos,
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
                  setSetsignos({
                    ...setsignos,
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

        {activeBottom && (
          <ActionBottom
            {...{
              action: go,
              text: 'Generar',
              containerStyles: {
                width: '60%',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              },
            }}
          />
        )}
      </ScrollView>
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
