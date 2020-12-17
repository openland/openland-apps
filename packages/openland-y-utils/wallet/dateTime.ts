import { formatTime } from 'openland-y-utils/formatTime';
import { formatAbsoluteDate } from 'openland-mobile/utils/formatDate';

export const EMPTY_YEAR = 10000;

const dateToday = new Date();
const date1900 = new Date('1900-01-01');

export const getValidatedDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    const valid =
        date.getTime() &&
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year;

    if (valid) {
        return date;
    }

    return new Date('Invalid date');
};

export const isValidDate = (date: Date) =>
    !isNaN(date.getTime())
    && (date >= date1900 && date <= dateToday || date.getFullYear() === EMPTY_YEAR);

export const extractDateTime = (
    unixTime: string,
): { date: string; time: string; isToday: boolean } => {
    const unixNumber = parseInt(unixTime, 10);

    const date = new Date(unixNumber);
    const isToday = new Date().toDateString() === date.toDateString();

    const localTime = formatTime(unixNumber);
    const localDate = formatAbsoluteDate(unixNumber);

    return { date: localDate, time: localTime, isToday };
};
