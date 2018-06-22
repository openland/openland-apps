import * as React from 'react';
import * as humanize from 'humanize';

let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export function XDate(props: { value: string, format?: 'date' | 'humanize' | 'humanize_large' }) {
    if (props.format === 'humanize' || props.format === 'humanize_large') {
        let date = new Date(props.value).getTime() / 1000;
        return (
            <span>
                {humanize.relativeTime(date)}{props.format === 'humanize_large' ? ' (' + props.value + ')' : ''}
            </span>
        );
    } else {
        let parts = props.value.split('-');
        let year = parts[0];
        let month = months[parseInt(parts[1], 10) - 1];
        let day = parseInt(parts[2], 10);
        return (
            <span>{month} {day}, {year}</span>
        );
    }
}

export const DateFormater = (time: string) => {
    const date = new Date(time);

    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = months[month];

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + ' ' + day + ',' + year;
};