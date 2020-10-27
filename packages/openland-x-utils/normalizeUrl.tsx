export const normalizeUrl = (url: any): string => {
    if (!url || typeof url !== 'string') {
        return '';
    }
    return /^https?:\/\//.test(url) ? url : 'http://' + url;
};