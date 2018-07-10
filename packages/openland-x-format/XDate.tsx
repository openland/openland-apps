import * as React from 'react';
import * as humanize from 'humanize';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XStorageContext } from 'openland-x-routing/XStorageContext';
import moment from 'moment-timezone';

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

export function XDate(props: { value: string, format?: 'date' | 'time' | 'datetime_short' | 'humanize' | 'humanize_large' }) {
    let date = parseInt(props.value, 10);
    // let date = new Date(parseInt(props.value, 10)).getTime() / 1000;
    if (props.format === 'humanize' || props.format === 'humanize_large') {
        return (
            <span>
                {humanize.relativeTime(date / 1000)}{props.format === 'humanize_large' ? ' (' + props.value + ')' : ''}
            </span>
        );
    } else if (props.format === 'time') {
        let dt = new Date(date);
        let hours = dt.getHours();
        let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
        hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return (
            <span>{hours}:{('0' + dt.getMinutes()).substr(-2)}{ampm}</span>
        );
    } else if (props.format === 'datetime_short') {
        if (canUseDOM) {
            let dt = new Date(date);
            let now = new Date();
            // let year = dt.getFullYear().toString();
            let month = months[dt.getMonth()];
            let day = dt.getDate();
            if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth() && now.getDate() === dt.getDate()) {
                // return <span>Today</span>;
                let hours = dt.getHours();
                let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
                hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
                return (
                    <span>{hours}:{('0' + dt.getMinutes()).substr(-2)}{ampm}</span>
                );
            }
            return (
                <span>{month} {day}</span>
            );
        } else {
            return (
                <XStorageContext.Consumer>
                    {storage => {
                        let tz = storage!!.readValue('timezone');
                        console.warn(tz);
                        if (!tz) {
                            let dt = new Date(date);
                            let now = new Date();
                            // let year = dt.getFullYear().toString();
                            let month = months[dt.getMonth()];
                            let day = dt.getDate();
                            if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth() && now.getDate() === dt.getDate()) {
                                // return <span>Today</span>;
                                let hours = dt.getHours();
                                let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
                                hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
                                return (
                                    <span>{hours}:{('0' + dt.getMinutes()).substr(-2)}{ampm}</span>
                                );
                            }
                            return (
                                <span>{month} {day}</span>
                            );
                        } else {
                            let dt = moment.tz(date, tz);
                            let now = moment.tz(new Date(), tz);
                            // let year = dt.getFullYear().toString();
                            let month = months[dt.month()];
                            let day = dt.date();
                            if (now.year() === dt.year() && now.month() === dt.month() && now.date() === dt.date()) {
                                // return <span>Today</span>;
                                let hours = dt.hour();
                                let ampm = dt.hour() < 12 ? 'AM' : 'PM';
                                hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
                                return (
                                    <span>{hours}:{('0' + dt.minute()).substr(-2)}{ampm}</span>
                                );
                            }
                            return (
                                <span>{month} {day}</span>
                            );
                        }
                    }}
                </XStorageContext.Consumer>
            );
        }

    } else {
        let dt = new Date(date);
        let year = dt.getFullYear().toString();
        let month = months[dt.getMonth()];
        let day = dt.getDate();
        return (
            <span>{month} {day}, {year}</span>
        );
    }
}

export const DateFormater = (time: string | number) => {
    const date = new Date(time);

    let year = date.getFullYear();

    let month = (date.getMonth()).toString();
    month = months[month];

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + ' ' + day + ', ' + year;
};