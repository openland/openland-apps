import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { DiscoverChatsCollection } from 'openland-api/spacex.types';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { layoutCollection } from 'openland-mobile/pages/main/Collections';

interface DiscoverCollectionsItem {
    item: DiscoverChatsCollection;
}

const DiscoverCollectionsItem = (props: DiscoverCollectionsItem) => {
    const theme = useTheme();
    const router = React.useContext(SRouterContext)!;
    const onPress = React.useCallback(() => {
        router.push('DiscoverListing', {
            initialRooms: props.item.chats,
            type: 'collections',
            title: props.item.title,
        });
    }, [props.item.id]);
    const {image} = props.item;
    const [path, setPath] = React.useState('');

    React.useEffect(() => {
        return DownloadManagerInstance.watch(image.uuid, layoutCollection(), state => {
            if (state.path) {
                setPath(state.path);
            }
        });
    }, [image]);

    return (
        <View style={{width: 167, height: 162, marginRight: 8}}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View flexDirection="column" borderRadius={RadiusStyles.Large} paddingVertical={8}>
                    <Image 
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
        </View>
    );
};

interface DiscoverCollectionsListProps {
    collections: DiscoverChatsCollection[];
    after: string | null;
}

export const DiscoverCollectionsList = (props: DiscoverCollectionsListProps) => {
    let router = React.useContext(SRouterContext)!;
    return (    
        <ZListGroup
            header="Collections" 
            actionRight={props.collections.length === 5 ? {
                title: 'See all', onPress: () => router.push('Collections', {
                    initialCollections: props.collections,
                    after: props.after,
                })
            } : undefined}
        >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} paddingLeft={16}>
                {props.collections.map((item, i) => <DiscoverCollectionsItem key={i} item={item} />)}
                <View width={24} />
            </ScrollView>
        </ZListGroup>
    );
};