import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { showBottomSheet, BottomSheetConfig } from 'openland-mobile/components/BottomSheet';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import { AppUserMediaStreamTrackNative } from 'openland-y-runtime-native/AppUserMedia';
import { plural } from 'openland-y-utils/plural';
import { getClient } from 'openland-mobile/utils/graphqlClient';

const CallControlItem = (props: { label: string, icon: NodeRequire, backgroundColor?: string, disabled?: boolean, onPress?: () => void, onLongPress?: () => void }) => {
    let theme = React.useContext(ThemeContext);

    return (
        <View alignItems="center" opacity={props.disabled ? 0.56 : 1} pointerEvents={props.disabled ? 'none' : undefined}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={props.onPress}
                onLongPress={props.onLongPress}
                style={{ width: 56, height: 56 }}
            >
                <View backgroundColor={props.backgroundColor || 'rgba(255, 255, 255, 0.08)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                    <Image source={props.icon} style={{ tintColor: theme.foregroundContrast }} />
                </View>
            </TouchableOpacity>
            <Text style={{ ...TextStyles.Label3, color: theme.foregroundContrast, marginTop: 8, justifyContent: 'center' }}>{props.label}</Text>
        </View>
    );
};

interface CallControlsProps {
    id: string;
    speaker: boolean;
    onSpeakerPress: () => void;
    onCallEnd: () => void;
}

export const CallControls = (props: CallControlsProps) => {
    let calls = getMessenger().engine.calls;
    let mediaSession = calls.useCurrentSession();
    let [state, setState] = React.useState<MediaSessionState | undefined>(mediaSession?.state.value);

    React.useEffect(() => mediaSession?.state.listenValue(setState), [mediaSession]);

    let theme = React.useContext(ThemeContext);
    let [speaker, setSpeaker] = React.useState(props.speaker);

    let mute = !state?.sender.audioEnabled;
    let camera = !!state?.sender.videoEnabled;
    let handleMute = () => mediaSession?.setAudioEnabled(!state?.sender.audioEnabled);
    let handleCamera = () => mediaSession?.setVideoEnabled(!state?.sender.videoEnabled);
    let handleFlip = () => {
        ((state?.sender.videoTrack as AppUserMediaStreamTrackNative)?.track as any)?._switchCamera();
    };
    let handleSpeaker = () => {
        setSpeaker(x => !x);
        props.onSpeakerPress();
    };

    let conference = getClient().useConference({ id: props.id }, { suspense: false });
    let room = conference?.conference?.room;
    let peers = [...conference ? conference.conference.peers : []];

    let title = room?.__typename === 'PrivateRoom'
        ? room?.user.name
        : room?.__typename === 'SharedRoom' ? room?.title
            : 'Call';

    const subtitle = room?.__typename === 'SharedRoom' ? `${plural(peers.length, ['member', 'members'])} on call` : 'On call';

    return (
        <View borderRadius={18} overflow="hidden">
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    paddingBottom: 15,
                    backgroundColor: theme.overlayHeavy,
                }}
            >
                <View flexDirection="column" flexGrow={1}>
                    <Text style={{ paddingTop: 15, ...TextStyles.Title2, color: theme.foregroundContrast }}>
                        {title}
                    </Text>
                    <Text style={{ marginTop: 4, ...TextStyles.Subhead, color: 'rgba(255, 255, 255, 0.56)' }}>
                        {subtitle}
                    </Text>
                    <View flexGrow={1} marginTop={15} flexDirection="row" justifyContent="space-between">
                        <CallControlItem
                            onPress={props.onCallEnd}
                            icon={require('assets/ic-call-end-glyph-24.png')}
                            label="End"
                            backgroundColor="#F23051"
                        />
                        <CallControlItem
                            onPress={handleSpeaker}
                            icon={require('assets/ic-speaker-glyph-24.png')}
                            label="Speaker"
                            backgroundColor={speaker ? '#248BF2' : undefined}
                        />
                        <CallControlItem
                            onPress={handleMute}
                            icon={require('assets/ic-mute-glyph-24.png')}
                            label="Mute"
                            backgroundColor={mute ? '#FF9F1A' : undefined}
                        />
                        <CallControlItem
                            onPress={handleCamera}
                            icon={require('assets/ic-camera-video-glyph-24.png')}
                            label="Camera"
                            backgroundColor={camera ? '#248BF2' : undefined}
                        />
                        <CallControlItem
                            icon={require('assets/ic-cycle-glyph-24.png')}
                            onPress={handleFlip}
                            label="Flip"
                            disabled={!camera}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export const showCallControls = (props: CallControlsProps & { showAnimation?: BottomSheetConfig['showAnimation'] }) => {
    showBottomSheet({
        containerStyle: {
            backgroundColor: 'transparent',
            marginHorizontal: 0,
            alignSelf: 'center',
            width: '100%',
            maxWidth: 450,
        },
        showAnimation: props.showAnimation,
        view: (ctx) => (
            <CallControls
                {...props}
                onCallEnd={() => {
                    props.onCallEnd();
                    ctx.hide();
                }}
            />
        )
    });
};
