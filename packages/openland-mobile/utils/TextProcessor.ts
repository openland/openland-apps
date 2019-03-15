import linkify from 'linkify-it';
import tlds from 'tlds';
import { FullMessage_GeneralMessage_spans, FullMessage_ServiceMessage_spans } from 'openland-api/Types';

type SpanType = 'link' | 'text' | 'new_line' | 'mention_user' | 'mention_room';

export type Span = SpanUser | SpanRoom | SpanText | SpanLink;
interface SpanAbs {
    type: SpanType;
    text?: string;
    link?: string;
}

export interface SpanText extends SpanAbs {
    type: 'text' | 'new_line';
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

export interface SpanRoom extends SpanAbs {
    type: 'mention_room';
    title: string;
    id: string;
}

let linkifyInstance = linkify()
    .tlds(tlds)
    .tlds('onion', true);

function preprocessRawText(text: string, spans?: (FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans)[]): Span[] {
    let res: Span[] = [];
    for (let p of text.split('\n')) {
        if (res.length > 0) {
            res.push({
                type: 'new_line'
            });
        }
        if (spans) {
            res.push(...preprocessMentions(p, spans!));
        } else {
            res.push({
                type: 'text',
                text: p
            });
        }
    }
    return res;
}

function preprocessMentions(text: string, spans: (FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans)[]): Span[] {
    let res: Span[] = [];
    spans = spans.sort((a, b) => a.offset - b.offset);

    let offset = 0;
    console.warn('boom', text);
    for (let s of spans) {
        console.warn('boom', s);
        let raw = text.substr(offset, s.offset - offset);
        if (raw) {
            res.push({
                type: 'text',
                text: raw
            });
        }
        let spanText = text.substr(s.offset, s.length);
        let span: Span;
        if (s.__typename === 'MessageSpanLink') {
            span = { type: 'link', link: s.url };
        } else if (s.__typename === 'MessageSpanUserMention') {
            span = { type: 'mention_user', name: s.user.name, id: s.user.id }
        } else if (s.__typename === 'MessageSpanRoomMention') {
            span = { type: 'mention_room', title: s.room.__typename === 'SharedRoom' ? s.room.title : s.room.user.name, id: s.room.id }
        } else {
            span = { type: 'text' };
        }
        span.text = spanText;
        res.push(span);
        offset = s.offset + s.length;

    }
    let rawLast = text.substr(offset, text.length - offset);
    if (rawLast) {
        res.push({
            type: 'text',
            text: rawLast
        });
    }

    return res;
}

export function preprocessText(text: string, spans?: (FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans)[]): Span[] {
    // TODO: process spans instead of mentions
    let res: Span[] = [];
    let offset = 0;
    // let links = linkifyInstance.match(text);
    // if (links !== null) { // Typings are weird
    //     for (let l of links) {
    //         if (l.index > offset) {
    //             res.push(...preprocessRawText(text.substring(offset, l.index), spans));
    //         }
    //         res.push({
    //             type: 'link',
    //             text: l.text,
    //             link: l.url
    //         });
    //         offset = l.lastIndex;
    //     }
    // }
    if (offset < text.length) {
        res.push(...preprocessRawText(text.substring(offset, text.length), spans));
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