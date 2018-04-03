export function formatDuration(days: number) {
    if (days < 0) {
        return 'Wrong Data';
    }

    let res = buildDuration(days);
    return res.value + ' ' + res.subtitle;
}

export function buildDuration(days: number) {
    if (days < 0) {
        return {value: '?', subtitle: 'unknown'};
    } else if (days <= 1) {
        return {value: `${days}`, subtitle: 'day'};
    } else if (days < 30) {
        return {value: `${days}`, subtitle: 'days'};
    } else if (days < 360) {
        let months = Math.ceil(days / 30);
        if (months <= 1) {
            return {value: `${months}`, subtitle: 'month'};
        } else {
            return {value: `${months}`, subtitle: 'months'};
        }
    } else {
        let years = Math.ceil(days / 360);
        if (years <= 1) {
            return {value: `${years}`, subtitle: 'year'};
        } else {
            return {value: `${years}`, subtitle: 'years'};
        }
    }
}