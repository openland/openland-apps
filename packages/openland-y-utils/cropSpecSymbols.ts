import { TextRenderProccessor } from 'openland-y-runtime/TextRenderProcessor';
import { Span } from './spans/Span';

export const cropSpecSymbols = (spans: Span[], symbol: string, opened?: boolean): Span[] => {
    // remove first symbol
    if (spans[0] && spans[0].type === 'text' && spans[0].textRaw && spans[0].textRaw.startsWith(symbol)) {
        spans[0].textRaw = spans[0].textRaw.replace(symbol, '');

        if (spans[0].textRaw.length <= 0) {
            spans = spans.slice(1);

            // remove first line-breaker
            if (spans[0] && spans[0].type === 'new_line') {
                spans = spans.slice(1);
            }
        } else {
            spans[0].text = TextRenderProccessor.emojify(spans[0].textRaw)
        }
    }

    if (!opened) {
        // remove last symbol
        const last = spans.length - 1;

        if (spans[last] && spans[last].type === 'text' && spans[last].textRaw && spans[last].textRaw!.endsWith(symbol)) {
            const text = spans[last].textRaw!;

            spans[last].textRaw = text.substr(0, text.lastIndexOf(symbol));
    
            if (spans[last].textRaw!.length <= 0) {
                spans.pop();
            } else {
                spans[last].text = TextRenderProccessor.emojify(spans[last].textRaw!)
            }
        }
    }

    return spans;
};