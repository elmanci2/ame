export function getDayAndMonth(
  dateISO: string,
): {day: number; month: number} | null {
  try {
    const date = new Date(dateISO);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

    const day1 = date.getUTCDate();
    const month1 = date.getUTCMonth() + 1; // Months in JavaScript are zero-based

    return {day: day1, month: month1};
  } catch (error: any) {
    console.error('Error while obtaining day and month:', error?.message);
    return null;
  }
}
