/* eslint-disable */

// Original can be found here: https://github.com/Ranks/emojione
export const convertShortNameToUnicode = function(unicode: string) {
    if (unicode.indexOf('-') > -1) {
        let parts = [];
        let s = unicode.split('-');
        for (let i = 0; i < s.length; i++) {
            let part = parseInt(s[i], 16);
            let partString;
            if (part >= 0x10000 && part <= 0x10ffff) {
                let hi = Math.floor((part - 0x10000) / 0x400) + 0xd800;
                let lo = ((part - 0x10000) % 0x400) + 0xdc00;
                partString = String.fromCharCode(hi) + String.fromCharCode(lo);
            } else {
                partString = String.fromCharCode(part);
            }

            parts.push(partString);
        }

        return parts.join('');
    } else {
        let s = parseInt(unicode, 16);
        if (s >= 0x10000 && s <= 0x10ffff) {
            let hi = Math.floor((s - 0x10000) / 0x400) + 0xd800;
            let lo = ((s - 0x10000) % 0x400) + 0xdc00;
            return String.fromCharCode(hi) + String.fromCharCode(lo);
        } else {
            return String.fromCharCode(s);
        }
    }
};
