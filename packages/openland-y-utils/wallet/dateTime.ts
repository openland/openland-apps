import { formatTime } from 'openland-y-utils/formatTime';

export const extractDateTime = (
    unixTime: string,
): { date: string; time: string; isToday: boolean } => {
    const date = new Date(parseInt(unixTime, 10));
    const utc = date.toUTCString();
    const segments = utc.split(' ');
    const isToday = new Date().toDateString() === date.toDateString();

    const localTime = formatTime(parseInt(unixTime, 10));

    return { date: `${segments[2]} ${segments[1]}`, time: localTime, isToday };
};
