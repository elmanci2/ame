import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {RoutListTypeProps, Service} from '../../types/types';
import {Title} from '../../components/custom/Title';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import {convertirHora12h, obtenerFecha} from '../../util/Tiem';

const ServicePreview = ({route}: RoutListTypeProps) => {
  const {service}: {service: Service} = route?.params;
  const {type, location, date, id, createdAt, status} = service;
  const title =
    type === 1 ? 'Recolección de medicamentos' : 'Organización Medicamentos';

  console.log();

  return (
    <CustomScreen>
      <DowIndicator />
      <View>
        <Title
          {...{
            styles: {
              marginVertical: 20,
            },
            title,
          }}
        />

        <View style={styles.containerItem}>
          <View style={styles.View_1}>
            <MyText
              fontSize={15}
              fontWeight="500"
              color={
                status === 0 ? colors.secundario : 'rgba(0, 255, 17, 0.43)'
              }>
              {status === 0 ? 'No asignado' : 'Asignado'}
            </MyText>
            <MyText fontSize={15} fontWeight="300">
              {convertirHora12h(createdAt ?? '')}
            </MyText>
            <MyText fontSize={15} fontWeight="300">
              {obtenerFecha(createdAt ?? '')}
            </MyText>
          </View>
          {type === 1 ? (
            <View>
              <MyText>hola</MyText>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </CustomScreen>
  );
};

export default ServicePreview;

const styles = StyleSheet.create({
  View_1: {flexDirection: 'row', justifyContent: 'space-between'},
  containerItem: {
    gap: 20,
    paddingHorizontal: 15,
  },
});
