export const formatMoney = (amount: number, locale = "es-AR", currency = "ARS") => {
    return amount.toLocaleString(locale, {
        style: "currency",
        currency: currency,
    });
};
