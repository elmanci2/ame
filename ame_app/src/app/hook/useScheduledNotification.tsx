import {Notifications} from 'react-native-notifications';
import {Reminder} from '../types/types';

const useScheduledNotification = (notificationData: Reminder) => {
  const scheduleNotification = () => {
    const {date, medicamento, mensaje, originalTime} = notificationData;

    try {
      if (!date || !originalTime || !originalTime.time) {
        throw new Error(
          'La fecha o la hora original no están definidas para la notificación programada',
        );
      }

      // Parsea la fecha y la hora
      const selectedDate = new Date(date);
      const selectedTime = new Date(originalTime.time);

      // Combina la fecha y la hora
      const combinedDateTime = new Date(
        Date.UTC(
          selectedDate.getUTCFullYear(),
          selectedDate.getUTCMonth(),
          selectedDate.getUTCDate(),
          selectedTime.getUTCHours(),
          selectedTime.getUTCMinutes(),
          selectedTime.getUTCSeconds(),
          selectedTime.getUTCMilliseconds(),
        ),
      );

      // Verifica que la fecha combinada sea en el futuro
      if (combinedDateTime <= new Date()) {
        throw new Error('La fecha combinada está en el pasado o presente');
      }

      var fechaActual = new Date();

      // Suma dos minutos a la fecha actual
      fechaActual.setMinutes(fechaActual.getMinutes() + 2);

      // Configura la notificación programada
      Notifications.postLocalNotification({
        body: mensaje,
        title: medicamento,
        sound: 'chime.aiff',
        fireDate: fechaActual,
      } as any);
    } catch (error: any) {
      console.error('Error al programar la notificación:', error.message);
    }
  };

  return {scheduleNotification};
};

export default useScheduledNotification;
