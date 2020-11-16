import { formatTime } from 'openland-y-utils/formatTime';
import { formatAbsoluteDate } from 'openland-mobile/utils/formatDate';

const dateToday = new Date();
const date1900 = new Date('1900-01-01');

export const isValidDate = (date: Date) => !isNaN(date.getTime()) && date > date1900 && date <= dateToday;

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
