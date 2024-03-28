import {ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {ImagePiker} from '../../components/custom/ImagePiker';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import DropDownElement from '../../components/custom/DropDown/DropDownElement';
import {RoutListTypeProps} from '../../types/types';
import YesNoComponent from '../../components/custom/YesNoComponent';
import MyInput from '../../components/custom/MyInput';
import ActionBottom from '../../components/custom/ActionBottom';
import useServices from '../../hook/services/useServices';
import {useFetch} from '../../hook/http/useFetch';
import LoadScreen from '../LoadScreen';
import ErrorScreen from '../error/ErrorScreen';

const MedicationCollection = ({route, navigation}: RoutListTypeProps) => {
  const {add} = useServices();
  const {select} = route.params;
  const [photo, setPhoto] = useState<undefined | string>();
  const [coPago, setCoPago] = useState(false);
  const [fileDate, setFileDate] = useState();

  const {data: items, loading, error, refetch} = useFetch('get_eps', 'get_eps');

  const [coPagoValue, setCoPagoValue] = useState(0);

  console.log(items);

  if (loading) {
    return <LoadScreen />;
  } else if (error) {
    return <ErrorScreen reload={refetch} />;
  }

  return (
    <CustomScreen>
      <ScrollView style={styles.container}>
        <MyText fontSize={17} fontWeight="600" color={colors.texto_ling}>
          Adjuntar formula médica
        </MyText>
        <ImagePiker
          onChangeImage={uri => setPhoto(uri)}
          resultDate={data => setFileDate(data)}
        />
        <MyText
          fontSize={17}
          fontWeight="600"
          color={colors.texto_ling}
          {...{
            style: {
              marginTop: 20,
            },
          }}>
          EPS
        </MyText>
        <DropDownElement
          {...{
            data: items?.eps,
            value: select?.label,
            screen: 'MedicationCollection',
            placeholder: 'EPS',
          }}
        />
        <MyText
          fontSize={17}
          fontWeight="600"
          color={colors.tertiary}
          {...{
            style: {
              marginTop: 20,
            },
          }}>
          {'¿Requiere pago de copago \n o cuota moderadora?'}
        </MyText>
        <YesNoComponent oneSleet={e => setCoPago(e)} />

        {coPago && (
          <MyInput
            {...{
              style: {width: '100%'},
              placeholder: 'Valor',
              textInputProps: {
                keyboardType: 'numeric',
              },
              onChangeText(e) {
                setCoPagoValue(Number(e));
              },
            }}
          />
        )}

        {photo && select && (
          <ActionBottom
            {...{
              action() {
                add({
                  Copago: coPagoValue,
                  eps: select,
                });
                navigation.navigate('MapaCollection', {
                  data: {
                    fileDate,
                  },
                });
                return;
              },
              containerStyles: {
                marginTop: 20,
                width: '100%',
                justifyContent: 'center',
              },
              text: 'Ver mapa',
            }}
          />
        )}
      </ScrollView>
    </CustomScreen>
  );
};

export default MedicationCollection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
    flex: 1,
    paddingBottom: 20,
  },
});
