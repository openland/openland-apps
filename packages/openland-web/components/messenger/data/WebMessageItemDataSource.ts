import { DataSourceMessageItem, DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { SpannedString } from './SpannedString';
import { spansPreprocess } from './spansPreprocess';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {
    textSpannedString?: SpannedString;
}

export function buildMessagesDataSource(ds: DataSource<DataSourceMessageItem | DataSourceDateItem>): DataSource<DataSourceWebMessageItem | DataSourceDateItem> {
    return ds.batched().throttledMap((src) => ({
        ...src,
        textSpannedString: (src.type === 'message' && src.text) ? spansPreprocess(src.text!, src.spans) : undefined
    }));
}