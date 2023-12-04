/**
 * Привести ошибку к строке
 */
const errorToString = (error: Error) => `${error.name}: ${error.message}`;

/**
 * Утилиты для работы с ошибками
 */
export { errorToString };
