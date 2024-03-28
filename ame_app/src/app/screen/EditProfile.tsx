import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';
import MyInput from '../components/custom/MyInput';
import {colors} from '../../constants/Constants';
import {Title} from '../components/custom/Title';
import NextBottomRegister from './register/components/NextBottomRegister';
import {MyText} from '../components/custom/MyText';
import {ImagePiker} from '../components/custom/ImagePiker';
import {useUploadFile} from '../hook/http/useUploadFile';
import LoadScreen from './LoadScreen';
import Toast from 'react-native-toast-message';

interface ProfileData {
  name: string;
  lastName: string;
  address: string;
  barrio: string;
  photo?: string;
}

type EditProfileProps = {
  route: {
    params: {
      data: ProfileData;
    };
  };

  navigation: any;
};

const EditProfile = ({
  route: {
    params: {data},
  },
  navigation,
}: EditProfileProps) => {
  const [info, setInfo] = useState({...data});
  const [loading, setLoading] = useState(false);

  const [Photo, setPhoto] = useState({
    uri: null,
    data: {},
  });

  const {Upload_file} = useUploadFile('update-user-info', Photo.data, info);

  const action = async () => {
    setLoading(true);
    try {
      const newDate = await Upload_file();

      if (newDate) {
        Toast.show({
          type: 'success',
          text2: 'Información actualizada',
        });
      }
      setLoading(false);
      navigation.navigate('home', {
        replace: true,
      });
    } catch (error: any) {
      console.log(error);

      Toast.show({
        type: 'error',
        text2: 'Error al actualizar tu información ',
      });
    }
  };

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <CustomScreen>
      <DowIndicator />
      <Title
        {...{
          title: 'Editar perfil',
          styles: {
            marginVertical: 30,
          },
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* photo */}

          <View style={styles.photoContend}>
            <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
              Foto
            </MyText>

            <ImagePiker
              iconSize={100}
              Styles={styles.photoContainer}
              resultDate={data =>
                setPhoto({
                  ...Photo,
                  data,
                })
              }
            />
            {/*        <TouchableOpacity style={styles.photoContainer}>
              <Entypo name="plus" color={colors.tertiary} size={50} />
            </TouchableOpacity> */}
          </View>

          {/* text info  */}
          <MyInput
            value={info.name}
            placeholder="Nombre"
            inputStyles={styles.input}
            style={styles.inputStyle}
            label="Nombre"
            onChangeText={e => setInfo({...info, name: e})}
            showLabel
            {...{
              textInputProps: {
                keyboardType: 'default',
              },
            }}
          />
          <MyInput
            value={info.lastName}
            placeholder="Apellido"
            inputStyles={styles.input}
            style={styles.inputStyle}
            label="Apellido"
            onChangeText={e => setInfo({...info, lastName: e})}
            showLabel
            {...{
              textInputProps: {
                keyboardType: 'default',
              },
            }}
          />

          <MyInput
            placeholder="Domicilio"
            inputStyles={styles.input}
            style={styles.inputStyle}
            value={info.address}
            label="Domicilio"
            onChangeText={e => setInfo({...info, address: e})}
            showLabel
            {...{
              textInputProps: {
                keyboardType: 'default',
              },
            }}
          />

          <MyInput
            placeholder="Barrio / comuna"
            inputStyles={styles.input}
            style={styles.inputStyle}
            label="Barrio / comuna"
            value={info.barrio}
            onChangeText={e => setInfo({...info, barrio: e})}
            showLabel
            {...{
              textInputProps: {
                keyboardType: 'default',
              },
            }}
          />

          <View>
            <NextBottomRegister {...{action, text: 'Editar', active: true}} />
          </View>
        </View>
      </ScrollView>
    </CustomScreen>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.texto_ling,
  },
  inputStyle: {
    width: '100%',
    gap: 5,
  },

  container: {
    paddingHorizontal: 20,
    gap: 20,
  },

  scrollView: {
    flex: 1,
  },

  photoContainer: {
    width: 150,
    height: 150,
    borderColor: colors.tertiary,
    borderWidth: 2,
    borderRadius: 7,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },

  photoContend: {},
});
