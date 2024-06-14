export function getPeriodDate(...args: number[]): string {
  return args.map((arg) => arg.toString().padStart(2, "0")).join("-");
}
export const createCalendar = (
  firstDate: number,
  daysInMonth: number,
  currentMonth: number,
  currentYear: number
): string[] => {
  const startDate = new Date(currentYear, currentMonth, firstDate);
  const endDate = new Date(currentYear, currentMonth, firstDate + 6);
  
  if (firstDate < 1) {
    startDate.setMonth(currentMonth - 1, firstDate);
  } else if (firstDate > daysInMonth) {
    endDate.setMonth(currentMonth + 1, firstDate - daysInMonth);
  }

  return [
    `${getPeriodDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate())}`,
    `${getPeriodDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate())}`
  ];
};
