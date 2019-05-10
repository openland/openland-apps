import { ServerSpan, Span, SpanTypeToSymbol } from './Span';
import { TextRenderProccessor } from 'openland-y-runtime/TextRenderProcessor';

export const findChildSpans = (spans: ServerSpan[], parent: ServerSpan): { lastIndex: number; childs: ServerSpan[] } => {
    let childs: ServerSpan[] = [];

    for (var i = 0; i < spans.length; i++) {
        const span = spans[i];

        if ((span.offset >= parent.offset) && (span.offset + span.length <= parent.offset + parent.length)) {
            childs.push(span);
        } else {
            break;
        }
    }

    return { childs, lastIndex: i };
}

export const convertServerSpan = (text: string, s: ServerSpan): Span => {
    const { offset, length } = s;
    let spanText = text.substr(s.offset, s.length);
    let span: Span;

    if (s.__typename === 'MessageSpanLink') {
        span = { offset, length, type: 'link', link: s.url };
    } else if (s.__typename === 'MessageSpanUserMention') {
        span = { offset, length, type: 'mention_user', user: s.user }
    } else if (s.__typename === 'MessageSpanRoomMention') {
        span = { offset, length, type: 'mention_room', title: s.room.__typename === 'SharedRoom' ? s.room.title : s.room.user.name, id: s.room.id }
    } else if (s.__typename === 'MessageSpanMultiUserMention') {
        span = { offset, length, type: 'mention_users', users: s.users }
    } else if (s.__typename === 'MessageSpanBold') {
        span = { offset, length, type: 'bold' }
    } else if (s.__typename === 'MessageSpanDate') {
        span = { offset, length, type: 'date', date: s.date }
    } else if (s.__typename === 'MessageSpanCodeBlock') {
        span = { offset, length, type: 'code_block' }
    } else if (s.__typename === 'MessageSpanInlineCode') {
        span = { offset, length, type: 'code_inline' }
    } else if (s.__typename === 'MessageSpanInsane') {
        span = { offset, length, type: 'insane' }
    } else if (s.__typename === 'MessageSpanIrony') {
        span = { offset, length, type: 'irony' }
    } else if (s.__typename === 'MessageSpanItalic') {
        span = { offset, length, type: 'italic' }
    } else if (s.__typename === 'MessageSpanLoud') {
        span = { offset, length, type: 'loud' }
    } else if (s.__typename === 'MessageSpanRotating') {
        span = { offset, length, type: 'rotating' }
    } else {
        span = { offset, length, type: 'text', textRaw: spanText };
    }

    span.textRaw = spanText;

    return span;
}

export const preprocessRawText = (text: string, startOffset: number): Span[] => {
    let res: Span[] = [];

    let garbageString = '';

    for (let p of text.split('\n')) {
        if (res.length > 0) {
            res.push({
                type: 'new_line',
                length: 0,
                offset: startOffset + garbageString.length
            });
        }

        res.push({
            type: 'text',
            textRaw: p,
            text: TextRenderProccessor.emojify(p),
            length: p.length,
            offset: startOffset + garbageString.length
        });

        garbageString += p;
    }

    return res;
}

export const getTextSpans = (text: string, parent: Span): Span[] => {
    let res: Span[] = [];
    let offset = 0;

    let slicedText = text.substr(parent.offset, parent.length);

    for (let s of parent.childrens || []) {
        let rawFirst = slicedText.substr(offset, (s.offset - parent.offset) - offset);

        if (rawFirst) {
            res.push(...preprocessRawText(rawFirst, offset + parent.offset));
        }

        offset = (s.offset - parent.offset) + s.length;
    }

    let rawLast = slicedText.slice(offset);

    if (rawLast) {
        res.push(...preprocessRawText(rawLast, offset + parent.offset));
    }

    let symbolObject = SpanTypeToSymbol[parent.type];

    if (symbolObject) {
        res = TextRenderProccessor.cropSpecSymbols(res, symbolObject.symbol, symbolObject.opened);
    }

    return res;
}