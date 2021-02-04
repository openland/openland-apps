export const isYoutubeLink = (link: string | null | undefined) => {
    const regEx = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = link && link.match(regEx);
    return match && match[7].length >= 11;
};
