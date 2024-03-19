import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import NextBottomRegister from './register/components/NextBottomRegister';
import {ImagePiker} from '../components/custom/ImagePiker';
import {Title} from '../components/custom/Title';
import Logo from '../components/custom/Logo';
import {usePost} from '../hook/http/usePost';

const CompleteServiceDelivery = ({service, reloading}: any) => {
  const [photo, setPhoto] = useState('');
  const [FileDate, setFileDate] = useState();

  const {postRequest} = usePost('confirme-Service_delivery-adn_medica', {
    id: service.id,
  });

  async function action() {
    await postRequest();
    reloading && (await reloading());
  }

  return (
    <CustomScreen>
      <Logo center style={styles.logo} />
      <Title title="Evidencia" />
      <View style={styles.container}>
        <ImagePiker
          onChangeImage={uri => setPhoto(uri)}
          resultDate={data => setFileDate(data)}
        />
        <NextBottomRegister
          {...{text: 'Confirmar', active: photo !== '', action}}
        />
      </View>
    </CustomScreen>
  );
};

export default CompleteServiceDelivery;

const styles = StyleSheet.create({
  logo: {marginTop: 20, marginBottom: 20},
  container: {
    gap: 30,
  },
});
