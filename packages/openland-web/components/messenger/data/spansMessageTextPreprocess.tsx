import { isEmoji } from 'openland-y-utils/isEmoji';
import { emoji } from 'openland-y-utils/emoji';

function emojiChecker(messageText: string) {
    if (isEmoji(messageText)) {
        return true;
    }
    const messageArray = Array.from(messageText);
    const pattern = /^([a-zа-яё\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+|\d+)$/i;
    for (let i = 0; i < messageArray.length; i++) {
        if (messageArray[i].match(pattern) && messageArray[i] !== '‍' && messageArray[i] !== '️') {
            return false;
        }
    }
    return true;
}

export const spansMessageTextPreprocess = (text: string, opts?: { disableBigEmoji?: boolean }) => {
    let isOnlyEmoji = emojiChecker(text);

    if (opts && opts.disableBigEmoji) {
        isOnlyEmoji = false;
    }

    let smileSize: 38 | 16 = isOnlyEmoji ? 38 : 16;

    return {
        type: 'text' as 'text',
        text,
        textEmoji: emoji({
            src: text,
            size: smileSize,
        }),
        isOnlyEmoji,
    };
};
