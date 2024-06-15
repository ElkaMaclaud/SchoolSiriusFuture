export function getDurationLesson(date: string) {
    const lessonDate = new Date(date);
    lessonDate.setTime(lessonDate.getTime() + 45 * 60000);
    const formattedTime = lessonDate.toLocaleTimeString([], {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime
}