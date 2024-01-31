import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {RoutListTypeProps, Service} from '../../types/types';
import {Title} from '../../components/custom/Title';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';

const ServicePreview = ({route}: RoutListTypeProps) => {
  const {service}: {service: Service} = route?.params;
  const {type, location, date, id} = service;
  const title =
    type === 1 ? 'Recolección de medicamentos' : 'Organización Medicamentos';

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

        <View>
          <View style={styles.View_1}>
            <MyText fontSize={15} fontWeight="500" color={colors.secundario}>
              No asignado
            </MyText>
            <MyText fontSize={15} fontWeight="300">
              {date.hora}
            </MyText>
            <MyText fontSize={15} fontWeight="300">
              {date.fecha}
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
  View_1: {flexDirection: 'row', justifyContent: 'space-evenly'},
});
