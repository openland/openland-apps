import * as humanize from 'humanize';
import { formatDate } from './formatDate';

export function formatTime(date: number) {
    let dt = new Date(date);
    let hours = dt.getHours();
    let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
    hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return hours + ':' + ('0' + dt.getMinutes()).substr(-2) + ampm;
}

export function formatLastSeen(lastSeen: string) {
    let sub;
    let time = new Date(parseInt(lastSeen, 10)).getTime();
    if (new Date().getTime() - time < 1000 * 60 * 60 * 24) {
        sub = 'last seen ' + humanize.relativeTime(time / 1000);
    } else if (new Date().getTime() - time < 1000 * 60) {
        sub = 'just now';
    } else {
        sub = 'last seen ' + formatDate(time);
    }
    return sub;
}