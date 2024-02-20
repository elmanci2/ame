import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Fragment, useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import Logo from '../../components/custom/Logo';
import {useDispatch, useSelector} from 'react-redux';
import {removePatient} from '../../redux/PatientsSlice';
import {Title} from '../../components/custom/Title';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RenderLottie} from '../../components/custom/RenderLottie';
import {MyText} from '../../components/custom/MyText';
import NextBottomRegister from '../register/components/NextBottomRegister';
import ActionBottom from '../../components/custom/ActionBottom';
import {RenderPatients} from '../../components/custom/RenderPatients';
import {colors} from '../../../constants/Constants';
import Feather from 'react-native-vector-icons/Feather';
import BottomModal from '../../components/custom/BottomModal';
import DeleteModal from '../../components/custom/modal/DeleteModal';
import {RoutListTypeProps} from '../../types/types';
import {CloseBottom} from '../../components/custom/CloseBottom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RecordatorioVisitorScreen = ({route, navigation}: RoutListTypeProps) => {
  const {title} = route.params;
  const animate = require('../../animation/lottie/search_info.json');

  const {patients} = useSelector((state: any) => state?.Patients);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [patientsId, setPatientsId] = useState(null);
  const [userName, setUserName] = useState('');
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
                  not={true}
                  Action={() => setShowModal2(true)}
                  data={patients}
                  modal={setShowModal}
                  onSelect={(e: any) => setPatientsId(e)}
                  onName={(e: string) => setUserName(e)}
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

        <BottomModal {...{showModal: showModal2, setShowModal: setShowModal2}}>
          <CloseBottom
            onPress={() => setShowModal2(false)}
            style={{marginRight: 10, marginVertical: 15}}
          />
          <View style={styles.reminderContainer}>
            <TouchableOpacity
              style={styles.reminderItem}
              onPress={() => {
                navigation.navigate('addReminder');
                setShowModal2(false);
              }}>
              <View style={styles.icon}>
                <Feather name="plus" color={'rgb(199, 225, 255)'} size={35} />
              </View>

              <MyText
                {...{
                  fontWeight: '500',
                  color: colors.texto_bold,
                  fontSize: 18,
                }}>
                Agregar recordatorio
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reminderItem}
              onPress={() => {
                navigation.navigate('UserReminderList', {
                  name: userName,
                  id: patientsId,
                });
                setShowModal2(false);
              }}>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name="format-list-checks"
                  color={'rgb(199, 225, 255)'}
                  size={35}
                />
              </View>

              <MyText
                {...{
                  fontWeight: '500',
                  color: colors.texto_bold,
                  fontSize: 18,
                }}>
                Lista de recordatorios
              </MyText>
            </TouchableOpacity>
          </View>
        </BottomModal>
      </SafeAreaView>
    </CustomScreen>
  );
};

export default RecordatorioVisitorScreen;

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
  },

  // reminder modal options

  reminderItem: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: 'rgb(213, 213, 213)',
    flexDirection: 'row',
    gap: 13,
    alignItems: 'center',
  },
  reminderContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 20,
    backgroundColor: colors.primary,
  },

  icon: {
    backgroundColor: 'rgb(105, 178, 230)',
    padding: 4,
    borderRadius: 9,
  },
});
