import {StyleSheet, View} from 'react-native';
import React, {memo, useState} from 'react';
import MySwitch from '../../custom/MySwitch';
import {MyText} from '../../custom/MyText';
import {Reminder} from '../../../types/types';
import ItemSelectPiker from '../../custom/ItemSelectPiker';
import {GlobalStyle, reminderStyle} from '../../../styles/styles';
import MyInput from '../../custom/MyInput';
import {colors} from '../../../../constants/Constants';

interface Props {
  setReminder: React.Dispatch<React.SetStateAction<Reminder>>;
  reminder: Reminder;
}

export const RepeatAddReminder = memo(({reminder, setReminder}: Props) => {
  const [repeat, setRepeat] = useState(false);
  return (
    <>
      <View style={[styles.multiInputs]}>
        <View style={[styles.gap]}>
          <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
            Repetir
          </MyText>
          <MySwitch value={repeat} onValueChange={e => setRepeat(e)} />
        </View>
      </View>

      <View style={[styles.top]}>
        <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
          Frecuencia
        </MyText>
      </View>
      <View style={[styles.multiInputs]}>
        <View style={[styles.row]}>
          <View style={[styles.gap]}>
            <MyInput
              blocked={!repeat}
              isMini
              showAutoComplete
              placeholder="1"
              textInputProps={{
                keyboardType: 'numeric',
                onChangeText(e) {
                  setReminder({
                    ...reminder,
                    repeat: Number(e),
                  });
                },
              }}
            />
          </View>
          <View style={[styles.gap]}>
            <ItemSelectPiker
              blocked={!repeat}
              title="Seleccionar formato"
              data={[
                {value: 'Hora', label: 'Hora'},
                {value: 'Dia', label: 'Dia'},
              ]}
            />
          </View>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({...reminderStyle, ...GlobalStyle});
