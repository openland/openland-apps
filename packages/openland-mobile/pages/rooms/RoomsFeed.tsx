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

export type VoiceChat = {
    id: string;
    title: string;
    members: { name: string, avatar: string, id: string }[];
    speakersCount: number;
    listenersCount: number;
};

let RoomView = React.memo((props: { room: VoiceChat, theme: ThemeGlobal, router: SRouter }) => {
    let { room, theme } = props;
    return (
        <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, backgroundColor: theme.backgroundPrimary }} activeOpacity={0.6} onPress={() => showRoomView(props.room, props.router)}>
            <Text
                style={{ ...TextStyles.Label1, color: theme.foregroundPrimary, marginBottom: 8, }}
                numberOfLines={2}
            >
                {props.room.title}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    {room.members.map(member => (
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }}>
                            {member.name}
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
                    {room.members.map(member => (
                        <View key={member.id} style={{ marginLeft: 12, marginBottom: 12 }}>
                            <ZAvatar size="small" photo={member.avatar} title={member.name} id={member.id} />
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
});

let RoomsFeedPage = React.memo((props: PageProps) => {
    let theme = useTheme();
    let router = React.useContext(SRouterContext)!;
    let pushRoom = React.useCallback(() => {
        router.push('CreateRoom');
    }, [router]);

    let roomsList: VoiceChat[] = [
        {
            id: '1',
            title: '🎨 Visual artists and Creatives talk and more!',
            speakersCount: 2,
            listenersCount: 128,
            members: [{ id: '1', name: 'Jeff Bezos', avatar: '' }, { id: '2', name: 'Pavel Durov', avatar: '' }],
        },
        {
            id: '2',
            title: 'Voice chat',
            speakersCount: 2,
            listenersCount: 128,
            members: [{ id: '1', name: 'Jeff Bezos', avatar: '' }, { id: '2', name: 'Pavel Durov', avatar: '' }, { id: '3', name: 'Jeff Bezos', avatar: '' }],
        },
        {
            id: '3',
            title: '🚀 The 2-Minute Drill: The Week’s Top Tech Stories (Ep. 17)',
            speakersCount: 2,
            listenersCount: 128,
            members: [{ id: '1', name: 'Jeff Bezos', avatar: '' }, { id: '2', name: 'Pavel Durov', avatar: '' }, { id: '3', name: 'Jeff Bezos', avatar: '' }, { id: '4', name: 'Pavel Durov', avatar: '' }],
        },
        {
            id: '4',
            title: 'THE MASTERCLASS – Marketing Strategies, Trends & Traffic THE MASTERCLASS – Marketing Strategies, Trends & Traffic THE MASTERCLASS – Marketing Strategies, Trends & Traffic',
            speakersCount: 2,
            listenersCount: 0,
            members: [{ id: '1', name: 'Jeff Bezos', avatar: '' }],
        },
    ];

    return (
        <>
            <SHeader title="Rooms" />
            <SHeaderButton title="New room" onPress={pushRoom} />

            <React.Suspense fallback={<ZLoader />}>
                <SDeferred>
                    <SFlatList
                        data={roomsList}
                        renderItem={({ item }) => <RoomView room={item} theme={theme} router={router} />}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} />}
                        ListHeaderComponent={<View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} />}
                        ListFooterComponent={(
                            <>
                                <View style={{ height: 16, backgroundColor: theme.backgroundTertiary }} />
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
