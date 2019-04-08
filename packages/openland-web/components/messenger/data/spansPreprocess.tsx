import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';
import { SpannedStringSpan, SpannedString } from './SpannedString';
import { spansMessageTextPreprocess } from './spansMessageTextPreprocess';

const cropEmailSymbolIfAny = (message: string) => {
    let finalMessage = message;

    if (finalMessage.startsWith('@')) {
        finalMessage = finalMessage.slice(1);
    }
    return finalMessage;
};

function _spansPreprocess(root: boolean, message: string, spans?: FullMessage_ServiceMessage_spans[], opts?: { disableBig?: boolean }): SpannedString {
    let res: SpannedStringSpan[] = [];
    if (!spans || spans.length === 0) {
        if (root) {
            res.push(spansMessageTextPreprocess(message, { disableBig: false || opts && opts.disableBig }))
        } else {
            res.push(spansMessageTextPreprocess(message, { disableBig: true }));
        }
    } else {
        const sortedSpans = spans.sort((span1: any, span2: any) => {
            return span1.offset - span2.offset;
        });

        let lastOffset = 0;

        for (let span of sortedSpans) {

            // Prefix
            if (['MessageSpanMultiUserMention', 'MessageSpanUserMention', 'MessageSpanRoomMention', 'MessageSpanLink', 'MessageSpanBold'].indexOf(span.__typename) >= 0) {
                if (lastOffset < span.offset) {
                    res.push(spansMessageTextPreprocess(message.slice(lastOffset, span.offset), { disableBig: true }));
                }
            }

            //
            // Mentions
            //

            if (span.__typename === 'MessageSpanMultiUserMention') {
                res.push({
                    type: 'users',
                    users: span.users,
                    child: _spansPreprocess(false, message.slice(span.offset, span.offset + span.length))
                });
                lastOffset = span.offset + span.length;
            }
            if (span.__typename === 'MessageSpanUserMention') {
                let finalMessage = cropEmailSymbolIfAny(
                    message.slice(span.offset, span.offset + span.length),
                );
                res.push({
                    type: 'user',
                    user: span.user,
                    child: _spansPreprocess(false, finalMessage)
                });
                lastOffset = span.offset + span.length;
            }
            if (span.__typename === 'MessageSpanRoomMention') {
                let finalMessage = cropEmailSymbolIfAny(
                    message.slice(span.offset, span.offset + span.length),
                );
                res.push({
                    type: 'group',
                    group: span.room,
                    child: _spansPreprocess(false, finalMessage)
                });
                lastOffset = span.offset + span.length;
            }

            //
            // Formatting
            //

            if (span.__typename === 'MessageSpanLink') {
                res.push({
                    type: 'link',
                    url: span.url,
                    child: _spansPreprocess(false, message.slice(span.offset, span.offset + span.length))
                });
                lastOffset = span.offset + span.length;
            }
            if (span.__typename === 'MessageSpanBold') {
                res.push({
                    type: 'bold',
                    child: _spansPreprocess(false, message.slice(span.offset, span.offset + span.length))
                });
                lastOffset = span.offset + span.length;
            }
        }

        // Suffix
        if (lastOffset < message.length) {
            res.push(spansMessageTextPreprocess(message.slice(lastOffset, message.length), { disableBig: true }));
        }
    }
    return {
        spans: res
    }
}

export function spansPreprocess(message: string, spans?: FullMessage_ServiceMessage_spans[], opts?: { disableBig?: boolean }): SpannedString {
    return _spansPreprocess(true, message, spans, opts);
}