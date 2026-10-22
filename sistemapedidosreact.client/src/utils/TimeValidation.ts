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
        return (currentTime >= startTime || currentTime <= endTime) && currentTime.getDay() !== 1;
    } else {
        return (currentTime >= startTime && currentTime <= endTime) && currentTime.getDay() !== 1;
    }
};

export const isTimeInRange = (timeString: string, startHour: string, endHour: string): boolean => {
    if (!timeString || !startHour || !endHour) return false;

    const [hours, minutes] = timeString.split(':').map(Number);
    const [hoursStart, minutesStart] = startHour.split(':').map(Number);
    const [hoursEnd, minutesEnd] = endHour.split(':').map(Number);

    const currentMinutes = hours * 60 + minutes;
    const startMinutes = hoursStart * 60 + minutesStart;
    const endMinutes = hoursEnd * 60 + minutesEnd;

    if (startMinutes > endMinutes) {
        return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
    } else {
        return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    }
};

export const isCurrentTimeBetweenHours = (startHour: string, endHour: string, now: Date = new Date()): boolean => {
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return isTimeInRange(`${hours}:${minutes}`, startHour, endHour);
};

export const isCategoryScheduleActive = (
    schedule: { dayCode: number; isOpen?: boolean; openingTime: string; closingTime: string },
    currentDate: Date = new Date()
): boolean => {
    if (!schedule) return false;
    if (schedule.isOpen === false) return false;
    if (schedule.dayCode !== currentDate.getDay()) return false;

    return isCurrentTimeBetweenHours(schedule.openingTime, schedule.closingTime, currentDate);
};

export const shouldShowCategoryBySchedule = (
    categoryId: number,
    categorySchedules: any[],
    currentDate: Date = new Date()
): boolean => {
    const specialSchedules = categorySchedules?.filter((s: any) => s.categoryId === categoryId) || [];

    // Si la categoría no tiene ninguna configuración especial, se debe mostrar en el menú
    if (specialSchedules.length === 0) {
        return true;
    }

    // Si tiene al menos una configuración especial, se debe validar que alguna coincida con el día y hora actual
    return specialSchedules.some((schedule: any) => isCategoryScheduleActive(schedule, currentDate));
};