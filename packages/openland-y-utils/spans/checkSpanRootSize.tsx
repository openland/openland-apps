import { isEmoji } from 'openland-y-utils/isEmoji';
import { SpanType } from './Span';
import emojiRegex from 'emoji-regex';

const whiteSpaceRegEx = /\s/g;

export function emojiChecker(messageText: string) {
    if (isEmoji(messageText)) {
        return true;
    }

    const message = messageText.replace(whiteSpaceRegEx, '');
    const regex = emojiRegex();
    let match;
    let emojiLength = 0;

    while (match = regex.exec(message)) {
        const emoji = match[0];
        emojiLength += emoji.length;
    }

    if (emojiLength < message.length) {
        return false;
    } else {
        return true;
    }
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
