import {useEffect, useState} from 'react';

const useRemainingDaysInMonth = (month: number) => {
  const year = new Date().getFullYear();
  const [remainingDays, setRemainingDays] = useState<
    {day: string; num: number}[]
  >([]);

  useEffect(() => {
    const calculateRemainingDays = () => {
      const days: {day: string; num: number}[] = [];
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Sumar 1 al mes actual
      const currentYear = currentDate.getFullYear();

      if (month === 0) {
        // Si se pasa 0 como mes, obtener los días restantes del mes actual
        const lastDayOfMonth = new Date(year, currentMonth, 0).getDate();
        for (
          let dayNumber = currentDate.getDate();
          dayNumber <= lastDayOfMonth;
          dayNumber++
        ) {
          const currentDay = new Date(year, currentMonth - 1, dayNumber);
          const dayString = currentDay.toLocaleDateString('es-ES', {
            weekday: 'long',
          });

          days.push({
            day:
              dayString?.split(',')?.shift()?.trim()?.slice(0, 3) + '.' ?? '',
            num: dayNumber,
          });
        }
      } else if (month === currentMonth && year === currentYear) {
        // Si el mes pasado es igual al mes actual, calcular solo los días que aún no han pasado
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        for (
          let dayNumber = currentDate.getDate();
          dayNumber <= lastDayOfMonth;
          dayNumber++
        ) {
          const currentDay = new Date(year, month - 1, dayNumber);
          const dayString = currentDay.toLocaleDateString('es-ES', {
            weekday: 'long',
          });

          days.push({
            day:
              dayString?.split(',')?.shift()?.trim()?.slice(0, 3) + '.' ?? '',
            num: dayNumber,
          });
        }
      } else {
        // Si el mes pasado es diferente al mes actual, calcular todos los días del mes
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        for (let dayNumber = 1; dayNumber <= lastDayOfMonth; dayNumber++) {
          const currentDay = new Date(year, month - 1, dayNumber);
          const dayString = currentDay.toLocaleDateString('es-ES', {
            weekday: 'long',
          });

          days.push({
            day:
              dayString?.split(',')?.shift()?.trim()?.slice(0, 3) + '.' ?? '',
            num: dayNumber,
          });
        }
      }

      setRemainingDays(days);
    };

    calculateRemainingDays();
  }, [month, year]);

  return remainingDays;
};

export default useRemainingDaysInMonth;
