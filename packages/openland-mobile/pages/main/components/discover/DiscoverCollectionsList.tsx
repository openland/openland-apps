import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Text, TouchableWithoutFeedback, Platform, Animated } from 'react-native';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { DiscoverChatsCollectionShort } from 'openland-api/spacex.types';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { layoutCollection } from 'openland-mobile/pages/main/Collections';
import { useClient } from 'openland-api/useClient';
import { usePressableView } from './usePressableView';
import { DiscoverCover } from './DiscoverCover';
import { useText } from 'openland-mobile/text/useText';

interface DiscoverCollectionsItem {
    item: DiscoverChatsCollectionShort;
}

const DiscoverCollectionsItem = (props: DiscoverCollectionsItem) => {
    const theme = useTheme();
    const { t } = useText();
    const router = React.useContext(SRouterContext)!;
    const onPress = React.useCallback(() => {
        router.push('DiscoverListing', {
            type: 'collections',
            title: props.item.title,
            collectionId: props.item.id,
            description: props.item.description,
        });
    }, [props.item.id]);
    const { image } = props.item;
    const [path, setPath] = React.useState('');

    React.useEffect(() => {
        return DownloadManagerInstance.watch(image.uuid, layoutCollection(), state => {
            if (state.path) {
                let newPath = Platform.select({ ios: state.path, default: 'file://' + state.path });
                setPath(newPath);
            }
        });
    }, [image]);
    const { styles, delayPressIn, handlePressIn, handlePressOut } = usePressableView();

    return (
        <Animated.View style={{ width: 167, height: 162, marginRight: 8, ...styles }}>
            <TouchableWithoutFeedback delayPressIn={delayPressIn} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <View style={{ flexDirection: 'column', borderRadius: RadiusStyles.Large, paddingVertical: 8 }}>
                    <DiscoverCover width={167} height={94} path={path} marginBottom={8} />
                    <View style={{ flexGrow: 1, flexShrink: 1, flexDirection: 'column' }}>
                        <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{props.item.title}</Text>
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {props.item.chatsCount} {t('group', { count: props.item.chatsCount, defaultValue: 'group' })}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

export const DiscoverCollectionsList = () => {
    let router = React.useContext(SRouterContext)!;
    const { t } = useText();
    let client = useClient();
    let { discoverCollections } = client.useDiscoverCollectionsShort({ first: 10 }, { fetchPolicy: 'cache-and-network' });
    let items = discoverCollections && discoverCollections.items || [];
    let cursor = discoverCollections && discoverCollections.cursor;

    return (
        <ZListGroup
            header={t('collections', 'Collections')}
            actionRight={items.length === 10 ? {
                title: t('seeAll', 'See all'), onPress: () => router.push('Collections', {
                    initialCollections: items,
                    initialAfter: cursor,
                })
            } : undefined}
        >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingLeft: 16 }} pagingEnabled={true} decelerationRate="fast" snapToInterval={175}>
                {items.map((item, i) => <DiscoverCollectionsItem key={i} item={item} />)}
                <View style={{ width: 24 }} />
            </ScrollView>
        </ZListGroup>
    );
};