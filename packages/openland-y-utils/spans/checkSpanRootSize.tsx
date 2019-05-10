import { isEmoji } from 'openland-y-utils/isEmoji';
import { emoji } from 'openland-y-utils/emoji';
import { SpanType } from './Span';

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

interface CheckSpanRootSizeResult {
    text: string;
    type: SpanType;
}

export const checkSpanRootSize = (text: string): CheckSpanRootSizeResult => {
    let isOnlyEmoji = emojiChecker(text);
    let isRotating = !isOnlyEmoji && text.startsWith('🔄') && text.endsWith('🔄');
    let isInsane = !isOnlyEmoji && text.startsWith('🌈') && text.endsWith('🌈');
    let isMouthpiece = !isOnlyEmoji && text.startsWith('📣') && text.endsWith('📣');
    let isTextSticker = !isOnlyEmoji && text.startsWith(':') && text.endsWith(':');
    let isBig =
        isOnlyEmoji ||
        isInsane ||
        isRotating ||
        isMouthpiece ||
        isTextSticker;

    if (isInsane || isMouthpiece || isRotating) {
        text = text
            .replace(/🌈/g, '')
            .replace(/📣/g, '')
            .replace(/🔄/g, '');
    } else if (isTextSticker) {
        text = text.slice(1, text.length - 1);
    }

    let type: SpanType = 'text';

    if (isBig && !isOnlyEmoji) {
        type = isInsane ? 'insane' : type;
        type = isRotating ? 'rotating' : type;
        type = (isTextSticker || isMouthpiece) ? 'loud' : type;
    }

    if (isBig && isOnlyEmoji) {
        type = 'loud'
    }

    return {
        text,
        type
    };
};