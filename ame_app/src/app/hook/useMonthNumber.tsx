import { useEffect, useState } from 'react';

const useMonthNumber = (monthName: string) => {
  const [monthNumber, setMonthNumber] = useState<number | null>(null);

  useEffect(() => {
    const months = {
      enero: 1,
      febrero: 2,
      marzo: 3,
      abril: 4,
      mayo: 5,
      junio: 6,
      julio: 7,
      agosto: 8,
      septiembre: 9,
      octubre: 10,
      noviembre: 11,
      diciembre: 12,
    };

    const normalizedMonthName = monthName.toLowerCase();
    const number = months[normalizedMonthName]; // Obtener el número del mes

    if (number) {
      setMonthNumber(number);
    } else {
      console.error('Nombre de mes inválido');
    }
  }, [monthName]);

  return monthNumber;
};

export default useMonthNumber;
