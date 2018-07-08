import linkify from 'linkify-it';
import tlds from 'tlds';

export interface Span {
    type: 'link' | 'text' | 'new_line';
    text?: string;
    link?: string;
}

let linkifyInstance = linkify()
    .tlds(tlds)
    .tlds('onion', true);

function preprocessSpaces(text: string): string {
    let res = text;
    // while (res.indexOf(' ') >= 0) {
    //     res = res.replace(' ', '\u00A0');
    // }
    return res;
}

function preprocessRawText(text: string): Span[] {
    let res: Span[] = [];
    for (let p of text.split('\n')) {
        if (res.length > 0) {
            res.push({
                type: 'new_line'
            });
        }
        res.push({
            type: 'text',
            text: preprocessSpaces(p)
        });
    }
    return res;
}

export function preprocessText(text: string): Span[] {
    let res: Span[] = [];
    let offset = 0;
    let links = linkifyInstance.match(text);
    if (links !== null) { // Typings are weird
        for (let l of links) {
            if (l.index > offset) {
                res.push(...preprocessRawText(text.substring(offset, l.index)));
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
        res.push(...preprocessRawText(text.substring(offset, text.length)));
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