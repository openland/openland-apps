import * as React from 'react';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { BackHandler, TouchableOpacity, StatusBar, Dimensions, View, Platform, Image } from 'react-native';
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
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { ZLinearGradient } from 'openland-mobile/components/visual/ZLinearGradient.native';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { AppUserMediaStreamTrackNative } from 'openland-y-runtime-native/AppUserMedia';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export interface PeerMedia {
    videoTrack: AppMediaStreamTrack | null;
    audioTrack: AppMediaStreamTrack | null;
    screencastTrack: AppMediaStreamTrack | null;
}

interface VideoViewProps extends PeerMedia {
    peer: Conference_conference_peers;
    mirror?: boolean;
}

const VideoView = React.memo((props: VideoViewProps) => {
    // @ts-ignore
    const [videoPaused, setVideoPaused] = React.useState<boolean | null>(true);

    let track = props.screencastTrack ? props.screencastTrack : props.videoTrack;
    let stream = React.useMemo(() => track && new MediaStream([(track as AppUserMediaStreamTrackNative).track]), [track]);

    let colors = getPlaceholderColors(props.peer.user.id);
    return (
        <View flexGrow={1} backgroundColor="gray">
            {stream && <RTCView streamURL={stream.toURL()} style={{ flexGrow: 1 }} objectFit="cover" mirror={props.mirror} />}
            {stream && <View position="absolute" left={6} top={6}>
                <ZAvatar size="medium" id={props.peer.user.id} title={props.peer.user.name} photo={props.peer.user.photo} />
            </View>}
            {!stream &&
                <ZLinearGradient
                    flexGrow={1}
                    alignSelf="stretch"
                    fallbackColor={colors.placeholderColor}
                    colors={[colors.placeholderColorStart, colors.placeholderColorEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View alignSelf="stretch" flexGrow={1} justifyContent="center" alignItems="center">
                        <ZAvatar size="x-large" id={props.peer.user.id} title={props.peer.user.name} photo={props.peer.user.photo} />
                    </View>

                </ZLinearGradient>
            }
        </View>
    );
});

let Content = XMemo<{ id: string, hide: () => void }>((props) => {
    let theme = React.useContext(ThemeContext);
    let [mute, setMute] = React.useState(false);
    let [speaker, setSpeaker] = React.useState(false);
    
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

    let calls = getMessenger().engine.calls;

    React.useEffect(() => {
        calls.joinCall(props.id);
    }, []);

    let mediaSession = calls.useCurrentSession();
    let [state, setState] = React.useState<MediaSessionState>();
    React.useEffect(() => mediaSession?.state.listenValue(setState), [mediaSession]);

    let conference = getClient().useConference({ id: props.id }, { suspense: false });

    let onCallEnd = React.useCallback(() => {
        InCallManager.stop({ busytone: '_BUNDLE_' });
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

    let peers = [...conference ? conference.conference.peers : []];
    let slicesCount = peers.length <= 3 ? 1 : peers.length < 9 ? 2 : 3;
    let slices: Conference_conference_peers[][] = [];
    let divider = slicesCount;
    while (divider) {
        let count = Math.ceil(peers.length / divider--);
        slices.unshift(peers.splice(peers.length - count, count));
    }
    let w = Dimensions.get('screen').width;

    // animate controls hide/show
    const [uiHidden, setHideUi] = React.useState(false);
    const uiHiddenRef = React.useRef(false);
    let switchUi = React.useCallback(() => setHideUi(v => !v), []);
    const key = React.useMemo(() => randomKey(), []);
    React.useEffect(() => {
        if (uiHiddenRef.current === uiHidden) {
            return;
        }
        uiHiddenRef.current = uiHidden;
        SAnimated.beginTransaction();
        if (uiHidden) {
            SAnimated.timing(`call-controls-${key}`, { property: 'translateY', easing: { bezier: [0.23, 1, 0.32, 1] }, from: 0, to: 150, duration: 0.15 });
        } else {
            SAnimated.timing(`call-controls-${key}`, { property: 'translateY', easing: 'material', from: 150, to: 0, duration: 0.25 });
        }
        SAnimated.commitTransaction();
    }, [uiHidden]);

    return (
        <TouchableOpacity delayPressIn={10} delayPressOut={10} activeOpacity={1} onPress={switchUi}>
            {Platform.OS === 'ios' && <StatusBar hidden={true} />}
            <View flexDirection="row" alignItems="flex-start" width={w} height="100%">
                {slices.map((s, i) =>
                    <View key={i} flexDirection="column" justifyContent="flex-start" flexGrow={1}>

                        {s.map(p => {
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
                                mirror={isLocal}
                            />;

                        })}
                    </View>
                )}
            </View>

            <SAnimated.View name={`call-controls-${key}`} style={{ justifyContent: 'space-around', alignItems: 'center', bottom: 56, flexDirection: 'row', position: 'absolute', width: '100%' }}>
                <TouchableOpacity
                    onPress={props.hide}
                    style={{ width: 56, height: 56 }}
                >
                    <View backgroundColor="rgba(0,0,0,0.15)" width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-close-24.png')} style={{ tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setSpeaker((s) => !s);
                    }}
                    style={{ width: 56, height: 56 }}
                >
                    <View backgroundColor={speaker ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-speaker-30.png')} style={{ tintColor: speaker ? 'black' : 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onCallEnd}
                    style={{ width: 70, height: 70 }}
                >
                    <View backgroundColor="#f6564e" width={70} height={70} borderRadius={35} alignItems="center" justifyContent="center">
                        <Image source={require('assets/ic-call-end-36.png')} style={{ tintColor: 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        mediaSession?.setVideoEnabled(!state?.sender.videoEnabled);
                    }}
                    onLongPress={() => {
                        if (state?.sender.videoEnabled) {
                            ReactNativeHapticFeedback.trigger('notificationSuccess');
                            ((state.sender.videoTrack as AppUserMediaStreamTrackNative)?.track as any)?._switchCamera();
                        }
                    }}
                    style={{ width: 56, height: 56 }}
                >
                    <View backgroundColor={state?.sender.videoEnabled ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={state?.sender.videoEnabled ? require('assets/ic-camera-video-24.png') : require('assets/ic-camera-video-24.png')} style={{ tintColor: state?.sender.videoEnabled ? 'black' : 'white' }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setMute((s) => {
                            mediaSession?.setAudioEnabled(s);
                            return !s;
                        });
                    }}
                    style={{ width: 56, height: 56 }}
                >
                    <View backgroundColor={mute ? '#fff' : 'rgba(0,0,0,0.15)'} width={56} height={56} borderRadius={28} alignItems="center" justifyContent="center">
                        <Image source={mute ? require('assets/ic-mic-off-30.png') : require('assets/ic-mic-on-30.png')} style={{ tintColor: mute ? 'black' : 'white' }} />
                    </View>
                </TouchableOpacity>
            </SAnimated.View>
        </TouchableOpacity>
    );
});

class CallContainer extends React.Component<{ id: string, modal: ZModalController }> {

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
                        <Content id={this.props.id} hide={this.hide} />
                    </React.Suspense>
                </LinearGradient>
            </SAnimated.View>
        );
    }
}

export function showCallModal(id: string) {

    (async () => {
        if (await checkPermissions('microphone')) {
            showModal((ctx) => {
                return (
                    <CallContainer id={id} modal={ctx} />
                );
            });
        }

    })();

}