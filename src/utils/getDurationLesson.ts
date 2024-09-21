export function getDurationLesson(date: string, operator: string = "+") {
  const lessonDate = new Date(date);
  const durationInMinutes = 45;

  const operations: { [key: string]: ((time: number, duration: number) => number) }  = {
      '+': (time: number, duration: number) => time + duration * 60000,
      '-': (time: number, duration: number) => time - duration * 60000
  };

  if (!operations[operator]) {
      throw new Error('Неверный оператор. Используйте "+" или "-".');
  }

  lessonDate.setTime(operations[operator](lessonDate.getTime(), durationInMinutes));
  
  const formattedTime = lessonDate.toLocaleTimeString([], {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
  });
  
  return formattedTime;
}

// export function getDurationLesson(date: string, operator: string) {
//   const lessonDate = new Date(date);
//   const durationInMinutes = 45;


//   const calculateTime = (time: number, duration: number, operator: string) => {
//       switch (operator) {
//           case '+':
//               return time + duration * 60000; 
//           case '-':
//               return time - duration * 60000; 
//           default:
//               throw new Error('Неверный оператор. Используйте "+" или "-".');
//       }
//   };


//   lessonDate.setTime(calculateTime(lessonDate.getTime(), durationInMinutes, operator));
  
//   const formattedTime = lessonDate.toLocaleTimeString([], {
//       timeZone: "UTC",
//       hour: "2-digit",
//       minute: "2-digit",
//   });
  
//   return formattedTime;
// }


// export function getDurationLesson(date: string, operator: string) {
//   const lessonDate = new Date(date);
//   const durationInMinutes = 45;


//   const expression = `lessonDate.getTime() ${operator} ${durationInMinutes * 60000}`;

//   lessonDate.setTime(eval(expression));
  
//   const formattedTime = lessonDate.toLocaleTimeString([], {
//       timeZone: "UTC",
//       hour: "2-digit",
//       minute: "2-digit",
//   });
  
//   return formattedTime;
// }
