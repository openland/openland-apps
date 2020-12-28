import { formatTime } from 'openland-y-utils/formatTime';
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

export function formatAbsoluteDate(date: number, withYear?: boolean) {
    const dt = new Date(date);
    const month = months[dt.getMonth()];
    const day = dt.getDate();

    if (withYear) {
        const now = new Date();

        return month + ' ' + day + (now.getFullYear() !== dt.getFullYear() ? (', ' + dt.getFullYear()) : '');
    }

    return month + ' ' + day;
}

export function formatBirthDay(date: number | string) {
    const bd = new Date(typeof date === 'string' ? parseInt(date, 10) : date);
    const year = bd.getFullYear();
    const age = new Date(Date.now() - bd.getTime()).getUTCFullYear() - 1970;

    if (year === 10000) {
        return `${bd.getDate()}  ${monthsFull[bd.getMonth()]}`;
    }

    return `${bd.getDate()} ${months[bd.getMonth()]} ${bd.getFullYear()}, ${Math.abs(age)} y. o.`;
}
