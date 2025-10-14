export const isTimeBetweenHours = (timeString: any, startHour: any, endHour: any) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const [hoursStart, minutesStart] = startHour.split(':').map(Number);
    const [hoursEnd, minutesEnd] = endHour.split(':').map(Number);

    const currentTime = new Date();
    currentTime.setHours(hours, minutes, 0, 0);

    const startTime = new Date();
    startTime.setHours(hoursStart, minutesStart, 0, 0);

    const endTime = new Date();
    endTime.setHours(hoursEnd, minutesEnd, 0, 0);

    if (startHour > endHour) {
        return currentTime >= startTime || currentTime <= endTime;
    } else {
        return currentTime >= startTime && currentTime <= endTime;
    }
};