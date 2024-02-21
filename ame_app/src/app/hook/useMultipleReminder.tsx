/* import React from 'react';
import {Reminder} from '../types/types';
import useCreateReminder from './useCreateReminder';

interface methods {
  addNewReminder: (reminder:Reminder) => void;
  notification: (date: string) => void;
}

interface Dates {
  initialDateTime: string;
  finalDate?: string;
}

const parseInterval = (interval: string): number => {
  const match = interval.match(/^(\d+)\s*(\w+)$/);
  if (!match) {
    throw new Error('Formato de intervalo no válido');
  }

  const amount = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 'ms':
      return amount;
    case 's':
      return amount * 1000;
    case 'm':
      return amount * 1000 * 60;
    case 'h':
      return amount * 1000 * 60 * 60;
    case 'd':
      return amount * 1000 * 60 * 60 * 24;
    default:
      throw new Error('Unidad de tiempo no reconocida');
  }
};

const formatTime12Hours = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // La hora '0' se muestra como '12' en formato de 12 horas
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const timeStr = hours + ':' + minutesStr + ' ' + ampm;
  return timeStr;
};

const useMultipleReminder = (
  {addNewReminder, notification}: methods,
  {initialDateTime, finalDate}: Dates,
  intervals: number | string = 1,
  reminder: Reminder,
) => {
  const calculateIntervals = () => {
  

    const startDate = new Date(initialDateTime);
    let endDate;

    if (finalDate) {
      endDate = new Date(finalDate);
      if (startDate > endDate) {
        console.error(
          'La fecha inicial no puede ser posterior a la fecha final',
        );
        return;
      }
    } else {
      notification(startDate.toISOString());
      return;
    }

    if (Number(intervals) <= 0) {
      console.error('El número de intervalos debe ser mayor que cero');
      return;
    }

    const intervalDuration =
      typeof intervals === 'number' ? intervals : parseInterval(intervals);

    const totalDuration = endDate.getTime() - startDate.getTime();

    if (intervalDuration >= totalDuration) {
      notification(startDate.toISOString());
      return;
    }

    let currentDateTime = startDate.getTime();
    while (currentDateTime < endDate.getTime()) {
      const notificationDate = new Date(currentDateTime);
      const notificationDateISOString = notificationDate.toISOString();
      const time12HoursFormat = formatTime12Hours(notificationDate);
      notification(notificationDateISOString);
      addNewReminder({
        ...reminder,
        date: notificationDateISOString,
        time: time12HoursFormat,
      });
      currentDateTime += intervalDuration;
    }
  };

  return {calculateIntervals};
};

export default useMultipleReminder;
 */

import React from 'react';
import {Reminder} from '../types/types';
import useCreateReminder from './useCreateReminder';

interface methods {
  addNewReminder: () => void;
  notification: (date: string) => void;
}

interface Dates {
  initialDateTime: string;
  finalDate?: string;
}

const parseInterval = (interval: string): number => {
  const match = interval.match(/^(\d+)\s*(\w+)$/);
  if (!match) {
    throw new Error('Formato de intervalo no válido');
  }

  const amount = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 'ms':
      return amount;
    case 's':
      return amount * 1000;
    case 'm':
      return amount * 1000 * 60;
    case 'h':
      return amount * 1000 * 60 * 60;
    case 'd':
      return amount * 1000 * 60 * 60 * 24;
    default:
      throw new Error('Unidad de tiempo no reconocida');
  }
};

const formatTime12Hours = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // La hora '0' se muestra como '12' en formato de 12 horas
  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
  const timeStr = hours + ':' + minutesStr + ' ' + ampm;
  return timeStr;
};

const useMultipleReminder = (
  {addNewReminder, notification}: methods,
  {initialDateTime, finalDate}: Dates,
  intervals: number | string = 1,
  reminder: Reminder,
) => {
  const calculateIntervals = () => {
    const startDate = new Date(initialDateTime);
    let endDate;

    if (finalDate) {
      endDate = new Date(finalDate);
      if (startDate > endDate) {
        console.error(
          'La fecha inicial no puede ser posterior a la fecha final',
        );
        return;
      }
    } else {
      notification(startDate.toISOString());
      return;
    }

    if (Number(intervals) <= 0) {
      console.error('El número de intervalos debe ser mayor que cero');
      return;
    }

    const intervalDuration =
      typeof intervals === 'number' ? intervals : parseInterval(intervals);

    const totalDuration = endDate.getTime() - startDate.getTime();

    if (intervalDuration >= totalDuration) {
      notification(startDate.toISOString());
      return;
    }

    let currentDateTime = startDate.getTime();
    let currentHour = startDate.getHours();
    /* addNewReminder(); */
    while (currentDateTime < endDate.getTime()) {
      const notificationDate = new Date(currentDateTime);
      const notificationDateISOString = notificationDate.toISOString();
      const time12HoursFormat = formatTime12Hours(notificationDate);
      notification(notificationDateISOString);

      // Añade el intervalo de tiempo para el siguiente recordatorio
      currentDateTime += intervalDuration;
      // Calcula la hora para el siguiente recordatorio
      currentHour = (currentHour + intervalDuration / (60 * 60 * 1000)) % 24;
      // Actualiza la hora en el objeto Date
      notificationDate.setHours(currentHour);
    }
  };

  return {calculateIntervals};
};

export default useMultipleReminder;
