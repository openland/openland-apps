export let isInternalLink = (l: string) => {
    return l.startsWith('http://openland.com') ||
        l.startsWith('https://openland.com') ||
        l.startsWith('//openland.com') ||
        l.startsWith('http://app.openland.com') ||
        l.startsWith('https://app.openland.com') ||
        l.startsWith('//app.openland.com') ||
        l.startsWith('http://next.openland.com') ||
        l.startsWith('https://next.openland.com') ||
        l.startsWith('//next.openland.com');
};
