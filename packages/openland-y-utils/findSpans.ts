import { MessageSpanInput, FullMessage_GeneralMessage_spans } from 'openland-api/Types';
import { SpanSymbolToType } from './spans/Span';

const whiteListBeforeSpec = ['', ' ', '\n', ',', '.', '(', '<', '"', '«', '{', '['];
const whiteListAfterSpec = ['', ' ', '\n', ',', '.', '!', '?', ')', ':', '>', '"', '»', '}', ']', '¿', '¡'];

const spanInputMap = {
    'Bold': 'MessageSpanBold',
    'CodeBlock': 'MessageSpanCodeBlock',
    'InlineCode': 'MessageSpanInlineCode',
    'Insane': 'MessageSpanInsane',
    'Irony': 'MessageSpanIrony',
    'Italic': 'MessageSpanItalic',
    'Loud': 'MessageSpanLoud',
    'Rotating': 'MessageSpanRotating',
};

const getCurrentSymbol = (text: string, index: number, currentSpecSymbol: string): string | false => {
    let isSpec = false;
    let symbol = '';

    for (let s in SpanSymbolToType) {
        if (s === text.slice(index, index + s.length)) {
            isSpec = true;
            symbol = s;

            break;
        }
    }

    if (isSpec) {
        if (currentSpecSymbol === symbol) {
            return whiteListAfterSpec.includes(text.charAt(index + symbol.length)) ? symbol : false
        } else {
            return whiteListBeforeSpec.includes(text.charAt(index - 1)) ? symbol : false;
        }
    }

    return false;
}

const isSpanMaster = (symbol: string) => {
    return SpanSymbolToType[symbol] ? !!SpanSymbolToType[symbol].master : false;
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
                const spanLength = i - lastPos + currentSpecSymbol.length;

                if (spanLength > currentSpecSymbol.length * 2) {
                    res.push({
                        type: SpanSymbolToType[currentSpecSymbol].type,
                        offset: lastPos,
                        length: i - lastPos + currentSpecSymbol.length
                    });
                }

                currentSpecSymbol = '';
                lastPos = 0;
            }
        }

        if (text.charAt(i) === '\n' && !isSpanMaster(currentSpecSymbol)) {
            currentSpecSymbol = '';
            lastPos = 0;
        }
    }

    return res;
}

export const prepareLegacySpans = (spans: MessageSpanInput[]): FullMessage_GeneralMessage_spans[] => {
    let res: FullMessage_GeneralMessage_spans[] = [];

    spans.map(span => {
        res.push({
            __typename: spanInputMap[span.type] as any,
            offset: span.offset,
            length: span.length
        });
    });

    return res;
}