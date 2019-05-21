import { TextRenderProccessor } from 'openland-y-runtime/TextRenderProcessor';
import { Span, SpecSymbolsType } from './Span';

export const cropSpecSymbols = (spans: Span[], parent: Span, symbols: SpecSymbolsType[]): Span[] => {
    const isBigParent = parent.type === 'loud' || parent.type === 'rotating' || parent.type === 'insane';

    let currentSymbol: string | undefined = undefined;
    let isOpened: boolean | undefined = undefined;

    // remove first symbol
    if (spans[0] && spans[0].type === 'text' && spans[0].textRaw) {
        symbols.map(symbol => {
            if (spans[0].textRaw!.startsWith(symbol.s)) {
                currentSymbol = symbol.s;
                isOpened = symbol.opened;
            }
        });

        if (typeof currentSymbol === 'string') {
            spans[0].textRaw = spans[0].textRaw.replace(currentSymbol, '');
    
            if (spans[0].textRaw!.length <= 0) {
                spans = spans.slice(1);
    
                // remove first line-breaker
                if (spans[0] && spans[0].type === 'new_line') {
                    spans = spans.slice(1);
                }
            } else {
                spans[0].text = TextRenderProccessor.emojify(spans[0].textRaw, isBigParent)
            }
        }
    }

    if (!isOpened) {
        // remove last symbol
        const last = spans.length - 1;

        if (spans[last] && spans[last].type === 'text' && spans[last].textRaw) {
            if (typeof currentSymbol === 'string' && spans[last].textRaw!.endsWith(currentSymbol)) {
                const text = spans[last].textRaw!;

                spans[last].textRaw = text.substr(0, text.lastIndexOf(currentSymbol));
        
                if (spans[last].textRaw!.length <= 0) {
                    spans.pop();
                } else {
                    spans[last].text = TextRenderProccessor.emojify(spans[last].textRaw!, isBigParent)
                }
            }
        }

        if (parent.type === 'code_block') {
            const lastInCode = spans.length - 1;

            if (spans[lastInCode] && spans[lastInCode].type === 'new_line') {
                spans.pop();
            }
        }
    }

    return spans;
};