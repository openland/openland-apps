import { formatTime } from 'openland-y-utils/formatTime';
import { formatAbsoluteDate } from 'openland-mobile/utils/formatDate';

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
