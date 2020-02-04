import { isEmoji } from 'openland-y-utils/isEmoji';
import { SpanType } from './Span';

const whiteSpaceRegEx = /\s/g;
const zeroWidthJoinerRegEx = /\u200D/;

// https://github.com/mathiasbynens/unicode-12.1.0/blob/master/Binary_Property/Emoji_Modifier_Base/regex.js
const emojiModifierBaseRegEx = /[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD]/;
// Modified version of: https://github.com/mathiasbynens/unicode-12.1.0/tree/master/Binary_Property/Emoji_Modifier/regex.js, https://github.com/mathiasbynens/unicode-12.1.0/tree/master/Binary_Property/Emoji_Component/regex.js
const emojiModifierRegEx = /[\u2640\u2642\u26A2-\u26A7]|\uD83C[\uDFFB-\uDFFF]|[\u200D\u20E3\uFE0F]|\uD83C[\uDDE6-\uDDFF\uDFFB-\uDFFF]|\uD83E[\uDDB0-\uDDB3]|\uDB40[\uDC20-\uDC7F]/;

export function emojiChecker(messageText: string) {
    if (isEmoji(messageText)) {
        return true;
    }

    const messageArray = Array.from(messageText.replace(whiteSpaceRegEx, ''));
    let isPrevZeroJoiner;

    for (let i = 0; i < messageArray.length; i++) {
        let item = messageArray[i];
        if (emojiModifierBaseRegEx.test(item)) {
            if (isPrevZeroJoiner) {
                isPrevZeroJoiner = false;
                continue;
            }
        }
        if (zeroWidthJoinerRegEx.test(item)) {
            isPrevZeroJoiner = true;
            continue;
        } else {
            isPrevZeroJoiner = false;
        }
        if (emojiModifierRegEx.test(item)) {
            continue;
        }
        if (!isEmoji(item)) {
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
