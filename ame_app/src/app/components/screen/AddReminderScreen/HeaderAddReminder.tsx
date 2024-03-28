import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyInput from '../../custom/MyInput';
import {MyText} from '../../custom/MyText';
import ItemSelectPiker from '../../custom/ItemSelectPiker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MyModal from '../../custom/MyModal';
import ColorPicker, {Panel3, Preview} from 'reanimated-color-picker';
import {colors} from '../../../../constants/Constants';
import {formasMedicamento, unidadesDeMedida} from '../../../../util/util';
import {Reminder} from '../../../types/types';
import {useRoute} from '@react-navigation/native';
import {useFetch} from '../../../hook/http/useFetch';
import LoadScreen from '../../../screen/LoadScreen';
import ErrorScreen from '../../../screen/error/ErrorScreen';
import DropDownElement from '../../custom/DropDown/DropDownElement';

interface Props {
  setReminder: React.Dispatch<React.SetStateAction<any>>;
  reminder: Reminder;
  route?: any;
}

export const HeaderAddReminder = ({setReminder, reminder}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const route: any = useRoute();
  const {select} = route?.params;

  const {data, loading, error, refetch}: any = useFetch(
    'get_medicaments',
    'get_medicaments',
  );

  useEffect(() => {
    setReminder({
      ...reminder,
      medicamento: select?.label,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  const onSelectColor = ({hex}: any) => {
    setReminder({
      ...reminder,
      color: hex,
    });
  };

  console.log(select);

  if (loading) {
    return <LoadScreen />;
  } else if (error) {
    return <ErrorScreen reload={refetch} />;
  }

  return (
    <>
      <MyText
        fontSize={15}
        fontWeight="600"
        color={colors.texto_bold}
        style={{marginBottom: -10}}>
        Medicamento
      </MyText>
      <DropDownElement
        {...{
          data: data?.medications,
          value: select?.label,
          screen: 'addReminder',
          placeholder: '¿Qué buscas?',
        }}
      />
      {/*      <MyInput
        textInputProps={{
          value: medicine,
        }}
        falseInput
        falseAction={() => navigation.navigate('MedicationsLists')}
        style={styles.width}
        showLabel
        label="Medicamento"
        showAutoComplete
        placeholder="¿Qué buscas?"
      />
 */}
      <View style={styles.multiInputs}>
        <View style={styles.gap}>
          <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
            Dosis
          </MyText>
          <View style={styles.row}>
            <MyInput
              isMini
              showAutoComplete
              placeholder="1"
              onChangeText={e => {
                setReminder({
                  ...reminder,
                  dosis: Number(e),
                });
              }}
              textInputProps={{
                keyboardType: 'numeric',
              }}
            />

            <ItemSelectPiker
              data={unidadesDeMedida}
              onValue={e => {
                return setReminder({
                  ...reminder,
                  unidad: e,
                });
              }}
            />
          </View>
        </View>

        <View style={styles.gap}>
          <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
            {'Tipo'}
          </MyText>
          <View>
            <ItemSelectPiker
              data={formasMedicamento}
              title="Seleccionar tipo"
            />
          </View>
        </View>

        <View style={styles.gap}>
          <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
            {'Color'}
          </MyText>
          <View>
            <TouchableOpacity
              style={styles.colorPikerBtn}
              onPress={() => setShowModal(true)}>
              <View
                style={[styles.colorPreview, {backgroundColor: reminder.color}]}
              />
              <MyText fontWeight="600" fontSize={13}>
                {reminder.color}
              </MyText>
            </TouchableOpacity>
            <MyModal visible={showModal} hideModal={() => setShowModal(false)}>
              <ColorPicker
                style={styles.pikerStyles}
                value="red"
                onComplete={onSelectColor}>
                <Panel3 />
                <Preview hideInitialColor />
              </ColorPicker>
            </MyModal>
          </View>
        </View>
      </View>

      <MyInput
        style={styles.width}
        showLabel
        label="Mensaje"
        showAutoComplete
        placeholder="Escribe un mensaje"
        onChangeText={e => {
          setReminder({
            ...reminder,
            mensaje: e,
          });
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  renderMedicine: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    bottom: 0,
  },

  container: {
    gap: 30,
    marginTop: 25,
    width: '95%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },

  inputsContainer: {
    gap: 12,
    width: '100%',
  },

  gap: {
    gap: 10,
  },

  multiInputs: {
    width: '100%',
    justifyContent: 'space-between',
    gap: 6,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },

  full: {
    flex: 1,
  },

  width: {width: '100%'},

  pikerStyles: {width: '70%', alignSelf: 'center', gap: 20},
  colorPikerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  colorPreview: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },

  top: {
    marginTop: 10,
  },

  textBtn: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
