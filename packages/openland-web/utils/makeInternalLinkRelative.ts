export let makeInternalLinkRelative = (url: string) => {
    let rel = url
        .replace('http://app.openland.com/', '/')
        .replace('https://app.openland.com/', '/')
        .replace('//app.openland.com/', '/')
        .replace('http://next.openland.com/', '/')
        .replace('https://next.openland.com/', '/')
        .replace('//next.openland.com/', '/');

    return rel;
};
