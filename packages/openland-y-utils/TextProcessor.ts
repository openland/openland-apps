import linkify from 'linkify-it';
import tlds from 'tlds';

export interface Span {
    type: 'link' | 'text' | 'hashtag' | 'new_line';
    text?: string;
    link?: string;
    hashtag?: string;
}

let isTelSymbol = (s: string) => s === '+' || Number.isInteger(parseInt(s, 10));

let linkifyInstance = linkify()
    .add('tel:', {
        validate: (text, pos, self) => {
            let tail = text.slice(pos);
            let split = tail.split(' ');
            split = split.filter((str) => [...str].every((s) => isTelSymbol(s)));
            if (split.length > 1) {
                return split.join(' ').length;
            }
            return tail.length;
        },
        normalize: ((match: any) => {
            match.text = match.url.replace('tel:', '');
        }) as any,
    })
    .tlds(tlds)
    .tlds('onion', true);

export function useNonBreakingSpaces(text?: string): string | undefined {
    if (typeof text === 'string') {
        return text.replace(/ /g, '\u00a0');
    }

    return text;
}

const hashTagRegexp = /#([a-zA-Zа-яА-ЯёЁ\d_]+)/gm;

function preprocessRawText(text: string): Span[] {
    let res: Span[] = [];
    for (let p of text.split('\n')) {
        if (res.length > 0) {
            res.push({
                type: 'new_line',
            });
        }
        p.split(' ').forEach(i => {
            if (i.match(hashTagRegexp)) {
                res.push({
                    type: 'hashtag',
                    text: i.trim(),
                    hashtag: i.trim(),
                });
            } else {
                res.push({
                    type: 'text',
                    text: i.trim(),
                });
            }
            res.push({
                type: 'text',
                text: ' ',
            });
        });
    }
    return res;
}

export function preprocessText(text: string): Span[] {
    let res: Span[] = [];
    let offset = 0;
    let links = linkifyInstance.match(text);

    if (links !== null) {
        // Typings are weird
        for (let l of links) {
            if (l.index > offset) {
                res.push(...preprocessRawText(text.substring(offset, l.index - 1)));
            }
            res.push({
                type: 'link',
                text: l.text,
                link: l.url,
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
            text: '',
        });
    }
    return res;
}
