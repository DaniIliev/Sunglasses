// Курс: 1 EUR = 1.95583 BGN
const EUR_TO_BGN = 1.95583;

/**
 * Конвертира евро в лева
 * @param {number} eur - Сума в евро
 * @returns {number} Сума в лева
 */
export const eurToBgn = (eur) => {
  return Number((eur * EUR_TO_BGN).toFixed(2));
};

/**
 * Форматира цена в евро с показване на приблизителната стойност в лева
 * @param {number} priceInEur - Цена в евро (идва от бекенда)
 * @returns {string} Форматиран текст с цена в евро и приблизителна стойност в лева
 */
export const formatPrice = (priceInEur) => {
  const bgn = eurToBgn(priceInEur);
  return `€${Number(priceInEur).toFixed(2)} (~${bgn} лв)`;
};

/**
 * Форматира цена само в евро
 * @param {number} priceInEur - Цена в евро
 * @returns {string} Цена в евро
 */
export const formatPriceEuro = (priceInEur) => {
  return `€${Number(priceInEur).toFixed(2)}`;
};
