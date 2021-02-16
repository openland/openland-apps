import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SDeferred } from 'react-native-s/SDeferred';
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
import { showRoomView } from './RoomView';
import { useClient } from 'openland-api/useClient';
import { VoiceChat } from 'openland-api/spacex.types';

let RoomView = React.memo((props: { room: VoiceChat, theme: ThemeGlobal, router: SRouter }) => {
    let { room, theme } = props;
    return (
        <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, backgroundColor: theme.backgroundPrimary }} activeOpacity={0.6} onPress={() => showRoomView(props.room, props.router)}>
            <Text
                style={{ ...TextStyles.Label1, color: theme.foregroundPrimary, marginBottom: 8, }}
                numberOfLines={2}
            >
                {props.room.title ?? 'New room'}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    {room.speakers.map(speaker => (
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
                    {room.speakers.map(speaker => (
                        <View key={speaker.id} style={{ marginLeft: 12, marginBottom: 12 }}>
                            <ZAvatar size="small" photo={speaker.user.photo} title={speaker.user.name} id={speaker.user.id} />
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
});

type State = {
    rooms: VoiceChat[],
    cursor: string | null,
    loading: boolean,
};

type Action = { type: 'start' } | { type: 'success', rooms: VoiceChat[], cursor: string | null };

let RoomsFeedPage = React.memo((props: PageProps) => {
    let theme = useTheme();
    let client = useClient();
    let router = React.useContext(SRouterContext)!;
    let pushRoom = React.useCallback(() => {
        router.push('CreateRoom');
    }, [router]);
    // TODO: Change fetch-policy when updates are ready
    let initialRoomsList = client.useActiveVoiceChats({ first: 5 }, { fetchPolicy: 'network-only' }).activeVoiceChats;
    // @ts-ignore
    let [{ cursor, rooms, loading }, dispatch] = React.useReducer<React.Reducer<State, Action>>(
        (oldState, action) => {
            if (action.type === 'start') {
                return { ...oldState, loading: true };
            }
            if (action.type === 'success') {
                return { ...oldState, loading: false, rooms: oldState.rooms.concat(action.rooms), cursor: action.cursor };
            }
            return oldState;
        },
        { loading: false, cursor: initialRoomsList.cursor, rooms: initialRoomsList.items || [] }
    );

    // let roomsList: VoiceChat[] = [
    //     {
    //         id: '1',
    //         title: '🎨 Visual artists and Creatives talk and more!',
    //         speakersCount: 2,
    //         listenersCount: 128,
    //         members: [{ id: '1', name: 'Jeff Bezos', avatar: '' }, { id: '2', name: 'Pavel Durov', avatar: '' }],
    //     },
    //     {
    //         id: '2',
    //         title: 'Voice chat',
    //         speakersCount: 2,
    //         listenersCount: 128,
    //         members: [{ id: '1', name: 'Jeff Bezos', avatar: '' }, { id: '2', name: 'Pavel Durov', avatar: '' }, { id: '3', name: 'Jeff Bezos', avatar: '' }],
    //     },
    //     {
    //         id: '3',
    //         title: '🚀 The 2-Minute Drill: The Week’s Top Tech Stories (Ep. 17)',
    //         speakersCount: 2,
    //         listenersCount: 128,
    //         members: [{ id: '1', name: 'Jeff Bezos', avatar: '' }, { id: '2', name: 'Pavel Durov', avatar: '' }, { id: '3', name: 'Jeff Bezos', avatar: '' }, { id: '4', name: 'Pavel Durov', avatar: '' }],
    //     },
    //     {
    //         id: '4',
    //         title: 'THE MASTERCLASS – Marketing Strategies, Trends & Traffic THE MASTERCLASS – Marketing Strategies, Trends & Traffic THE MASTERCLASS – Marketing Strategies, Trends & Traffic',
    //         speakersCount: 2,
    //         listenersCount: 0,
    //         members: [{ id: '1', name: 'Jeff Bezos', avatar: '' }],
    //     },
    // ];

    return (
        <>
            <SHeader title="Rooms" />
            <SHeaderButton title="New room" onPress={pushRoom} />

            <React.Suspense fallback={<ZLoader />}>
                <SDeferred>
                    <SFlatList
                        data={rooms}
                        renderItem={({ item }) => <RoomView room={item} theme={theme} router={router} />}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => rooms.length > 0 ? <View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} /> : null}
                        ListHeaderComponent={rooms.length > 0 ? <View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} /> : null}
                        ListFooterComponent={(
                            <>
                                {rooms.length > 0 ? <View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} /> : null}
                                <View style={{ paddingVertical: 16, paddingHorizontal: 32, marginBottom: 16, alignItems: 'center' }}>
                                    <Image source={require('assets/art-crowd.png')} style={{ width: 240, height: 150 }} />
                                    <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginVertical: 4 }}>Talk about anything!</Text>
                                    <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center', marginBottom: 16 }}>Create a new room and invite friends!</Text>
                                    <ZButton title="Start room" path="CreateRoom" />
                                </View>
                            </>
                        )}
                    />
                </SDeferred>
            </React.Suspense>
        </>
    );
});

export const RoomsFeed = withApp(RoomsFeedPage, { navigationAppearance: 'large' });
