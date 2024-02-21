import React, {useState} from 'react';
import HederComponent from '../../components/custom/HederComponent';
import CustomScreen from '../../components/custom/CustomScreen';
import GridMenu from '../../components/custom/global/GridMenu';
import {UserHomeGridArray as items} from './config/grid/gridArrays';
import RenderPill from '../../components/screen/users/home/RenderPill';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, dimensions} from '../../../constants/Constants';
import {MyText} from '../../components/custom/MyText';
import {FlatList} from 'react-native-gesture-handler';
import {Service} from '../../types/types';
import {Title} from '../../components/custom/Title';
import BottomModal from '../../components/custom/BottomModal';
import {CloseBottom} from '../../components/custom/CloseBottom';
import Feather from 'react-native-vector-icons/Feather';
import DeleteModal from '../../components/custom/modal/DeleteModal';
import useServices from '../../hook/services/useServices';
import {use_Get_users_info} from '../../hook/info/use_Get_users_info';

const UserHomeScreen = (props: any) => {
  const service: [] = useSelector((state: any) => state.service.service);
  use_Get_users_info('');

  const {remove} = useServices();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectId, setSelectId] = useState('0');

  return (
    <CustomScreen>
      <HederComponent {...props} />
      <View style={[styles.styles, service.length < 1 && styles.service]}>
        {service.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.serviceContainer}
            onPress={() => setShowModal(true)}>
            <Title
              {...{
                title: 'Servicios activos ',
                textAlign: 'left',
                myTextProps: {
                  fontSize: 18,
                },
              }}
            />
            <FlatList
              data={[service[0]]}
              renderItem={({item}: {item: Service}) => (
                <View style={styles.serviceContainerItem}>
                  <MyText fontSize={16} color={colors.texto_ling}>
                    {item.type === 1
                      ? 'Recolección de medicamentos'
                      : 'Organización Medicamentos'}
                  </MyText>
                  <MyText fontSize={14} color={colors.icon}>
                    {item.date.hora}
                  </MyText>
                </View>
              )}
            />
          </TouchableOpacity>
        )}

        <GridMenu {...{items}} />
        <RenderPill />
      </View>
      <BottomModal {...{setShowModal, showModal}}>
        <View
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderTopRightRadius: 14,
            borderTopLeftRadius: 14,
            maxHeight: dimensions.height / 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Title
              {...{
                title: 'Servicios activos ',
                textAlign: 'left',
                myTextProps: {
                  fontSize: 18,
                },
              }}
            />
            <CloseBottom onPress={() => setShowModal(false)} />
          </View>
          <FlatList
            contentContainerStyle={{gap: 13}}
            data={service}
            renderItem={({item}: {item: Service}) => (
              <TouchableOpacity
                style={styles.serviceContainerItem}
                onPress={() => {
                  setShowModal(false);
                  props.navigation.navigate('ServicePreview', {service: item});
                }}>
                <View style={{gap: 10}}>
                  <MyText fontSize={16} color={colors.texto_ling}>
                    {item.type === 1
                      ? 'Recolección de medicamentos'
                      : 'Organización Medicamentos'}
                  </MyText>
                  <MyText fontSize={14} color={colors.icon}>
                    {item.date.hora}
                  </MyText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectId(item.id);
                    setShowModal2(true);
                  }}>
                  <Feather name="more-vertical" size={25} color={colors.icon} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomModal>

      <BottomModal {...{setShowModal: setShowModal2, showModal: showModal2}}>
        <DeleteModal
          {...{
            remove() {
              remove(selectId);
            },
            cancel() {
              setShowModal2(false);
            },
            title: 'Cancelar servicio',
            message: 'seguro de que quiere cancelar ?',
          }}
        />
      </BottomModal>
    </CustomScreen>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  service: {justifyContent: 'flex-end', marginBottom: -40},
  styles: {
    flex: 1,
    gap: 30,
    marginTop: 20,
  },

  serviceContainer: {
    width: '88%',
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: colors.icon,
    marginHorizontal: 30,
    alignSelf: 'center',
    padding: 10,
    gap: 10,
  },

  serviceContainerItem: {
    padding: 5,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
