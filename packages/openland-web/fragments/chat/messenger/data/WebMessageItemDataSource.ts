import {
    DataSourceMessageItem,
    DataSourceDateItem,
    DataSourceNewDividerItem,
    DataSourceInvitePeopleItem,
} from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';
import { processSpans } from 'openland-y-utils/spans/processSpans';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {
    senderNameEmojify?: string | JSX.Element;
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
        replyWeb: (src.reply || []).map(convertDsMessage),
        replyQuoteTextEmojify: src.replyQuoteText
            ? emoji(src.replyQuoteText)
            : undefined,
    };
}

export function buildMessagesDataSource(
    ds: DataSource<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem | DataSourceInvitePeopleItem>,
): DataSource<DataSourceWebMessageItem | DataSourceDateItem> {
    return ds.throttledMap(convertDsMessage);
}

export function convertDsSearchMessage(src: DataSourceMessageItem): DataSourceWebMessageItem {
    return {
        ...src,
        senderNameEmojify:
            src.type === 'message' && !src.attachTop
                ? emoji(src.sender.name)
                : undefined,
        replyWeb: (src.reply || []).map(convertDsMessage),
        replyQuoteTextEmojify: src.replyQuoteText
            ? emoji(src.replyQuoteText)
            : undefined,
    };
}

export function buildMessagesSearchDataSource(
    ds: DataSource<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>,
): DataSource<DataSourceWebMessageItem | DataSourceDateItem> {
    return ds.throttledMap(convertDsSearchMessage);
}
