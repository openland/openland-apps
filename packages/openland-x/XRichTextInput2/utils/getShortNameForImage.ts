const emojione = require('emojione');

export const getShortNameForImage = (shortName: string) => {
    let result = emojione.emojioneList[shortName] ? emojione.emojioneList[shortName].uc_base : null;
    if (!result) {
        for (let emoji in emojione.emojioneList) {
            if (!emojione.emojioneList.hasOwnProperty(emoji) || emoji === '') {
                continue;
            }
            if (emojione.emojioneList[emoji].shortnames.indexOf(shortName) === -1) {
                continue;
            }
            result = emojione.emojioneList[emoji] ? emojione.emojioneList[emoji].uc_base : null;
            break;
        }
    }

    return result;
};
