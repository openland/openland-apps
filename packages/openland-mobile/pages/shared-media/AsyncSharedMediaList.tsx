import * as React from 'react';
import { ASListView } from 'react-native-async-view/ASListView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { SharedMediaItemType, SharedMediaDataSourceItem } from 'openland-engines/messenger/SharedMediaEngine';
import { View, Image, Text, ViewStyle, ImageStyle, TextStyle, StyleSheet } from 'react-native';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { capitalize, useText } from 'openland-mobile/text/useText';

const emptyTab = StyleSheet.create({
    wrapper: {
        paddingTop: 76,
        alignItems: 'center',
    } as ViewStyle,
    image: {
        width: 360,
        height: 240,
        marginBottom: 12,
    } as ImageStyle,
    textWrapper: {
        paddingHorizontal: 32,
    } as ViewStyle,
    title: {
        ...TextStyles.Title2,
        textAlign: 'center',
        marginBottom: 4,
    } as TextStyle,
    subtitle: {
        ...TextStyles.Body,
        textAlign: 'center',
    } as TextStyle,
});

const EmptyTab = React.memo(({ type }: { type: SharedMediaItemType }) => {
    const { t } = useText();
    const texts = {
        [SharedMediaItemType.MEDIA]: t('media', 'Media').toLowerCase(),
        [SharedMediaItemType.DOCUMENT]: t('files', 'Files').toLowerCase(),
        [SharedMediaItemType.LINK]: t('links', 'Links').toLowerCase(),
    };
    const titles = {
        [SharedMediaItemType.MEDIA]: t('sharedMediaEmptyMedia'),
        [SharedMediaItemType.DOCUMENT]: t('sharedMediaEmptyFiles'),
        [SharedMediaItemType.LINK]: t('sharedMediaEmptyLinks'),
    };
    const theme = useThemeGlobal();
    const imgSrc = theme.type === 'Light' ? require('assets/art-empty.png') : require('assets/art-empty-dark.png');

    return (
        <View style={emptyTab.wrapper}>
            <Image
                source={imgSrc}
                style={emptyTab.image}
            />
            <View style={emptyTab.textWrapper}>
                <Text style={[emptyTab.title, { color: theme.foregroundPrimary }]}>
                    {titles[type]}
                </Text>
                <Text style={[emptyTab.subtitle, { color: theme.foregroundSecondary }]}>
                    {t('sharedMediaEmptyDescription', {
                        mediaType: capitalize(texts[type]),
                        defaultValue: '{{mediaType}} you’ll send and receive in this chat will appear here',
                    })}
                </Text>
            </View>
        </View >
    );
});

interface AsyncSharedMediaListProps {
    mediaType: SharedMediaItemType;
    chatId: string;
    wrapperWidth: number;
    currentCount: number;
}

const AsyncSharedMediaListInner = ({ mediaType, chatId, wrapperWidth, currentCount }: AsyncSharedMediaListProps) => {
    const types = Object.values(SharedMediaItemType);
    const [dataViews, setDataViews] = React.useState<ASDataView<SharedMediaDataSourceItem>[]>([]);
    React.useEffect(() => {
        if (wrapperWidth !== 0) {
            const newDataViews = types.map(type => getMessenger().getSharedMedia(chatId, type, wrapperWidth));
            setDataViews(newDataViews);
        }
    }, [wrapperWidth, chatId]);

    return (
        <>
            {currentCount === 0 && <EmptyTab type={mediaType} />}
            {dataViews.map((dataView, i) => (
                <View
                    key={dataView.key + wrapperWidth}
                    style={{ ...types[i] === mediaType && currentCount > 0 ? { flexGrow: 1 } : { height: 0 } }}
                >
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

export const AsyncSharedMediaList = ({ mediaType, chatId, wrapperWidth, currentCount }: AsyncSharedMediaListProps) => {
    React.useEffect(() => {
        return () => {
            getMessenger().destroySharedMedia(chatId);
        };
    }, [chatId]);

    return (
        <AsyncSharedMediaListInner currentCount={currentCount} mediaType={mediaType} chatId={chatId} wrapperWidth={wrapperWidth} />
    );
};
