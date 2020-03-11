import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SFlatList } from 'react-native-s/SFlatList';
import { View, TouchableWithoutFeedback, Text, PixelRatio, Platform, Animated } from 'react-native';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';
import { DiscoverChatsCollectionShort } from 'openland-api/spacex.types';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { SRouter } from 'react-native-s/SRouter';
import { useClient } from 'openland-api/useClient';
import { usePressableView } from './components/discover/usePressableView';
import { DiscoverCover } from './components/discover/DiscoverCover';

export const layoutCollection = () => ({
        width: Math.round(167 * PixelRatio.get()),
        height: Math.round(94 * PixelRatio.get()),
});

interface CollectionProps {
    item: DiscoverChatsCollectionShort;
    router: SRouter;
}

const Collection = (props: CollectionProps) => {
    let theme = useTheme();
    const {image} = props.item;
    const [path, setPath] = React.useState('');
    const {styles, delayPressIn, handlePressIn, handlePressOut} = usePressableView();
    let onPress = () => {
        props.router.push('DiscoverListing', {
            type: 'collections',
            title: props.item.title,
            collectionId: props.item.id,
        });
    };

    React.useEffect(() => {
        return DownloadManagerInstance.watch(image.uuid, layoutCollection(), state => {
            if (state.path) {
                let newPath = Platform.select({ios: state.path, android: 'file://' + state.path});
                setPath(newPath);
            }
        });
    }, []);
    return (
        <Animated.View style={{width: '100%', height: 264, padding: 16, alignSelf: 'center', ...styles}}>
            <TouchableWithoutFeedback delayPressIn={delayPressIn} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <View flexDirection="column" borderRadius={RadiusStyles.Large} paddingTop={8} paddingBottom={6}>
                    <DiscoverCover width="100%" height={192} path={path} marginBottom={16} />
                    <View flexGrow={1} flexShrink={1} flexDirection="row" alignItems="center">
                        <Text style={{...TextStyles.Label1, color: theme.foregroundPrimary, flexGrow: 1, flexShrink: 1}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{props.item.title}</Text>
                        <Text style={{...TextStyles.Subhead, color: theme.foregroundTertiary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {plural(props.item.chatsCount, ['group', 'groups'])}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

const CollectionsComponent = () => {
    let router = React.useContext(SRouterContext)!;
    let initialCollections = (router.params.initialCollections || []) as DiscoverChatsCollectionShort[];
    let initialAfter = router.params.initialAfter as string | null;
    let [loading, setLoading] = React.useState(false);
    let [collections, setCollections] = React.useState(initialCollections);
    let [after, setAfter] = React.useState(initialAfter);
    let client = useClient();
    let handleLoadMore = async () => {
        if (loading || (!after && collections.length > 0)) {
            return;
        }
        setLoading(true);
        let res = (await client.queryDiscoverCollections({ after, first: 10 }, { fetchPolicy: 'network-only' })).discoverCollections;
        if (!res) {
            return;
        }
        let {items, cursor} = res;

        if (items.length < 10) {
            setAfter('');
        } else {
            setAfter(cursor);
        }

        setCollections(prevItems => ([...prevItems, ...items]));
        setLoading(false);
    };

    React.useEffect(() => {
        if (collections.length === 0) {
            handleLoadMore();
        } 
    }, []);

    return (
        <>
            <SHeader title="Collections" />
            <SFlatList
                data={collections}
                renderItem={({ item }) => (
                    <Collection key={item.id} item={item} router={router} />
                )}
                keyExtractor={(item, index) => index + '-' + item.id}
                onEndReached={handleLoadMore}
                refreshing={loading}
            />
        </>
    );
};

export const Collections = withApp(CollectionsComponent);
