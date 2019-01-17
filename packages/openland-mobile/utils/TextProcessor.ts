import linkify from 'linkify-it';
import tlds from 'tlds';
import { MessageFull_mentions } from 'openland-api/Types';
import { string } from 'prop-types';

export interface Span {
    type: 'link' | 'text' | 'new_line' | 'mention_user' | 'mention_room';
    text?: string;
    link?: string;
}

let linkifyInstance = linkify()
    .tlds(tlds)
    .tlds('onion', true);

function preprocessRawText(text: string, mentions?: MessageFull_mentions[]): Span[] {
    let res: Span[] = [];
    for (let p of text.split('\n')) {
        if (res.length > 0) {
            res.push({
                type: 'new_line'
            });
        }
        if (mentions) {
            res.push(...preprocessMentions(p, mentions!));
        } else {
            res.push({
                type: 'text',
                text: p
            });
        }
    }
    return res;
}

function preprocessMentions(text: string, mentions: MessageFull_mentions[]): Span[] {
    let res: Span[] = [];

    for (let m of mentions) {
        // let mention: undefined | { str: string, type: 'mention_user' | 'mention_room' } = undefined;
        // if (m.__typename === 'UserMention') {
        //     mention = { str: m.user.name, type: 'mention_user' };
        // } else if (m.__typename === 'SharedRoomMention') {
        //     mention = { str: m.sharedRoom.title, type: 'mention_room' };
        // }

        let mention: undefined | { str: string, type: 'mention_user' | 'mention_room' } = { str: m.name, type: 'mention_user' };

        console.warn('boom', text, m);

        if (mention && text.includes('@' + mention.str)) {
            let split = text.split('@' + mention.str);
            for (let s of split) {
                res.push(...preprocessMentions(s, mentions));
                res.push({
                    type: mention.type,
                    text: mention.str,
                    link: m.id
                });
            }
            res.pop();
            break;
        }
    }
    if (res.length === 0) {
        res.push({
            type: 'text',
            text: text
        });
    }
    return res;
}

export function preprocessText(text: string, mentions?: MessageFull_mentions[]): Span[] {
    let res: Span[] = [];
    let offset = 0;
    let links = linkifyInstance.match(text);
    if (links !== null) { // Typings are weird
        for (let l of links) {
            if (l.index > offset) {
                res.push(...preprocessRawText(text.substring(offset, l.index), mentions));
            }
            res.push({
                type: 'link',
                text: l.text,
                link: l.url
            });
            offset = l.lastIndex;
        }
    }
    if (offset < text.length) {
        res.push(...preprocessRawText(text.substring(offset, text.length), mentions));
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