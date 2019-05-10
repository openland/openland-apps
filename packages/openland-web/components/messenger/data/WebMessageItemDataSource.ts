import {
    DataSourceMessageItem,
    DataSourceDateItem,
} from 'openland-engines/messenger/ConversationEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { SpannedString } from './SpannedString';
import { spansPreprocess } from './spansPreprocess';
import { emoji } from 'openland-y-utils/emoji';
import { processSpans } from 'openland-y-utils/spans/proccessSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { emojifyText } from './spansMessageTextPreprocess';

export interface DataSourceWebMessageItem extends DataSourceMessageItem {
    senderNameEmojify?: any;
    textSpans?: Span[];
}

export interface DataSourceWebDateItem extends DataSourceDateItem {
    senderNameEmojify?: any;
    textSpans?: Span[];
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
        textSpans:
            src.type === 'message' && src.text ? processSpans(src.text!, src.spans, (text) => emojifyText(text)) : undefined,
    };
}

export function buildMessagesDataSource(
    ds: DataSource<DataSourceMessageItem | DataSourceDateItem>,
): DataSource<DataSourceWebMessageItem | DataSourceWebDateItem> {
    return ds.batched().throttledMap(convertDsMessage);
}
