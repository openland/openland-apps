import * as humanize from 'humanize';
import { formatDate, formatAbsoluteDate, formatAbsoluteDateFull } from '../openland-mobile/utils/formatDate';

const addLeadingZero = (time: number) => {
    return ('0' + time).substr(-2);
};

export function formatTime(date: number) {
    let dt = new Date(date);
    let hours = dt.getHours();
    let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
    hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return hours + ':' + addLeadingZero(dt.getMinutes()) + ' ' + ampm;
}

export function formatDateTime(date: number) {
    let dt = new Date(date);
    let hours = dt.getHours();
    let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
    hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return formatAbsoluteDate(date) + ', ' + hours + ':' + addLeadingZero(dt.getMinutes()) + ' ' + ampm;
}

export function formatDateAtTime(date: number) {
    let dt = new Date(date);
    let hours = dt.getHours();
    let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
    hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return formatAbsoluteDateFull(date) + ' at ' + hours + ':' + addLeadingZero(dt.getMinutes()) + ' ' + ampm;
}

export function formatTimerTime(date: number) {
    let dt = new Date(date);
    let hoursRaw = dt.getUTCHours();
    let hours = addLeadingZero(hoursRaw);
    let minutes = addLeadingZero(dt.getUTCMinutes());
    let seconds = addLeadingZero(dt.getUTCSeconds());

    return (hoursRaw ? hours + ':' : '') + minutes + ':' + seconds;
}

export function formatLastSeen(lastSeen: string) {
    if (lastSeen === 'never_online') {
        return 'last seen long time ago';
    } else {
        let time = new Date(parseInt(lastSeen, 10)).getTime();
        if (new Date().getTime() - time < 1000 * 60 * 60 * 24) {
            return 'last seen ' + humanize.relativeTime(time / 1000);
        } else if (new Date().getTime() - time < 1000 * 60) {
            return 'just now';
        } else {
            return 'last seen ' + formatDate(time);
        }
    }
}

export function formatRelativeTime(date: string | number) {
    let time = new Date((typeof date === 'string') ? parseInt(date, 10) : date).getTime();
    if (new Date().getTime() - time < 1000 * 60 * 60 * 24) {
        return humanize.relativeTime(time / 1000);
    } else if (new Date().getTime() - time < 1000 * 60) {
        return 'just now';
    } else {
        return formatDate(time);
    }
}