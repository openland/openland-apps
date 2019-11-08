import {
    DataSourceMessageItem,
    DataSourceDateItem,
    DataSourceNewDividerItem,
} from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { ReactionReducedEmojify, ReactionReduced } from 'openland-engines/reactions/types';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {
    senderNameEmojify?: string | JSX.Element;
    senderBadgeNameEmojify?: string | JSX.Element;
    replyWeb: DataSourceWebMessageItem[];
    replyQuoteTextEmojify?: string | JSX.Element;
    reactionsLabelEmojify: string | JSX.Element;
    reactionsReducedEmojify: ReactionReducedEmojify[];
}

export const emojifyReactions = (src: ReactionReduced[]): ReactionReducedEmojify[] => {
    return src.map(r => ({
        ...r,
        users: r.users.map(u => ({
            ...u,
            name: emoji(u.name)
        }))
    }));
};

export function convertDsMessage(src: DataSourceMessageItem): DataSourceWebMessageItem {
    return {
        ...src,
        senderNameEmojify:
            src.type === 'message' && !src.attachTop
                ? emoji(src.sender.name)
                : undefined,

        textSpans: processSpans(src.text || '', src.spans),
        senderBadgeNameEmojify: src.senderBadge
            ? emoji(src.senderBadge.name)
            : undefined,
        replyWeb: (src.reply || []).map(convertDsMessage),
        replyQuoteTextEmojify: src.replyQuoteText
            ? emoji(src.replyQuoteText)
            : undefined,
        reactionsLabelEmojify: emoji(src.reactionsLabel),
        reactionsReducedEmojify: emojifyReactions(src.reactionsReduced || [])
    };
}

export function buildMessagesDataSource(
    ds: DataSource<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>,
): DataSource<DataSourceWebMessageItem | DataSourceDateItem> {
    return ds.throttledMap(convertDsMessage);
}
