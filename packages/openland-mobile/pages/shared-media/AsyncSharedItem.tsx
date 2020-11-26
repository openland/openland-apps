import * as React from 'react';
import { SharedMediaDataSourceItem, SharedMediaItemType } from 'openland-engines/messenger/SharedMediaEngine';
import { AsyncSharedMediaRow } from './AsyncSharedMediaRow';
import { AsyncSharedLink } from './AsyncSharedLink';
import { AsyncSharedDocument } from './AsyncSharedDocument';
import { AsyncSharedDate } from './AsyncSharedDate';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage } from 'openland-api/spacex.types';
import { useForward } from 'openland-mobile/messenger/MobileMessenger';

type LongPressHandler = (options: { filePath?: string, chatId: string, message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage }) => void;

export const AsyncSharedItem = React.memo((props: {
    item: SharedMediaDataSourceItem,
    chatId: string,
    wrapperWidth: number,
    onLongPress: (forward: (messages: DataSourceMessageItem[]) => void) => LongPressHandler
}) => {
    const { item, chatId, wrapperWidth, onLongPress } = props;
    const forward = useForward(chatId);
    if (item.type === SharedMediaItemType.MEDIA) {
        return <AsyncSharedMediaRow item={item} chatId={chatId} wrapperWidth={wrapperWidth} onLongPress={onLongPress(forward)} />;
    }

    if (item.type === SharedMediaItemType.LINK) {
        return <AsyncSharedLink item={item} chatId={chatId} onLongPress={onLongPress(forward)} />;
    }

    if (item.type === SharedMediaItemType.DOCUMENT) {
        return <AsyncSharedDocument item={item} chatId={chatId} onLongPress={onLongPress(forward)} />;
    }

    return <AsyncSharedDate item={item} />;
});
