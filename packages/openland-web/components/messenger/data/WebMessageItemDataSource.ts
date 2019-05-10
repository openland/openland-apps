import {
    DataSourceMessageItem,
    DataSourceDateItem,
} from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {
    senderNameEmojify?: any;
}

export interface DataSourceWebDateItem extends DataSourceDateItem {
    senderNameEmojify?: any;
}

export function convertDsMessage(src: DataSourceMessageItem): DataSourceWebMessageItem {
    return {
        ...src,
        senderNameEmojify:
            src.type === 'message' && !src.attachTop
                ? emoji({
                      src: src.sender.name,
                      size: 16,
                  })
                : undefined,
    };
}

export function buildMessagesDataSource(
    ds: DataSource<DataSourceMessageItem | DataSourceDateItem>,
): DataSource<DataSourceWebMessageItem | DataSourceWebDateItem> {
    return ds.batched().throttledMap(convertDsMessage);
}
