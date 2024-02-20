import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import {DowIndicator} from '../components/custom/DowIndicator';
import {colors} from '../../constants/Constants';
import {ScrollView} from 'react-native-gesture-handler';
import {HeaderAddReminder} from '../components/screen/AddReminderScreen/HeaderAddReminder';
import {GlobalStyle, reminderStyle} from '../styles/styles';
import FooterAddReminder from '../components/screen/AddReminderScreen/FooterAddReminder';
import {RepeatAddReminder} from '../components/screen/AddReminderScreen/RepeatAddReminder';
import CreateReminders from '../components/screen/AddReminderScreen/CreateReminders';

const AddReminderScreen = () => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

const fechaActualUTC = new Date();
const diferenciaHoraria = -5 * 60 * 60 * 1000;
const fechaActualUTC5 = new Date(fechaActualUTC.getTime() + diferenciaHoraria);
const fechaHoraISO = fechaActualUTC5.toISOString();


  const [reminder, setReminder] = useState({
    id: Math.floor(Math.random() * 100000),
    mensaje: 'No olvidar tomara este medicamento',
    medicamento: '',
    dosis: 1,
    unidad: 'mg',
    type: 'tableta',
    color: colors.tertiary,
    date: fechaHoraISO,
    time: currentTime,
    repeat: 2,
    formate: 'hour',
    originalTime: {
      time: new Date(),
    },
  });

  return (
    <CustomScreen>
      <StatusBar backgroundColor={colors.primary} />
      <DowIndicator />

      <ScrollView style={styles.full}>
        <View style={styles.container}>
          <View style={styles.inputsContainer}>
            <HeaderAddReminder reminder={reminder} setReminder={setReminder} />
            <FooterAddReminder reminder={reminder} setReminder={setReminder} />
            <RepeatAddReminder reminder={reminder} setReminder={setReminder} />
          </View>
          <CreateReminders reminder={reminder} />
        </View>
      </ScrollView>
    </CustomScreen>
  );
};

export default AddReminderScreen;

const styles = StyleSheet.create({
  ...reminderStyle,
  ...GlobalStyle,
});
