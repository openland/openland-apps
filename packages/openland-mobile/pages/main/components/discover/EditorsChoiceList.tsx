import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Text, TouchableWithoutFeedback, PixelRatio } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';
import { SRouterContext } from 'react-native-s/SRouterContext';
import FastImage from 'react-native-fast-image';
import { useClient } from 'openland-api/useClient';
import { DiscoverSharedRoom, DiscoverEditorsChoice_discoverEditorsChoice_image } from 'openland-api/spacex.types';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';

interface EditorsChoiceItemProps {
    item: {
        id: string;
        image: DiscoverEditorsChoice_discoverEditorsChoice_image;
        chat: DiscoverSharedRoom;
    };
}

const EditorsChoiceItem = (props: EditorsChoiceItemProps) => {
    const theme = useTheme();
    const router = React.useContext(SRouterContext)!;
    const {image, chat} = props.item;
    const {id, title, membersCount, photo} = chat;
    const [path, setPath] = React.useState('');
    const onPress = React.useCallback(() => {
        router.push('Conversation', {id});
    }, [router, id]);

    React.useEffect(() => {
        const size = {
            width: Math.round(343 * PixelRatio.get()),
            height: Math.round(192 * PixelRatio.get()),
        };
        return DownloadManagerInstance.watch(image.uuid, size, state => {
            if (state.path) {
                setPath(state.path);
            }
        });
    }, [image]);
    return (
        <View style={{width: 343, height: 264, marginRight: 8}}>
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
                        marginBottom: 14,
                    }}
                />
                <View flexDirection="row">
                    <ZAvatar size="medium" photo={photo} id={id} title={title} />
                    <View marginLeft={16} flexGrow={1} flexShrink={1} flexDirection="column">
                        <Text style={{...TextStyles.Label1, color: theme.foregroundPrimary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                        <Text style={{...TextStyles.Subhead, color: theme.foregroundTertiary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {plural(membersCount, ['member', 'members'])}
                        </Text>
                    </View>
                </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export const EditorsChoiceList = () => {
    const client = useClient();
    const {discoverEditorsChoice} = client.useDiscoverEditorsChoice({fetchPolicy: 'network-only'});

    return (
        <ZListGroup header="Editors' choice">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} paddingLeft={16}>
                {discoverEditorsChoice.map((item, i) => <EditorsChoiceItem key={i} item={item} />)}
                <View width={24} />
            </ScrollView>
        </ZListGroup>
    );
};