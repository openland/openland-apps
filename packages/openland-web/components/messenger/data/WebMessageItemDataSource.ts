import { DataSourceMessageItem, DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {

}

export function buildMessagesDataSource(ds: DataSource<DataSourceMessageItem | DataSourceDateItem>): DataSource<DataSourceWebMessageItem | DataSourceDateItem> {
    return ds.batched().throttledMap((src) => ({
        ...src
    }));
}