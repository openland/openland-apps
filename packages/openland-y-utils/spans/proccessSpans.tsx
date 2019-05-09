import { Span, ServerSpan } from 'openland-y-utils/spans/Span';

const _findChildSpans = (spans: ServerSpan[], parent: ServerSpan): { lastIndex: number; childs: ServerSpan[] } => {
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

const _convertServerSpan = (text: string, s: ServerSpan): Span => {
    const { offset, length } = s;
    let spanText = text.substr(s.offset, s.length);
    let span: Span;

    if (s.__typename === 'MessageSpanLink') {
        span = { offset, length, type: 'link', link: s.url };
    } else if (s.__typename === 'MessageSpanUserMention') {
        // spanText = spanText.replace('@', '');
        span = { offset, length, type: 'mention_user', name: s.user.name, id: s.user.id }
    } else if (s.__typename === 'MessageSpanRoomMention') {
        span = { offset, length, type: 'mention_room', title: s.room.__typename === 'SharedRoom' ? s.room.title : s.room.user.name, id: s.room.id }
    } else if (s.__typename === 'MessageSpanMultiUserMention') {
        span = { offset, length, type: 'mention_users', users: s.users }
    } else if (s.__typename === 'MessageSpanBold') {
        // spanText = cropSpecSymbols(spanText, '*');
        span = { offset, length, type: 'bold' }
    } else if (s.__typename === 'MessageSpanDate') {
        span = { offset, length, type: 'date', date: s.date }
    } else if (s.__typename === 'MessageSpanCodeBlock') {
        // spanText = cropSpecSymbols(spanText, '```');
        span = { offset, length, type: 'code_block' }
    } else if (s.__typename === 'MessageSpanInlineCode') {
        // spanText = cropSpecSymbols(spanText, '`');
        span = { offset, length, type: 'code_inline' }
    } else if (s.__typename === 'MessageSpanInsane') {
        // spanText = cropSpecSymbols(spanText, '🌈');
        span = { offset, length, type: 'insane' }
    } else if (s.__typename === 'MessageSpanIrony') {
        // spanText = cropSpecSymbols(spanText, '~');
        span = { offset, length, type: 'irony' }
    } else if (s.__typename === 'MessageSpanItalic') {
        // spanText = cropSpecSymbols(spanText, '_');
        span = { offset, length, type: 'italic' }
    } else if (s.__typename === 'MessageSpanLoud') {
        // spanText = cropSpecSymbols(spanText, ':');
        span = { offset, length, type: 'loud' }
    } else if (s.__typename === 'MessageSpanRotating') {
        // spanText = cropSpecSymbols(spanText, '🔄');
        span = { offset, length, type: 'rotating' }
    } else {
        span = { offset, length, type: 'text', text: spanText };
    }

    return span;
}

const _preprocessRawText = (text: string, startOffset: number): Span[] => {
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
            text: p,
            length: p.length,
            offset: startOffset + garbageString.length
        });

        garbageString += p;
    }

    return res;
}

const _addTextSpans = (text: string, deltaOffset: number, spans: Span[]): Span[] => {
    let res: Span[] = [];
    let offset = 0;

    for (let s of spans) {
        let raw = text.substr(offset, (s.offset - deltaOffset) - offset);
        if (raw) {
            res.push(..._preprocessRawText(raw, offset + deltaOffset));
        }

        offset = (s.offset - deltaOffset) + s.length;
    }

    let rawLast = text.slice(offset);
    res.push(..._preprocessRawText(rawLast, offset + deltaOffset));

    return res;
}

const _recursiveProcessing = (text: string, spans: ServerSpan[]): Span[] => {
    let res: Span[] = [];

    if (spans.length > 0) {
        const span = spans[0];

        const { childs, lastIndex } = _findChildSpans(spans.slice(1), span);

        let currentSpan: Span = {
            ..._convertServerSpan(text, span),

            childrens: _recursiveProcessing(text, childs),
        }

        const sliceOfText = text.substr(span.offset, span.length);
        const textSpans = _addTextSpans(sliceOfText, span.offset, currentSpan.childrens || []);

        currentSpan.childrens = (currentSpan.childrens || []).concat(textSpans).sort((a, b) => a.offset - b.offset);

        res = [...[currentSpan], ..._recursiveProcessing(text, spans.slice(lastIndex + 1))];
    }

    return res;
}

export const processSpans = (text: string, spans: ServerSpan[]): Span[] => {
    console.clear();

    let res: Span[] = [];

    let sortedSpans = spans.sort((a, b) => ((a.offset - b.offset) * 100000) + (b.length - a.length));
    let rootSpan = [{ offset: 0, length: text.length }];

    spans = [...rootSpan as any, ...sortedSpans];

    res = _recursiveProcessing(text, spans)[0].childrens!;

    return res;
}