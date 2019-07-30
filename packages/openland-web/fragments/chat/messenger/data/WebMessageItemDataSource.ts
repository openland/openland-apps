import {
    DataSourceMessageItem,
    DataSourceDateItem,
    DataSourceNewDividerItem,
} from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';
import { processSpans } from 'openland-y-utils/spans/processSpans';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {
    senderNameEmojify?: string | JSX.Element;
    senderBadgeNameEmojify?: string | JSX.Element;
    replyWeb: DataSourceWebMessageItem[];
    replyQuoteTextEmojify?: string | JSX.Element;
}

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
    };
}

export function buildMessagesDataSource(
    ds: DataSource<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>,
): DataSource<DataSourceWebMessageItem | DataSourceDateItem> {
    return ds.batched().throttledMap(convertDsMessage);
}
