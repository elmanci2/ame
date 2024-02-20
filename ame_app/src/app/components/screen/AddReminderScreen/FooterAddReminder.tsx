import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {MyText} from '../../custom/MyText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {colors} from '../../../../constants/Constants';
import {Reminder} from '../../../types/types';

interface Props {
  setReminder: React.Dispatch<React.SetStateAction<Reminder>>;
  reminder: Reminder;
}

const FooterAddReminder = ({setReminder, reminder}: Props) => {
  const currentDate = new Date(); // Obtener la fecha y hora actual

  const [showDataPiker, setShowDataPiker] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const handleDatePress = () => {
    setShowDataPiker(prev => !prev);
  };

  const handleDateChange = (event: any, selected: any) => {
    setShowDataPiker(false);
    if (selected !== undefined) {
      setReminder({
        ...reminder,
        date: selected.toISOString(),
      });
    }
  };

  const handleTimeChange = (event: any, selected: any) => {
    setShowTime(false);
    if (selected !== undefined) {
      // Crear una nueva instancia de Date con la hora seleccionada
      const selectedTime = new Date(selected);

      // Actualizar el recordatorio con la nueva hora seleccionada
      setReminder({
        ...reminder,
        time: selectedTime.toLocaleTimeString('en-CO', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // Usar formato de 12 horas (AM/PM)
        }),
        originalTime: {
          time: selectedTime.toISOString(), // Guardar la hora seleccionada en formato ISO
        },
      });
    }
  };

  const minimumDateTime = new Date(currentDate); // Copia de la fecha y hora actual
  const formattedCurrentDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  return (
    <>
      <View style={styles.multiInputs}>
        <View style={[styles.row, styles.width, styles.top]}>
          <View style={[styles.gap]}>
            <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
              Fecha
            </MyText>

            <TouchableOpacity
              style={styles.colorPikerBtn}
              onPress={handleDatePress}>
              <MyText fontSize={15} color={colors.texto_bold}>
                {formattedCurrentDate}
              </MyText>
            </TouchableOpacity>

            {showDataPiker && (
              <RNDateTimePicker
                mode="date"
                value={currentDate}
                display="compact"
                minimumDate={currentDate} // Use currentDate as minimum date
                onChange={handleDateChange}
                onTouchCancel={() => setShowDataPiker(false)}
              />
            )}
          </View>
          {/* time */}
          <View style={styles.gap}>
            <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
              Hora
            </MyText>

            <TouchableOpacity
              style={styles.colorPikerBtn}
              onPress={() => setShowTime(prev => !prev)}>
              <MyText fontSize={15} color={colors.texto_bold}>
                {reminder.time}
              </MyText>
            </TouchableOpacity>

            {showTime && (
              <RNDateTimePicker
                onChange={handleTimeChange}
                value={currentDate}
                display="compact"
                minimumDate={minimumDateTime}
                mode="time"
                onTouchCancel={() => setShowTime(false)}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default FooterAddReminder;

const styles = StyleSheet.create({
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
  width: {width: '100%'},
  gap: {gap: 10},
  colorPikerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  top: {marginTop: 10},
});
