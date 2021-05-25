import * as React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { QueryCacheProvider } from '@openland/spacex';

import { ZDraggableItem } from 'openland-mobile/components/ZDraggableItem';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { GQLClientContext, useClient } from 'openland-api/useClient';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import {
    VoiceChatParticipant,
    VoiceChatParticipantStatus,
    Conference_conference_peers,
} from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TintBlue, TintOrange } from 'openland-y-utils/themes/tints';
import InCallManager from 'react-native-incall-manager';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { useJoinRoom } from 'openland-mobile/pages/rooms/joinRoom';
import { VoiceChatT } from 'openland-engines/VoiceChatEngine';

interface SpeakerPhotoViewProps {
    firstSpeakers: VoiceChatParticipant[];
    peers?: Conference_conference_peers[];
    speakingPeerId?: string;
}

const dimensionsWindow = Dimensions.get('window');
const startX = dimensionsWindow.width - 84;
const startY = dimensionsWindow.height - 300;

const SpeakerPhotoView = React.memo<SpeakerPhotoViewProps>((props) => {
    const { firstSpeakers, speakingPeerId, peers } = props;
    const speakingPeer = peers?.find(peer => peer.id === speakingPeerId);

    let content;
    if (speakingPeer) {
        content = (
            <ZAvatar
                size="medium"
                photo={speakingPeer.user.photo}
                id={speakingPeer.user.id}
                title={speakingPeer.user.name}
            />
        );
    } else if (firstSpeakers.length === 1) {
        content = (
            <ZAvatar
                size="medium"
                photo={firstSpeakers[0].user.photo}
                id={firstSpeakers[0].user.id}
                title={firstSpeakers[0].user.name}
            />
        );
    } else if (firstSpeakers.length === 2) {
        content = (
            <>
                <View>
                    <ZAvatar
                        size="x-small"
                        photo={firstSpeakers[0].user.photo}
                        id={firstSpeakers[0].user.id}
                        title={firstSpeakers[0].user.name}
                    />
                </View>
                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 16,
                        borderColor: 'rgba(0, 0, 0, 0.9)',
                        borderWidth: 2,
                        borderRadius: 24,
                    }}
                >
                    <ZAvatar
                        size="x-small"
                        photo={firstSpeakers[1].user.photo}
                        id={firstSpeakers[1].user.id}
                        title={firstSpeakers[1].user.name}
                    />
                </View>
            </>
        );
    } else {
        content = firstSpeakers.map((speaker, i) => (
            <View style={{ marginBottom: 8, marginRight: i % 2 === 0 ? 8 : 0 }}>
                <ZAvatar
                    size="xx-small"
                    photo={speaker.user.photo}
                    id={speaker.user.id}
                    title={speaker.user.name}
                />
            </View>
        ));
    }

    return (
        <View style={{ height: 40, marginBottom: 24, flexDirection: 'row', flexWrap: 'wrap' }}>
            {content}
        </View>
    );
});

interface RoomMinimizedControlItemProps {
    bgColor: string;
    iconColor: string;
    icon: NodeRequire;
    onPress: () => void;
}

const RoomMinimizedControlItem = React.memo<RoomMinimizedControlItemProps>((props) => {
    const { bgColor, iconColor, icon, onPress } = props;

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={{
                width: 40,
                height: 40,
                marginBottom: 12,
                position: 'relative',
                opacity: 1,
            }}
        >
            <View
                style={{
                    backgroundColor: bgColor,
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={icon}
                    style={{ width: 20, height: 20, tintColor: iconColor }}
                />
            </View>
        </TouchableOpacity>
    );
});

const RoomMinimizedComponent = React.memo((props: { mediaSession: MediaSessionManager, voiceChatData: VoiceChatT }) => {
    const { voiceChatData } = props;
    const theme = useTheme();
    const joinRoom = useJoinRoom();
    const client = useClient();
    const status = voiceChatData.me?.status;
    const state = props.mediaSession.state.useValue();
    const firstSpeakers = voiceChatData.speakers?.slice(0, 4);
    const { id: speakingPeerId } = props.mediaSession.analyzer.useSpeakingPeer();
    const peers = client.useConference({ id: voiceChatData.id }, { suspense: false })?.conference.peers;

    React.useEffect(() => {
        return getMessenger().engine.voiceChat.onLeave(() => {
            InCallManager.stop({ busytone: '_BUNDLE_' });
        });
    }, []);

    const handleJoin = React.useCallback(() => joinRoom(voiceChatData.id), [voiceChatData.id]);

    const handleMutePress = React.useCallback(() => {
        props.mediaSession.setAudioEnabled(!state.sender.audioEnabled);
    }, [state]);

    const handleLeavePress = React.useCallback(() => {
        getMessenger().engine.voiceChat.leave();
    }, []);

    const muted = !state.sender.audioEnabled;

    const isAdminOrSpeaker = status === VoiceChatParticipantStatus.SPEAKER || status === VoiceChatParticipantStatus.ADMIN;

    return (
        <ZDraggableItem x={startX} y={startY} minX={12} minY={50} onPress={handleJoin}>
            <View
                style={{
                    zIndex: 10000,
                    width: 72,
                    height: 188,
                    backgroundColor: 'black',
                    opacity: 0.9,
                    borderRadius: 18,
                    padding: 16,
                }}
            >
                {firstSpeakers && (
                    <SpeakerPhotoView
                        peers={peers}
                        firstSpeakers={firstSpeakers}
                        speakingPeerId={speakingPeerId}
                    />
                )}
                {isAdminOrSpeaker && (
                    <RoomMinimizedControlItem
                        bgColor={muted ? TintOrange.primary : TintBlue.primary}
                        iconColor={theme.foregroundContrast}
                        icon={muted ? require('assets/ic-mute-glyph-36.png') : require('assets/ic-microphone-36.png')}
                        onPress={handleMutePress}
                    />
                )}
                {!isAdminOrSpeaker && (
                    <RoomMinimizedControlItem
                        bgColor="rgba(255, 255, 255, 0.16)"
                        iconColor={theme.foregroundContrast}
                        icon={require('assets/ic-leave-24.png')}
                        onPress={handleLeavePress}
                    />
                )}
                <RoomMinimizedControlItem
                    bgColor={!isAdminOrSpeaker ? theme.accentPrimary : 'rgba(255, 255, 255, 0.16)'}
                    iconColor={theme.accentPrimary === theme.foregroundContrast && !isAdminOrSpeaker ? theme.foregroundInverted : theme.foregroundContrast}
                    icon={require('assets/ic-size-up-glyph-24.png')}
                    onPress={handleJoin}
                />
            </View>
        </ZDraggableItem>
    );
});

export const RoomMinimized = React.memo(() => {
    let mediaSession;
    let voiceChat;
    try {
        mediaSession = getMessenger().engine.calls.useCurrentSession();
        voiceChat = getMessenger().engine.voiceChat.useVoiceChat();
    } catch (e) {
        console.log(e);
    }

    if (mediaSession && voiceChat) {
        return (
            <React.Suspense fallback={null}>
                <GQLClientContext.Provider value={getClient()}>
                    <QueryCacheProvider>
                        <RoomMinimizedComponent mediaSession={mediaSession} voiceChatData={voiceChat} />
                    </QueryCacheProvider>
                </GQLClientContext.Provider>
            </React.Suspense>
        );
    }

    return null;
});
