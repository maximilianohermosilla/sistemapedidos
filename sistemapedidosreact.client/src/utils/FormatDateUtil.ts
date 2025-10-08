export const formatDate = (date: string, locale = "es-AR") => {
    const formattedDate = new Date(date)!.toLocaleString(locale, { hour12: false })!.replace(',', '');
    return formattedDate;
};

export const formatDateHHMM = (date: string, locale = "es-AR") => {
    const formattedDate = new Date(date)!.toLocaleString(locale, { hour12: false, dateStyle: 'short', timeStyle: 'short' })!.replace(',', '');
    return formattedDate;
};