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

export const validateCategorySchedulesForDate = (
    categoryId: number,
    categorySchedules: any[],
    targetDate: Date
): { isValid: boolean; error?: string } => {
    const schedules = categorySchedules?.filter((s: any) => s.categoryId === categoryId) || [];
    if (schedules.length === 0) {
        return { isValid: true };
    }

    const dayCode = targetDate.getDay();
    const daySchedules = schedules.filter((s: any) => s.dayCode === dayCode && s.isOpen !== false);

    const DAYS_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    if (daySchedules.length === 0) {
        return {
            isValid: false,
            error: `No hay entregas disponibles el día ${DAYS_NAMES[dayCode]}.`
        };
    }

    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;

    const matchingTimeSchedule = daySchedules.find((s: any) => {
        const startTime = s.openingScheduleTime || s.openingTime;
        const endTime = s.closingScheduleTime || s.closingTime;
        return isTimeInRange(timeStr, startTime, endTime);
    });

    if (!matchingTimeSchedule) {
        const s = daySchedules[0];
        const startTime = s.openingScheduleTime || s.openingTime;
        const endTime = s.closingScheduleTime || s.closingTime;
        return {
            isValid: false,
            error: `Horario de retiro para ${s.dayWeek || DAYS_NAMES[dayCode]}: de ${startTime} a ${endTime} hs.`
        };
    }

    return { isValid: true };
};
