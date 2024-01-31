import {useState, useEffect} from 'react';

const useRemainingMonths = () => {
  const [remainingMonths, setRemainingMonths] = useState<
    {num: number; month: string}[]
  >([]);

  useEffect(() => {
    const calculateRemainingMonths = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const targetDate = new Date(currentYear, 11, 31); // Último día del año actual

      const months: {num: number; month: string}[] = [];

      while (currentDate <= targetDate) {
        const monthName = currentDate.toLocaleString('default', {
          month: 'long',
        });
        const monthNumber = currentDate.getMonth() + 1;

        months.push({num: monthNumber, month: monthName});

        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      setRemainingMonths(months);
    };

    calculateRemainingMonths();
  }, []);

  return remainingMonths;
};

export default useRemainingMonths;
