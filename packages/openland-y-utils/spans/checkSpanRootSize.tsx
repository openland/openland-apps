import { isEmoji } from 'openland-y-utils/isEmoji';
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

    // DEPRECATED - START
    let isRotating =
        !isOnlyEmoji &&
        text.length > '🔄'.length * 2 &&
        text.startsWith('🔄') &&
        text.endsWith('🔄');
    let isInsane =
        !isOnlyEmoji &&
        text.length > '🌈'.length * 2 &&
        text.startsWith('🌈') &&
        text.endsWith('🌈');
    let isTextSticker =
        !isOnlyEmoji && text.length > ':'.length * 2 && text.startsWith(':') && text.endsWith(':');

    if (isRotating) {
        text = text.slice('🔄'.length, text.length - '🔄'.length);
    }

    if (isInsane) {
        text = text.slice('🌈'.length, text.length - '🌈'.length);
    }

    if (isTextSticker) {
        text = text.slice(':'.length, text.length - ':'.length);
    }

    let type: SpanType = SpanType.text;

    type = isInsane ? SpanType.insane : type;
    type = isRotating ? SpanType.rotating : type;
    type = isTextSticker ? SpanType.loud : type;
    // DEPRECATED - END

    type = isOnlyEmoji ? SpanType.emoji : type;

    return {
        text,
        type,
    };
};
