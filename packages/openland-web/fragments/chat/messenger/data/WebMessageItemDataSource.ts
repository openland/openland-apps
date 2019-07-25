import {
    DataSourceMessageItem,
    DataSourceDateItem,
    DataSourceNewDividerItem,
} from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';
import { processSpans } from 'openland-y-utils/spans/processSpans';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {
    senderNameEmojify?: any;
    senderBadgeNameEmojify?: string | JSX.Element;
    replyWeb: DataSourceWebMessageItem[];
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
        replyWeb: (src.reply || []).map(convertDsMessage)
    };
}

export function buildMessagesDataSource(
    ds: DataSource<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>,
): DataSource<DataSourceWebMessageItem | DataSourceDateItem> {
    return ds.batched().throttledMap(convertDsMessage);
}
