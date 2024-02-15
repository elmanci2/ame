import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import Logo from '../../components/custom/Logo';
import {RoutListTypeProps} from '../../types/types';
import {Title} from '../../components/custom/Title';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {RenderLottie} from '../../components/custom/RenderLottie';
import NextBottomRegister from '../register/components/NextBottomRegister';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {RenderPatients} from '../../components/custom/RenderPatients';
import BottomModal from '../../components/custom/BottomModal';
import DeleteModal from '../../components/custom/modal/DeleteModal';
import ActionBottom from '../../components/custom/ActionBottom';
import Feather from 'react-native-vector-icons/Feather';
import {removePatient} from '../../redux/PatientsSlice';

const GenerateSignesVisitorScreen = ({
  route,
  navigation,
}: RoutListTypeProps) => {
  const {title} = route.params;
  const animate = require('../../animation/lottie/search_info.json');

  const {patients} = useSelector((state: any) => state?.Patients);
  const [showModal, setShowModal] = useState(false);
  const [patientsId, setPatientsId] = useState(null);
  const dispatcher = useDispatch();
  const remove = () => {
    dispatcher(removePatient(patientsId));
    if (showModal) {
      setShowModal(false);
    }
  };
  const action = () => {
    navigation.navigate('SearchUser');
  };
  return (
    <CustomScreen>
      <SafeAreaView>
        <Logo center />
        <Title {...{title}} />

        <View>
          {patients?.length < 1 ? (
            <Fragment>
              <View style={styles.body}>
                <RenderLottie {...{animate, style: {height: 400}}} />
              </View>
              <MyText
                textAlign="center"
                fontWeight="500"
                fontSize={20}
                color={colors.texto_bold}>
                Aún no has agregado a ningún paciente.
              </MyText>

              <NextBottomRegister
                {...{text: 'Agregar', active: true, action}}
              />
            </Fragment>
          ) : (
            <View style={{marginTop: 20, paddingHorizontal: 10, gap: 15}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <MyText
                  fontSize={20}
                  fontWeight="500"
                  color={colors.texto_bold}>
                  Pacientes
                </MyText>

                <ActionBottom
                  action={action}
                  text="Agregar"
                  icon={<Feather name="plus" color={colors.white} size={20} />}
                />
              </View>

              <View>
                <RenderPatients
                  screen="PatientSignesPreview"
                  data={patients}
                  modal={setShowModal}
                  onSelect={(e: any) => setPatientsId(e)}
                />
              </View>
            </View>
          )}
        </View>

        <BottomModal {...{showModal, setShowModal}}>
          <DeleteModal
            remove={remove}
            cancel={() => setShowModal(false)}
            message="¿Seguro que quieres eliminarlo de tus pacientes?"
            title="Eliminar"
          />
        </BottomModal>
      </SafeAreaView>
    </CustomScreen>
  );
};

export default GenerateSignesVisitorScreen;

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
  },
});
