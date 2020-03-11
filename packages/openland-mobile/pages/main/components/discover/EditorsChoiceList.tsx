import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Text, TouchableWithoutFeedback, PixelRatio, Platform, Animated } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { plural } from 'openland-y-utils/plural';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { useClient } from 'openland-api/useClient';
import { DiscoverSharedRoom, DiscoverEditorsChoice_discoverEditorsChoice_image } from 'openland-api/spacex.types';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { usePressableView } from './usePressableView';
import { DiscoverCover } from './DiscoverCover';

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
    const {styles, delayPressIn, handlePressIn, handlePressOut} = usePressableView();

    React.useEffect(() => {
        const size = {
            width: Math.round(343 * PixelRatio.get()),
            height: Math.round(192 * PixelRatio.get()),
        };
        return DownloadManagerInstance.watch(image.uuid, size, state => {
            if (state.path) {
                let newPath = Platform.select({ios: state.path, android: 'file://' + state.path});
                setPath(newPath);
            }
        });
    }, [image]);
    return (
        <Animated.View style={{width: 343, height: 264, marginRight: 8, ...styles}}>
            <TouchableWithoutFeedback delayPressIn={delayPressIn} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <View flexDirection="column" borderRadius={RadiusStyles.Large} paddingTop={8} paddingBottom={6}>
                <DiscoverCover path={path} width={343} height={192} marginBottom={14} />
                <View flexDirection="row">
                    <View paddingTop={2}>
                        <ZAvatar size="medium" photo={photo} id={id} title={title} />
                    </View>
                    <View marginLeft={16} flexGrow={1} flexShrink={1} flexDirection="column">
                        <Text style={{...TextStyles.Label1, color: theme.foregroundPrimary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                        <Text style={{...TextStyles.Subhead, color: theme.foregroundTertiary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {plural(membersCount, ['member', 'members'])}
                        </Text>
                    </View>
                </View>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

export const EditorsChoiceList = () => {
    const client = useClient();
    const {discoverEditorsChoice} = client.useDiscoverEditorsChoice({fetchPolicy: 'network-only'});

    return (
        <ZListGroup header="Featured">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} paddingLeft={16} pagingEnabled={true} decelerationRate="fast" snapToInterval={351}>
                {discoverEditorsChoice.map((item, i) => <EditorsChoiceItem key={i} item={item} />)}
                <View width={24} />
            </ScrollView>
        </ZListGroup>
    );
};