export let makeInternalLinkRelative = (url: string) => {
    let rel = url
        .replace('http://openland.com', '')
        .replace('https://openland.com', '')
        .replace('//openland.com', '')
        .replace('http://next.openland.com', '')
        .replace('https://next.openland.com', '')
        .replace('//next.openland.com', '');
    
    if (rel.length === 0) {
        rel = '/';
    }

    return rel;
};
