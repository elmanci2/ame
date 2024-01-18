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

const MedicationCollection = ({route, navigation}: RoutListTypeProps) => {
  const {select} = route.params;
  const [photo, setPhoto] = useState<undefined | string>();
  const [coPago, setCoPago] = useState(false);
  const [items] = useState([
    {
      'Tipo Administradora': 'EPS',
      value: 'EAS016',
      Nit: '890904996-1',
      label: 'Empresas Públicas de Medellín Departamento Médico',
      Aportes: ' Empresas Públicas de Medellín Departamento Médico',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EAS027',
      Nit: '800112806-2',
      label: 'Fondo de Pasivo Social de Ferrocarriles',
      Aportes: ' Fondo de Ferrocarriles Nacionales de Colombia (EPS)',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS001',
      Nit: '830113831-0',
      label: 'Aliansalud EPS',
      Aportes: ' Aliansalud EPS (Antes Colmédica)',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS002',
      Nit: '800130907-4',
      label: 'Salud Total S.A.',
      Aportes: ' Salud Total',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS005',
      Nit: '800251440-6',
      label: 'E.P.S Sanitas',
      Aportes: ' Sanitas',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS008',
      Nit: '860066942-7',
      label: 'Compensar Entidad Promotora de Salud',
      Aportes: ' Compensar',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS010',
      Nit: '800088702-2',
      label: 'EPS Sura',
      Aportes: ' EPS Sura',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS012',
      Nit: '890303093-5',
      label: 'Comfenalco Valle EPS',
      Aportes: ' Comfenalco Valle',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS017',
      Nit: '830003564-7',
      label: 'Famisanar',
      Aportes: ' Famisanar',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS018',
      Nit: '805001157-2',
      label: 'Servicio Occidental de Salud S.O.S. S.A.',
      Aportes: ' S.O.S. Servicio Occidental de Salud S.A.',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS037',
      Nit: '900156264-2',
      label: 'Nueva EPS',
      Aportes: ' Nueva E.P.S.',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS040',
      Nit: 900604350,
      label:
        'Caja de Compensación Familiar de Antioquía - Comfama - Hoy Savia Salud EPS',
      Aportes: 'Savia Salud',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS041',
      Nit: 900156264,
      label: 'Nueva EPS S.A. Movilidad',
      Aportes: 'Nueva EPS Movilidad',
    },
    {
      'Tipo Administradora': 'EPS',
      value: 'EPS042',
      Nit: '900226715-3',
      label:
        'Cooperativa de Salud y Desarrollo Integral de la Zona Sur Oriental de Cartagena Ltda. Coosalud E.S.S.',
      Aportes: 'Coosalud EPS',
    },
  ]);

  return (
    <CustomScreen>
      <ScrollView style={styles.container}>
        <MyText fontSize={17} fontWeight="600" color={colors.texto_ling}>
          Adjuntar formula médica
        </MyText>
        <ImagePiker onChangeImage={uri => setPhoto(uri)} />
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
            data: items,
            value: select?.label,
            screen: 'MedicationCollection',
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
            }}
          />
        )}

        {photo && select && (
          <ActionBottom
            {...{
              action() {
                navigation.navigate('MapaCollection');
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
