import { format } from 'date-fns';

/**
 * Отформатировать дату
 */
const formatDate = (date: Date | string, dateFormat: string) => format(new Date(date), dateFormat);

/**
 * Утилиты для работы с датами
 */
export { formatDate };
