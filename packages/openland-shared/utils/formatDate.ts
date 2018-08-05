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

export function formatDate(date: number) {
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
        return hours + ':' + ('0' + dt.getMinutes()).substr(-2) + ampm;
    }
    return month + ' ' + day;
}