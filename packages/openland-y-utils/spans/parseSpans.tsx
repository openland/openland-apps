import { MessageSpanInput } from 'openland-api/Types';
import { WhiteListAroundSpec, SpanSymbolToType } from './Span';

const _getCurrentSymbol = (text: string, index: number, open: boolean): string | false => {
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
        const arroundSymbolIndex = (!open) ? (index + symbol.length) : (index - 1);

        return WhiteListAroundSpec.includes(text.charAt(arroundSymbolIndex)) ? symbol : false;
    }

    return false;
}

export const parseSpans = (text: string): MessageSpanInput[] => {
    let res: MessageSpanInput[] = [];

    let openSpans: ({ symbol: string, offset: number, used: boolean })[] = [];
    let closeSpans: ({ symbol: string, offset: number, used: boolean })[] = [];

    for (var i = 0; i < text.length; i++) {
        let mayBeOpenSymbol = _getCurrentSymbol(text, i, true);
        let mayBeCloseSymbol = _getCurrentSymbol(text, i, false);

        if (typeof mayBeOpenSymbol === 'string') {
            openSpans.push({
                symbol: mayBeOpenSymbol,
                offset: i,
                used: false,
            });
        } else if (typeof mayBeCloseSymbol === 'string') {
            closeSpans.push({
                symbol: mayBeCloseSymbol,
                offset: i,
                used: false,
            });
        }
    }

    openSpans.map((o) => {
        closeSpans.map((c) => {
            if (c.symbol === o.symbol && c.offset > o.offset && !c.used && !o.used) {
                c.used = true;
                o.used = true;

                res.push({
                    type: SpanSymbolToType[o.symbol].type,
                    offset: o.offset,
                    length: c.offset - o.offset + o.symbol.length
                });
            }
        });
    });

    return res;
}