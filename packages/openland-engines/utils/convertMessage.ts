import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { FullMessage } from 'openland-api/Types';
import { processSpans } from 'openland-y-utils/spans/processSpans';

export function convertMessage(
    src: FullMessage & {
        repeatKey?: string;
    },
): DataSourceMessageItem {
    let generalMessage = src.__typename === 'GeneralMessage' ? src : undefined;
    let serviceMessage = src.__typename === 'ServiceMessage' ? src : undefined;

    let reply =
        generalMessage && generalMessage.quotedMessages
            ? generalMessage.quotedMessages
                  .sort((a, b) => a.date - b.date)
                  .map(r => convertMessage(r as FullMessage))
            : undefined;

    const generalMessageSourceChat =
        generalMessage &&
        generalMessage.source &&
        generalMessage.source.__typename === 'MessageSourceChat'
            ? generalMessage.source
            : null;

    return {
        chatId: '',
        type: 'message',
        id: src.id,
        key: src.repeatKey || src.id,
        date: parseInt(src.date, 10),
        isOut: true,
        senderId: src.sender.id,
        senderName: src.sender.name,
        senderPhoto: src.sender.photo || undefined,
        sender: src.sender,
        senderBadge: src.senderBadge || undefined,
        text: src.message || undefined,
        isSending: false,
        attachTop: false,
        attachBottom: false,
        reactions: generalMessage ? generalMessage.reactions : [],
        serviceMetaData: (serviceMessage && serviceMessage.serviceMetadata) || undefined,
        isService: !!serviceMessage,
        attachments: generalMessage && generalMessage.attachments,
        reply,
        source: generalMessageSourceChat,
        isEdited: generalMessage && generalMessage.edited,
        spans: src.spans || [],
        commentsCount: generalMessage ? generalMessage.commentsCount : 0,
        textSpans: src.message ? processSpans(src.message, src.spans) : [],
        fallback: src.message || '',
        reactionsReduced: [],
        reactionsLabel: '',
    };
}
