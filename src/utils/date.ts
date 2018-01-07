export function formatDuration(days: number) {
    if (days < 0) {
        return 'Wrong Data';
    } else if (days <= 1) {
        return `${days} day`;
    } else if (days < 30) {
        return `${days} days`;
    } else if (days < 360) {
        return `${Math.floor(days / 30)} months`;
    } else {
        return `${Math.floor(days / 360)} years`;
    }
}