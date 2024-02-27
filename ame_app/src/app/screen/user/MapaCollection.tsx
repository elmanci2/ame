import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import Mapa from '../../components/custom/Mapa';
import {colors} from '../../../constants/Constants';
import {Title} from '../../components/custom/Title';
import {useUploadFile} from '../../hook/http/useUploadFile';
import NextBottomRegister from '../register/components/NextBottomRegister';
import {useSelector} from 'react-redux';

const MapaCollection = ({
  navigation,
  title = 'Recolección \n de medicamentos',
  route,
}: any) => {
  const [location, setLocation] = useState(null);

  const service = useSelector((state: any) => state?.service?.service);

  const {data} = route?.params;
  const {Upload_file} = useUploadFile('add-service', data?.fileDate, {
    user_location: JSON.stringify(location),
    Copago: service[0]?.Copago ?? 0,
    eps: service[0]?.eps?.value ?? null,
  });

  const action = async () => {
    try {
      await Upload_file();
      return navigation.replace('home');
    } catch (error) {}
  };

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.container}>
        <Mapa
          {...{
            onCurrenLocation(e) {
              setLocation(e);
            },
          }}
        />
        <View style={styles.footer}>
          <Title {...{title}} />
          <NextBottomRegister
            {...{
              action,
              text: 'Listo',
              active: true,
            }}
          />
        </View>
      </View>
    </CustomScreen>
  );
};

export default MapaCollection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },

  footer: {
    height: 200,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 29,
    justifyContent: 'space-evenly',
  },
});
