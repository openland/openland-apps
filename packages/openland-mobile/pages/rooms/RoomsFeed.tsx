import * as React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useClient } from 'openland-api/useClient';
import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { PageProps } from 'openland-mobile/components/PageProps';
import ActionSheet from 'openland-mobile/components/ActionSheet';
import { SHeader } from 'react-native-s/SHeader';
import { SRouter } from 'react-native-s/SRouter';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { withApp } from 'openland-mobile/components/withApp';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SFlatList } from 'react-native-s/SFlatList';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { useJoinRoom } from './joinRoom';
import { useVoiceChatsFeed } from 'openland-y-utils/voiceChat/voiceChatsFeedWatcher';
import { RoomsList } from '../main/Explore';
import { GlobalSearch } from '../main/components/globalSearch/GlobalSearch';
import { ComponentRefContext } from '../main/Home';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SScrollView } from 'react-native-s/SScrollView';
import { SDeferred } from 'react-native-s/SDeferred';

function showFilters(selected: 'voice' | 'explore', onSelect: (d: 'voice' | 'explore') => void) {
    const actionSheet = ActionSheet.builder();
    actionSheet.cancelable(false);
    actionSheet.action(
        'Rooms',
        () => onSelect('voice'),
        false,
        require('assets/ic-room-24.png'),
        undefined,
        selected === 'voice',
    );
    actionSheet.action(
        'Discover',
        () => onSelect('explore'),
        false,
        require('assets/ic-discover-24.png'),
        undefined,
        selected === 'explore',
    );
    actionSheet.show(true);
}

const RoomFeedItem = React.memo((props: { room: VoiceChatWithSpeakers, theme: ThemeGlobal, router: SRouter }) => {
    let { room, theme } = props;
    let joinRoom = useJoinRoom();
    let speakers = room.speakers.slice(0, room.parentRoom ? 3 : 4);
    let title = room.title?.trim() || 'Room';
    return (
        <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: theme.backgroundPrimary }} activeOpacity={0.6} onPress={() => joinRoom(room.id)}>
            <Text
                style={{ ...TextStyles.Label1, color: theme.foregroundPrimary, marginBottom: 8, }}
                numberOfLines={2}
            >
                {title}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    {speakers.map(speaker => (
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }}>
                            {speaker.user.name}
                        </Text>
                    ))}
                    <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }}>{room.speakersCount}</Text>
                        <Image source={require('assets/ic-microphone-16.png')} style={{ width: 16, height: 16, marginLeft: 2, marginRight: 12, tintColor: theme.foregroundTertiary }} />
                        {room.listenersCount > 0 && (
                            <>
                                <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }}>{room.listenersCount}</Text>
                                <Image source={require('assets/ic-headphones-16.png')} style={{ width: 16, height: 16, marginLeft: 4, tintColor: theme.foregroundTertiary }} />
                            </>
                        )}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap', maxWidth: 88 }}>
                    {room.parentRoom && (
                        <View key={room.parentRoom.id} style={{ marginLeft: 12, marginBottom: 12 }}>
                            <ZAvatar size="small" photo={room.parentRoom.photo} title={room.parentRoom.title} id={room.parentRoom.id} />
                        </View>
                    )}
                    {speakers.map(speaker => (
                        <View key={speaker.id} style={{ marginLeft: 12, marginBottom: 12 }}>
                            <ZAvatar size="small" photo={speaker.user.photo} title={speaker.user.name} id={speaker.user.id} />
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
});

const RoomsFeedPage = React.memo((props: PageProps) => {
    const client = useClient();
    const [page, setPage] = React.useState<'voice' | 'explore'>('voice');
    const voiceChats = useVoiceChatsFeed();
    const theme = useTheme();
    const router = React.useContext(SRouterContext)!;
    const scrollRef = React.useContext(ComponentRefContext);
    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });
    const joinRoom = useJoinRoom();

    const pushRoom = React.useCallback(() => {
        router.push('CreateRoom');
    }, [router]);

    const onUpcomingPress = React.useCallback(() => {
        Linking.openURL('https://www.notion.so/openland/Openland-Upcoming-Rooms-e2b80f28693c4fc788b9f269cc3346b0');
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            if (router.params.id) {
                joinRoom(router.params.id);
            }
        }, 500);
    }, []);

    const upcomingHeader = (
        <ZButton
            title="🔥 Upcoming rooms"
            marginHorizontal={16}
            marginTop={8}
            marginBottom={24}
            size="large"
            style="secondary"
            onPress={onUpcomingPress}
        />
    );

    return (
        <>
            <SHeader
                title={page === 'voice' ? 'Rooms' : 'Discover'}
                titleAction={{
                    title: page === 'voice' ? 'Rooms' : 'Discover',
                    active: true,
                    action: () => showFilters(page, setPage),
                }}
            />
            {page === 'voice' && (
                <>
                    <SHeaderButton title="New room" onPress={pushRoom} />
                    <SFlatList
                        scrollRef={scrollRef}
                        data={voiceChats.chats}
                        renderItem={({ item }) => <RoomFeedItem room={item} theme={theme} router={router} />}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => voiceChats.chats.length > 0 ? <View style={{ height: 8 }} /> : null}
                        ListHeaderComponent={upcomingHeader}
                        ListFooterComponent={() => (
                            <>
                                {voiceChats.chats.length > 0 ? (
                                    <>
                                        <View style={{ height: 8, backgroundColor: theme.backgroundPrimary }} />
                                        <View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} />
                                    </>
                                ) : null}
                                <View style={{ paddingVertical: 16, paddingHorizontal: 32, marginVertical: 16, alignItems: 'center' }}>
                                    <Image source={require('assets/art-crowd.png')} style={{ width: 240, height: 150 }} />
                                    <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginTop: 16, marginBottom: 6 }}>Talk about anything!</Text>
                                    <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center', marginBottom: 24 }}>Create a new room and invite friends!</Text>
                                    <ZButton title="Start room" path="CreateRoom" />
                                </View>
                            </>
                        )}
                    />
                </>
            )}
            {page === 'explore' && (
                <>
                    <SHeaderButton />
                    <SSearchControler
                        searchPlaceholder="Groups, communities, and more"
                        searchRender={(p) => (
                            <GlobalSearch
                                query={p.query}
                                router={props.router}
                                onUserPress={(id: string) => props.router.push('ProfileUser', { id: id })}
                            />
                        )}
                    >
                        <React.Suspense fallback={<ZLoader />}>
                            <SScrollView style={{ marginTop: -16 }} scrollRef={scrollRef}>
                                <SDeferred>
                                    <RoomsList
                                        router={props.router}
                                        isDiscoverDone={discoverDone.betaIsDiscoverDone}
                                    />
                                </SDeferred>
                            </SScrollView>
                        </React.Suspense>
                    </SSearchControler>
                </>
            )}
        </>
    );
});

export const RoomsFeed = withApp(RoomsFeedPage, { navigationAppearance: 'large' });
