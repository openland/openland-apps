const emojione = require('emojione');

const shortnameToImage = function(str: string) {
    // replace regular shortnames first
    let fname;

    str = str.replace(emojione.regShortNames, function(shortname: string) {
        if (
            typeof shortname === 'undefined' ||
            shortname === '' ||
            emojione.shortnames.indexOf(shortname) === -1
        ) {
            // if the shortname doesnt exist just return the entire match
            return shortname;
        } else {
            // map shortname to parent
            if (!emojione.emojioneList[shortname]) {
                for (let emoji in emojione.emojioneList) {
                    if (!emojione.emojioneList.hasOwnProperty(emoji) || emoji === '') {
                        continue;
                    }
                    if (emojione.emojioneList[emoji].shortnames.indexOf(shortname) === -1) {
                        continue;
                    }
                    shortname = emoji;
                    break;
                }
            }

            fname = emojione.emojioneList[shortname].uc_base;

            return fname;
        }
    });

    return str;
};

export const getShortNameForImage = (shortName: string) => {
    return shortnameToImage(shortName);
};
