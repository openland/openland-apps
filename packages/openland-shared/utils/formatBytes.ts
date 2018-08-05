const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function formatBytes(x: number | undefined) {

    if (x === undefined) {
        return;
    }

    let l = 0;

    while (x >= 1024 && ++l) {
        x = x / 1024;
    }

    return (x.toFixed(x >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
}