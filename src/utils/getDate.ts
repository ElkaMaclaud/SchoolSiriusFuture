export function getDay(date: string) {
  const newDate = new Date(date);
  
  // const options = {
  //   month: 'long' as const,
  // };
  // const month = newDate.toLocaleString("ru-RU", options);

  return newDate.getUTCDate();
}

export function getMonth(date:string) {
  const months = {
    nominative: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    genitive: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  };

  const newDate = new Date(date)
  const monthIndex = newDate.getMonth();

  return months.genitive[monthIndex];
}

