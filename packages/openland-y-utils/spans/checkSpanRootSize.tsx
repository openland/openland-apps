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
        let isRotating = (text.length > '🔄'.length * 2) && text.startsWith('🔄') && text.endsWith('🔄');
        let isInsane = (text.length > '🌈'.length * 2) && text.startsWith('🌈') && text.endsWith('🌈');
        let isTextSticker = (text.length > ':'.length * 2) && text.startsWith(':') && text.endsWith(':');

        if (isRotating) {
            text = text.slice('🔄'.length, text.length - '🔄'.length);
        }

        if (isInsane) {
            text = text.slice('🌈'.length, text.length - '🌈'.length);
        }

        if (isTextSticker) {
            text = text.slice(':'.length, text.length - ':'.length);
        }

        let type: SpanType = 'text';

        type = isInsane ? 'insane' : type;
        type = isRotating ? 'rotating' : type;
        type = isTextSticker ? 'loud' : type;
    // DEPRECATED - END

    type = isOnlyEmoji ? 'emoji' : type;

    return {
        text,
        type
    };
};