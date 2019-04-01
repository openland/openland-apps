import linkify from 'linkify-it';
import tlds from 'tlds';
import { FullMessage_GeneralMessage_spans, FullMessage_ServiceMessage_spans } from 'openland-api/Types';
import { Stopwatch } from 'openland-y-utils/stopwatch';

type SpanType = 'link' | 'text' | 'new_line' | 'mention_user' | 'mention_users' | 'mention_room';

export type Span = SpanUser | SpanRoom | SpanText | SpanLink | SpanUsers;
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

export interface SpanUsers extends SpanAbs {
    type: 'mention_users';
    users: {
        name: string;
        id: string;
    }[];
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
        res.push({
            type: 'text',
            text: p
        });
    }
    return res;
}

function preprocessMentions(text: string, spans: (FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans)[]): Span[] {
    // let sw = new Stopwatch('preprocessMentions');
    // sw.next('preprocessMentions');
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
            span = { type: 'mention_users', users: s.users.map(u => ({ name: u.name, id: u.id })) }
        } else {
            span = { type: 'text' };
        }
        span.text = spanText;
        res.push(span);
        offset = s.offset + s.length;
    }

    let rawLast = text.substr(offset, text.length - offset);
    res.push(...preprocessRawText(rawLast));

    // sw.next();
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
        res.push(...preprocessMentions(text, spans || []));
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