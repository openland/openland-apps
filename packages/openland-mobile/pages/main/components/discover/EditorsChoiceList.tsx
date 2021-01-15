import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, ScrollView, Text, TouchableWithoutFeedback, PixelRatio, Platform, Animated, Image } from 'react-native';
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
    const { image, chat } = props.item;
    const { id, title, membersCount, photo, featured } = chat;
    const [path, setPath] = React.useState('');
    const onPress = React.useCallback(() => {
        router.push('Conversation', { id });
    }, [router, id]);
    const { styles, delayPressIn, handlePressIn, handlePressOut } = usePressableView();

    React.useEffect(() => {
        const size = {
            width: Math.round(343 * PixelRatio.get()),
            height: Math.round(192 * PixelRatio.get()),
        };
        return DownloadManagerInstance.watch(image.uuid, size, state => {
            if (state.path) {
                let newPath = Platform.select({ ios: state.path, default: 'file://' + state.path });
                setPath(newPath);
            }
        });
    }, [image]);
    return (
        <Animated.View style={{ width: 343, height: 264, marginRight: 8, ...styles }}>
            <TouchableWithoutFeedback delayPressIn={delayPressIn} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <View style={{ flexDirection: 'column', borderRadius: RadiusStyles.Large, paddingTop: 8, paddingBottom: 6 }}>
                    <DiscoverCover path={path} width={343} height={192} marginBottom={14} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 2 }}>
                            <ZAvatar size="medium" photo={photo} id={id} title={title} />
                        </View>
                        <View style={{ marginHorizontal: 16, flexGrow: 1, flexShrink: 1, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                                {featured && theme.displayFeaturedIcon && (
                                    <Image
                                        source={require('assets/ic-verified-16.png')}
                                        style={{ tintColor: '#3DA7F2', width: 16, height: 16, flexShrink: 0, marginLeft: 4, marginRight: 4, marginTop: 2, alignSelf: 'center' }}
                                    />
                                )}
                            </View>
                            <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
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
    const { discoverEditorsChoice } = client.useDiscoverEditorsChoice({ fetchPolicy: 'network-only' });

    return (
        <ZListGroup header="Featured">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingLeft: 16 }} pagingEnabled={true} decelerationRate="fast" snapToInterval={351}>
                {discoverEditorsChoice.map((item, i) => <EditorsChoiceItem key={i} item={item} />)}
                <View style={{ width: 24 }} />
            </ScrollView>
        </ZListGroup>
    );
};