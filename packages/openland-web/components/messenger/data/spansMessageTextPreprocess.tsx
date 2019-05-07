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

export const spansMessageTextPreprocess = (text: string, opts?: { disableBig?: boolean }) => {
    let isOnlyEmoji = emojiChecker(text);
    let isRotating = text.startsWith('🔄') && text.endsWith('🔄');
    let isInsane = text.startsWith('🌈') && text.endsWith('🌈');
    let isMouthpiece = text.startsWith('📣') && text.endsWith('📣');
    let isBig =
        isOnlyEmoji ||
        isInsane ||
        isRotating ||
        isMouthpiece ||
        (text.length <= 302 && text.startsWith(':') && text.endsWith(':'));
    const isTextSticker = !isOnlyEmoji && isBig;
    if (isInsane || isMouthpiece || isRotating) {
        text = text
            .replace(/🌈/g, '')
            .replace(/📣/g, '')
            .replace(/🔄/g, '');
    } else if (isTextSticker) {
        text = text.slice(1, text.length - 1);
    }
    if (opts && opts.disableBig) {
        isBig = false;
        isInsane = false;
        isRotating = false;
        isOnlyEmoji = false;
    }
    let smileSize: 38 | 16 = isBig ? 38 : 16;
    return {
        type: 'text' as 'text',
        text,
        textEmoji: emoji({
            src: text,
            size: smileSize,
        }),
        isBig,
        isInsane,
        isRotating,
        isOnlyEmoji,
    };
};
