import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import Logo from '../../components/custom/Logo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import DropDownElement from '../../components/custom/DropDown/DropDownElement';
import MyInput from '../../components/custom/MyInput';
import NextBottomRegister from './components/NextBottomRegister';
import {RoutListTypeProps} from '../../types/types';
import YesNoComponent from '../../components/custom/YesNoComponent';
import {useFetch} from '../../hook/http/useFetch';
import LoadScreen from '../LoadScreen';
import ErrorScreen from '../error/ErrorScreen';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {formatDate} from '../../util/dateFormate';
import {addInfo} from '../../redux/RegisterSlider';

const Document = ({route, navigation}: RoutListTypeProps) => {
  const selector = useSelector((state: any) => state.register.type);
  const Dispatch = useDispatch();

  const currentDate = new Date();
  const maximumDate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const {select} = route?.params;
  const [acudiente, setAcudiente] = useState(false);
  const [showDataPiker, setShowDataPiker] = useState(false);
  const [date, setDate] = useState('');
  const [info, setInfo] = useState({
    date: null,
    documentType: null,
    document: null,
  });

  const fecha = formatDate(date);

  const validateNext =
    fecha !== null ||
    (undefined &&
      info.documentType !== null &&
      info.document !== null &&
      info.document !== '');

  const handleDateChange = (event: any, selected: any) => {
    setShowDataPiker(false);
    if (selected !== undefined) {
      setDate(String(selected));
      setShowDataPiker(false);
    }
  };

  const openDate = () => {
    setShowDataPiker(prev => !prev);
  };

  //useSelector()

  const {data, error, loading, refetch} = useFetch(
    'get_document_type',
    'get_document_type',
  );

  const next = () => {
    Dispatch(addInfo({...info, documentType: select?.value, date: fecha}));
    navigation.navigate('Password', {
      acudiente: selector === 'Usuario' ? acudiente : undefined,
    });
  };

  if (loading) {
    return <LoadScreen />;
  } else if (error) {
    return <ErrorScreen reload={refetch} />;
  }

  return (
    <CustomScreen>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Logo style={{alignSelf: 'center', marginTop: 20}} />
            <MyText
              style={{alignSelf: 'center'}}
              fontSize={30}
              fontWeight="700"
              color={colors.icon}>
              Identificación
            </MyText>
          </View>

          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              gap: 20,
              marginTop: 20,
            }}>
            <DropDownElement
              screen="Document"
              value={select?.label ?? ''}
              data={data}
              label="Tip de documento"
              conteContainerStyles={{
                width: '90%',
              }}
              styles={{
                borderWidth: 1,

                borderRadius: 10,
                borderColor: colors.icon,
              }}
            />

            <MyInput
              inputStyles={styles.input}
              onChangeText={(text: any) =>
                setInfo({
                  ...info,
                  document: text,
                })
              }
              style={styles.inputStyle}
              label="Numero de documento"
              placeholder="Numero de documento"
              showLabel
              {...{
                textInputProps: {
                  keyboardType: 'numeric',
                },
              }}
            />

            <MyInput
              value={fecha as any}
              falseInput
              falseAction={openDate}
              inputStyles={styles.input}
              style={styles.inputStyle}
              label="Fecha de nacimiento"
              placeholder="Fecha de nacimiento"
              showLabel
              {...{
                textInputProps: {
                  keyboardType: 'numeric',
                },
              }}
            />

            {showDataPiker && (
              <RNDateTimePicker
                mode="date" // Cambiado a modo "date" para seleccionar solo días y meses
                value={currentDate}
                display="compact"
                maximumDate={maximumDate}
                onChange={handleDateChange}
                onTouchCancel={() => setShowDataPiker(false)}
              />
            )}

            {selector === 'Usuario' && (
              <View style={{width: '90%', alignSelf: 'center'}}>
                <MyText
                  fontSize={15}
                  fontWeight="600"
                  color={colors.texto_bold}>
                  ¿Tienes un acudiente?
                </MyText>
                <YesNoComponent oneSleet={select => setAcudiente(select)} />
              </View>
            )}
          </View>

          <NextBottomRegister
            {...{
              active: Boolean(validateNext),
              action: next,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </CustomScreen>
  );
};

export default Document;

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.texto_ling,
  },
  inputStyle: {
    width: '90%',
    gap: 5,
  },
});
