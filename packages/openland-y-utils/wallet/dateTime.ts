export const extractDateTime = (unixTime: string): { date: string, time: string, isToday: boolean } => {
    const date = new Date(parseInt(unixTime, 10));
    const utc = date.toUTCString();
    const segments = utc.split(' ');
    const time = segments[4].split(':').slice(0, 2).join(':');
    const isToday = ((new Date()).toDateString() === date.toDateString());

    return { date: `${segments[2]} ${segments[1]}`, time, isToday };
};