import parse from 'url-parse';

export const isInternalLink = (l: string) => {
    let url = parse(l, {});
    if (url.host.length === 0) {
        url = parse('http://' + l, {});
    }
    return ['http:', 'https:', ''].includes(url.protocol) && ['openland.com', 'next.openland.com'].includes(url.host);
};
