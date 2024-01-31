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
  const currentDate = new Date();

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
      setShowDataPiker(false);
    }
  };

  const handleTimeChange = (event: any, selected: any) => {
    setShowTime(false);
    if (selected !== undefined) {
      setReminder({
        ...reminder,
        time: selected.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        originalTime: {
          time: selected.toISOString(),
        },
      });
      setShowTime(false);
    }
  };

  // Obtener la fecha actual y establecerla como la fecha mínima permitida

  const minimumDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const minimumDateTime = new Date(currentDate); // Copia de la fecha y hora actual
  const fecha = new Date(reminder.date);
  const formattedCurrentDate = `${fecha.getDate()}/${
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
                mode="date" // Cambiado a modo "date" para seleccionar solo días y meses
                value={currentDate}
                display="compact"
                minimumDate={minimumDate}
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
