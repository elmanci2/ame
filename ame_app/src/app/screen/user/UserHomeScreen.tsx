/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import HederComponent from '../../components/custom/HederComponent';
import CustomScreen from '../../components/custom/CustomScreen';
import GridMenu from '../../components/custom/global/GridMenu';
import {UserHomeGridArray as items} from './config/grid/gridArrays';
import RenderPill from '../../components/screen/users/home/RenderPill';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors, dimensions} from '../../../constants/Constants';
import {MyText} from '../../components/custom/MyText';
import {FlatList} from 'react-native-gesture-handler';
import {Service} from '../../types/types';
import {Title} from '../../components/custom/Title';
import BottomModal from '../../components/custom/BottomModal';
import {CloseBottom} from '../../components/custom/CloseBottom';
import Feather from 'react-native-vector-icons/Feather';
import DeleteModal from '../../components/custom/modal/DeleteModal';
import {use_Get_users_info} from '../../hook/info/use_Get_users_info';
import {useFetch} from '../../hook/http/useFetch';
import {convertirHora12h} from '../../util/Tiem';
import {usePost} from '../../hook/http/usePost';
import {useFocusEffect} from '@react-navigation/native';

const UserHomeScreen = (props: any) => {
  use_Get_users_info();

  const {data, loading, refetch} = useFetch(
    'get-active-user-services',
    'get-active-user-services',
  );

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);

  useEffect(() => {
    refetch();
  }, [showModal, refetch]);

  useFocusEffect(
    useCallback(() => {
      const observer = async () => {
        await refetch();
      };

      observer();
    }, [refetch]),
  );

  const {postRequest, loading: postLoading} = usePost('cancel-service-user', {
    id: selectId,
  });

  return (
    <CustomScreen>
      <HederComponent {...props} />
      <View style={[styles.styles, data.length < 1 && styles.service]}>
        {data.length > 0 && !loading && (
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
              data={data.slice(0, 1)}
              renderItem={({item}: {item: Service}) => (
                <View style={styles.serviceContainerItem}>
                  <MyText fontSize={16} color={colors.texto_ling}>
                    {item.type === 1
                      ? 'Recolección de medicamentos'
                      : 'Organización Medicamentos'}
                  </MyText>
                  <MyText fontSize={14} color={colors.icon}>
                    {convertirHora12h(item?.createdAt ?? '')}
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
        <View style={styles.view1}>
          <View style={styles?.view2}>
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
            data={data}
            renderItem={({item}: {item: Service}) => (
              <TouchableOpacity
                style={styles.serviceContainerItem}
                onPress={() => {
                  setShowModal(false);
                  props.navigation.navigate('ServicePreview', {service: item});
                }}>
                <View style={{gap: 10}}>
                  <MyText fontSize={16} color={colors.texto_ling}>
                    {item?.type === 1
                      ? 'Recolección de medicamentos'
                      : 'Organización Medicamentos'}
                  </MyText>
                  <MyText fontSize={14} color={colors.icon}>
                    {convertirHora12h(item?.createdAt ?? '')}
                  </MyText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectId(item?.id ?? '');
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
            loading: postLoading,
            remove: async () => {
              await postRequest();
              await refetch();
              setShowModal2(false);
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

  view1: {
    backgroundColor: colors.white,
    padding: 10,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    maxHeight: dimensions.height / 2,
  },

  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
