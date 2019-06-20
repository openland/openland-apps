import {
    DataSourceMessageItem,
    DataSourceDateItem,
} from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';
import { processSpans } from 'openland-y-utils/spans/processSpans';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {
    senderNameEmojify?: any;
    replySenderNameEmojify: (string | JSX.Element)[];
    replyQuoteTextEmojify?: string | JSX.Element;
}

export interface DataSourceWebDateItem extends DataSourceDateItem {
    senderNameEmojify?: any;
}

export function convertDsMessage(src: DataSourceMessageItem): DataSourceWebMessageItem {
    return {
        ...src,
        replyQuoteTextEmojify: src.replyQuoteText
            ? emoji({
                src: src.replyQuoteText,
                size: 16,
            })
            : undefined,
        senderNameEmojify:
            src.type === 'message' && !src.attachTop
                ? emoji({
                    src: src.sender.name,
                    size: 16,
                })
                : undefined,
        replySenderNameEmojify: (src.reply || []).map(r =>
            emoji({
                src: r.sender.name,
                size: 16,
            }),
        ),
        textSpans: processSpans(src.text || '', src.spans),
    };
}

export function buildMessagesDataSource(
    ds: DataSource<DataSourceMessageItem | DataSourceDateItem>,
): DataSource<DataSourceWebMessageItem | DataSourceWebDateItem> {
    return ds.batched().throttledMap(convertDsMessage);
}
