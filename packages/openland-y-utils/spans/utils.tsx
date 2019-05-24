import { ServerSpan, Span, SpanTypeToSymbol } from './Span';
import { TextRenderProccessor } from 'openland-y-runtime/TextRenderProcessor';

export const findChildSpans = (
    spans: ServerSpan[],
    parent: ServerSpan,
): { lastIndex: number; childs: ServerSpan[] } => {
    let childs: ServerSpan[] = [];

    for (var i = 0; i < spans.length; i++) {
        const span = spans[i];

        if (
            span.offset >= parent.offset &&
            span.offset + span.length <= parent.offset + parent.length
        ) {
            childs.push(span);
        } else {
            break;
        }
    }

    return { childs, lastIndex: i };
};

export const convertServerSpan = (text: string, s: ServerSpan): Span => {
    const { offset, length } = s;
    let spanText = text.substr(s.offset, s.length);
    let span: Span;

    if (s.__typename === 'MessageSpanLink') {
        span = { offset, length, type: 'link', link: s.url };
    } else if (s.__typename === 'MessageSpanUserMention') {
        span = { offset, length, type: 'mention_user', user: s.user };
    } else if (s.__typename === 'MessageSpanRoomMention') {
        span = {
            offset,
            length,
            type: 'mention_room',
            title: s.room.__typename === 'SharedRoom' ? s.room.title : s.room.user.name,
            id: s.room.id,
        };
    } else if (s.__typename === 'MessageSpanMultiUserMention') {
        span = { offset, length, type: 'mention_users', users: s.users };
    } else if (s.__typename === 'MessageSpanAllMention') {
        span = { offset, length, type: 'mention_all' };
    } else if (s.__typename === 'MessageSpanBold') {
        span = { offset, length, type: 'bold' };
    } else if (s.__typename === 'MessageSpanDate') {
        span = { offset, length, type: 'date', date: s.date };
    } else if (s.__typename === 'MessageSpanCodeBlock') {
        span = { offset, length, type: 'code_block' };
    } else if (s.__typename === 'MessageSpanInlineCode') {
        span = { offset, length, type: 'code_inline' };
    } else if (s.__typename === 'MessageSpanInsane') {
        span = { offset, length, type: 'insane' };
    } else if (s.__typename === 'MessageSpanIrony') {
        span = { offset, length, type: 'irony' };
    } else if (s.__typename === 'MessageSpanItalic') {
        span = { offset, length, type: 'italic' };
    } else if (s.__typename === 'MessageSpanLoud') {
        span = { offset, length, type: 'loud' };
    } else if (s.__typename === 'MessageSpanRotating') {
        span = { offset, length, type: 'rotating' };
    } else {
        span = { offset, length, type: 'text', text: TextRenderProccessor.processSpan('text', spanText) };
    }

    span.textRaw = spanText;

    return span;
};

export const preprocessRawText = (text: string, startOffset: number, parent: Span): Span[] => {
    let res: Span[] = [];
    let garbageString = '';
    let rows = text.split('\n');
    const isBigParent = parent.type === 'loud' || parent.type === 'rotating' || parent.type === 'insane';

    rows.map((p, i) => {
        if (p.length > 0) {
            res.push({
                type: 'text',
                textRaw: p,
                text: TextRenderProccessor.processSpan(parent.type, p, isBigParent ? 'big' : 'default'),
                length: p.length,
                offset: startOffset + garbageString.length,
            });
        }

        if (i !== rows.length - 1) {
            res.push({
                type: 'new_line',
                length: 0,
                offset: startOffset + garbageString.length,
            });
        }

        garbageString += p;
    });

    return res;
};

export const getTextSpans = (text: string, parent: Span): Span[] => {
    let res: Span[] = [];
    let offset = 0;

    let slicedText = text.substr(parent.offset, parent.length);

    for (let s of parent.childrens || []) {
        let rawFirst = slicedText.substr(offset, s.offset - parent.offset - offset);

        if (rawFirst) {
            res.push(...preprocessRawText(rawFirst, offset + parent.offset, parent));
        }

        offset = s.offset - parent.offset + s.length;
    }

    let rawLast = slicedText.slice(offset);

    if (rawLast) {
        res.push(...preprocessRawText(rawLast, offset + parent.offset, parent));
    }

    let symbolObject = SpanTypeToSymbol[parent.type];

    if (symbolObject) {
        res = TextRenderProccessor.cropSpecSymbols(res, parent, symbolObject);
    }

    return res;
};

type SpansSliceType = 'slice' | 'code_block' | 'loud' | 'emoji';

interface SpansSlice {
    type: SpansSliceType;
    spans: Span[];
    padded: boolean;
}

export const getSpansSlices = (spans: Span[], usePadded?: boolean): SpansSlice[] => {
    let res: SpansSlice[] = [];

    while (spans.findIndex(v => ['code_block', 'loud', 'emoji'].includes(v.type)) >= 0) {
        let index = spans.findIndex(v => ['code_block', 'loud', 'emoji'].includes(v.type));
        let type: SpansSliceType = spans[index].type as any;

        // before current code-block/loud
        if (index > 0) {
            res.push({
                type: 'slice',
                spans: spans.slice(0, index),
                padded: false,
            });
        }

        // current code-block/loud
        res.push({
            type: type,
            spans: [spans[index]],
            padded: index === spans.length - 1 && type !== 'code_block' ? !!usePadded : false,
        });

        spans = spans.slice(index + 1);
    }

    // after all code-blocks/louds
    if (spans.length > 0 || (!!usePadded && res[res.length - 1].type === 'code_block')) {
        res.push({
            type: 'slice',
            spans: spans,
            padded: !!usePadded,
        });
    }

    return res;
};
