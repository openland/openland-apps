import { MessageSpanType, MessageSpanInput } from 'openland-api/Types';

const whiteListBeforeSpec = ['', ' ', '\n', ',', '.', '(', ')'];

const spanMap: { [key: string]: { type: MessageSpanType, master?: boolean }} = {
    '*': { type: MessageSpanType.Bold },
    '```': { type: MessageSpanType.CodeBlock, master: true },
    '`': { type: MessageSpanType.InlineCode },
    '🌈': { type: MessageSpanType.Insane },
    '~': { type: MessageSpanType.Irony },
    '_': { type: MessageSpanType.Italic },
    ':': { type: MessageSpanType.Loud },
    '🔄': { type: MessageSpanType.Rotating },
};

const getCurrentSymbol = (text: string, index: number, currentSpecSymbol: string): string | false => {
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
        const arroundSymbolIndex = (currentSpecSymbol === symbol) ? (index + symbol.length) : (index - 1);

        return whiteListBeforeSpec.includes(text.charAt(arroundSymbolIndex)) ? symbol : false;
    }

    return false;
}

const isSpanMaster = (symbol: string) => {
    return spanMap[symbol] ? !!spanMap[symbol].master : false;
}

export const findSpans = (text: string): MessageSpanInput[] => {
    let res: MessageSpanInput[] = [];

    let currentSpecSymbol = '';
    let lastPos = 0;

    for (var i = 0; i < text.length; i++) {
        let mayBeSymbol = getCurrentSymbol(text, i, currentSpecSymbol);

        if (typeof mayBeSymbol === 'string') {
            if (mayBeSymbol !== currentSpecSymbol) {
                if (!isSpanMaster(currentSpecSymbol)) {
                    currentSpecSymbol = mayBeSymbol;
                    lastPos = i;
                }
            } else {
                res.push({
                    type: spanMap[currentSpecSymbol].type,
                    offset: lastPos,
                    length: i - lastPos + currentSpecSymbol.length
                });

                currentSpecSymbol = '';
                lastPos = 0;
            }
        }
    }

    return res;
}