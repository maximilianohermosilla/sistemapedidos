export const parseDMYHM = (dateString: string) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute);
}

export const dateToString = (date: any) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
}

export const calculateMinutesBetweenDates = (dateInitial: any, dateEnd: any) => {
    const timestampInitial = dateInitial.getTime();
    const timestampEnd = dateEnd.getTime();

    const diffMilliseconds = Math.abs(timestampInitial - timestampEnd);
    const diffMinutes = diffMilliseconds / (1000 * 60);
    return Math.round(diffMinutes);
}

export const sumMinutesToDate = (dateInitial: any, minutes: number) => {
    const date = new Date(dateInitial);
    date.setMinutes(date.getMinutes() + minutes);

    return date.toISOString();
}
