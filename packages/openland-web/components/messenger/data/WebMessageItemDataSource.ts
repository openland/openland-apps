import {
    DataSourceMessageItem,
    DataSourceDateItem,
} from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { SpannedString } from './SpannedString';
import { spansPreprocess } from './spansPreprocess';
import { emoji } from 'openland-y-utils/emoji';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {
    senderNameEmojify?: any;
    textSpannedString?: SpannedString;
}

export function buildMessagesDataSource(
    ds: DataSource<DataSourceMessageItem | DataSourceDateItem>,
): DataSource<DataSourceWebMessageItem | DataSourceDateItem> {
    return ds.batched().throttledMap(src => ({
        ...src,
        senderNameEmojify:
            src.type === 'message' && !src.attachTop
                ? emoji({
                      src: src.sender.name,
                      size: 16,
                  })
                : undefined,
        textSpannedString:
            src.type === 'message' && src.text ? spansPreprocess(src.text!, src.spans) : undefined,
    }));
}
