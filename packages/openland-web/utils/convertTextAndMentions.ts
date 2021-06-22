import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { Span, SpanType } from 'openland-y-utils/spans/Span';
import { MessageSpan_MessageSpanRoomMention_room_SharedRoom } from 'openland-api/spacex.types';

type RoomT = MessageSpan_MessageSpanRoomMention_room_SharedRoom;

export function extractTextAndMentions(data: URickTextValue): { text: string; mentions: MentionToSend[] } {
    let text = '';
    let mentions: MentionToSend[] = [];
    for (let t of data) {
        if (typeof t === 'string') {
            text += t;
        } else if (t.__typename === 'User') {
            text += '@' + t.name;
            mentions.push(t);
        } else if (t.__typename === 'Organization') {
            text += '@' + t.name;
            mentions.push(t);
        } else if (t.__typename === 'SharedRoom') {
            text += '@' + t.title;
            mentions.push(t);
        } else {
            text += '@All';
            mentions.push(t);
        }
    }

    const textValue = text.trim();

    return {
        text: textValue,
        mentions,
    };
}

export function convertToInputValue(text: string, spans: Span[]): URickTextValue {
    let value: URickTextValue = [];
    let textStringTail = text;
    for (let absSpan of spans.filter(span => span.type === SpanType.mention_user || span.type === SpanType.mention_organization || span.type === SpanType.mention_room || span.type === SpanType.mention_all)) {
        let userSpan = absSpan;
        let rawText = userSpan.textRaw || '';
        let spanStart = textStringTail.indexOf(rawText);
        if (spanStart === -1) {
            continue;
        }
        if (spanStart !== 0) {
            value.push(textStringTail.substring(0, spanStart));
        }
        if (userSpan.textRaw === '@All' || userSpan.type === SpanType.mention_all) {
            value.push({ __typename: 'AllMention' });
        } else {
            if (userSpan.type === SpanType.mention_user) {
                value.push({ ...userSpan.user, __typename: 'User', });
            } else if (userSpan.type === SpanType.mention_room) {
                value.push({ ...userSpan.room as RoomT, __typename: 'SharedRoom', });
            } else if (userSpan.type === SpanType.mention_organization) {
                value.push({ ...userSpan.organization, __typename: 'Organization', });
            }
        }

        textStringTail = textStringTail.substring(
            spanStart + rawText.length,
            textStringTail.length,
        );
    }
    value.push(textStringTail);

    return value;
}
