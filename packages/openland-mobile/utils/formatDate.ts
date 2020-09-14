const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function formatDate(date: number) {
    let dt = new Date(date);
    let now = new Date();
    // let year = dt.getFullYear().toString();
    let month = months[dt.getMonth()];
    let day = dt.getDate();
    if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth() && now.getDate() === dt.getDate()) {
        // return <span>Today</span>;
        let hours = dt.getHours();
        let ampm = dt.getHours() < 12 ? ' AM' : ' PM';
        hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return hours + ':' + ('0' + dt.getMinutes()).substr(-2) + ampm;
    }
    return month + ' ' + day;
}

export function formatAbsoluteDate(date: number, withYear?: boolean) {
    const dt = new Date(date);
    const month = months[dt.getMonth()];
    const day = dt.getDate();

    if (withYear) {
        const now = new Date();

        return month + ' ' + day + (now.getFullYear() !== dt.getFullYear() ? (', ' + dt.getFullYear()) : '');
    }

    return month + ' ' + day;
}

export function formatDateFull(date: number) {
    let dt = new Date(date);
    let now = new Date();
    let month = monthsFull[dt.getMonth()];
    let day = dt.getDate();

    if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth()) {
        if (now.getDate() === dt.getDate()) {
            return 'Today';
        } else if (now.getDate() === dt.getDate() + 1) {
            return 'Yesterday';
        }
    }

    return month + ', ' + day;
}

export function formatDateShort(date: number) {
    let dt = new Date(date);
    let now = new Date();
    let month = months[dt.getMonth()];
    let day = dt.getDate();

    if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth()) {
        if (now.getDate() === dt.getDate()) {
            return 'Today';
        } else if (now.getDate() === dt.getDate() + 1) {
            return 'Yesterday';
        }
    }

    return month + ' ' + day;
}

export function formatBirthDay(date: number | string) {
    const bd = new Date(typeof date === 'string' ? parseInt(date, 10) : date);
    const now = new Date();
    const age = (now.getTime() - bd.getTime()) / (365 * 24 * 60 * 60 * 1000);

    return `${bd.getDate()} ${months[bd.getMonth()]} ${bd.getFullYear()}, ${Math.floor(age)} y. o.`;
}