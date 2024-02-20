import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {Reminder} from '../types/types';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {changeDate} from '../util/Tiem';

const useScheduledNotification = (notificationData: Reminder) => {
  const {date, medicamento, mensaje, originalTime, time} = notificationData;

  /*  const timestamp = cambiarHoraAFecha(date, time);
  console.log(convertirHoraAModo24(time));
 */

  console.log(new Date(originalTime.time).getTime());

  async function displayNotification(title: string, body: string) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.requestPermission();

    const notificationId = notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
      },
    });
    return notificationId;
  }

  async function displayTriggerNotification(
    date: string,
    repeatFrequency: RepeatFrequency | undefined = undefined,
  ) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });


    console.log("agregada");
    

    const timestamp = new Date(date).getTime();

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: timestamp,
      alarmManager: true,
      repeatFrequency: repeatFrequency,
    };

    const triggerNotificationId = await notifee.createTriggerNotification(
      {
        title: medicamento,
        body: mensaje,
        android: {
          channelId,
        },
      },
      trigger,
    );

   
    
    return triggerNotificationId;
  }

  async function getTriggerNotificationIds() {
    const triggerNotificationIds = await notifee.getTriggerNotificationIds();
    return triggerNotificationIds;
  }

  // cancel all or specific trigger notifications
  async function cancelTriggerNotifications(
    notificationIds: string[] | undefined,
  ) {
    await notifee.cancelTriggerNotifications(notificationIds);
  }

  // cancel all notifications
  async function cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications();
  }

  // cancel notification via notificationId or tag
  async function cancelNotification(
    notificationId: string,
    tag: string | undefined = undefined,
  ) {
    await notifee.cancelNotification(notificationId, tag);
  }

  // There are way more methods I didn't cover here that can help you in various scenarios
  // See https://notifee.app/react-native/reference

  return {
    displayNotification,
    displayTriggerNotification,
    getTriggerNotificationIds,
    cancelTriggerNotifications,
    cancelAllNotifications,
    cancelNotification,
  };
};

export default useScheduledNotification;
