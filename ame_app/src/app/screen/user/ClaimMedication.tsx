/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import Mapa from '../../components/custom/Mapa';
import {View} from 'moti';
import {colors} from '../../../constants/Constants';
import NextBottomRegister from '../register/components/NextBottomRegister';
import {RoutListTypeProps} from '../../types/types';
import {MyText} from '../../components/custom/MyText';
import {usePost} from '../../hook/http/usePost';
import Toast from 'react-native-toast-message';
import LoadScreen from '../LoadScreen';

const ClaimMedication = ({navigation}: RoutListTypeProps) => {
  const [location, setLocation] = useState(null);

  const {loading, postRequest} = usePost('add-service', {
    type: 2,
    user_location: JSON.stringify(location),
  });

  const action = async () => {
    try {
      if (location) {
        const data = await postRequest();
        if (data) {
          navigation.replace('home');
        }
      } else {
        Toast.show({
          type: 'error',
          text2: 'No pudimos ubicarte"',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: error?.message,
      });
    }
  };

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <CustomScreen>
      <Mapa
        {...{
          onCurrenLocation(e) {
            setLocation(e);
          },
        }}
      />

      <View style={styles.bottom}>
        <MyText {...styles.title}>Solicitar servicio</MyText>
        <NextBottomRegister {...{action}} active />
      </View>
    </CustomScreen>
  );
};

export default ClaimMedication;

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
    width: '95%',
    borderRadius: 13,
    backgroundColor: colors.white,
    alignSelf: 'center',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.texto_ling,
  },
  load: {
    flex: 1,
  },
});
