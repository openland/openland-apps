import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SFlatList } from 'react-native-s/SFlatList';
import { View, TouchableWithoutFeedback, Text, PixelRatio } from 'react-native';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';
import { DiscoverChatsCollection } from 'openland-api/spacex.types';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { SRouter } from 'react-native-s/SRouter';
import FastImage from 'react-native-fast-image';
import { useClient } from 'openland-api/useClient';

export const layoutCollection = () => ({
        width: Math.round(167 * PixelRatio.get()),
        height: Math.round(94 * PixelRatio.get()),
});

interface CollectionProps {
    item: DiscoverChatsCollection;
    router: SRouter;
}

const Collection = (props: CollectionProps) => {
    let theme = useTheme();
    const {image} = props.item;
    const [path, setPath] = React.useState('');
    let onPress = () => {
        props.router.push('DiscoverListing', {
            initialRooms: props.item.chats,
            type: 'collections',
            title: props.item.title,
        });
    };

    React.useEffect(() => {
        return DownloadManagerInstance.watch(image.uuid, layoutCollection(), state => {
            if (state.path) {
                setPath(state.path);
            }
        });
    }, []);
    return (
        <View style={{width: 375, height: 264, padding: 16}}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View flexDirection="column" borderRadius={RadiusStyles.Large} paddingTop={8} paddingBottom={6}>
                    <FastImage 
                        source={{uri: path}}
                        style={{
                            width: 343,
                            height: 192, 
                            borderRadius: RadiusStyles.Large, 
                            borderWidth: 0.5,
                            borderColor: theme.border, 
                            marginBottom: 16,
                        }}
                    />
                    <View flexGrow={1} flexShrink={1} flexDirection="row" alignItems="center">
                        <Text style={{...TextStyles.Label1, color: theme.foregroundPrimary, flexGrow: 1, flexShrink: 1}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{props.item.title}</Text>
                        <Text style={{...TextStyles.Subhead, color: theme.foregroundTertiary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {plural(props.item.chatsCount, ['group', 'groups'])}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const CollectionsComponent = () => {
    let router = React.useContext(SRouterContext)!;
    let initialCollections = router.params.initialCollections as DiscoverChatsCollection[];
    let initialAfter = router.params.initialAfter as string | null;
    let [loading, setLoading] = React.useState(false);
    let [collections, setCollections] = React.useState(initialCollections);
    let [after, setAfter] = React.useState(initialAfter);
    let client = useClient();
    let handleLoadMore = async () => {
        if (!loading && !!after) {
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
        }
    };

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
