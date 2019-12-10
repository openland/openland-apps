import * as React from 'react';
import { ASListView } from 'react-native-async-view/ASListView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { SharedMediaItemType } from 'openland-engines/messenger/SharedMediaEngine';
import { View } from 'react-native';

interface AsyncSharedMediaListProps {
    mediaType: SharedMediaItemType;
    chatId: string;
    wrapperWidth: number;
}

const AsyncSharedMediaListInner = ({ mediaType, chatId, wrapperWidth }: AsyncSharedMediaListProps) => {
    const types = Object.values(SharedMediaItemType);
    const dataViews = types.map(type => getMessenger().getSharedMedia(chatId, type, wrapperWidth));

    return (
        <>
            {dataViews.map((dataView, i) => (
                <View key={dataView.key + wrapperWidth} style={{ ...types[i] === mediaType ? { flexGrow: 1 } : { height: 0 } }}>
                    <ASListView
                        key={dataView.key + wrapperWidth}
                        dataView={dataView}
                        style={{ flexGrow: 1 }}
                    />
                </View>
            ))}
        </>
    );
};

export const AsyncSharedMediaList = ({ mediaType, chatId, wrapperWidth }: AsyncSharedMediaListProps) => {
    React.useEffect(() => {
        return () => {
            getMessenger().destroySharedMedia(chatId);
        };
    }, [chatId]);

    return (
        <AsyncSharedMediaListInner mediaType={mediaType} chatId={chatId} wrapperWidth={wrapperWidth} />
    );
};
