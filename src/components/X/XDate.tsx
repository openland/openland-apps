import * as React from 'react';
import * as humanize from 'humanize';
export function XDate(props: { date: string, large?: boolean }) {
    let date = new Date(props.date).getTime() / 1000;
    return <span style={{ position: 'relative' }}>{humanize.relativeTime(date)}{props.large ? ' (' + props.date + ')' : ''}</span>;
}