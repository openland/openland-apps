import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Text, TouchableWithoutFeedback, Platform, Animated } from 'react-native';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { DiscoverChatsCollectionShort } from 'openland-api/spacex.types';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { layoutCollection } from 'openland-mobile/pages/main/Collections';
import FastImage from 'react-native-fast-image';
import { useClient } from 'openland-api/useClient';
import { usePressableView } from './usePressableView';

interface DiscoverCollectionsItem {
    item: DiscoverChatsCollectionShort;
}

const DiscoverCollectionsItem = (props: DiscoverCollectionsItem) => {
    const theme = useTheme();
    const router = React.useContext(SRouterContext)!;
    const onPress = React.useCallback(() => {
        router.push('DiscoverListing', {
            type: 'collections',
            title: props.item.title,
            collectionId: props.item.id,
        });
    }, [props.item.id]);
    const {image} = props.item;
    const [path, setPath] = React.useState('');

    React.useEffect(() => {
        return DownloadManagerInstance.watch(image.uuid, layoutCollection(), state => {
            if (state.path) {
                let newPath = Platform.select({ios: state.path, android: 'file://' + state.path});
                setPath(newPath);
            }
        });
    }, [image]);
    const {styles, delayPressIn, handlePressIn, handlePressOut} = usePressableView();

    return (
        <Animated.View style={{width: 167, height: 162, marginRight: 8, ...styles}}>
            <TouchableWithoutFeedback delayPressIn={delayPressIn} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <View flexDirection="column" borderRadius={RadiusStyles.Large} paddingVertical={8}>
                    <FastImage
                        source={{uri: path}}
                        style={{
                            width: 167, 
                            height: 94, 
                            borderRadius: RadiusStyles.Large, 
                            borderWidth: 0.5,
                            borderColor: theme.border, 
                            marginBottom: 8,
                        }}
                    />
                    <View flexGrow={1} flexShrink={1} flexDirection="column">
                        <Text style={{...TextStyles.Label1, color: theme.foregroundPrimary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{props.item.title}</Text>
                        <Text style={{...TextStyles.Subhead, color: theme.foregroundTertiary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {plural(props.item.chatsCount, ['group', 'groups'])}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

export const DiscoverCollectionsList = () => {
    let router = React.useContext(SRouterContext)!;
    let client = useClient();
    let {discoverCollections} = client.useDiscoverCollectionsShort({first: 10}, { fetchPolicy: 'cache-and-network' });
    let items = discoverCollections && discoverCollections.items || [];
    let cursor = discoverCollections && discoverCollections.cursor;

    return (    
        <ZListGroup
            header="Collections" 
            actionRight={items.length === 10 ? {
                title: 'See all', onPress: () => router.push('Collections', {
                    initialCollections: items,
                    initialAfter: cursor,
                })
            } : undefined}
        >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} paddingLeft={16}>
                {items.map((item, i) => <DiscoverCollectionsItem key={i} item={item} />)}
                <View width={24} />
            </ScrollView>
        </ZListGroup>
    );
};