import { FullMessage_GeneralMessage_spans, FullMessage_ServiceMessage_spans, UserTiny } from 'openland-api/Types';

type SpanType = 'link' | 'text' | 'new_line' | 'mention_user' | 'mention_users' | 'mention_room' | 'bold' | 'date' | 'code_block' | 'code_inline' | 'insane' | 'irony' | 'italic' | 'loud' | 'rotating';

export type Span = SpanUser | SpanRoom | SpanText | SpanLink | SpanUsers | SpanBold | SpanDate | SpanCodeBlock | SpanCodeInline | SpanInsane | SpanIrony | SpanItalic | SpanLoud | SpanRotating;

interface SpanAbs {
    type: SpanType;
    text?: string;
}

export interface SpanText extends SpanAbs {
    type: 'text' | 'new_line';
}

export interface SpanBold extends SpanAbs {
    type: 'bold';
}

export interface SpanCodeBlock extends SpanAbs {
    type: 'code_block';
}

export interface SpanCodeInline extends SpanAbs {
    type: 'code_inline';
}

export interface SpanInsane extends SpanAbs {
    type: 'insane';
}

export interface SpanIrony extends SpanAbs {
    type: 'irony';
}

export interface SpanItalic extends SpanAbs {
    type: 'italic';
}

export interface SpanLoud extends SpanAbs {
    type: 'loud';
}

export interface SpanRotating extends SpanAbs {
    type: 'rotating';
}

export interface SpanDate extends SpanAbs {
    type: 'date';
    date: string;
}

export interface SpanLink extends SpanAbs {
    type: 'link';
    link: string;
}

export interface SpanUser extends SpanAbs {
    type: 'mention_user';
    name: string;
    id: string;
}

export interface SpanUsers extends SpanAbs {
    type: 'mention_users';
    users: UserTiny[];
}

export interface SpanRoom extends SpanAbs {
    type: 'mention_room';
    title: string;
    id: string;
}

const cropSpecSymbols = (text: string, symbol: string) => {
    let res = text;

    if (res.startsWith(symbol) && res.endsWith(symbol)) {
        // remove first symbol
        res = res.replace(symbol, '');
        // remove last symbol
        res = res.substr(0, res.lastIndexOf(symbol));
    }

    return res;
};

function preprocessRawText(text: string, spans?: (FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans)[]): Span[] {
    let res: Span[] = [];
    for (let p of text.split('\n')) {
        if (res.length > 0) {
            res.push({
                type: 'new_line'
            });
        }
        res.push({
            type: 'text',
            text: p
        });
    }
    return res;
}

function preprocessSpans(text: string, spans: (FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans)[]): Span[] {
    let res: Span[] = [];
    spans = spans.sort((a, b) => a.offset - b.offset);

    let offset = 0;
    for (let s of spans) {
        let raw = text.substr(offset, s.offset - offset);
        if (raw) {
            res.push(...preprocessRawText(raw));
        }
        let spanText = text.substr(s.offset, s.length);
        let span: Span;

        if (s.__typename === 'MessageSpanLink') {
            span = { type: 'link', link: s.url };
        } else if (s.__typename === 'MessageSpanUserMention') {
            spanText = spanText.replace('@', '');
            span = { type: 'mention_user', name: s.user.name, id: s.user.id }
        } else if (s.__typename === 'MessageSpanRoomMention') {
            span = { type: 'mention_room', title: s.room.__typename === 'SharedRoom' ? s.room.title : s.room.user.name, id: s.room.id }
        } else if (s.__typename === 'MessageSpanMultiUserMention') {
            span = { type: 'mention_users', users: s.users }
        } else if (s.__typename === 'MessageSpanBold') {
            spanText = cropSpecSymbols(spanText, '*');
            span = { type: 'bold' }
        } else if (s.__typename === 'MessageSpanDate') {
            span = { type: 'date', date: s.date }
        } else if (s.__typename === 'MessageSpanCodeBlock') {
            // spanText = cropSpecSymbols(spanText, '```');
            span = { type: 'code_block' }
        } else if (s.__typename === 'MessageSpanInlineCode') {
            // spanText = cropSpecSymbols(spanText, '`');
            span = { type: 'code_inline' }
        } else if (s.__typename === 'MessageSpanInsane') {
            // spanText = cropSpecSymbols(spanText, '🌈');
            span = { type: 'insane' }
        } else if (s.__typename === 'MessageSpanIrony') {
            spanText = cropSpecSymbols(spanText, '~');
            span = { type: 'irony' }
        } else if (s.__typename === 'MessageSpanItalic') {
            spanText = cropSpecSymbols(spanText, '_');
            span = { type: 'italic' }
        } else if (s.__typename === 'MessageSpanLoud') {
            spanText = cropSpecSymbols(spanText, ':');
            span = { type: 'loud' }
        } else if (s.__typename === 'MessageSpanRotating') {
            // spanText = cropSpecSymbols(spanText, '🔄');
            span = { type: 'rotating' }
        } else {
            span = { type: 'text' };
        }

        span.text = spanText;
        res.push(span);
        offset = s.offset + s.length;
    }

    let rawLast = text.substr(offset, text.length - offset);
    res.push(...preprocessRawText(rawLast));

    return res;
}

export function preprocessText(text: string, spans?: (FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans)[]): Span[] {
    let res: Span[] = [];
    let offset = 0;

    if (offset < text.length) {
        res.push(...preprocessSpans(text, spans || []));
    }

    // Special case for empty string
    if (res.length === 0) {
        res.push({
            type: 'text',
            text: ''
        });
    }

    return res;
}