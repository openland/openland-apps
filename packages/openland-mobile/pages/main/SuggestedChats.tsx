import * as React from 'react';
import { View, ScrollView, Text, Platform, Dimensions } from 'react-native';
import { RoomShort, RoomShort_SharedRoom } from 'openland-api/spacex.types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { FontStyles, RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { Image } from 'react-native';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SRouter } from 'react-native-s/SRouter';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { trackEvent } from 'openland-mobile/analytics';
import { AppStorage as Storage } from 'openland-y-runtime/AppStorage';
import { useClient } from 'openland-api/useClient';

interface ChatProps {
    item: RoomShort_SharedRoom;
    selected: boolean;
    onPress: (chat: RoomShort) => void;
}

const Chat = React.memo((props: ChatProps) => {
    const theme = React.useContext(ThemeContext);
    const onPress = React.useCallback(
        () => {
            props.onPress(props.item);
        },
        [props.onPress],
    );
    return (
        <ZListItemBase height={60} onPress={onPress} separator={false}>
            <View width={72} height={56} alignItems="center" justifyContent="center">
                <ZAvatar
                    src={props.item.photo}
                    size="medium"
                    placeholderKey={props.item.id}
                    placeholderTitle={props.item.title}
                />
            </View>
            <View
                marginRight={10}
                marginTop={10}
                marginBottom={10}
                flexDirection="column"
                flexGrow={1}
                flexBasis={0}
                alignItems="stretch"
            >
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 16,
                        lineHeight: 19,
                        height: 19,
                        color: theme.foregroundPrimary,
                        fontWeight: FontStyles.Weight.Medium,
                    }}
                >
                    {props.item.title}
                </Text>
                <Text
                    numberOfLines={1}
                    style={{
                        marginTop: 5,
                        fontSize: 13,
                        lineHeight: 15,
                        height: 15,
                        color: theme.foregroundSecondary,
                    }}
                >
                    {props.item.membersCount +
                        (props.item.membersCount === 1 ? ' members' : ' members')}
                </Text>
            </View>

            <View
                position="absolute"
                pointerEvents="none"
                alignSelf="center"
                right={16}
                backgroundColor={props.selected ? theme.accentPrimary : theme.backgroundPrimary}
                opacity={props.selected ? 1 : 0.8}
                borderColor={props.selected ? theme.accentPrimary : theme.foregroundTertiary}
                borderWidth={2}
                borderRadius={RadiusStyles.Medium}
                width={24}
                height={24}
            >
                {props.selected && (
                    <Image
                        marginLeft={3}
                        marginTop={3}
                        source={require('assets/ic-checkmark.png')}
                        style={{ tintColor: theme.foregroundInverted }}
                    />
                )}
            </View>
        </ZListItemBase>
    );
});

interface SuggestedChatsProps {
    chats: RoomShort[];
    router: SRouter;
    selectedTagIds: string[];
}

export const SuggestedChats = React.memo((props: SuggestedChatsProps) => {
    const [selected, setSelected] = React.useState(new Set<string>(props.chats.map(c => c.id)));
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);

    const isIos = Platform.OS === 'ios';
    const isXGen = isIos && Dimensions.get('window').height > 800;
    const defaultIosPadding = isXGen ? 34 : 16;

    const onSelect = React.useCallback(
        (room: RoomShort) => {
            let res = new Set(selected);
            if (res.has(room.id)) {
                res.delete(room.id);
            } else {
                res.add(room.id);
            }
            setSelected(res);
        },
        [selected],
    );

    const client = useClient();

    const toHome = React.useCallback(async () => {
        await client.mutateBetaDiscoverSkip({ selectedTagsIds: props.selectedTagIds });
        await client.refetchDiscoverIsDone();
        await Storage.writeKey('discover_start', null);
        props.router.pushAndResetRoot('Home');
    }, []);

    const skip = React.useCallback(() => {
        (async () => {
            await toHome();
        })();
    }, []);

    const join = React.useCallback((selectedIds: string[]) => {
        (async () => {
            startLoader();
            await getClient().mutateRoomsJoin({ roomsIds: selectedIds });
            stopLoader();
            await toHome();
        })();
    }, []);

    const onAdd = React.useCallback(
        async () => {
            trackEvent('chats_after_navigator', { count: selected.size });

            if (selected.size) {
                join([...selected.values()]);
            } else {
                await toHome();
            }
        },
        [selected],
    );

    return (
        <>
            <SHeaderButton title="Skip" onPress={skip} />
            <ScrollView flex={1} paddingTop={isIos ? area.top + 16 : undefined}>
                <Text
                    allowFontScaling={false}
                    style={{
                        ...TextStyles.Title1,
                        textAlign: 'center',
                        paddingHorizontal: 16,
                        marginBottom: 8,
                        color: theme.foregroundPrimary,
                    }}
                >
                    What to join
                </Text>
                <Text
                    allowFontScaling={false}
                    style={{
                        ...TextStyles.Body,
                        textAlign: 'center',
                        paddingHorizontal: 16,
                        marginBottom: 24,
                        color: theme.foregroundSecondary,
                    }}
                >
                    Here some chats we suggested for you
                </Text>
                {props.chats.map(
                    item =>
                        item.__typename === 'SharedRoom' && (
                            <Chat
                                key={item.id}
                                item={item}
                                selected={selected.has(item.id)}
                                onPress={onSelect}
                            />
                        ),
                )}
                <View height={120} />
            </ScrollView>
            <View padding={16} paddingBottom={isIos ? defaultIosPadding : area.bottom + 16}>
                <ZButton
                    size="large"
                    title={`   ${
                        selected.size === 0
                            ? 'Skip'
                            : 'Join' + (selected.size === props.chats.length ? ' all' : '')
                    }   `}
                    onPress={onAdd}
                />
            </View>
        </>
    );
});
