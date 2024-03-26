import {StyleSheet, FlatList, View} from 'react-native';
import React, {Fragment} from 'react';
import CustomScreen from '../../../custom/CustomScreen';
import {Title} from '../../../custom/Title';
import RowsItem from '../../../custom/RowsItem';
import {colors} from '../../../../../constants/Constants';
import LottieView from 'lottie-react-native';
import {MyText} from '../../../custom/MyText';

type ParamsDate = {
  title: string;
  type: string;
  fecha: Date;
  id: number;
};

type ParamsDataItems = {
  solicitado: ParamsDate[];
  realzados: ParamsDate[];
  cancelados: ParamsDate[];
  reclamacion: ParamsDate[];
};

interface Params {
  name: string;
  data: ParamsDataItems;
}

const RenderServices = ({route}: any) => {
  const {data, name: title}: Params = route.params;

  const color =
    title === 'Cancelados' || title === 'Reclamación'
      ? colors.secundario
      : colors.tertiary;

  return (
    <CustomScreen>
      <Title
        {...{
          color,
          title,
          textAlign: 'left',
          styles: styles.title,
        }}
      />

      <View style={{flex: 1}}>
        <FlatList
          {...{
            style: {
              flex: 1,
            },
          }}
          contentContainerStyle={styles.containerFlatLit}
          data={data.cancelados}
          renderItem={({item, index}) => {
            console.log(item);

            return (
              <RowsItem
                key={index}
                {...{text: item.title, route: 'BillPreview'}}
              />
            );
          }}
        />
      </View>

      {/* render list */}
      {/* 
      {title ? (
        <Fragment>
          <LottieView
            style={styles.lottie}
            autoPlay
            loop
            source={require('../../../../animation/lottie/doctor1.json')}
          />
          <MyText
            {...{
              style: {
                marginTop: -70,
              },
            }}
            textAlign="center"
            fontWeight="600"
            fontSize={20}
            color={colors.texto_ling}>
            No hay nada que mostrar
          </MyText>
        </Fragment>
      ) : (
        <FlatList
          {...{
            style: {
              flex: 1,
            },
          }}
          contentContainerStyle={styles.containerFlatLit}
          data={data.cancelados}
          renderItem={({item, index}) => {
            console.log(item);

            return (
              <RowsItem
                key={index}
                {...{text: item.title, route: 'BillPreview'}}
              />
            );
          }}
        />
      )} */}
    </CustomScreen>
  );
};

export default RenderServices;

const styles = StyleSheet.create({
  title: {paddingLeft: 10, marginVertical: 12},
  containerFlatLit: {
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  lottie: {width: 500, height: 500, alignSelf: 'center'},
});
