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

export function XDate(props: { date: string, format?: 'date' | 'humanize' | 'humanize_large' }) {
    if (props.format === 'humanize' || props.format === 'humanize_large') {
        let date = new Date(props.date).getTime() / 1000;
        return (
            <span>
                {humanize.relativeTime(date)}{props.format === 'humanize_large' ? ' (' + props.date + ')' : ''}
            </span>
        );
    } else {
        let parts = props.date.split('-');
        let year = parts[0];
        let month = months[parseInt(parts[1], 10) - 1];
        let day = parseInt(parts[2], 10);
        return (
            <span>{month} {day}, {year}</span>
        );
    }
}