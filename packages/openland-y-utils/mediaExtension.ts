export const extractExtension = (name: string) => {
    let splitted = name.toLowerCase().split('.');
    let lastPart = splitted[splitted.length - 1];
    if (lastPart) {
        return lastPart;
    }
    return undefined;
};

export const removeExtension = (name: string) => {
    let splitted = name.toLowerCase().split('.');
    return splitted.slice(0, splitted.length - 1).join('');
};

export const isAudio = (name: string) => ['mp3', 'wav', 'm4a'].includes(extractExtension(name)!);

export const isVideo = (name: string) => ['mp4', 'mov'].includes(extractExtension(name)!);

export const isPlayableMedia = (name: string) => isVideo(name) || isAudio(name);
