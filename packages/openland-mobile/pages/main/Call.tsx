import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { BackHandler, TouchableOpacity, StatusBar, Dimensions, View, Platform, Image, Text } from 'react-native';
import { XMemo } from 'openland-y-utils/XMemo';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { ZModalController, showModal } from 'openland-mobile/components/ZModal';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import LinearGradient from 'react-native-linear-gradient';
import InCallManager from 'react-native-incall-manager';
import { SAnimated } from 'react-native-fast-animations';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-fast-animations';
import { ZAvatar, getPlaceholderColors } from 'openland-mobile/components/ZAvatar';
import { RNSDevice } from 'react-native-s/RNSDevice';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { Conference_conference_peers, Conference_conference_peers_user } from 'openland-api/spacex.types';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { ZLinearGradient } from 'openland-mobile/components/visual/ZLinearGradient.native';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppUserMediaStreamTrackNative } from 'openland-y-runtime-native/AppUserMedia';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { showCallControls } from './components/conference/CallControls';

const PeerInfoGradient = (props: { children: any }) => {
    let theme = React.useContext(ThemeContext);
    return (
        <ZLinearGradient
            flexGrow={1}
            alignSelf="stretch"
            fallbackColor={theme.transparent}
            colors={[theme.transparent, theme.overlayMedium]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            {props.children}
        </ZLinearGradient>
    );
};

const PlaceholderGradient = (props: { id: string }) => {
    let colors = getPlaceholderColors(props.id);
    return (
        <ZLinearGradient
            flexGrow={1}
            alignSelf="stretch"
            fallbackColor={colors.placeholderColor}
            colors={[colors.placeholderColorStart, colors.placeholderColorEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        />
    );
};

const AvatarVideoView = (props: { user: Conference_conference_peers_user }) => {
    let theme = React.useContext(ThemeContext);

    return (
        <>
            {!props.user.photo && (
                <View
                    position="absolute"
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                >
                    <PlaceholderGradient id={props.user.id} />
                </View>
            )}
            {props.user.photo && (
                <Image
                    source={{ uri: props.user.photo }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    blurRadius={Platform.select({ ios: 72, default: 24 })}
                    resizeMode="cover"
                />
            )}
            <View
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                backgroundColor={theme.overlayMedium}
            />
            <View alignSelf="stretch" flexGrow={1} justifyContent="center" alignItems="center">
                <ZAvatar size="x-large" id={props.user.id} title={props.user.name} photo={props.user.photo} />
            </View>
        </>
    );
};

export interface PeerMedia {
    videoTrack: AppMediaStreamTrack | null;
    audioTrack: AppMediaStreamTrack | null;
    screencastTrack: AppMediaStreamTrack | null;
}

interface VideoViewProps extends PeerMedia {
    peer: Conference_conference_peers;
    mirror?: boolean;
    theme: ThemeGlobal;
    isLast: boolean;
}

const VideoView = React.memo((props: VideoViewProps) => {
    const area = React.useContext(ASSafeAreaContext);
    // @ts-ignore
    const [videoPaused, setVideoPaused] = React.useState<boolean | null>(true);

    let track = props.screencastTrack ? props.screencastTrack : props.videoTrack;
    let stream = React.useMemo(() => track && new MediaStream([(track as AppUserMediaStreamTrackNative).track]), [track]);

    const iconColor = props.theme.foregroundContrast;
    // @ts-ignore
    const iconByStatus = {
        loading: <LoaderSpinner size="small" color={iconColor} />,
        muted: <Image source={require('assets/ic-muted-bold-16.png')} style={{ tintColor: iconColor }} />,
        speaking: <Image source={require('assets/ic-speaking-bold-16.png')} style={{ tintColor: iconColor }} />,
    };
    let icon = null;
    let InfoWrapper = stream ? PeerInfoGradient : React.Fragment;

    let infoPaddingBottom = props.isLast ? Math.max(area.bottom, 30) : 14;

    return (
        <View flexGrow={1} flexBasis={0} backgroundColor="gray" position="relative">
            {stream && <RTCView streamURL={stream.toURL()} style={{ flexGrow: 1 }} objectFit="cover" mirror={props.mirror} />}
            {!stream && <AvatarVideoView user={props.peer.user} />}
            <View
                position="absolute"
                bottom={0}
                left={0}
                right={0}
            >
                <InfoWrapper>
                    <View
                        flexGrow={1}
                        paddingTop={14}
                        paddingBottom={infoPaddingBottom}
                        paddingHorizontal={16}
                        flexDirection="row"
                        alignItems="center"
                    >
                        <Text
                            style={{
                                ...TextStyles.Label2,
                                color: props.theme.foregroundContrast,
                                flexShrink: 1,
                            }}
                            numberOfLines={1}
                        >
                            {props.peer.user.name}
                        </Text>
                        {icon && <View alignItems="center" marginLeft={8}>{icon}</View>}
                    </View>
                </InfoWrapper>
            </View>
        </View>
    );
});

let Content = XMemo<{ id: string, speaker: boolean, setSpeaker: (fn: (s: boolean) => boolean) => void, hide: () => void }>((props) => {
    let theme = React.useContext(ThemeContext);
    let area = React.useContext(ASSafeAreaContext);
    let calls = getMessenger().engine.calls;
    let mediaSession = calls.useCurrentSession();
    let [flipped, setFlipped] = React.useState(false);
    let [state, setState] = React.useState<MediaSessionState | undefined>(mediaSession?.state.value);
    let [speaker, setSpeaker] = React.useState(props.speaker);
    const toggleSpeaker = () => {
        setSpeaker(x => !x);
        props.setSpeaker(x => !x);
    };

    React.useLayoutEffect(() => {
        SStatusBar.setBarStyle('light-content');
        InCallManager.start({ media: 'audio' });
        RNSDevice.proximityEnable();
        return () => {
            RNSDevice.proximityDisable();
            SStatusBar.setBarStyle(theme.statusBar);
        };
    }, []);

    React.useLayoutEffect(() => {
        InCallManager.setForceSpeakerphoneOn(speaker);
    }, [speaker]);

    React.useEffect(() => {
        calls.joinCall(props.id);
    }, []);

    React.useEffect(() => mediaSession?.state.listenValue(setState), [mediaSession]);

    let conference = getClient().useConference({ id: props.id }, { suspense: false });

    let onCallEnd = React.useCallback(() => {
        InCallManager.stop({ busytone: '_BUNDLE_' });
        props.setSpeaker(() => false);
        calls.leaveCall();

        setTimeout(() => {
            SStatusBar.setBarStyle(theme.statusBar);
            props.hide();
        }, 2000);
    }, []);

    React.useEffect(() => {
        // detect call ended somehow 
        // onCallEnd();
    }, [mediaSession]);

    let peersLeft = [...conference ? conference.conference.peers : []];
    let slicesCount = peersLeft.length <= 3 ? 1 : peersLeft.length < 9 ? 2 : 3;
    let slices: Conference_conference_peers[][] = [];
    let divider = slicesCount;
    while (divider) {
        let count = Math.ceil(peersLeft.length / divider--);
        slices.unshift(peersLeft.splice(peersLeft.length - count, count));
    }
    let w = Dimensions.get('screen').width;

    let showControls = () => {
        showCallControls({
            id: props.id,
            speaker,
            onSpeakerPress: toggleSpeaker,
            onFlip: () => setFlipped(x => !x),
            onCallEnd,
        });
    };

    React.useLayoutEffect(() => {
        showCallControls({
            id: props.id,
            speaker,
            onSpeakerPress: toggleSpeaker,
            onFlip: () => setFlipped(x => !x),
            onCallEnd,
            showAnimation: (_, views) => {
                SAnimated.setValue(views.container, 'opacity', 1);
                SAnimated.timing(views.background, { property: 'opacity', from: 0, to: 1, duration: 0.25 });
                SAnimated.timing(views.container, { property: 'opacity', from: 0, to: 1, duration: 0.25 });
                SAnimated.setValue(views.container, 'translateY', 0);
            }
        });
    }, []);

    return (
        <>
            {Platform.OS === 'ios' && <StatusBar hidden={true} />}
            <View flexDirection="row" alignItems="flex-start" width={w} height="100%">
                {slices.map((s, i) =>
                    <View key={i} flexDirection="column" justifyContent="flex-start" flexGrow={1}>

                        {s.map((p, peerIndex) => {
                            let media: PeerMedia = { videoTrack: null, audioTrack: null, screencastTrack: null };
                            let isLocal = p.id === state?.sender.id;
                            if (isLocal) {
                                media = {
                                    videoTrack: state?.sender.videoEnabled ? state?.sender.videoTrack : null,
                                    audioTrack: state?.sender.audioEnabled ? state?.sender.audioTrack : null,
                                    screencastTrack: state?.sender.screencastEnabled ? state?.sender.screencastTrack : null,
                                };
                            } else {
                                media = { ...media, ...state?.receivers[p.id] };
                            }
                            return <VideoView
                                key={`peer-${p.id}`}
                                peer={p}
                                {...media}
                                mirror={isLocal && !flipped}
                                theme={theme}
                                isLast={peerIndex === s.length - 1}
                            />;

                        })}
                    </View>
                )}
            </View>
            <View
                position="absolute"
                top={area.top + 14}
                left={0}
                right={0}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                paddingLeft={8}
            >
                <TouchableOpacity onPress={props.hide}>
                    <Image source={require('assets/logo-watermark.png')} style={{ tintColor: theme.foregroundContrast }} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={showControls}
                    style={{ width: 72, height: 72, justifyContent: 'center', alignItems: 'center' }}
                >
                    <View backgroundColor="rgba(255, 255, 255, 0.08)" width={40} height={40} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-size-down-glyph-24.png')} style={{ tintColor: theme.foregroundContrast }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View
                position="absolute"
                bottom={Math.max(area.bottom, 30) - 16}
                right={0}
            >
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={showControls}
                    style={{ width: 72, height: 72, justifyContent: 'center', alignItems: 'center' }}
                >
                    <View backgroundColor="rgba(255, 255, 255, 0.08)" width={40} height={40} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-burger-glyph-24.png')} style={{ tintColor: theme.foregroundContrast }} />
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
});

class CallContainer extends React.Component<{ id: string, modal: ZModalController, speaker: boolean, setSpeaker: (fn: (s: boolean) => boolean) => void }> {

    private key = randomKey();
    private ended = false;
    private container = new SAnimatedShadowView(this.key + '--bg', { opacity: 0 });

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        SAnimated.beginTransaction();
        SAnimated.setDefaultPropertyAnimator();
        this.container.opacity = 1;
        SAnimated.commitTransaction();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.ended) {
            return false;
        }
        this.hide();
        return true;
    }

    hide = () => {
        if (this.ended) {
            return;
        }
        this.ended = true;

        SAnimated.beginTransaction();
        SAnimated.setDefaultPropertyAnimator();
        this.container.opacity = 0;
        SAnimated.commitTransaction(() => { this.props.modal.hide(); });
    }

    render() {
        return (
            <SAnimated.View
                name={this.key + '--bg'}
                style={{
                    flexGrow: 1,
                    flexDirection: 'column',
                    opacity: 0
                }}
            >
                <LinearGradient colors={['#0084fe', '#004280']} style={{ flexGrow: 1, flexDirection: 'column' }}>
                    <React.Suspense fallback={<ZLoader />}>
                        <Content id={this.props.id} hide={this.hide} speaker={this.props.speaker} setSpeaker={this.props.setSpeaker} />
                    </React.Suspense>
                </LinearGradient>
            </SAnimated.View>
        );
    }
}

export function showCallModal(props: { id: string, speaker: boolean, setSpeaker: (fn: (s: boolean) => boolean) => void, }) {

    (async () => {
        if (await checkPermissions('microphone')) {
            showModal((ctx) => {
                return (
                    <CallContainer id={props.id} speaker={props.speaker} setSpeaker={props.setSpeaker} modal={ctx} />
                );
            });
        }

    })();

}

export const useCallModal = (props: { id: string }) => {
    // InCallManager doesn't handle speaker state https://github.com/react-native-webrtc/react-native-incall-manager/issues/44
    const [speaker, setSpeaker] = React.useState(false);
    const show = React.useCallback(() => {
        showCallModal({ id: props.id, speaker, setSpeaker });
    }, [props.id, speaker]);
    return show;
};
