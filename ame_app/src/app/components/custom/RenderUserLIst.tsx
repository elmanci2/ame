import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {MyText} from './MyText';
import {GlobalStyle} from '../../styles/styles';
import {colors} from '../../../constants/Constants';
import {calcularEdad} from '../../util/ageColculator';
import {useDispatch} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {addPatients} from '../../redux/PatientsSlice';
import {useNavigation} from '@react-navigation/native';

type Item = {
  name: string;
  lastName: string;
  photo: null | string;
  document: number;
  documentType: string;
  date: string;
  id_usuario: string;
};

type Props = {
  data: Item[];
};
const imgDefault =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg';

export const RenderUserLIst = ({data}: Props) => {
  const Dispatcher = useDispatch();

  const navigation = useNavigation<any>();

  const action = async (item: Item) => {
    try {
      if (!item || !item.name || !item.document || !item.date) {
        throw new Error('Todos los datos del paciente son requeridos');
      }

      const edad: any = calcularEdad(item.date);

      if (isNaN(edad)) {
        throw new Error('La fecha de nacimiento no es válida');
      }

      Dispatcher(
        addPatients({
          id: item?.id_usuario,
          name: `${item.name} ${item?.lastName}`,
          photo: item.photo,
          document: `${item.documentType} ${item.document}`,
          edad,
        }),
      );

      navigation?.goBack();

      Toast.show({
        type: 'success',
        text2: "Paciente agregado correctamente.",
      });

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: error.message,
      });
    }
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => action(item)}>
            <View style={styles.imgContend}>
              <Image
                style={GlobalStyle.img}
                source={{uri: item?.photo ?? imgDefault}}
              />
            </View>

            <View style={styles.textContend}>
              <MyText
                {...{
                  fontSize: 16,
                  fontWeight: '500',
                  color: colors.texto_bold,
                }}>
                {item.name} {item.lastName}
              </MyText>

              <MyText
                {...{
                  fontSize: 14,
                  fontWeight: '500',
                  color: colors.texto_bold,
                }}>
                {item.documentType} {item?.document}
              </MyText>
              <MyText
                {...{
                  fontSize: 12,
                  fontWeight: '500',
                  color: colors.texto_bold,
                }}>
                Edad : {calcularEdad(item?.date)}
              </MyText>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.4,
    alignItems: 'center',
    paddingVertical: 5,
  },
  imgContend: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textContend: {
    gap: 5,
  },

  flatList: {
    gap: 20,
  },
});
