import { MessageSpanType, MessageSpanInput } from 'openland-api/Types';

const whiteListBeforeSpec = ['', ' ', '\n', ',', '.', '(', ')'];
const spanMap: { [key: string]: MessageSpanType } = {
    '*': MessageSpanType.Bold,
    '```': MessageSpanType.CodeBlock,
    '`': MessageSpanType.InlineCode,
    '🌈': MessageSpanType.Insane,
    '~': MessageSpanType.Irony,
    '_': MessageSpanType.Italic,
    ':': MessageSpanType.Loud,
    '🔄': MessageSpanType.Rotating,
};

const getCurrentSymbol = (text: string, index: number, isOpened: boolean): string | false => {
    let isSpec = false;
    let symbol = '';

    for (let s in spanMap) {
        if (s === text.slice(index, index + s.length)) {
            isSpec = true;
            symbol = s;

            break;
        }
    }

    if (isSpec) {
        const arroundSymbolIndex = isOpened ? (index + symbol.length) : (index - 1);

        return whiteListBeforeSpec.includes(text.charAt(arroundSymbolIndex)) ? symbol : false;
    }

    return false;
}

export const findSpans = (text: string): MessageSpanInput[] => {
    let res: MessageSpanInput[] = [];

    let currentSpecSymbol = '';
    let isOpened = false;
    let lastPos = 0;

    for (var i = 0; i < text.length; i++) {
        let mayBeSymbol = getCurrentSymbol(text, i, isOpened);

        if (typeof mayBeSymbol === 'string') {
            if (currentSpecSymbol === '') {
                currentSpecSymbol = mayBeSymbol;
                isOpened = true;
                lastPos = i;
            } else if ((currentSpecSymbol === mayBeSymbol) && isOpened) {
                res.push({
                    type: spanMap[currentSpecSymbol],
                    offset: lastPos,
                    length: i - lastPos + currentSpecSymbol.length
                });

                isOpened = false;
                currentSpecSymbol = '';
                lastPos = i;
            }
        }
    }

    return res;
}