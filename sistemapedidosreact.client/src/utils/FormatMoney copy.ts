export const formatDate = (date: string, locale = "es-AR") => {
    const formattedDate = new Date(date)!.toLocaleString(locale, { hour12: false })!.replace(',', '');
    return formattedDate;
};
