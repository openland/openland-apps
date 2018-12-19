export let isInternalLink = (url: string) => {
    return url.includes('//app.openland.com/') || url.includes('//next.openland.com/');
};
