import * as React from 'react';
import { ASListView } from 'react-native-async-view/ASListView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { SharedMediaItemType } from 'openland-engines/messenger/SharedMediaEngine';

interface AsyncSharedMediaListProps {
    mediaType: SharedMediaItemType;
    chatId: string;
    wrapperWidth: number;
}

export const AsyncSharedMediaList = ({ mediaType, chatId, wrapperWidth }: AsyncSharedMediaListProps) => {
    const safeArea = React.useContext(ASSafeAreaContext);
    const dataView = getMessenger().getSharedMedia(chatId, mediaType, wrapperWidth);
    React.useEffect(() => {
        return () => {
            getMessenger().destroySharedMedia(chatId);
        };
    }, [chatId]);

    return (
        <ASListView
            key={dataView.key}
            dataView={dataView}
            contentPaddingBottom={safeArea.bottom}
            style={{ flexGrow: 1 }}
        />
    );
};