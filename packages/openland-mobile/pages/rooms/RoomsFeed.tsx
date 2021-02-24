import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SRouter } from 'react-native-s/SRouter';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SFlatList } from 'react-native-s/SFlatList';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { useClient } from 'openland-api/useClient';
import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { useJoinRoom } from './joinRoom';
import { useListReducer } from 'openland-mobile/utils/listReducer';

let RoomFeedItem = React.memo((props: { room: VoiceChatWithSpeakers, theme: ThemeGlobal, router: SRouter }) => {
    let { room, theme } = props;
    let joinRoom = useJoinRoom();
    let speakers = room.speakers.slice(0, 4);
    return (
        <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, backgroundColor: theme.backgroundPrimary }} activeOpacity={0.6} onPress={() => joinRoom(room.id)}>
            <Text
                style={{ ...TextStyles.Label1, color: theme.foregroundPrimary, marginBottom: 8, }}
                numberOfLines={2}
            >
                {props.room.title ?? 'New room'}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    {speakers.map(speaker => (
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }}>
                            {speaker.user.name}
                        </Text>
                    ))}
                    <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>{room.speakersCount}</Text>
                        <Image source={require('assets/ic-microphone-16.png')} style={{ width: 16, height: 16, marginLeft: 4, tintColor: theme.foregroundTertiary }} />
                        <View style={{ width: 3, height: 3, borderRadius: 3, backgroundColor: theme.foregroundTertiary, marginHorizontal: 8 }} />
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>{room.listenersCount}</Text>
                        <Image source={require('assets/ic-headphones-16.png')} style={{ width: 16, height: 16, marginLeft: 4, tintColor: theme.foregroundTertiary }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap', maxWidth: 88 }}>
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

let RoomsFeedPage = React.memo((props: PageProps) => {
    let theme = useTheme();
    let client = useClient();
    let router = React.useContext(SRouterContext)!;
    let pushRoom = React.useCallback(() => {
        router.push('CreateRoom');
    }, [router]);
    // TODO: Change fetch-policy when updates are ready
    let initialRoomsList = client.useActiveVoiceChats({ first: 5 }, { fetchPolicy: 'network-only' }).activeVoiceChats;

    let { items: rooms, loading, inited, loadMore } = useListReducer({
        fetchItems: async (after) => {
            return (await client.queryActiveVoiceChats({ after, first: 5 }, { fetchPolicy: 'network-only' })).activeVoiceChats;
        },
        initialCursor: initialRoomsList.cursor,
        initialItems: initialRoomsList.items,
    });

    return (
        <>
            <SHeader title="Rooms" />
            <SHeaderButton title="New room" onPress={pushRoom} />
            <SFlatList
                data={rooms}
                renderItem={({ item }) => <RoomFeedItem room={item} theme={theme} router={router} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => rooms.length > 0 ? <View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} /> : null}
                ListHeaderComponent={() => rooms.length > 0 ? <View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} /> : null}
                ListFooterComponent={inited ? () => (
                    <>
                        {rooms.length > 0 ? <View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} /> : null}
                        <View style={{ paddingVertical: 16, paddingHorizontal: 32, marginBottom: 16, alignItems: 'center' }}>
                            <Image source={require('assets/art-crowd.png')} style={{ width: 240, height: 150 }} />
                            <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginVertical: 4 }}>Talk about anything!</Text>
                            <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center', marginBottom: 16 }}>Create a new room and invite friends!</Text>
                            <ZButton title="Start room" path="CreateRoom" />
                        </View>
                    </>
                ) : undefined}
                refreshing={loading}
                onEndReached={loadMore}
            />
        </>
    );
});

export const RoomsFeed = withApp(RoomsFeedPage, { navigationAppearance: 'large' });
