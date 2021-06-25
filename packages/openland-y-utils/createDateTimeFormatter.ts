import moment from 'moment';

const EMPTY_YEAR = 10000;

const addLeadingZero = (time: number) => {
    return ('0' + time).substr(-2);
};

const thinSpace = '\u2009';

const dateToday = new Date();
const date1900 = new Date('1900-01-01');

const shortLocalDate = (dateStr: string) => dateStr.split(' ').slice(0, 2).join(' ').replace(',', '');

export const createDateTimeFormatter = ({
    is24HourFormat = false,
    today = 'Today',
    yesterday = 'Yesterday',
    nowStr = 'now',
    at = 'at',
    shortMinute = 'm',
    shortHour = 'h',
    shortDay = 'd',
    justNow = 'just now',
    lastSeenYesterday = 'last seen yesterday',
    lastSeenTwoDays = 'last seen two days ago',
    lastSeenLongTime = 'last seen long time ago',
    lastSeenDefault = 'last seen',
    yearsOldShort = () => 'y. o.',
}: {
    is24HourFormat?: boolean,
    today?: string,
    yesterday?: string,
    nowStr?: string,
    at?: string,
    shortMinute?: string,
    shortHour?: string,
    shortDay?: string,
    justNow?: string,
    lastSeenYesterday?: string,
    lastSeenTwoDays?: string,
    lastSeenLongTime?: string,
    lastSeenDefault?: string,
    yearsOldShort?: (age: number) => string,
} = {}) => {

    const getValidatedDate = (day: number, month: number, year: number) => {
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

    const isValidDate = (date: Date) =>
        !isNaN(date.getTime())
        && (date >= date1900 && date <= dateToday || date.getFullYear() === EMPTY_YEAR);

    const extractDateTime = (
        unixTime: string,
    ): { date: string; time: string; isToday: boolean } => {
        const unixNumber = parseInt(unixTime, 10);

        const date = new Date(unixNumber);
        const isToday = new Date().toDateString() === date.toDateString();

        const localTime = formatTime(unixNumber);
        const localDate = formatAbsoluteDate(unixNumber);

        return { date: localDate, time: localTime, isToday };
    };

    function formatAbsoluteDate(date: number, withYear?: boolean) {
        const dt = new Date(date);
        const now = new Date();

        let formatted = moment(dt).format('LL');
        if (withYear && now.getFullYear() !== dt.getFullYear()) {
            return formatted;
        }
        return formatted.split(' ').slice(0, -1).join(' ');
    }

    function formatBirthDay(date: number | string) {
        const bd = new Date(typeof date === 'string' ? parseInt(date, 10) : date);
        const year = bd.getFullYear();
        const age = new Date(Date.now() - bd.getTime()).getUTCFullYear() - 1970;

        if (year === 10000) {
            return shortLocalDate(moment(bd).format('LL'));
        }

        return `${moment(bd).format('LL')}, ${Math.abs(age)} ${yearsOldShort(Math.abs(age))}`;
    }

    function formatTime(date: number) {
        let dt = new Date(date);
        let hours = dt.getHours();
        if (is24HourFormat) {
            return hours + ':' + addLeadingZero(dt.getMinutes());
        }
        let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
        hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return hours + ':' + addLeadingZero(dt.getMinutes()) + thinSpace + ampm;
    }

    function formatDateTime(date: number) {
        let dt = new Date(date);
        let hours = dt.getHours();
        if (is24HourFormat) {
            return formatAbsoluteDate(date) + ', ' + hours + ':' + addLeadingZero(dt.getMinutes());
        }
        let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
        hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return (
            formatAbsoluteDate(date) + ', ' + hours + ':' + addLeadingZero(dt.getMinutes()) + thinSpace + ampm
        );
    }

    function formatDateAtTime(date: number, monthFormat?: 'full' | 'short') {
        let dt = new Date(date);
        let hours = dt.getHours();
        let formatedDate = monthFormat === 'short' ? formatDateShort(date) : formatDateFull(date);
        if (is24HourFormat) {
            return formatedDate + ` ${at} ` + hours + ':' + addLeadingZero(dt.getMinutes());
        }
        let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
        hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return (
            formatedDate + ` ${at} ` + hours + ':' + addLeadingZero(dt.getMinutes()) + thinSpace + ampm
        );
    }

    function formatLastSeen(lastSeen: string) {
        if (lastSeen === 'never_online') {
            return lastSeenLongTime;
        } else {
            let now = new Date();
            let dt = new Date(parseInt(lastSeen, 10));
            let time = dt.getTime();

            let delta = now.getTime() - time;

            let oneMinute = 1000 * 60;
            let oneDay = oneMinute * 60 * 24;
            let twoDays = oneDay * 2;

            if (delta > oneDay && delta < twoDays) {
                if (now.getDate() === dt.getDate() + 2) {
                    return lastSeenTwoDays;
                }
                return lastSeenYesterday;
            } else if (delta < oneDay) {
                if (now.getDate() === dt.getDate() + 1) {
                    return lastSeenYesterday;
                }
                return lastSeenDefault + ' ' + moment(time).fromNow();
            } else if (delta < oneMinute) {
                return justNow;
            } else {
                return lastSeenDefault + ' ' + formatDate(time);
            }
        }
    }

    function formatRelativeTime(date: string | number) {
        let time = new Date(typeof date === 'string' ? parseInt(date, 10) : date).getTime();
        if (new Date().getTime() - time < 1000 * 60 * 60 * 24) {
            return moment(time).fromNow();
        } else if (new Date().getTime() - time < 1000 * 60) {
            return justNow;
        } else {
            return formatDate(time);
        }
    }

    function formatRelativeTimeShort(date: string | number) {
        const src = new Date(typeof date === 'string' ? parseInt(date, 10) : date);
        const now = new Date();

        const delta = now.getTime() - src.getTime();

        if (delta < 1000 * 60) {
            // first minute
            return nowStr;
        } else if (delta < 1000 * 60 * 60) {
            // first hour
            return Math.floor(delta / (1000 * 60)) + ` ${shortMinute}`;
        } else if (delta < 1000 * 60 * 60 * 24) {
            // first day
            return Math.floor(delta / (1000 * 60 * 60)) + ` ${shortHour}`;
        } else {
            return Math.floor(delta / (1000 * 60 * 60 * 24)) + ` ${shortDay}`;
        }
    }

    function formatLastSeenShort(lastSeen: string) {
        if (lastSeen === 'never_online') {
            return '';
        }

        const src = new Date(parseInt(lastSeen, 10));
        const now = new Date();

        const delta = now.getTime() - src.getTime();

        if (delta < 1000 * 60) {
            // first minute
            return `1${shortMinute}`;
        } else if (delta < 1000 * 60 * 60) {
            // first hour
            return Math.floor(delta / (1000 * 60)) + shortMinute;
        } else if (delta < 1000 * 60 * 60 * 24) {
            // first day
            return Math.floor(delta / (1000 * 60 * 60)) + shortHour;
        } else {
            const count = Math.floor(delta / (1000 * 60 * 60 * 24));
            return count > 30 ? '' : (count + shortDay);
        }
    }

    function formatDate(date: number) {
        let dt = new Date(date);
        let now = new Date();
        if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth() && now.getDate() === dt.getDate()) {
            let localMoment = moment(date);
            localMoment.locale('en');
            return is24HourFormat
                ? localMoment.format('H:mm')
                : localMoment.format('h:mm A');
        }
        return shortLocalDate(moment(date).format('ll'));
    }

    function formatDateFull(date: number, withYear: boolean = false) {
        let dt = new Date(date);
        let now = new Date();

        if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth()) {
            if (now.getDate() === dt.getDate()) {
                return today;
            } else if (now.getDate() === dt.getDate() + 1) {
                return yesterday;
            }
        }

        if (withYear && now.getFullYear() !== dt.getFullYear()) {
            return moment(date).format('LL');
        }

        return shortLocalDate(moment(date).format('LL'));
    }

    function formatDateShort(date: number, withYear: boolean = false) {
        let dt = new Date(date);
        let now = new Date();

        if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth()) {
            if (now.getDate() === dt.getDate()) {
                return today;
            } else if (now.getDate() === dt.getDate() + 1) {
                return yesterday;
            }
        }

        if (withYear && now.getFullYear() !== dt.getFullYear()) {
            return moment(date).format('ll');
        }

        return shortLocalDate(moment(date).format('ll'));
    }

    const getEmptyYear = () => EMPTY_YEAR;

    return {
        formatDate,
        formatLastSeenShort,
        formatRelativeTimeShort,
        formatRelativeTime,
        formatDateTime,
        formatTime,
        formatBirthDay,
        getValidatedDate,
        isValidDate,
        formatLastSeen,
        extractDateTime,
        formatDateAtTime,
        getEmptyYear,
        formatAbsoluteDate,
        formatDateFull,
    };
};
