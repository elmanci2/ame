import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import {FlatList} from 'react-native-gesture-handler';
import RegisterTypeCard from '../../components/screen/register/RegisterTypeCard';

const registerList = [
  {
    title: 'Usuario',
    description:
      'Regístrate como usuario para solicitar medicamentos y acceder a visitas personalizadas con un especialista.',
    img: require('../../../assets/img/register/patient.png'),
  },
  {
    title: 'Repartidor',
    description: 'Gana dinero recolectando y entregando medicamentos.',
    img: require('../../../assets/img/register/Messenger.png'),
  },
  {
    title: 'Visitante',
    description:
      'Gana dinero visitando y recolectando medicamentos para los usuarios.',
    img: require('../../../assets/img/register/Medicine.png'),
  },
];

const PreRegister = () => {
  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.body}>
        <View>
          <MyText
            fontWeight="700"
            fontSize={25}
            color={colors.tertiary}
            textAlign="center"
            {...{style: {marginTop: 20}}}>
            ¿Registrar cómo?
          </MyText>
          <MyText
            fontWeight="500"
            fontSize={15}
            color={colors.texto_ling}
            textAlign="center"
            {...{style: {marginTop: 10}}}>
            Como te gustaría registrarte en Ame App
          </MyText>
        </View>

        <FlatList
          contentContainerStyle={{marginHorizontal: 10, gap: 15}}
          data={registerList}
          renderItem={({item: {title, description, img}}) => (
            <RegisterTypeCard {...{title, description, img}} />
          )}
        />
      </View>
    </CustomScreen>
  );
};

export default PreRegister;

const styles = StyleSheet.create({
  body: {
    gap: 50,
    justifyContent: 'center',
    flex: 1,
  },
});
