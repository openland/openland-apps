export function getSocialId(url: string) {
    const result = url.replace(/@|in\//g, '').split('.com/');

    return result.length === 1 ? result[0] : result[1];
}

export function beautifyUrl(url: string) {
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
}