import { isEmoji } from 'openland-y-utils/isEmoji';
import { emoji } from 'openland-y-utils/emoji';
import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';

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

export const spansMessageTextPreprocess = (text: string) => {
    const isOnlyEmoji = emojiChecker(text);
    const isRotating = text.startsWith('🔄') && text.endsWith('🔄');
    const isInsane = text.startsWith('🌈') && text.endsWith('🌈');
    const isMouthpiece = text.startsWith('📣') && text.endsWith('📣');
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
        isOnlyEmoji
    };
};